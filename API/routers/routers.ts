import express, { Request, Response } from "express";
import { Database } from "sqlite3";

const router = express.Router();
const db: Database = require("../database/dbConnection");
interface Todo {
  id?: number;
  title: string;
  completed: boolean;
}

router.post("/newtask", (req: Request, res: Response) => {
  const { title }: { title: string } = req.body;

  db.run(
    `INSERT INTO todos (title, completed) VALUES (?, ?)`,
    [title, false],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, title, completed: false });
    }
  );
});

router.get("/alltask", (req: Request, res: Response) => {
  db.all(`SELECT * FROM todos`, [], (err, rows: Todo[]) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.put("/updatetask/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed }: Todo = req.body;

  db.run(
    `UPDATE todos SET title = ?, completed = ? WHERE id = ?`,
    [title, completed, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Tarefa atualizada com sucesso" });
    }
  );
});

router.delete("/deletetask/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  db.run(`DELETE FROM todos WHERE id = ?`, id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Tarefa deletada com sucesso" });
  });
});

export default router;