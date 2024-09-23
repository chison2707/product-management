const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
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
    let objPagination = {
        currentPage: 1,
        limitItems: 4
    }
    if (req.query.page) {
        objPagination.currentPage = parseInt(req.query.page);
    }

    objPagination.skip = (objPagination.currentPage - 1) * objPagination.limitItems;

    const countProducts = await Product.countDocuments(find);
    const totalPage = Math.ceil(countProducts / objPagination.limitItems);
    objPagination.totalPage = totalPage;
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
