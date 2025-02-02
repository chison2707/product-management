const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
const paginationHelper = require("../../helpers/pagination");

//[GET] / admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    // pagination
    const countProducts = await Role.countDocuments(find);
    let objPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 5
        },
        req.query,
        countProducts
    );
    // end pagination

    const records = await Role.find(find).limit(objPagination.limitItems).skip(objPagination.skip);
    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        records: records,
        pagination: objPagination
    });
}

//[GET] / admin/roles/create
module.exports.create = async (req, res) => {

    res.render("admin/pages/roles/create", {
        pageTitle: "Tạo nhóm quyền",
    });
}

//[POST] / admin/roles/createPost
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`);

}

//[GET] / admin/roles/edit:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        let find = {
            _id: id,
            deleted: false
        };

        const record = await Role.findOne(find);

        res.render("admin/pages/roles/edit", {
            pageTitle: "Sửa nhóm quyền",
            data: record,
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
}

//[PATCH] / admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    try {
        await Role.updateOne({ _id: id }, req.body);
        req.flash('success', `Cập nhật thành công!`);

    } catch (error) {
        req.flash('error', `Cập nhật thất bại!`);
    }

    res.redirect(`${systemConfig.prefixAdmin}/roles`);

}

//[GET] / admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await Role.find(find);
    res.render("admin/pages/roles/permissions", {
        pageTitle: "Phân quyền",
        records: records,
    });
}

//[Patch] / admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {

    try {
        const permissions = JSON.parse(req.body.permissions);

        for (const item of permissions) {
            await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
        }

        req.flash('success', `Cập nhật phân quyền thành công!`);
    } catch (error) {
        req.flash('error', `Cập nhật phân quyền thất bại!`);

    }

    res.redirect("back");

}

//[GET] / admin/detail/edit:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;

        let find = {
            _id: id,
            deleted: false
        };

        const record = await Role.findOne(find);

        res.render("admin/pages/roles/detail", {
            pageTitle: "Xem chi tiết nhóm quyền",
            data: record,
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
}

//[GET] /admin/roles/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        await Role.deleteOne({ _id: id });
        req.flash('success', `Xóa thành công!`);

    } catch (error) {
        req.flash('error', `Xóa thất bại!`);
    }

    res.redirect(`${systemConfig.prefixAdmin}/roles`);

}