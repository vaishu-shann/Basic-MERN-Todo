var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
const bodyparser = require('body-parser')
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

var CONNECTION_STRING =
  "mongodb+srv://vaishnavi:Vaishnavi30@cluster0.ls1ernz.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

var DATABASENAME = "todoappdb";
var database;

app.listen(5038, () => {
  Mongoclient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASENAME);
    console.log("MongoDB connected successfully");
  });
});
//baseURL => api
// serviceURL => todoapp

app.get("/api/todoapp", (request, response) => {
  database
    .collection("todoappcollection")
    .find({})
    .toArray((error, result) => {
      response.send(result);
    });
});

app.post("/api/todoapp", (request, response) => {
  database
    .collection("todoappcollection")
    .count({}, function (error, numOfDocs) {
      database.collection("todoappcollection").insertOne({
        id: (numOfDocs + 1).toString(),
        desc: request.body.desc,
      });
      response.json("Notes Added successsfully");
    });
});

app.delete("/api/todoapp/note", (request, response) => { 
  database.collection("todoappcollection").deleteOne({
    id: request.query.id,
  });
  response.json("Deleted the Note Successfully");
});
