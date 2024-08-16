import {findIndexById} from './../Common/Helper.js'
const users=[
    {id:1,name:"John",age:25,dob:"20-05-1999"},
    {id:2,name:"Jane",age:30,dob:"20-05-1994"},
    {id:3,name:"Bob",age:35,dob:"20-05-1989"}
]

const getAlluser= (req,res)=>{
        res.status(200).send({
            message:"All users fetched successfully",
            data:users
        }
    )
}

const getUserid= (req,res)=>{

    try{
        const {id}=req.params;
        let index = findIndexById(users,Number(id))
        if(index!==-1){
            res.status(200).send({
                message:"Data fetch successful",
                data:users[index]
            })
            }
            else{
                res.status(400).send({
                    message:"User not found"
                })
            }
    }catch(err){
        res.status(500).send({
            message:"Error fetching user",
            error:err

    })

}
}

const createUser=(req,res)=>{
try{
    
let dob = new Date(req.body.dob)
let today= new Date()
req.body.id = users.length? users[users.length-1].id +1 : 1;
req.body.age = Math.abs(today.getFullYear()-dob.getFullYear())



users.push(req.body)

res.status(201).send({
    message:"User created successfully",
})

}catch(error){
    res.status(500).send({
        message:"Error creating user",
        error:error
        })
}
}

export default {getAlluser,
    getUserid,
    createUser
}