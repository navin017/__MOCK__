const express=require('express')
const app = express()
const router= express.Router()
const details = require('../operation');
app.use(express.json())

router.put('/', async (req, res) => {
    const { email, updatedMarks } = req.body;
    await details.updateMarks(email, updatedMarks);
    if (email && updatedMarks) { res.status(200).json({ message: 'Marks updated successfully' }); }
    if (!email && updatedMarks) {
        res.status(500).json({
            Message: "Please provide the first Name of the student to update the marks"
        });
    }
    if (email && !updatedMarks) {
        res.status(500).json({
            Message: "Please provide the marks of the student to update the marks"
        });
    }
    if (!email && !updatedMarks) {
        res.status(500).json({
            Message: "The field is empty"
        });
    }
});
module.exports = router;