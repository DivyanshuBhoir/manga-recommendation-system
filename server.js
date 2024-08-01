const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Get recommendations
app.get('/recommendations', (req, res) => {
    fs.readFile('recommendations.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }
        res.json(JSON.parse(data));
    });
});

// Post a new recommendation
app.post('/recommendations', (req, res) => {
    const newRecommendation = req.body;
    fs.readFile('recommendations.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }
        const recommendations = JSON.parse(data);
        recommendations.push(newRecommendation);
        fs.writeFile('recommendations.json', JSON.stringify(recommendations), (err) => {
            if (err) {
                return res.status(500).send('Error saving recommendation.');
            }
            res.status(201).send('Recommendation added.');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
