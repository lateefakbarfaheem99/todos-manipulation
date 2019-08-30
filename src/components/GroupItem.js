import React from 'react'

import styled from 'styled-components'
import { Container, Subscribe } from 'unstated'

import TodosContainer from '../store'

import TodoList from './TodoList'
import AddTodo from './AddTodo'

class GroupItemContainer extends Container {
  constructor(props) {
    super(props)
    this.state = { collapsed: false }
  }
  toggleCollapsed = async () => {
    await this.setState(state => {
      return { collapsed: !state.collapsed }
    })
  }
}

const GroupItem = ({ group }) => (
  <Wrapper>
    <Subscribe to={[TodosContainer, new GroupItemContainer()]}>
      {(todos, groupItemState) => {
        return (
          <div>
            <Text onClick={groupItemState.toggleCollapsed}>{group.name}</Text>
            <AddTodo onAddTodo={todos.createTodo} groupId={group.id} />
            {!groupItemState.state.collapsed && (
              <TodoList group={group} toggleComplete={todos.toggleComplete} />
            )}
          </div>
        )
      }}
    </Subscribe>
  </Wrapper>
)

const Wrapper = styled.div`
  font-size: 24px;
  color: yellow;
  cursor: pointer;
`

const Text = styled.span`
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
`

export default GroupItem
