import React from 'react'

import styled from 'styled-components'
import { Subscribe } from 'unstated'
import TodosContainer, { VisibilityFilters } from '../store'
import TodoItem from './TodoItem'

const TodoList = ({ group, toggleComplete }) => (
  <Wrapper>
    <Subscribe to={[TodosContainer]}>
      {todosStore => {
        let filteredTodos = []
        switch (todosStore.state.filter) {
          case VisibilityFilters.SHOW_ACTIVE:
            filteredTodos = group.todos.filter(todo => todo.completed === false)
            break
          case VisibilityFilters.SHOW_COMPLETED:
            filteredTodos = group.todos.filter(todo => todo.completed === true)
            break
          case VisibilityFilters.SHOW_ALL:
            filteredTodos = group.todos
            break
          default:
            filteredTodos = group.todos
        }
        return filteredTodos.map(item => {
          const onComplete = e => {
            toggleComplete(group.id, item.id)
          }

          return <TodoItem key={item.id} {...item} onComplete={onComplete} />
        })
      }}
    </Subscribe>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default TodoList
