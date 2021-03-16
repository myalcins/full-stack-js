const { todoSchema } = require('../models/validation');
const { todosDb } = require('../models/todo.db');
const ObjectId = require('mongodb').ObjectID;
const { string } = require('joi');


const createTodo = async (todo) => {
    try {
        const created = await todoSchema.validateAsync(todo);
        created.created_date = new Date();
        const createdTodo = await todosDb.insert(created);
        return createdTodo;
    } catch (error) {
        throw new Error(error);
    }
}

const listTodo = async () => {
    try {
        const res = await todosDb.find({});
        return res.reverse();
    } catch (error) {
        throw new Error(error);
    }
}

const getTodo = async (id) =>  {
    try {
        const todo = await todosDb.findOne({_id: id});
        return todo;
    } catch (error) {
        throw new Error(error);
    }
}

const updateTodo = async (id, todo) => {
    try {
        const upTodo = await todoSchema.validateAsync(todo);
        const updated = await todosDb.findOneAndUpdate({_id: id}, {$set: todo});
        return updated;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteTodo = async (id) => {
    try {
        const deletedTodo = await todosDb.findOneAndDelete({_id : id});
        return deletedTodo;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    createTodo,
    listTodo,
    getTodo,
    updateTodo,
    deleteTodo
}