const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");
//[GET] / admin/prducts
module.exports.index = async (req, res) => {

    const filterStatus = filterStatusHelper(req.query);
    let find = {
        deleted: false
    };

    if (req.query.status) {
        find.status = req.query.status;
    }

    //    search

    const products = await Product.find(find);
    // console.log(products);
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    });
}
