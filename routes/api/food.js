const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Food = require('../../models/Food');


// @route   POST api/food
// @desc    Create food
// @access  Public

router.post('/', [
    check('FoodName', 'FoodName is required')
        .not()
        .isEmpty(),
    check('Recipe', 'Recipe is required')
        .not()
        .isEmpty()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { FoodName, Recipe, ServingSize, UnitMeasurement, Protein, Carbs, Fat, Fibre, Sodium, Sugar, Calories, TotalCarbohydrates, SaturatedFat, Cholesterol, VitaminA, VitaminC, Calcium, Iron, MonosaturatedFat, Image } = req.body;

        const foodFields = {};
        if (FoodName) foodFields.FoodName = FoodName;
        if (Recipe) foodFields.Recipe = Recipe;
        if (ServingSize) foodFields.ServingSize = ServingSize;
        if (UnitMeasurement) foodFields.UnitMeasurement = UnitMeasurement;
        if (Protein) foodFields.Protein = Protein;
        if (Carbs) foodFields.Carbs = Carbs;
        if (Fat) foodFields.Fat = Fat;
        if (Fibre) foodFields.Fibre = Fibre;
        if (Sodium) foodFields.Sodium = Sodium;
        if (Sugar) foodFields.Sugar = Sugar;
        if (Calories) foodFields.Calories = Calories;
        if (TotalCarbohydrates) foodFields.TotalCarbohydrates = TotalCarbohydrates;
        if (SaturatedFat) foodFields.SaturatedFat = SaturatedFat;
        if (Cholesterol) foodFields.Cholesterol = Cholesterol;
        if (VitaminA) foodFields.VitaminA = VitaminA;
        if (VitaminC) foodFields.VitaminC = VitaminC;
        if (Calcium) foodFields.Calcium = Calcium;
        if (Iron) foodFields.Iron = Iron;
        if (MonosaturatedFat) foodFields.MonosaturatedFat = MonosaturatedFat;
        if (Image) foodFields.Image = Image;

        // See if recipe exists

        try {
            let food = await Food.findOne({ FoodName });

            if (food) {

                food = await Food.findOneAndUpdate(
                    { FoodName: FoodName },
                    { $set: foodFields },
                    { new: true },
                );

                return res.json("Food Successfully updated");
            }

            //Create
            food = new Food(foodFields);

            await food.save();

            res.json("New Food added");

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   Get api/foods
// @desc    Get all foods
// @access  Public

router.get('/', async (req, res) => {
    try {
        const foods = await Food.find().sort({ date: -1 });
        res.json(foods);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   Get api/foods/:id
// @desc    Get food by id
// @access  Public

router.get('/:id', async (req, res) => {
    try {
        //const id = req.params.id;

        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({ msg: 'Food not found' });

        }
        res.json(food);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Food not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/food/:food
// @desc    Delete a food
// @access  Public

router.delete('/:id', async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({ msg: 'Food not found' });
        }

        await food.remove();

        res.json({ msg: 'food deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;