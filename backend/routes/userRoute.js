const express = require('express')
const {createUser,loginUser,logoutUser,forgotPassword,resetPassword,getUserDetails,changePassword,updateProfile,getAllUser,getSingleUser,userUpdateProfileByAdmin,userDeleteByAdmin,uploadProfilePicture} = require('../controllers/userController')
const {isAuthenticatedUser,isAuthorizedRole} = require('../extra')
const router = express.Router()
const multer = require('multer')
const cors = require('cors')
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        return cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
router.route('/admin/all').get(isAuthenticatedUser,isAuthorizedRole('admin'),getAllUser)
router.route('/admin/:id').get(isAuthenticatedUser,isAuthorizedRole('admin'),getSingleUser)
router.route('/new').post(createUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/details',(req)=>{console.log(req.cookies,'hello')}).get(isAuthenticatedUser,getUserDetails)
router.route('/password/change').put(isAuthenticatedUser,changePassword)
router.route('/profile/update').put(isAuthenticatedUser,updateProfile)
router.route('/admin/profile/update/:id').put(isAuthenticatedUser,isAuthorizedRole('admin'),userUpdateProfileByAdmin)
router.route('/admin/profile/delete/:id').delete(isAuthenticatedUser,isAuthorizedRole('admin'),userDeleteByAdmin)
router.route('/profile/upload').post(isAuthenticatedUser,upload.single('image'),uploadProfilePicture)
module.exports = router
