import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { tokenModel } from "../models/models.js";
dotenv.config();

class TokenService {
    generateToken(payload) {
        const accesToken = jwt.sign(payload, process.env.ACCESTOKEN_SECRET_KEY, { expiresIn: "15h" });
        const refreshToken = jwt.sign(payload, process.env.REFRESHTOKEN_SECRET_KEY, { expiresIn: "30d" });
        return {
            accesToken,
            refreshToken
        }
    }
    async saveToken(refreshToken,userId) {
        const tokenData = await tokenModel.findOne({where:{userId}});
        if(tokenData){
            tokenData.refreshToken= refreshToken;
            return tokenData.save();
        };
        const token = await tokenModel.create({refreshToken,userId})
        return token;
        
    }
}
export const tokenService = new TokenService()