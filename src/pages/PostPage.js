import React from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post/Post';
import { getPost } from '../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { useEffect, useState } from 'react';

const client = generateClient();

const PostPage = ({ user }) => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await client.graphql({
                    query: getPost,
                    variables: { id: postId }
                });
                setPost(response.data.getPost);
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId]);

    if (loading) return <p>Loading post...</p>;
    if (!post) return <p>Post not found.</p>;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Post post={post} currentUser={user} />
        </div>
    );
};

export default PostPage;
