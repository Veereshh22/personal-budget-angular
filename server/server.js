const express = require('express');
const Cors = require('cors')
const app = express();

const fs = require('fs');
const path = require('path');
const port = 3000;

app.use(Cors());

app.get('/budget', (req, res) =>{
    
    fs.readFile('./mybudget.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading mybudget.json:', err);
            return res.status(404).send('myBudget file are not found');
        }
        const myBudget = JSON.parse(data);
        res.json(myBudget);
    })
});


app.get('/hello', (req, res) =>{
    res.send('Hello World!');
});

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
});