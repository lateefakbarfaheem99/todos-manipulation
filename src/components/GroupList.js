import React from 'react'

import styled from 'styled-components'

import GroupItem from './GroupItem'

const GroupList = ({ groupItems }) => (
  <Wrapper>
    {groupItems.map(group => {
      return <GroupItem key={group.id} group={group}></GroupItem>
    })}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default GroupList
