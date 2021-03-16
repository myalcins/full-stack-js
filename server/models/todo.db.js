const monk = require('monk');


const db = monk('localhost/todo-db');

const todosDb = db.get('todos');


module.exports = {
    todosDb
}