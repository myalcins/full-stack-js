const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const todoRouter = require('./routes/todo.router')

const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.use('/api', todoRouter);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

