import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api'; 


import PostList from './postList';
import PostForm from './postForm';
import AdminManagement from './AdminManagement';



function AdminDashboard() {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem('adminToken'); 

  const [editingPost, setEditingPost] = useState(null);  

  useEffect(() => {
    if (!adminToken) {
      navigate('/login');
    }
  }, [adminToken, navigate]);

  // Fetch posts or any admin data
  useEffect(() => {
    axiosInstance.get('/api/posts') 
      .then(response => {
        console.log('Fetched posts:', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!adminToken) {
    return <p>Redirecting to login...</p>;
  }

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
      setEditingPost(null); 
  };

  return (
    <div className='w-full'>
      <h1 className="text-3xl font-bold mb-4 text-center font-style">Admin Dashboard</h1>
      
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
