const systemConfig = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./role.route");

module.exports = (app) => {
    const PARTH_ADMIN = systemConfig.prefixAdmin;
    app.use(PARTH_ADMIN + "/dashboard", dashboardRoutes);

    app.use(PARTH_ADMIN + "/products", productRoutes);
    app.use(PARTH_ADMIN + "/products-category", productCategoryRoutes);
    app.use(PARTH_ADMIN + "/roles", roleRoutes);
}