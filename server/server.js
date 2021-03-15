const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const joi = require('joi');
const monk = require('monk');

const db = monk('localhost/todo-db');
const todos = db.get('todos');

const app = express();
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.get('/', (request, response) => {
    response.json({
        "message": "hello world",
    });
});

app.get('/todos', async (req, res) => {
    try {
        const result = await todos.find({});
        res.json(result.reverse());
    } catch (error) {
        res.status(500);
        res.json({
            message: "DB Error!",
        });
    }
});

const todoSchema = joi.object({
    name: joi.string().required().max(30),
    description: joi.string().required().max(150)
});

app.post('/to-do', async (req, res) => {
    try {
        const todo = await todoSchema.validateAsync(req.body);
        todo.created_date = new Date();
        const createTodo = await todos.insert(todo);
        res.json(createTodo);
    } catch (error) {
        res.status(400);
        res.json({
            message: "Invalid to-do",
        });
    }
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

