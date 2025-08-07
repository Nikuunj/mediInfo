import { Router } from "express";
import { middleware } from "../middleware/middleware";

export const itemRoute: Router = Router();

itemRoute.get('/', async (req, res) => {

})

itemRoute.delete('/', middleware, async (req, res) => {
    
})

itemRoute.post('/', middleware, async (req, res) => {
    
})

itemRoute.put('/', middleware, async (req, res) => {
    
})
