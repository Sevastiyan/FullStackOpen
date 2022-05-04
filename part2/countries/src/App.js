import axios from 'axios';
import { useState, useEffect } from 'react';

const Countries = ({ countries }) => {
  return (
    <table>
      {countries.map((country) => (
        <Country country={country} />
      ))}
    </table>
  );
};

const Country = ({ country }) => {
  const [show, setShow] = useState(false)

  const showProfile = () => { 
    return !show ? (<div></div>) : (<Profile country={country}/>)
  }

  return (
    <tbody>
      <tr>
        <td>{country.name.official}</td>
        <td>
          <button onClick={() => setShow(!show)}>Show More</button>
        </td>
        <td>{showProfile()}</td>
      </tr>
    </tbody>
  );
};

const Profile = ({ country }) => {
  const languages = Object.entries(country.languages);
  const capital = country.capital[0];
  const [temp, setTemp] = useState({})

  const lat = country.capitalInfo.latlng[0];
  const lng = country.capitalInfo.latlng[1];
  
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=d887940e06ad49637537c9d70e81c445`
      )
      .then((response) => {
        setTemp(response.data.main.temp);
      });
  }, [])
  
  return (
    <div>
      <h1>{country.name.official}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <br />
      <p>Languages: </p>
      <ul>
        {languages.map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt='new' />
      <h2>Weather in {capital}</h2>
      <p>Temperature: {(temp - 273.15)}</p>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchWord, setSearch] = useState('');
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      const data = response.data;
      console.log('data size: ', data[0]);
      setCountries(data);
    });
  }, []);

  const searchHandler = (event) => {
    const text = event.target.value;
    console.log(text);
    setSearch(text);

    const copy = countries.filter((country) => country.name.official.toLowerCase().includes(text));
    setFilter(copy);
  };

  const showCountries = () => {
    if (filter.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (filter.length === 1) {
      const country = filter[0];
      return <Profile country={country} />;
    } else {
      return (
        <div>
          <Countries countries={filter} />
        </div>
      );
    }
  };

  return (
    <div>
      <title>Countries</title>
      <h1>Countries</h1>

      <form>
        <input value={searchWord} onChange={searchHandler} />
      </form>
      {showCountries()}
    </div>
  );
};

export default App;
