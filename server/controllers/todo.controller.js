const todoService = require('../service/todo.service');


const todoPost = async (req, res, next) => {
    try {
        const createdTodo = await todoService.createTodo(req.body);
        res.status(201);
        res.json(createdTodo);
    } catch (error) {
        res.status(400);
        res.json({
            message: "Invalid to-do",
        });
        next(error);
    }
}

const todoGet = async (req, res, next) => {
    try {
        if(!req.params.id){
            const todos = await todoService.listTodo();
            res.status(200);
            res.json(todos);
            next();
        }else{
            const todo = await todoService.getTodo(req.params.id);
            res.status(200);
            res.json(todo);
            next();
        }
    } catch (error) {
        res.status(404);
        res.json({
            message: "Bad request",
        });
        next(error);
    }
}

const todoUpdate = async (req, res, next) => {
    try {
        const todo = await todoService.updateTodo(req.params.id ,req.body);
        res.status(200);
        res.json(todo);
        next();
    } catch (error) {
        res.status(404);
        res.json({
            message: "Bad request",
        });
        next(error);
    }
}

const todoDelete = async (req, res, next) => {
    try {
        const todo = await todoService.deleteTodo(req.params.id);
        res.status(204);
        res.json({
            message: "No Content.",
        });
        next();
    } catch (error) {
        res.status(404);
        res.json({
            message: "Bad request",
        });
        next(error);
    }
}

module.exports = {
    todoPost,
    todoDelete,
    todoUpdate,
    todoGet
}