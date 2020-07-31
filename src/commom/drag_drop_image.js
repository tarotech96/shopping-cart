import React, { useState, useEffect, useMemo } from 'react'
import { useDropzone } from 'react-dropzone';
import { Form } from 'react-bootstrap';
// styles for previewing image
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

// style drag drop area
const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};
function Drag_Drop_Image(props) {
    const [files, setFiles] = useState([]);
    var { field, label } = props; // formik alway send default 2 props are field and form
    var { value } = field;
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles,
        open
    } = useDropzone({
        accept: 'image/*',
        // Disable click and keydown behavior
        noClick: true,
        noKeyboard: true,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);
    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    alt={file.name}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    for (let i = 0; i < acceptedFiles.length; i++) {
        if (acceptedFiles[i] != null && !value.includes(acceptedFiles[i])) {
            value.push(acceptedFiles[i]);
        }
    }
    return (
        <Form.Group controlId="formBasicEmail">
            {label && <Form.Label>{label}</Form.Label>}
            <div {...getRootProps({ style })}>
                <Form.Control
                    {...getInputProps()}
                />
                <p>Drag 'n' drop some images here</p>
                <button type="button" onClick={open}>
                    Open File Dialog
                </button>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </Form.Group>
    )
}

export default Drag_Drop_Image;
