const { studentsDetails,Marks } = require('./db-details')
// const { studentsDetails } = require('./db-details')
const { sequelize } = require('./db-connect')
const { Sequelize, DataTypes } = require('sequelize')


//To Get data of all the students
const getStudents = async () => {
try{
    let result = await (studentsDetails).findAll({
        include: Marks,
    })
    return JSON.parse(JSON.stringify(result));
} catch (err) {
    console.log("Error.........", err)
}
}

//To Get data of a particular the students

const getStudentsById = async (id) => {
    try {
        console.log('+++++++++++++++++++++++++++++++++', id)
        let result = await studentsDetails.findOne({
            where: { id:id },
           // include: [Marks],
        })
        return JSON.parse(JSON.stringify(result));
    } catch (err) {
        console.log("Error..: ", err);
    }
}

//To Create a new student details into the database

const createDetails = async (fname, lname,email, marks) => {
    try {
        const student = await studentsDetails.create({
            first_name: fname,
            last_name: lname,
            email_id:email
        });

        console.log("Student name stored successfully:", student.first_name);

        const newMarksData = await Marks.create({
            tamil: marks.tamil,
            english: marks.english,
            maths: marks.maths,
            student_id: student.id
        });
        console.log("Marks record created and associated with the student.");
        return JSON.parse(JSON.stringify(newMarksData));
    } catch (err) {
        console.log("Error occurred:", err);
    }
};

//To Update the mark of the existing student by using the first name of the student

const updateMarks = async (email, updatedMarks,updateName) => {
    try {
        const student = await studentsDetails.findOne({
            where: { email_id: email },
        });
        // await studentsDetails.update(updateName, {
        //     where: { last_name: student.last_name },
        // });
        await Marks.update(updatedMarks, {
            where: { student_id: student.id },
        });
      
    } catch (err) {
        console.log("Error occurred:", err);
    }
}

//To Get the students who are all scored more than 250 marks

const getGood = async () => {
try{
    const marks = await Marks.findAll({
        include: studentsDetails,
        attributes: [
            'student_id',
            [
                sequelize.literal('SUM(tamil) + SUM(english) + SUM(maths)'),
                'total_mark',
            ],
        ],
        group: 'student_id',
        having: sequelize.literal('total_mark >= 250'),
    });
    return JSON.parse(JSON.stringify(marks));
 }catch (err) {
        console.log("Error.........", err)
    }
}

//To Get the students who are all scored more than 200 marks

const getAverage = async () => {
try{
    const marks = await Marks.findAll({
        include: studentsDetails,
        attributes: [
            'student_id',
            [
                sequelize.literal('SUM(tamil) + SUM(english) + SUM(maths)'),
                'total_mark',
            ],
        ],
        group: 'student_id',
        having: sequelize.literal('total_mark >= 180 && total_mark < 250'),
    });
    return JSON.parse(JSON.stringify(marks));
}catch (err) {
        console.log("Error.........", err)
    }
};

//To Get the students who are all scored more than 280 marks
const getExcellence = async () => {
    try {
    const marks = await Marks.findAll({
        include: studentsDetails,
        attributes: [
            'student_id',
            [
                sequelize.literal('SUM(tamil) + SUM(english) + SUM(maths)'),
                'total_mark',
            ],
        ],
        group: 'student_id',
        having: sequelize.literal('total_mark >=280 '),
    });
    console.log(marks,"****")
    return JSON.parse(JSON.stringify(marks));
} 
catch (err) {
    console.log("Error.........", err)
}
};

// To Delete the particular student by using their ID
const deleteById = async (id) => {
    try {
       let result = await studentsDetails.destroy({
            include: [
                {
                    model: studentsDetails,
                },
            ],
            where: { id: id },
        })
        return JSON.parse(JSON.stringify(result));
    } 
    catch (err) {
        console.log("Error.........", err)
    }
}

// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

// // Import the required models
// const Student = require('./models').Student; // Replace './models' with the actual path to your Sequelize models

// Function to fetch students by category
const getStudentsByCategory = async (category) => {
    let minTotalMarks, maxTotalMarks;

    // Determine the total mark range based on the requested category
    if (category === 'good') {
        minTotalMarks = 250;
        maxTotalMarks = 280;
    } else if (category === 'average') {
        minTotalMarks = 180;
        maxTotalMarks = 250;
    } else if (category === 'excellence') {
        minTotalMarks = 280;
        maxTotalMarks = Infinity;
    } else {
        throw new Error('Invalid category');
    }

    try {
        const students = await Marks.findAll({
            include: studentsDetails,
            attributes: [
                'student_id',
                [
                    Sequelize.literal('SUM(tamil + english + maths)'),
                    'total_mark',
                ],
            ],
            group: 'student_id',
            having: Sequelize.literal(
                `total_mark >= ${minTotalMarks} && total_mark < ${maxTotalMarks}`
            ),
        });

        return students;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    getStudents: getStudents,
    getStudentsById: getStudentsById,
    deleteById: deleteById,
    getStudentsByCategory:getStudentsByCategory,
    createDetails: createDetails,
    updateMarks: updateMarks,
   
}
