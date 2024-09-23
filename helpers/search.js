module.exports = () => {
    let objSearch = {
        keyword: "",
        regex: ""
    }
    if (req.query.keyword) {
        objSearch.keyword = req.query.keyword;

        const regex = new RegExp(keyword, "i")
        objSearch.regex = regex;
    }
}