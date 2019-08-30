import React from 'react'

import styled from 'styled-components'

const FilterLink = ({ onFilter, filterType, label }) => {
  const onClick = () => {
    onFilter(filterType)
  }

  return <Button onClick={onClick}>{label}</Button>
}

const Button = styled.button`
  color: blue;
  border: none;
  border-radius: 3px;
  font-size: 24px;
  height: 40px;
  width: 150px;
  display: inline-block;
  margin-bottom: 16px;
  margin-left: 10px;
`

export default FilterLink
