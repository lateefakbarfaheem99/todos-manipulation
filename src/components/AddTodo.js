import React from 'react'

import styled from 'styled-components'

const AddTodo = ({ onAddTodo, groupId }) => {
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      if (e.target.value === '') return
      onAddTodo(groupId, e.target.value)
    }
  }

  return (
    <Input
      type="text"
      onKeyPress={handleKeyPress}
      placeholder="Add new todo..."
    />
  )
}

const Input = styled.input`
  background: #3b4049;
  color: #fff;
  border: none;
  border-radius: 3px;
  margin-top: 10px;
  padding: 5px 18px;
  font-size: 14px;
  height: 25px;
  width: 500px;
  margin-bottom: 16px;

  &::placeholder {
    color: #8d96a8;
  }
`

export default AddTodo
