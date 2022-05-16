import React, {useEffect} from 'react';
import AddPost from "../components/AddPost";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import Post from "./Post";
import {Row} from "react-bootstrap";
import {fetchAllPosts} from "../api/postApi";
import {getPosts} from "../store/reducers/postSlice";

const Blog = () => {
    const {posts} = useAppSelector(state => state.post)
    const {isAuth} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        fetchAllPosts().then(data => dispatch(getPosts(data.rows)))
    }, [])

    return (
        <div>
            <Row>
                {posts.map(post => (
                <Post key={post.id} post={post}/>
                ))}
            </Row>
            {isAuth && <AddPost />}
        </div>
    );
};

export default Blog;
