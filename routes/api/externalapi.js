const express = require('express');
const router = express.Router();
const got = require('got');
const { pipeline } = require('stream');
const axios = require('axios');

router.get('/', async (req, res) => {
    const dataStream = got.stream({
        url: 'https://api.edamam.com/search?q=chicken&app_id=01d8742f&app_key=9e53540443514fc483049039c942aba6&from=0&to=3&calories=591-722&health=alcohol-free',
        headers: {
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'x-rapidapi-key': '01d65dc629msh086d1cf5a8b8f46p141bf4jsnf7f136618536'
        }
    });
    pipeline(dataStream, res, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
});

module.exports = router;
