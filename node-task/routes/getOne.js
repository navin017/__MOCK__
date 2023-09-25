const express=require('express')
// const app = express()
const router= express.Router()
const details = require('../operation');

// app.use(express.json())
router.get("/", async (req, res) => {
    console.log('body---------------', req.body)
 
     const { id } = req.body;
     let detail = await details.getStudentsById(id);
     if (detail) {
         result = {
             data: detail,
             message: "Student name fetched succefully",
             code: 200,
         }
     }
     else {
         result = {
             Message: "There is no student ID to get that students details",
         }
     }
     console.log('+++++++++++++++++++++++++++++++++', id)
     res.send(result);
 
 });

 module.exports = router;