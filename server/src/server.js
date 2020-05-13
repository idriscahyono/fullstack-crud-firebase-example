const express = require("express");
const app = express();
const cors = require("cors");
var firebase = require("firebase");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

var config = {
  apiKey: "AIzaSyByhKEwidb7nKUmv4t0XNT2fRCxCZ_Evjk",
  authDomain: "react-project-7ea16.firebaseapp.com",
  databaseURL: "https://react-project-7ea16.firebaseio.com",
  projectId: "react-project-7ea16",
  storageBucket: "react-project-7ea16.appspot.com",
  messagingSenderId: "908284546668",
  appId: "1:908284546668:web:8e710f683568bb7a821249",
  measurementId: "G-CNRLWRDGYR",
};
firebase.initializeApp(config);

app.get("/:id", function (req, res) {
  console.log("HTTP Get Request");
  var id = req.params.id;
  var userReference = firebase.database().ref("/Data/" + id);

  userReference.on(
    "value",
    function (snapshot) {
      console.log(snapshot.val());
      res.json(snapshot.val());
      userReference.off("value");
    },
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );
});

app.get("/", function (req, res) {
  console.log("HTTP Get Request");
  var userReference = firebase.database().ref("/Data/");

  userReference.on(
    "value",
    function (snapshot) {
      console.log(snapshot.val());
      res.json(snapshot.val());
      userReference.off("value");
    },
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );
});

app.put("/:id", function (req, res) {
  console.log("HTTP Put Request");

  var id = req.params.id;
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;

  var referencePath = "/Data/" + id + "/";
  var userReference = firebase.database().ref(referencePath);
  userReference.update(
    { Id: id, Title: title, Description: description, Author: author },
    function (error) {
      if (error) {
        res.send("Data could not be saved." + error);
      } else {
        res.send("Data update successfully.");
      }
    }
  );
});

app.post("/", function (req, res) {
  console.log("HTTP POST Request");

  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var id = Math.random().toString(36).substr(2, 9);

  var referencePath = "/Data/" + id + "/";
  var userReference = firebase.database().ref(referencePath);
  userReference.set(
    { Id: id, Title: title, Description: description, Author: author },
    function (error) {
      if (error) {
        res.send("Data could not be saved." + error);
      } else {
        res.send("Data saved successfully.");
      }
    }
  );
});

app.delete("/:id", function (req, res) {
  console.log("HTTP DELETE Request");
  console.log("HTTP POST Request");

  var id = req.params.id;

  var referencePath = "/Data/" + id;
  var userReference = firebase.database().ref(referencePath);
  userReference.remove().then(function (error) {
    if (error) {
      res.send("Data not be delete." + error);
    } else {
      res.send("Data delete successfully.");
    }
  });
  //todo
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Running");
});
