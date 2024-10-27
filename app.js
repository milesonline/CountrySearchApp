

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Country = require('./models/countryModel');
const PORT = 3000;
const axios = require('axios');
const cors = require('cors');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//CROSS ORIGIN RESOURCE SHARING to allow requests from front end
app.use(cors({
    origin: 'http://localhost:3001',
}));


//Database configuraion
const uri = `mongodb+srv://sam:rubiks@challenge.5em4bpg.mongodb.net/test?retryWrites=true&w=majority`;

//Route, API that returns the countries from the database
app.get('/api/countries', async (req, res) =>{
     try {
        const countries = await Country.find();
        res.json(countries);
     } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).send('Internal Server Error');
     }
});

//function to fetch country data and save to mongodb database
//using the restcountries API available online
async function addCountries(){
    try{
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data;



        for(const country of countries){
            const existingCountry = await Country.findOne({ code: country.cca3 });
         //checks if the country already exists in database to avoid duplicates
            if(!existingCountry){
            const newCountry = new Country({
                name:country.name.common,
                population:country.population,
                code: country.cca3,
                flag: country.flags.svg,
                capital: country.capital && country.capital[0],
            });
        
            await newCountry.save();  

        }
        }

        console.group('Countries added successfully!');
    } catch (error){
        console.error('Error adding countries:', error);
    }
}

addCountries();




    mongoose.
connect(uri).
then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`We listening out here on http://localhost:${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})

