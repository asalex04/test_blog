import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createPost} from "../api/postApi";
import jwtDecode from "jwt-decode";

const AddPost = () => {
    const [show, setShow] = useState(false);
    const [file, setFile] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // @ts-ignore
    const selectFile = e => {
        setFile(e.target.files[0])
    }
    // @ts-ignore
    const name = jwtDecode(localStorage.getItem('token')).name

    const addNewPost = async () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('content', content)
        formData.append('img', file)
        formData.append('author', name)
        await createPost(formData)
        handleClose()
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Добавить пост
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
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
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addNewPost}>
                        Add post
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddPost;
