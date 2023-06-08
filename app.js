//require packages to use in application
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

//calls express module
const app = express();

//sample contents for home, about, and contacts page
const startingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//sets ejs view engine 
app.set("view engine", "ejs");

//uses body parser and express static pages
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//global var
//let is a safer version of a var
let posts = [];


//get request for the home page 
//renders home.ejs file
//passes 1 var and posts array to ejs file 
app.get("/", (req, res) => {
    res.render("home", 
    {
    startingContent: startingContent,
    posts: posts
    });
    // console.log(posts);
});

//get request for the about page 
//renders about.ejs 
//passes 1 variable to ejs file
app.get("/about", (req, res) => {
    res.render("about", {aboutContent: aboutContent});
});

//get request for the contact page
//renders contact.ejs 
//passes 1 variable to ejs file
app.get("/contact", (req, res) => {
    res.render("contact", {contactContent: contactContent});
});

//get request for the compose page
//renders compose.ejs
app.get("/compose", (req, res) => {
    res.render("compose");
});

//post route for compose after inputs are submited 
app.post("/compose", (req, res) => {

    //creates post object with title and content variables
    //uses bodyparser to parse for element names postTitle and postContent 
    const post = {
        title: req.body.postTitle,
        content: req.body.postContent
    };

    //pushes object into global 'posts' array
    posts.push(post); 
    // console.log(post);
    //redirects back to home route
    res.redirect("/");
});

//route parameters
//:postTitle represents the route 
app.get("/posts/:postTitle", (req,res) => {

    const requestedTitle = _.lowerCase(req.params.postTitle);
    console.log(req.params.postTitle);

    //loops through posts array
    //checks if there is a post title that matches requested title
    posts.forEach((post) => {
        const currentTitle = _.lowerCase(post.title);
        if (requestedTitle === currentTitle) {

            res.render("post", {
                title: post.title,
                content: post.content
            });

            console.log("Match found!");
        } else {
            console.log("No Math found");
        }
    });


});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});