import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { jwt_secret } from "../config/config";

export const middleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    const signM = authHeader?.split(' ')[1];

    if(!signM) {
        res.status(401).json({
            msg: "unautheticated - Token missing or malformed"
        })
        return;
    }
    jwt.verify(signM, jwt_secret, (error, user) => {
        if(user) {
           next() 
           return;
        } else {
            res.status(401).json({
                msg: "Invalid or expired token"
            });
            return;
        }
    });
}