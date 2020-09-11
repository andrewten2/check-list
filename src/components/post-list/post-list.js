import React from 'react';
import { ListGroup} from 'reactstrap';

import PostListItem from '../post-list-item';

import './post-list.css'
const PostList = ({posts,onDelete,onToggleImportant,onToggleLiked}) => { 
    const elements = posts.map((e)=> {
        const {id,...items} = e;
            return (
            <li key={id} className ="list-group-item">
                <PostListItem 
                 {...items}
                 onDelete={() => onDelete(id)}
                 onToggleImportant = {()=> onToggleImportant(id)}
                 onToggleLiked = {()=> onToggleLiked(id)}
                 />
            </li>
        )
    });

    return (
        <ListGroup className ="app-list">
            {elements}                  
        </ListGroup>
    )
}

export default PostList;