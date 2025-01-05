const express = require('express');
const { createTodo, getTodos } = require('../controllers/todoController');
const Todo = require('../models/Todo');
const router = express.Router();

router.post('/', createTodo);
router.get('/', getTodos);
// ✅ Update Todo Route
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo updated successfully", todo: updatedTodo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found. Check the ID." });
        }

        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;