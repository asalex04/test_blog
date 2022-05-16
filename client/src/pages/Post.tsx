import * as React from 'react';
import {IPost} from "../types";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";

const Post = (props: {post: IPost}) => {
    let navigate = useNavigate()
    const {isAuth} = useAppSelector(state => state.user)
    const {title, content, img, author, createdAt, id} = props.post
    const time = createdAt.split('T')[1].slice(0, 5)
    const date = createdAt.split('T')[0]

    return (
        <div style={{margin: 20}}>
            <div>
                {title}
            </div>
            <div>
                {content}
            </div>
            <img style={{width: 150, height: 150}} src={`${process.env.REACT_APP_API_URL}${img}`}/>
            <div>автор: {author} </div>
            <Container className="d-flex justify-content-between mt-3 ml-1 pr-3">
                <Row>{date} / {time}</Row>
                {isAuth &&
                <Row>
                    <Button onClick={() => navigate(`/${id}`)}>Редактировать</Button>
                </Row>
                }
            </Container>

            <hr/>
        </div>
    );
};

export default Post;
