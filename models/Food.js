const mongoose = require('mongoose');
const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});

const FoodSchema = new mongoose.Schema({
    FoodName: {
        type: String,
        required: true,
        unique: true
    },
    Recipe: {
        type: String,
        required: true
    },

    ServingSize: {
        type: Number,
        required: true
    },

    UnitMeasurement: {
        type: String,
        required: true
    },
    Protein: {
        type: String,
        required: false,
    },
    Carbs: {
        type: String,
        required: false,
    },
    Fat: {
        type: String,
        required: false,
    },
    Fibre: {
        type: String,
        required: false,
    },
    Sodium: {
        type: String,
        required: false,
    },
    Sugar: {
        type: String,
        required: false,
    },
    Calories: {
        type: String,
        required: false,
    },
    TotalCarbohydrates: {
        type: String,
        required: false,
    },
    SaturatedFat: {
        type: String,
        required: false,
    },
    Cholesterol: {
        type: String,
        required: false,
    },
    VitaminA: {
        type: String,
        required: false,
    },
    VitaminC: {
        type: String,
        required: false,
    },
    Calcium: {
        type: String,
        required: false,
    },
    Iron: {
        type: String,
        required: false,
    },
    MonosaturatedFat: {
        type: String,
        required: false,
    },
    Image: {
        type: String,
        required: false,
    },
    Date: {
        type: Date,
        default: Date.now(),
    },
},
    {
        timestamps: true
    }
);

module.exports = Food = mongoose.model('food', FoodSchema);