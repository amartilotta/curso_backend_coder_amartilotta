import {Router} from 'express'
import {messagesManagerDB} from '../dao/db/managersDB/messagesManagerDB.js'

const router = Router();

router.post('/', async(req,res) =>{
    const {user,message} = req.body;
    if(!user || !message){
        return res.status(400).json({message: "All data is required"})
    }
    try{
        const savedMessage = await messagesManagerDB.saveMessage(req.body)
        res.status(200).json({message: "Message saved"})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});




export default router