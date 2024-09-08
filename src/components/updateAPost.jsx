function UpdatePostForm({ postId }) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.patch(`/api/posts/${postId}`, {
            title,
            text,
            isPublished: true,  // conditionally set this
        })
        .then(response => {
            alert('Post updated successfully');
        })
        .catch(error => {
            console.error('Error updating post:', error);
        });
    };

    return (
        <form onSubmit={handleUpdate}>
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
                />
            </div>
            <button type="submit">Update Post</button>
        </form>
    );
}
