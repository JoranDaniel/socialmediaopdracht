import React, { useState } from 'react';
import firebase from 'firebase/compat';
import 'firebase/firestore';


function PostForm() {
    
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new post object
    const post = {
      title,
      content,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    // Save the post to Firebase
    firebase.firestore().collection('posts').add(post);

    // Reset form fields
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default PostForm;
