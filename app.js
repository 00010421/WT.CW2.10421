const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use('/static', express.static('public'))

//localhost:4000
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/create', (req, res)=> {
    res.render('create')
})

const blogList = ['some title', 'some title2']

app.get('/blogList', (req, res)=>{
    res.render('blogList', {blogList: blogList})
})

app.get('/blogList/detail', (req, res)=>{
    res.render('detail')
})

app.listen(4000, err => {
    if (err) console.log(err)

    console.log('Server is running on port 4000...')
})