import express from 'express';
import db from '../config/db.js';
const router = express.Router();

router.get('/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const [result] = await db.query(`SELECT * FROM hibajegyek WHERE id = ?`, [id]);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error."})
    }
});

router.put('/:id', async (req, res)=>{
    try {
        const {statusz, hozzarendelt_felelos, id} = req.body;
        const [res] = await db.query(`UPDATE hibajegyek SET 'statusz' = ?, 'hozzarendelt_felelos' = ? WHERE id  ?` [statusz, hozzarendelt_felelos, id]);
        res.status(201).json({message: "Succesful insert."})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error."})
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const [result] = await db.query(`DELETE FROM hibajegyek WHERE id = ?`, [id]);
        res.status(200).json({message: "Succesful delete."});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error."})
    }
})

export default router;