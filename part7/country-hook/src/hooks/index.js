import { useState, useEffect } from 'react'
import axios from 'axios'
 
export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      const data = response.data
      console.log('data size: ', data[0])
      setCountry(data)
    })
  }, [])

  return country
}
