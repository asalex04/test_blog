import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {deletePost, fetchOnePost, updatePost} from "../api/postApi";
import {IPost} from "../types";

const PostPage = () => {
    const [post, setPost] = useState<IPost>()
    const {id} = useParams()
    let navigate = useNavigate()
    const [file, setFile] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleClose = () => {
        navigate('/')
    };

    useEffect(() => {
        fetchOnePost(id)
            .then(data => {
                setPost(data)
                setFile(data.img)
                setTitle(data.title)
                setContent(data.content)
            })
    }, [])

    // @ts-ignore
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const removePost = (id: string) => {
        deletePost(id).then(data => handleClose())
    }

    const addPost = () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('content', content)
        formData.append('img', file)
        updatePost(id, formData).then(data => handleClose())
    }

    return (post &&
        <Container>
            <Row className='mt-3'>
                <Col md={4}>
                    <img width={300} height={300} src={`${process.env.REACT_APP_API_URL}${post.img}`}/>
                </Col>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Текст</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                <Form.Control
                    className={'mt-3'}
                    type='file'
                    onChange={selectFile}
                />
                <Container className="d-flex justify-content-evenly mt-5 mb-3 ">
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => removePost(id)}>
                        Delete
                    </Button>
                    <Button variant="primary" onClick={addPost}>
                        Update post
                    </Button>
                </Container>
            </Row>
        </Container>
    );
};

export default PostPage;
