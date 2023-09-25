const express=require('express')
const app = express()
const router= express.Router()
const details = require('../operation');
app.use(express.json())

router.get('/category', async (req, res) => {
    const { category } = req.query;

    try {
        if (!category || !['good', 'average', 'excellence'].includes(category)) {
            return res.status(400).json({ error: 'Invalid category' });
        }

        const students = await details.getStudentsByCategory(category);
        if (students && students.length > 0) {
            res.json({
                data: students,
                message: 'Students data fetched successfully',
                code: 200,
            });
        } else {
            res.json({
                message: 'There are no students to fetch from the database',
                data: null,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router