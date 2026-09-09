const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let items = [
    
];

//Get endpoint to retrieve all items
app.get('/items', (req, res) => {
    res.json(items);
});

// Get endpoint to retrieve a single item by ID
app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(i => i.id === id);

    if (!item){
        res.status(404).json({ message: 'Item not found' });
    }
    
    res.json(item);
});

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});