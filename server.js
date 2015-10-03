var express = require("express"),
    app = express();

app.use(express.static(__dirname));

var server = app.listen(process.env.PORT || 3000);
