import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const middleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const signM = authHeader?.split(' ')[1];

    if(!signM) {
        res.status(401).json({
            msg: "unautheticated - Token missing or malformed"
        })
        return;
    }
    jwt.verify(signM, "secret", (error, user) => {
        if(user) {
           next(); 
           return;
        } else {
            res.status(403).json({
                msg: "Invalid or expired token"
            })
            return;
        }
    });
}