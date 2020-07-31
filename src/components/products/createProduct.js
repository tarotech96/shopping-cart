import React, { useState } from 'react'
import InputField from '../../commom/inputField.js';
import DragDropImage from '../../commom/drag_drop_image.js';
import {
    Formik,
    Form,
    FastField
} from 'formik';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
function CreateProduct() {
    const [isRedirect, setIsRedirect] = useState(false)
    const initialValues = {
        name: '',
        description: '',
        price: 0,
        imgs: []
    }
    const onSubmitForm = async (data) => {
        var params = {
            name: data.name,
            description: data.description,
            price: data.price,
            imgs: data.imgs.map(file => file.name)
        }
        const response = await axios({
            method: 'POST',
            url: 'https://ukwsvt85ug.execute-api.ap-northeast-1.amazonaws.com/dev/Create_Product',
            data: JSON.stringify(params)
        });
        const uploadInfo = await response.data.uploadInfo.body || null;
        // Getting the url from response
        const uploadUrl = uploadInfo.uploadURL;
        console.log(uploadUrl)
        const res = await axios({
            method: 'PUT',
            url: uploadUrl,
            data: data.imgs[0],
            headers: { "Content-Type": "multipart/form-data" }
        })

        if (res.status === 200) {
            setIsRedirect(true)
        }
    }
    const back = () => {
        setIsRedirect(true);
    }
    // Render component with condition isRedirect
    if (isRedirect) {
        return (
            <Redirect to="/products" />
        )
    } else {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={6}>
                        <h1>Create a new product</h1>
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
                                            name="name"
                                            component={InputField}
                                            label="Name"
                                            placeholder="Enter name"
                                        />
                                        <FastField
                                            name="description"
                                            component={InputField}
                                            label="Description"
                                            placeholder="Enter description"
                                        />
                                        <FastField
                                            type="number"
                                            name="price"
                                            component={InputField}
                                            label="Price"
                                            placeholder="Enter price"
                                        />
                                        <FastField
                                            name="imgs"
                                            component={DragDropImage}
                                            label="Image"
                                        />
                                        <div style={{ margin: 20 }}>
                                            <Button onClick={back} style={{ marginRight: 5 }} variant="warning">Cancel</Button>
                                            <Button type="submit" variant="success">Save</Button>
                                        </div>
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


export default CreateProduct;