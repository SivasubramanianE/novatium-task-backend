var express = require('express');
var app = express();
var cors = require('cors')
const bodyParser = require('body-parser');
const mongoConnector = require("./config/database.config");

app.use(cors()) // Use this after the variable declaration

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })
// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

require('./app/routes/user.route')(app);

mongoConnector.connectToServer(function (err, client) {
    if (err) console.log(err);
    let db = mongoConnector.getDb();
    let mongoClient = mongoConnector.getClient();
    app.set("mongoInstance", db);
  });
  
// define a simple route
app.get('/', (req, res) => {
    res.json({
        "message": "Backend Connected"
    });
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
