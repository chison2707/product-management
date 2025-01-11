const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema({
    title: String,
    parent_id: {
        type: String,
        default: ""
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    updateBy: [
        {
            account_id: String,
            updatedAt: Date
        }
    ],
    deleteAt: Date
}, {
    timestamps: true
});
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "product-category");

module.exports = ProductCategory;