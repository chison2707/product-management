const moment = require("moment");
module.exports.filter = (startDate, endDate) => {
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
    return filter;
}