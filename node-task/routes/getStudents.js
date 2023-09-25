const express=require('express')
// const app = express()
const router= express.Router()
const details = require('../operation');

// app.use(express.json())
router.get("/", async (req, res) => {

    let detail = await details.getStudents();
    if (detail&&detail.length>0) {
        result = {
            data: detail,
            message: "Students name fetched successfully",
            code: 200,
        }
    }
    else {
        result = {
            message: "There is no datas to fetch from the database",
            data: null,
        }
    }
    res.send(result);

});

module.exports = router;