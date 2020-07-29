import React from 'react'
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    isDisable: PropTypes.bool
}

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    isDisable: false
}
export default function InputField(props) {
    var { field, form, type, label, placeholder, isDisable } = props;
    var { name, value, onChange, onBlur } = field;
    return (
        <Form.Group controlId="formBasicEmail">
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                disabled={isDisable} />
        </Form.Group>
    )
}
