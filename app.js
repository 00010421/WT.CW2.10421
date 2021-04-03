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

// app.get('/create', (req, res)=>{
//     res.render('create')
// })

// app.post('/create', (req, res)=> {
//     const title = req.body.title
//     const description = req.body.description
    
//     if(title.trim()=== '' && description.trim()===''){
//         res.render('create', {error: true, msg:`Please don't leave it as blank`})
//     } else{
//         fs.readFile('./data/blogList.json', (err, data)=> {
//             if (err) throw err

//             const blogList = JSON.parse(data)

//             blogList.push({
//                 id: id(),
//                 title: title,
//                 description: description,
//             })

//             fs.writeFile('./data/blogList.json', JSON.stringify(blogList), err => {
//                 if (err) throw err 

//                 res.render('create', {success: true})
//             })
//         })
//     }
// })

// app.get('/api/v1/blogList', (req, res)=> {
//     fs.readFile('./data/blogList.json', (err, data)=> {
//         if (err) throw err
//         const blogList = JSON.parse(data)
//         res.json(blogList)
//     })
// })

// app.get('/blogList', (req, res)=>{
//     fs.readFile('./data/blogList.json', (err, data)=> {
//         if (err) throw err
//         const blogList = JSON.parse(data)
//         res.render('blogList', {blogList: blogList})

//     })
// })

// app.get('/blogList/:id', (req, res)=>{
//     const id = req.params.id
//     fs.readFile('./data/blogList.json', (err, data)=> {
//         if (err) throw err
//         const blogList = JSON.parse(data)
//         const blog = blogList.filter(blog => blog.id ==id)[0]
//         res.render('detail', {blog: blog})
//     })
// })

// app.listen(4000, err => {
//     if (err) console.log(err)

//     console.log('Server is running on port 4000...')
// })

// function id(){
//     return '_' + Math.random().toString(36).substr(2, 9);
// }