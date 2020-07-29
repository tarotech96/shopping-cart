import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    withStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@material-ui/core';
import { useHistory, useRouteMatch } from "react-router-dom";
import axios from 'axios';
const tableStyles = makeStyles((theme) => ({
    table: {
        minWidth: 500,
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    button: {
        float: 'right',
        marginRight: 50
    }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 18,
    },
}))(TableCell);

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const history = useHistory();
    const match = useRouteMatch();
    const classes = tableStyles();
    const routeChange = () => {
        history.push(`${match.path}/add`);
    }
    const deletePost = async (post) => {
        const params = {
            postId: post.id,
            createdAt: post.createdAt
        }
        const response = await axios({
            method: 'DELETE',
            url: 'https://ukwsvt85ug.execute-api.ap-northeast-1.amazonaws.com/api/Delete_Post',
            data: JSON.stringify(params)
        })

        console.log(response);
    }
    useEffect(() => {
        async function getALlPosts() {
            const response = await axios.get('https://ukwsvt85ug.execute-api.ap-northeast-1.amazonaws.com/api/posts');
            const data = response.data.data;
            setPosts(data.Items);

        }
        getALlPosts();
    }, []);
    return (
        <div className={classes.root}>
            <h1>List Posts</h1>
            <Button className={classes.button} variant="contained" color="primary" onClick={routeChange}>
                Add a new post
            </Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell width={200} align="center">Id</StyledTableCell>
                            <StyledTableCell align="center">Title</StyledTableCell>
                            <StyledTableCell align="center">Body</StyledTableCell>
                            <StyledTableCell align="center">UserId</StyledTableCell>
                            <StyledTableCell align="center">CreatedAt</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.id}>
                                <StyledTableCell align="center">{post.id}</StyledTableCell>
                                <StyledTableCell align="center">{post.title}</StyledTableCell>
                                <StyledTableCell align="center">{post.body}</StyledTableCell>
                                <StyledTableCell align="center">{post.userId}</StyledTableCell>
                                <StyledTableCell align="center">{post.createdAt}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button style={{ marginRight: 5 }} size="small" variant="contained" color="primary"><i className="fa fa-edit"></i>Edit</Button>
                                    <Button onClick={() => deletePost(post)} size="small" variant="contained" color="secondary"><i className="fa fa-trash-alt"></i>Delete</Button>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Posts;
