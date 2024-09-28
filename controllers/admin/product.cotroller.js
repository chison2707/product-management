const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
//[GET] / admin/prducts
module.exports.index = async (req, res) => {

    const filterStatus = filterStatusHelper(req.query);
    let find = {
        deleted: false
    };

    if (req.query.status) {
        find.status = req.query.status;
    }

    const objSearch = searchHelper(req.query);
    if (objSearch.regex) {
        find.title = objSearch.regex;
    }

    // pagination
    const countProducts = await Product.countDocuments(find);
    let objPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 4
        },
        req.query,
        countProducts
    );
    // end pagination

    const products = await Product.find(find).limit(objPagination.limitItems).skip(objPagination.skip);
    // console.log(products);
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objSearch.keyword,
        pagination: objPagination
    });
}

//[PATCH] / admin/prducts/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { status: status });

    res.redirect("back");
}

//[PATCH] / admin/prducts/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                deleteAt: new Date()
            });
            break;
        default:
            break;
    }

    res.redirect("back");
}

//[PATCH] / admin/prducts/delete/:id
module.exports.deleteItem = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    // await Product.deleteOne({ _id: id });
    await Product.updateOne({ _id: id }, {
        deleted: true,
        deleteAt: new Date()
    });

    res.redirect("back");
}