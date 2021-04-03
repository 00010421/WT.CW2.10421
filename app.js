const express = require('express')
const app = express()
const fs = require('fs')

app.set('view engine', 'pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false}))

//localhost:4000
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/create', (req, res)=>{
    res.render('create')
})

app.post('/create', (req, res)=> {
    const title = req.body.title
    const description = req.body.description
    
    if(title.trim()=== '' && description.trim()===''){
        res.render('create', {error: true, msg:`Please don't leave it as blank`})
    } else{
        fs.readFile('./data/blogList.json', (err, data)=> {
            if (err) throw err

            const blogList = JSON.parse(data)

            blogList.push({
                id: id(),
                title: title,
                description: description,
            })

            fs.writeFile('./data/blogList.json', JSON.stringify(blogList), err => {
                if (err) throw err 

                res.render('create', {success: true})
            })
        })
    }
})


app.get('/blogList', (req, res)=>{
    fs.readFile('./data/blogList.json', (err, data)=> {
        if (err) throw err
        const blogList = JSON.parse(data)
        res.render('blogList', {blogList: blogList})

    })
})

app.get('/blogList/:id', (req, res)=>{
    const id = req.params.id
    fs.readFile('./data/blogList.json', (err, data)=> {
        if (err) throw err
        const blogList = JSON.parse(data)
        const blog = blogList.filter(blog => blog.id ==id)[0]
        res.render('detail', {blog: blog})
    })
})

app.listen(4000, err => {
    if (err) console.log(err)

    console.log('Server is running on port 4000...')
})

function id(){
    return '_' + Math.random().toString(36).substr(2, 9);
}