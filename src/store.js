import { Container } from 'unstated'

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

const defaultState = {
  filter: VisibilityFilters.SHOW_ALL,
  groups: [
    {
      id: 1,
      name: 'urgent & not important',
      todos: [
        {
          id: 1,
          completed: false,
          text: 'Read README'
        },
        {
          id: 2,
          completed: false,
          text: 'Add one todo'
        },
        {
          id: 3,
          completed: false,
          text: 'Add filters'
        },
        {
          id: 4,
          completed: false,
          text: 'Add multiple lists'
        },
        {
          id: 5,
          completed: false,
          text: 'Optional: add tests'
        }
      ]
    },
    {
      id: 2,
      name: 'urgent & important',
      todos: [
        {
          id: 1,
          completed: false,
          text: '* Read README'
        },
        {
          id: 2,
          completed: false,
          text: '* Add one todo'
        },
        {
          id: 3,
          completed: false,
          text: '* Add filters'
        }
      ]
    }
  ]
}

class TodosContainer extends Container {
  constructor(props) {
    super(props)

    this.state = this.readStorage()
  }

  readStorage() {
    // if (window && window.localStorage) {
    //   const state = window.localStorage.getItem('appState')
    //   if (state) {
    //     return JSON.parse(state)
    //   }
    // }

    return defaultState
  }

  syncStorage() {
    // if (window && window.localStorage) {
    //   const state = JSON.stringify(this.state)
    //   window.localStorage.setItem('appState', state)
    // }
  }

  getGroups() {
    return this.state.groups
  }

  getGroup(groupId) {
    const currentGroup = this.state.groups.find(group => group.id === groupId)

    return currentGroup
  }

  setFilter = async filter => {
    // this.setState(state => {
    //   return { filter, groups: state.groups }
    // })
    await this.setState({ filter })
  }

  toggleComplete = async (groupId, id) => {
    const group = this.state.groups.find(g => g.id === groupId)
    const item = group.todos.find(i => i.id === id)
    const completed = !item.completed

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const groups = state.groups.map(group => {
        if (group.id !== groupId) return group
        const todos = group.todos.map(todo => {
          if (todo.id !== id) return todo
          return {
            ...todo,
            completed
          }
        })
        return { ...group, todos }
      })
      return { ...state, groups }
    })

    // this.syncStorage()
  }

  createGroup = async name => {
    await this.setState(state => {
      const groupItem = {
        id: state.groups.length + 1,
        name,
        todos: []
      }

      const groups = this.state.groups.concat(groupItem)

      return { ...state, groups }
    })
  }
  createTodo = async (groupId, text) => {
    await this.setState(state => {
      console.log(groupId)
      const currentGroup = state.groups.find(group => group.id === groupId)
      console.log(currentGroup)
      const item = {
        completed: false,
        text,
        id: currentGroup.todos.length + 1
      }

      const groups = state.groups.map(group => {
        if (group.id !== groupId) return group
        const updatedGroup = { ...group, todos: group.todos.concat(item) }
        return updatedGroup
      })
      return { ...state, groups }
    })

    // this.syncStorage()
  }
}

export default TodosContainer
