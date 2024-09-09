
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api';




function PostList({ onEdit, onDelete }) {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        axiosInstance.get('/api/posts')
            .then(response => {
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h3> {post.title} </h3>
                        <p> {post.text}</p>
                        <button onClick={() => onEdit(post)}>Edit</button>
                        <button onClick={() => onDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;
