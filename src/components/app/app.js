import React,{Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list'
import PostAddForm from '../post-add-form';
import './app.css';

import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`
export default class App extends Component {

    maxId = 100;

    state = {
        data : [
            {id: 1,label: 'Going to learn React', important:false,like:false},
            {id: 2,label: 'That is so good', important:false,like:false},
            {id: 3,label: 'it should not fuck you', important:false,like:false}
        ],
        term: '',
        filter: 'all'
    } 

    deleteItem = (id) => {
        this.setState(({data})=> {
            const index = data.findIndex((el) => el.id === id);
            console.log(index);
            const newArray = [...data.slice(0,index),...data.slice(index+1)];
            return {
                data: newArray
            }
        });
    }

    addItem = (text) => {
        const newItem = {
            id: this.maxId++,
            label: text,
            important: false
        }

        this.setState (({data})=> {
            const newArr = [...data,newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleImportant = (id) => {
        this.setState(({data})=> {
            const index = data.findIndex((el) => el.id === id);

            const old = data[index];
            const newItem = {...old,important : !old.important};
            const newArray = [...data.slice(0,index), newItem, ...data.slice(index+1)];

            return {
                data: newArray
            }
        });
    }

    onToggleLiked = (id) => {
        this.setState(({data})=> {
            const index = data.findIndex((el) => el.id === id);

            const old = data[index];
            const newItem = {...old,like : !old.like};
            const newArray = [...data.slice(0,index), newItem, ...data.slice(index+1)];

            return {
                data: newArray
            }
        });
    }

    searchPost = (items,term) => {
        if(term.length === 0) {
            return items
        }

         return items.filter((item)=> {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        });
    }

    filterPost(items,filter) {
        if(filter=== 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }

    }

    onUpdateSearch = (term) => {
         this.setState({term});
    }

    onFilterSelect = (filter) => {
         this.setState({filter});
    }

    render () {
        const {data,term,filter} = this.state;
        const liked = data.filter(e=> e.like).length;
        const allPosts = data.length;

        const visiblePosts =  this.filterPost(this.searchPost(data,term),filter);

        return (
            <AppBlock>
                <AppHeader
                liked={liked}
                allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList 
                posts={visiblePosts} 
                onDelete={ this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleLiked= {this.onToggleLiked}/>
                <PostAddForm onAdd={this.addItem}/>
            </AppBlock>
        )
    }
  
}

