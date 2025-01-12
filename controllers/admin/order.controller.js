const Order = require("../../models/order.model");
const Product = require("../../models/product.model");
const Account = require("../../models/account.model");
const User = require("../../models/user.model");
const moment = require("moment");

const productHelper = require("../../helpers/products");

// [GET]/admin/order
module.exports.index = async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    // Chuyển đổi ngày từ chuỗi sang định dạng Date
    const start = startDate ? moment(startDate).startOf("day").toDate() : null;
    const end = endDate ? moment(endDate).endOf("day").toDate() : null;

    // Tạo điều kiện lọc
    let filter = {};
    if (start && end) {
        filter.createdAt = { $gte: start, $lte: end };
    } else if (start) {
        filter.createdAt = { $gte: start };
    } else if (end) {
        filter.createdAt = { $lte: end };
    }
    const orders = await Order.find(filter);
    for (const order of orders) {
        for (const product of order.products) {
            const productInfo = await Product.findOne({
                _id: product.product_id
            }).select("title thumbnail");
            if (productInfo) {
                product.title = productInfo.title;
                product.thumbnail = productInfo.thumbnail;
            }
            product.priceNew = productHelper.priceNewProduct(product);
            product.totalPrice = product.priceNew * product.quantity;
        }
        order.totalPrice = order.products.reduce((sum, item) => sum + item.totalPrice, 0);
        // lấy thông tin người tạo
        const user = await User.findOne({
            tokenUser: order.user_id
        }).select("-password")
        if (user) {
            order.createFullName = user.fullName;
            order.emailUser = user.email;
        }

        const updatedBy = order.updateBy.slice(-1)[0];
        if (updatedBy) {
            const userUpdate = await Account.findOne({
                _id: updatedBy.account_id
            });
            updatedBy.accountFullName = userUpdate.fullName;
        }
    }

    res.render("admin/pages/orders/index", {
        pageTitle: "Danh sách đơn hàng",
        order: orders,
        startDate: start ? moment(start).format("YYYY-MM-DD") : "",
        endDate: end ? moment(end).format("YYYY-MM-DD") : ""
    });
}

// [PATCH]/admin/order/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    }

    const order = await Order.findOne({
        _id: id
    });
    if (order.status === 'shipped' || order.status === 'canceled') {
        req.flash('error', 'Hóa đơn đã được giao hoặc hủy, không thể cập nhật lại!');
        return res.redirect("back");
    } else {
        await Order.updateOne({ _id: id }, {
            status: status,
            $push: { updateBy: updatedBy }
        });

    }


    req.flash('success', 'Cập nhật trạng thái hóa đơn thành công!');

    res.redirect("back");
}

// [PATCH]/admin/order/change-status/:status/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            _id: req.params.id
        };

        const order = await Order.findOne(find);
        // thông tin tài khoản khách hàng
        const user = await User.findOne({
            tokenUser: order.user_id
        }).select("-password")
        if (user) {
            order.createFullName = user.fullName;
            order.emailUser = user.email;
        }

        for (const product of order.products) {
            const productInfo = await Product.findOne({
                _id: product.product_id
            }).select("title thumbnail");

            product.productInfo = productInfo;

            product.priceNew = productHelper.priceNewProduct(product);

            product.totalPrice = product.priceNew * product.quantity;
        }
        order.totalPrice = order.products.reduce((sum, item) => sum + item.totalPrice, 0);

        res.render("admin/pages/orders/detail", {
            pageTitle: "Xem chi tiết đơn hàng",
            order: order
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/order`);
    }
}

// [PATCH]/admin/order/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    await Order.deleteOne({ _id: id });
    req.flash('success', 'Xóa hóa đơn thành công!');

    res.redirect("back");
}