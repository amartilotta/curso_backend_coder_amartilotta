import usersService from "../services/users.service.js"
import { errorMessages, successMessages, statusMessages } from "../utils/responses.js"
import customError from "../utils/customError.js"
import { logger } from "../utils/winston.js"


class UsersController{
    async getRestorePasswordMail(req, res, next) {
        try {
            const userId = req.params.uid
            usersService.sendRestorePasswordMail(userId)
            return res.status(200).json({message:successMessages.MAIL_SENT, status:statusMessages.SUCCESS})
        } catch (error) {
            next(error)
        }     
    }

    async getUsersPublicData(req, res, next) {
        try {
            const users = await usersService.getUsersPublicData()
            return res.status(200).json({users:users, message:successMessages.FOUNDED, status:statusMessages.SUCCESS})
        } catch (error) {
            next(error)
        }     
    }

    async restorePassword(req, res, next) {
        try {
            const userId = req.params.uid
            const newPassword = req.body.newPassword
            const success = await usersService.restorePassword(userId, newPassword)
            if (!success){
                customError.throw(errorMessages.SAME_PASSWORD_ERROR, 400)
            }
            return res.status(200).json({message:successMessages.UPDATED, status:statusMessages.SUCCESS})
        } catch (error) {
            next(error)
        }     
    }

    async deleteInactiveUsers(req, res, next) {
        try {
            const users = await usersService.deleteInactiveUsers()
            return res.status(200).json({users:users, message:successMessages.FOUNDED, status:statusMessages.SUCCESS})
        } catch (error) {
            next(error)
        }     
    }

    async uploadDocument(req, res, next) {
        try {
            await usersService.appendDocument(
                req.params.uid, 
                {
                    name: req.file.filename,
                    type: req.body.file_type === "document" ? req.body.document_type  : req.body.file_type,
                    reference: `/uploads/${req.body.file_type}/${req.file.filename}`
                }
            )

            return res.status(200).json({message:successMessages.UPLOADED, status:statusMessages.SUCCESS})
        } catch (error) {
            next(error)
        }     
    }

    async togglePremiumRole(req, res, next) {
        try {
            const userId = req.params.uid
            const success = await usersService.togglePremiumRole(userId)
            if (success){
                return res.status(200).json({message:successMessages.UPDATED, status:statusMessages.SUCCESS})
            }
            else {
                return res.status(403).json({message:errorMessages.NOT_UPDATED, status:statusMessages.ERROR})
            }
        } catch (error) {
            next(error)
        }     
    }

}

const usersController = new UsersController()
export default usersController
