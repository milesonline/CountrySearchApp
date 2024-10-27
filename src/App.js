import React, {useEffect, useState} from 'react'
//axios to handle http requests between front end and backend
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Country from './components/Country';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  //use effect hook to fetch list of of countries from backend when the component mounts
  useEffect(() => {
    //fetch countries from backend
    axios.get('http://localhost:3000/api/countries')
    .then(response => {
      setCountries(response.data);
      setFilteredCountries(response.data);
    })
    .catch(error => console.error(error));
  }, []);
  
  //Search bar functionality that filters list of countries based on a given earch term
  const handleSearch = searchTerm => {
    if (searchTerm){
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  };
  //map to render list of countries
  return (
    <div>
      <h1 className='my-header'>Find Your Country!</h1>
      <SearchBar handleSearch={handleSearch} />
      <div className="country-list">
        {filteredCountries.map(country => (
          <Country
          key={country.code} 
          name={country.name}
          capital={country.capital}
          population={country.population}
          flag={country.flag}
          />
        ))}
      </div>
    </div>
  );
};

export default App;