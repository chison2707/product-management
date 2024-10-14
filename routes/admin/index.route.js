const systemConfig = require("../../config/system");

const authMiddleware = require("../../middlewares/admin/auth.middleware");

const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route");

module.exports = (app) => {
    const PARTH_ADMIN = systemConfig.prefixAdmin;
    app.use(PARTH_ADMIN + "/dashboard", authMiddleware.requireAuth, dashboardRoutes);

    app.use(PARTH_ADMIN + "/products", authMiddleware.requireAuth, productRoutes);
    app.use(PARTH_ADMIN + "/products-category", authMiddleware.requireAuth, productCategoryRoutes);
    app.use(PARTH_ADMIN + "/roles", authMiddleware.requireAuth, roleRoutes);
    app.use(PARTH_ADMIN + "/accounts", authMiddleware.requireAuth, accountRoutes);
    app.use(PARTH_ADMIN + "/auth", authRoutes);
}