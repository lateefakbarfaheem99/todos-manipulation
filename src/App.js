import React from 'react'
import { Provider, Subscribe } from 'unstated'

import styled from 'styled-components'

import TodosContainer, { VisibilityFilters } from './store'

import GroupList from './components/GroupList'
import AddGroup from './components/AddGroup'
import FilterLink from './components/FilterLink'

function App() {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[TodosContainer]}>
          {groups => {
            const groupList = groups.getGroups()
            return (
              <GroupsWrapper>
                <FiltersWrapper>
                  <FilterLink
                    onFilter={groups.setFilter}
                    filterType={VisibilityFilters.SHOW_ALL}
                    label="All"
                  ></FilterLink>
                  <FilterLink
                    onFilter={groups.setFilter}
                    filterType={VisibilityFilters.SHOW_ACTIVE}
                    label="Active"
                  ></FilterLink>
                  <FilterLink
                    onFilter={groups.setFilter}
                    filterType={VisibilityFilters.SHOW_COMPLETED}
                    label="Completed"
                  ></FilterLink>
                </FiltersWrapper>
                <AddGroup onAddGroup={groups.createGroup} />
                <GroupList groupItems={groupList} />
              </GroupsWrapper>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`

const GroupsWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

const FiltersWrapper = styled.div`
  display: flex;
`

export default App
