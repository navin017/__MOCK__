const express = require('express')
const app = express()
const getStudents=require('./routes/getStudents')
const create = require('./routes/create')
const getOne = require('./routes/getOne')
const destroy = require('./routes/delete')
const update = require('./routes/update')
const category = require('./routes/category')
app.use(express.json())
app.use("/getStudents",getStudents)
app.use('/create',create)
app.use('/getOneStudent',getOne)
app.use('/delete',destroy)
app.use('/update',update)
app.use('/category',category)


const server = app.listen(8000, function () {
    console.log("listening to the port %s .....", server.address().port);
})