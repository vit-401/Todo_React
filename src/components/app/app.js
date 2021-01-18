import React from 'react';
import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import PostStatusFilter from '../post-status-filter'
import PostList from '../post-list'
import PostAddForm from '../post-add-form'

import './app.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {label: 'Going to lern React', important: true, like: false, id: '1'},
                {label: 'That is good text', important: false, like: true, id: '2'},
                {label: 'I need a break...', important: false, like: false, id: '3'}
            ],
            term: '',
            filter: 'all'
        }
    }

    maxId = 5

    searchPost = (items, term) => {
        if (term.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        })
    }


    onDelete = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)]
            return {
                data: newArr
            }
        })
    }

    addItem = (body) => {
        const newItem = {label: body, important: false, id: this.maxId++}
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }
    onToggleLike = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)
            const old = data[index]
            const newItem = {
                ...old, like: !old.like
            }
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
            return {data: newArr}
        })

    }
    onToggleImportent = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)
            const old = data[index]
            const newItem = {
                ...old, important: !old.important
            }
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
            return {data: newArr}
        })
    }
    onUpdateSearch = (term) => {
        this.setState({term})
    }

    filterPost = (items, filter) => {
        if (filter === 'like') {
            return items.filter(elem => elem.like)
        } else {
            return items
        }
    }
    onFilterSelect = (filter) => {
        this.setState({
            filter
        })
    }

    render() {
        const {data, term, filter} = this.state
        const liked = data.filter(item => item.like).length
        const allPosts = data.length;
        const visible = this.filterPost(this.searchPost(data, term), filter)

        return (
            <div className='app'>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}/>
                <div className='search-panel d-flex'>
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                        onFilterSelect={this.onFilterSelect}
                        filter={filter}
                    />
                </div>
                <PostList posts={visible}
                          onDelete={this.onDelete}
                          onToggleImportent={this.onToggleImportent}
                          onToggleLike={this.onToggleLike}/>
                <PostAddForm addItem={this.addItem}/>
            </div>
        )
    }
}

export default App