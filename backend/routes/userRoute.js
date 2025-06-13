import express from "express"
import { loginUser, registerUser, adminLogin, getUserProfile, forgotPassword, resetPassword } from "../controllers/userController.js"
import authUser from "../middleware/auth.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/admin", adminLogin)

// Nouvelle route pour récupérer le profil utilisateur connecté
userRouter.get("/me", authUser, getUserProfile)

userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

export default userRouter