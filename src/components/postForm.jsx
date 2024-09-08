
import React, { useState } from 'react';
import axiosInstance from '../api';




function PostForm({ initialData = {}, onSubmitSuccess }) {
    const [title, setTitle] = useState(initialData.title || '');
    const [text, setText] = useState(initialData.text || '');
    const [isPublished, setIsPublished] = useState(initialData.isPublished || false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const postData = { title, text};

        if (initialData.id) {
            postData.isPublished = isPublished;  // Include `isPublished` for update
        }

        const request = initialData.id
            ? axiosInstance.patch(`/api/posts/${initialData.id}`, postData)
            : axiosInstance.post('/api/posts', postData);

        request
            .then(() => {
                alert('Post saved successfully!');
                onSubmitSuccess();
            })
            .catch(error => {
                console.error('Error saving post:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{initialData.id ? 'Edit Post' : 'Create Post'}</h2>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Text</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                ></textarea>
            </div>
            {initialData.id && (  // Show the `isPublished` checkbox only when editing
                <div>
                    <label>Publish</label>
                    <input
                        type="checkbox"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                    />
                </div>
            )}
            <button type="submit">{initialData.id ? 'Update' : 'Create'}</button>
        </form>
    );
}

export default PostForm;