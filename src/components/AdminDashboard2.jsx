import React, { useState } from 'react';
import PostList from './postList';
import PostForm from './postForm';
import AdminManagement from './AdminManagement';
import axiosInstance from '../api';


function AdminDashboard() {
    const [editingPost, setEditingPost] = useState(null);  // Track the post being edited

    const handleEdit = (post) => {
        setEditingPost(post);
    };

    const handleDelete = (postId) => {
        axiosInstance.delete(`/api/posts/${postId}`)
            .then(() => {
                alert('Post deleted successfully!');
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    };

    const handleSubmitSuccess = () => {
        setEditingPost(null);  // Clear the form after successful submit
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            
            <h2>{editingPost ? 'Edit Post' : 'Create a New Post'}</h2>
            <PostForm
                initialData={editingPost || {}}
                onSubmitSuccess={handleSubmitSuccess}
            />
            
            <PostList onEdit={handleEdit} onDelete={handleDelete} />
            
            <AdminManagement />
        </div>
    );
}

export default AdminDashboard;