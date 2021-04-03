const path = require("path");
const fs = require('fs');

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//routes
const comments = require("./routes/comments");
const blogList = require("./routes/blogList");
const getCollection = require("./utils").getCollection;

//stactic files serving 
// app.use('/static', express.static('public'));
app.use(express.static('public'));

//parse the application 
app.use(bodyParser.urlencoded({ extended: false}));

//parse application/json
app.use(bodyParser.json());

//set the template engine to pug
app.set("view engine", "pug");

//urls for the blogList
app.use("/blogList", blogList);
app.use("/comments", comments);

//localhost:4000
app.get("/", (req, res) => {
    res.render("index", {title: "B104", msg: "You are at B104."});
});

const listener = app.listen(4000, ()=> {
    console.log(`App is listening on port  http://localhost:4000`)
});

app.get('/create', (req, res)=>{
    res.render("create")
})

app.get('/api/v1/blogList', (req, res)=> {
        fs.readFile('./data/blogList.json', (err, data)=> {
            if (err) throw err
            const blogList = JSON.parse(data)
            res.json(blogList)
        })
    })

