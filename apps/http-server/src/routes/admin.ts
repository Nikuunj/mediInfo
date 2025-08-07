import { Request, Response, Router } from "express";
import { prisma } from '@medi/db/client';
import { SignInUserSchema } from '@medi/common/types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { jwt_secret } from "../config/config";

export const admin: Router = Router();

admin.post('/signin', async (req: Request, res: Response) => {
    const verify = SignInUserSchema.safeParse(req.body);
    if(!verify.success) {
        res.status(422).json({
            massege: 'plz pass valid input'
        })
        return
    }

    try {
        const user = await prisma.admin.findFirst({
            where: {
                email: verify.data.email
            }
        })

        
        if(!user) {
            res.status(404).json({
                massege: 'user not found'
            })
            return;
        }

        const match = bcrypt.compareSync(verify.data.password, user.password);

        if(!match) {
            res.status(403).json({
                massege: 'Not Authorized'
            })
            return;
        }

        const token = jwt.sign({
            userId : user.id
        }, jwt_secret);

        res.json({
            token : `Bearer ${token}`
        })
    } catch(e) {
        res.status(500).json({
            massege: 'somthing broke'
        })
    }
})