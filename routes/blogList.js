const fs = require('fs')
const path = require('path')

const express = require("express")
const router = express.Router()

const Validator = require("../services/validators")
const DbContext = require("../services/db")
const root = require("../utils").root;
const getCollection = require("../utils").getCollection;

const dbc = new DbContext()
const v = new Validator()
dbc.useCollection("blogList.json")

router.get("/", (req, res) => {
    dbc.getAll(
        records => res.render("blogList", { blogList: records }),
        () => res.render("all_notes", { blogList: null })
    )
})

router.get("/create", (req, res) => {
    res.render("create", {})
});

router.post("/create", (req, res) => {
    if (v.isValid(req.body)) {
        dbc.saveOne(req.body, () => res.render("create", { success: true }))
    } else {
        res.render("create", { error: true, success: false })
    }
})

router.get('/:id/delete', (req, res) => {
    dbc.deleteOne(
        req.params.id, 
        () => res.redirect('/')),
        () => res.sendStatus(500)
})

router.get("/:id", (req, res) => {
    dbc.getOne(
        req.params.id,
        record => res.render("detail", { blog: record }),
        () => res.sendStatus(404)
    )
})

module.exports = router;