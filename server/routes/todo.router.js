const express = require('express')
const todoRouter = express.Router()

const todoController = require('../controllers/todo.controller')

todoRouter.post('/todo', todoController.todoPost);
todoRouter.get('/todo', todoController.todoGet);
todoRouter.get('/todo/:id', todoController.todoGet);
todoRouter.put('/todo/:id', todoController.todoUpdate);
todoRouter.delete('/todo/:id', todoController.todoDelete);

module.exports = todoRouter;