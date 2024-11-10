const express = require('express');
var path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const moment = require('moment');
require("dotenv").config();

const database = require('./config/database');

const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");
database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// flash
app.use(cookieParser("GFDFGDFGDGDF"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// end flash

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// end TinyMCE

//app local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

app.use(express.static(`${__dirname}/public`));

route(app);
routeAdmin(app);
app.get("*", (req, res) => {
    res.render("client/pages/error/404", {
        pageTitle: "404 Not Found"
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})