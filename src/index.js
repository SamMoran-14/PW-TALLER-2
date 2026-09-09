const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let items = [
    { id: 1, name: 'Alfre' }, //Obj json
    { id: 2, name: 'Bob' }, //Obj json
    { id: 3, name: 'Charlie' }  //Obj json 
];