import express from 'express';
import db from '../config/db.js';
const router = express.Router();


router.get('/', async (req, res)=>{
    try {
        const [result] = await db.query(`SELECT * FROM ugyfelek`);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error."});
    }
});

router.get('/:customerId/tickets', async (req, res)=>{
    try {
        const {customerId} = req.params;
        const [result] = await db.query(`SELECT * FROM ugyfelek WHERE ugyfel_id = ? `, [customerId]);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error."});
    }
});

router.get('/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const [result] = await db.query(`SELECT * FROM ugyfelek WHERE id = ?`, [id]);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error."})
    }
});

router.post('/', async (req, res)=>{
    try {
        const {nev, email, telefonszam, ceg_neve, regisztracio_datuma, statusz} = req.body;
        const [res] = await db.query(`INSERT INTO ugyfelek (nev, email, telefonszam, ceg_neve, regisztracio_datuma, statusz) VALUES (?,?,?,?,?,?,?)`);
        res.status(201).json({message: "Succesful insert."})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error."})
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const [result] = await db.query(`DELETE FROM ugyfelek WHERE id = ?`, [id]);
        res.status(200).json({message: "Succesful delete."});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error."})
    }
})

export default router;