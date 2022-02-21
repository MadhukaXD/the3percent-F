const express = require('express');
const router = express.Router();
const got = require('got');
const { pipeline } = require('stream');
const axios = require('axios');

router.get('/', async (req, res) => {
    const dataStream = got.stream({
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/menuItems/search',
        qs: {
            x_rapidapi_key: '01d65dc629msh086d1cf5a8b8f46p141bf4jsnf7f136618536',
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




var axios = require("axios").default;
const express = require('express');
const router = express.Router();

var options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
    headers: {
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        'x-rapidapi-key': '01d65dc629msh086d1cf5a8b8f46p141bf4jsnf7f136618536'
    }
};
                
axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});

module.exports = router;











