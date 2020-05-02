//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const PORT = process.env.PORT || 3000

const homeStartingContent = "Go to the Menu and create a new post with title of your Name and enter some data then the post will start apperaing here ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];


app.get("/" , function (req , res) {
  res.render("home" , {'startContent' : homeStartingContent , 'posts' : posts});

})



app.get("/post/:topic" , function (req , res) {
const requiredData = lodash.lowerCase(req.params.topic);

posts.forEach(function (post) {

  if (requiredData == lodash.lowerCase(post.title)) {
    res.render("post" , {title : post.title , data : post.data});
  }else{
      console.log("Macth not Found");
  }
})

})


app.get("/about" , function (req , res) {
  res.render("about" , {'startContent' : aboutContent });

})


app.get("/contact" , function (req , res) {
  res.render("contact" , {'startContent' : contactContent });

})



app.get("/compose" , function (req , res) {
  res.render("compose");


})

app.post("/compose", function (req ,res) {
  const post = {
    title : req.body.composeTitle,
    data  : req.body.composeData,
  };

  posts.push(post);

  res.redirect("/");
})





app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
