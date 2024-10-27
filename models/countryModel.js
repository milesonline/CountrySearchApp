const mongoose = require('mongoose');
const internal = require('stream');
//Data Schema for the way data is formatted within mongodb database
const countrySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your country name"]
    },

    population: {
        type: Number,
        required: [true, "Please enter the population size of the country"]
    },

    code:{
        type:String,
        required: true,
        unique: true
    },
    flag: {
        type:String,
    },
    capital: {
         type:String,
         default: ""
    }
}, {
    timestamps:true,
})
    
    const Country = mongoose.model('Country', countrySchema);

    module.exports = Country;