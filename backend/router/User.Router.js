const express = require("express")
const User = require('../model/User.Model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express()
//////////////////////////////////////////////////////////////////////////////////
router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body
        const emailExist = await User.findOne({ email: email })
        if (!emailExist) {
            const passwordHash =await bcrypt.hash(password, 10);
            const _obj = { name, email, phone, password: passwordHash }
            const userSave = await User.create(_obj)
            if(userSave){
                res.status(200).send({data:null,message:"Registration completed successfully"})
            }else{
                res.status(403).status({data:null, message:"Failed registration, Please try after sometimes"})
            }
        } else {
            res.status(409).send({ data: null, message: "email already exist" })
        }
    } catch (error) {
        res.status(500).send({ data: null, message: "internal server down" })
    }
})
//////////////////////////////////////////////////////////////////////////////////
router.post("/login",async(req,res)=>{
    try {
        console.log("working");
        const { email, password } = req.body
        const userData = await User.findOne({email:email})
        console.log(userData)
        if(userData && await bcrypt.compare(password,userData.password)){
            const token = generatetoken(userData)
            res.status(200).send({data:token,message:"Login success...."})
        }else{
            res.status(404).send({data:null,message:"invalid username or password"})
        }
    } catch (error) {
        res.status(500).send({ data: null, message: "internal server down" })
    }
})
const generatetoken = (userData) =>{
 const token = jwt.sign({id:userData.id,email:userData.email},process.env.JWTSECRET,{expiresIn:'30d'})
 return token
}
//////////////////////////////////////////////////////////////////////////////////

module.exports = router