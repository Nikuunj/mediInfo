import { Router } from "express";
import { middleware } from "../middleware/middleware";
import { prisma } from "@medi/db/client";
import { ItemSchema } from "@medi/common/types";

export const itemRoute: Router = Router();

itemRoute.get('/', async (req, res) => {
    try {
        const items = await prisma.items.findMany({})

        res.json({
            items
        })
    } catch(e) {
        res.status(500).json({
            msg: 'somting went wrong'
        })
    }
})

itemRoute.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) {
            res.status(401).json({
                msg: 'id not fond'
            })
            return;
        }
        const item = await prisma.items.findFirst({
            where: {
                id
            }
        })
        res.json({
            item
        })
    } catch (e) {
        res.status(404).json({
            msg: 'item not fond with this item id'
        })
    }
})

itemRoute.post('/', middleware, async (req, res) => {
    const verify = ItemSchema.safeParse(req.body);
    if(!verify.success) {
        res.status(422).json({
            massege: 'plz pass valid input'
        })
        return
    }

    try {
        await prisma.items.create({
            data: verify.data
        })

        res.json({
            msg: 'item added'
        })
    }catch(e) {
        res.status(500).json({
            msg: 'somthing worg'
        })
    }
})

itemRoute.put('/:id', middleware, async (req, res) => {
    const id = req.params.id;

    if(!id) {
        res.status(401).json({
            msg: 'id not fond'
        })
        return;
    }

    const verify = ItemSchema.safeParse(req.body);
    if(!verify.success) {
        res.status(422).json({
            massege: 'plz pass valid input'
        })
        return
    }
    try {
        await prisma.items.update({
            where: {
                id
            },
            data: verify.data
        })

        res.json({
            msg: 'item updated'
        })
    } catch(e) {
        res.status(404).json({
            msg: 'fail to update item'
        })
    }
})

itemRoute.delete('/:id', middleware, async (req, res) => {
    const id = req.params.id;

    if(!id) {
        res.status(401).json({
            msg: 'id not fond'
        })
        return;
    }

    try {
        await prisma.items.delete({
            where: {
                id
            }
        })

        res.json({
            msg: 'item deleted'
        })
    } catch(e) {
        res.status(404).json({
            msg: 'item already deleted'
        })
    }
})