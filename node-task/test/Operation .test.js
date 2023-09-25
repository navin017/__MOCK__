const request = require('supertest');
const app = require('../App')
const { getStudents, createDetails, getStudentsById, getGood, getAverage, getExcellence, deleteById } = require('../operation')
const Details = require('../test/__mocks__/db_details')


describe('Student Details Database', () => {
    test("Handling error on /getStudents", () => {
        return getStudents().catch((error) => {
            expect(error).toMatch("Error")
        })
    })

    // test("findOne",async()=>{
    //     Details.findOne = jest.fn().mockReturnValueOnce({
    //         firstname:"bruce"
    //     })
    //     Details.Prototype= jest.fn().mockImplementation(()=>{})
    //     await expect(createDetails({
    //                 firstname: "bruce",
    //                 lname: "wayne",
    //                 marks: {
    //                     tamil: 90,
    //                     english: 0,
    //                     maths: 100
    //                 }
    //             })).rejects.toThrowError()
    // })

    // test('database connectivity',()=>{
    //     return sequelize().catch((error) => {
    //         expect(error).toThrowError("error")
    //     })
    // })

    // test('To test the Catch block for createDetails function', async () => {
    //     await request(app).post('/create').send({
    //         firstname: "bruce",
    //         lname: "wayne",
    //         marks: {
    //             tamil: 90,
    //             english: 0,
    //             maths: 100
    //         }
    //     })
    //     return createDetails().catch((error) => {
    //         expect(error).toMatch("error")
    //     })
    // })

  

    test('To test the Catch block for updateMarks function', async () => {
        await request(app).post('/update-marks').send({
            firstname: "bruce"
        })
        return getStudentsById().catch((error) => {
            expect(error).toMatch("error")
        })
    })

    test('To test the Catch block for deleteById function', async () => {
        await request(app).delete('/deleteById').send({
        })
        return deleteById().catch((error) => {
            expect(error).toMatch("Error")
        })
    })

    test("Handling error on /getGood", () => {
        return getGood().catch((error) => {
            expect(error).toMatch("Error")
        })
    })
      test("Handling error on /exl", () => {
        return getExcellence().catch((error) => {
            expect(error).toMatch("Error")
        })
    })
      test("Handling error on /avg", () => {
        return getAverage().catch((error) => {
            expect(error).toMatch("Error")
        })
    })
     
  })