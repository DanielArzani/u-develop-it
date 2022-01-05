const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


// GET all candidates
router.get('/candidates', (req, res)=>{
    const sql = `SELECT candidates.*, parties.name 
             AS party_name 
             FROM candidates 
             LEFT JOIN parties 
             ON candidates.party_id = parties.id`;

    db.query(sql, (err,rows)=>{
        if(err) {
            res.status(500).json({error: err.message});
            // Gaurd clause
            return;
        }else {res.json({
            message: "Success",
            data: rows
        })}
    });
});

// GET a single candidate
router.get('/candidates/:id', (req,res)=>{
    const sql = `SELECT candidates.*, parties.name 
             AS party_name 
             FROM candidates 
             LEFT JOIN parties 
             ON candidates.party_id = parties.id 
             WHERE candidates.id = ?`;
    // Set placeholder to do :id
    const params = [req.params.id];

    db.query(sql, params, (err,row)=>{
        if(err) {
            res.status(400).json({  error: err.message });
        }else {
            res.json({
                message: "Success",
                data: row
            });
        }
    });
});

// DELETE a single candidate
router.delete('/candidates/:id', (req,res)=>{
    const sql = 'DELETE FROM candidates WHERE id = ?'
    const params = [req.params.id];

    db.query(sql, params, (err, result)=>{
        if (err) {
            res.statusMessage(400).json({error: err.message});
        }else if (!result.affectedRows) {
            res.json({
                message: "Candidate not found"
            });
        }else {
            res.json({
                message: "Deleted",
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// POST(Create) a candidate
router.post('/candidates', ({ body }, res) => {
    // Verify data
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    // Don't need id since it is automatically generated
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
    if (err) {
        res.status(400).json({ error: err.message });
        return;
    }
    res.json({
        message: 'success',
        data: body
    });
    });
});

// Update a candidate's party
router.put('/candidates/:id', (req, res) => {
    // Candidate is allowed to not have party affiliation
    const errors = inputCheck(req.body, 'party_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    
    const sql = `UPDATE candidates SET party_id = ? WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
        } else if (!result.affectedRows) {
        res.json({
            message: 'Candidate not found'
        });
        } else {
        res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
        });
        }
    });
    });


module.exports = router;