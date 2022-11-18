import { useState } from 'react'

const useField = (type, id) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    id: id,
    type,
    placeholder: id,
    value,
    onChange,
    setValue
  }
}

export default useField
