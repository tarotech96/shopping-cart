import React, { useState } from 'react';
import InputField from '../../commom/inputField.js';
import {
    Formik,
    Form,
    FastField
} from 'formik';
import { Button } from '@material-ui/core';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
export default function CreatePost(props) {
    const [isRedirect, setIsRedirect] = useState(false)
    const initialValues = {
        title: '',
        body: ''
    }
    const onSubmitForm = async (data) => {
        var response = await axios({
            method: 'POST',
            url: 'https://ukwsvt85ug.execute-api.ap-northeast-1.amazonaws.com/api/posts',
            data: JSON.stringify(data)
        });
        if (response.status === 200) {
            setIsRedirect(true);
        }
    }
    const back = () => {
        setIsRedirect(true);
    }

    // Render component with condition isRedirect
    if (isRedirect) {
        return (
            <Redirect to="/posts" />
        )
    } else {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={6}>
                        <h1>Create a new post</h1>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values) => {
                                onSubmitForm(values);
                            }}
                        >
                            {formikProps => {
                                // const { values, touched, errors } = formikProps;
                                return (
                                    <Form>
                                        <FastField
                                            name="title"
                                            component={InputField}
                                            label="Title"
                                            placeholder="Enter title"
                                        />
                                        <FastField
                                            name="body"
                                            component={InputField}
                                            label="Body"
                                            placeholder="Enter body"
                                        />
                                        <Button onClick={back} style={{marginRight: 5}} size="large" type="submit" variant="contained" color="secondary">Cancel</Button>
                                        <Button size="large" type="submit" variant="contained" color="primary">Save</Button>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        )
    }
}
