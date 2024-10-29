const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/tarefas', (req, res) => {
    const { title } = req.body;
    db.run(`INSERT INTO tarefas (title, completed) VALUES (?, ?)`, [title, false], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, title, completed: false });
    });
  });

  router.get('/tarefas', (req, res) => {
    db.all(`SELECT * FROM tarefas`, [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  router.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    db.run(`UPDATE tarefas SET title = ?, completed = ? WHERE id = ?`, [title, completed, id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Tarefa atualizada com sucesso' });
    });
  });

  router.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM tarefas WHERE id = ?`, id, function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Tarefa deletada com sucesso' });
    });
  });

  module.exports = router;