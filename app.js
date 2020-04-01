// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  let today = new Date();
  let currentDay = today.getDay();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);


  res.render("list", {
    listTitle: day,
    newListItems: items
  })
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.post("/work", function(req, res) {
  let item = req.body.newItems;
  items.push(item);
  res.redirect("/work");
})


app.listen(3000, function() {
  console.log("Server started on server 3000.");
})
