const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const UserFood = require('../../models/UserFood');


// @route   GET api/profile/me
// @desc    Get current users profile
// @access  private

router.get('/me', async (req, res) => {
    try {
        const userfood = await UserFood.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);

        if (!userfood) {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }

        res.json(userfood);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/userfood
// @desc    Create or update userfood
// @access  private
router.post('/', [
    check('MacroNutrients', 'MacroNutrients is required')
        .not()
        .isEmpty()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            MacroNutrients
        } = req.body;

        const userfoodFields = {};
        userfoodFields.user = req.user.id;

        if (MacroNutrients) userfoodFields.MacroNutrients = MacroNutrients;



        try {
            let userfood = await UserFood.findOne({ user: req.user.id });

            if (userfood) {
                //Update 
                userfood = await UserFood.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: userfoodFields },
                    { new: true }
                );

                return res.json(userfood);
            }

            // Create
            userfood = new UserFood(userfoodFields);

            await userfood.save();
            res.json(userfood);


        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    });


module.exports = router;