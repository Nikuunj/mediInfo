import { Router } from "express";
import { middleware } from "../middleware/middleware";

export const admin: Router = Router();



admin.post('/signin', middleware, async (req, res) => {
    
})

admin.post('/signup', middleware, async (req, res) => {
    
})