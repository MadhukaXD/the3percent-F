const mongoose = require('mongoose');
const UserFoodSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    MacroNutrients: [
        {
            Clienttotaldailycalorietarget : {
                type: String,
                required: true,
            },
            Protein: {
                type: String,
                required: true,
            },
            Carbs: {
                type: String,
                required: true,
            },
            Fat: {
                type: String,
                required: true,
            },
            Fibre: {
                type: String,
                required: true,
            },
            Sodium: {
                type: String,
                required: true,
            },
            Sugar: {
                type: String,
                required: true,
            }
        }
    ]
},
{
    timestamps: true
}

);

module.exports = UserFood = mongoose.model('userfood', UserFoodSchema);