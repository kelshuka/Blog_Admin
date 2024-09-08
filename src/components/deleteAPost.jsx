require("dotenv").config();
import React, { useEffect, useState } from 'react';
import axios from 'axios';


// My Back-end API URL
const BACKEND_URL = process.env.BACKEND_URL;

function DeletePost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from the backend
        axios.get(`${BACKEND_URL}/api/posts`)
            .then(response => {
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const handleDelete = (postId) => {
        // Delete a post from the backend
        axios.delete(`${BACKEND_URL}/api/posts/${postId}`)
            .then(response => {
                setPosts(posts.filter(post => post.id !== postId));
                alert('Post deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    };

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.title}
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DeletePost;
