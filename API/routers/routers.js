const express = require('express');
const router = express.Router();
const db = require('../database/dbConnection.js');

router.post('/newtask', (req, res) => {
    const { title } = req.body;
    db.run(`INSERT INTO todos (title, completed) VALUES (?, ?)`, [title, false], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, title, completed: false });
    });
  });

  router.get('/alltask', (req, res) => {
    db.all(`SELECT * FROM todos`, [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  router.put('/updatetask/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    db.run(`UPDATE todos SET title = ?, completed = ? WHERE id = ?`, [title, completed, id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Tarefa atualizada com sucesso' });
    });
  });

  router.delete('/deletetask/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM todos WHERE id = ?`, id, function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Tarefa deletada com sucesso' });
    });
  });

  module.exports = router;