const express=require('express')
const app = express()
const router= express.Router()
const details = require('../operation');
app.use(express.json())
router.post('/', async (req, res) => {
    try{
    const { fname, lname, marks,email } = req.body;
    await details.createDetails(fname, lname, email,marks)
    if (fname && lname && marks) {
        res.status(201).json({
            student: {
                fname,
                lname,
                email
            },
            marks,
            Message: "Student name with their marks created successfully"
        });
    }
    if (!fname ) {
        res.status(500).json({
            Message: "The firstName of the student cannot be empty"
        });
    }
    if ( !lname ) {
        res.status(500).json({
            Message: "The Last Name of the student cannot be empty"
        });
    }
    if (!marks) {
        res.status(500).json({
            Message: "The Marks of the student cannot be empty"
        });
    }
    if (!fname && !lname) {
        res.status(500).json({
            Message: "First Name and Last Name of the student must be filled"
        });
    }
    if (!fname && !lname && !marks) {
        res.status(500).json({
            Message: "Please give the datas to create the student details"
        });
    }
    console.log(fname, lname, marks);
}
    catch(err){
        console.log("error Occurred",err);
    }
});
module.exports = router;