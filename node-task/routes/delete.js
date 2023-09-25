const express=require('express')
const app = express()
const router= express.Router()
const details = require('../operation');

app.use(express.json());
router.delete("/", async (req, res) => {

    const { id } = req.body;
    let detail = await details.deleteById(id)
    if (detail) {
        result = {
            code: 200,
            DeleteStatus: detail,
            message: "Student's details has been Deleted successfully"
        }
    }
    else {
        result =
        {
            code: 500,
            message: "Please give the existing student's Id to delete"
        }
    }
    res.send(result)
})
module.exports = router;