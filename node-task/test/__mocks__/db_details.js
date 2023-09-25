

const Marks ={
    findAll : jest.fn(async()=>{
        return  {
             id:1,
             first_name:"jhon",
             last_name:'doe',
             email_id:"something@gmail.com"
        }
    }),
    update:jest.fn(),
    create:jest.fn(),
   }

const studentDetails ={
    findAll:jest.fn(),
    findOne:jest.fn(),
    create:jest.fn(),
    destroy:jest.fn(),
}

module.exports={
    Marks,
    studentDetails,
}