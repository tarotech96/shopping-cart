import React from 'react'
import {
    Link,
    useHistory
} from 'react-router-dom';
import {
    AppBar,
    Typography,
    Toolbar,
    IconButton,
    makeStyles,
    Button
} from '@material-ui/core';
import { connect } from 'react-redux';
const myStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

const Footer = ({ total }) => {
    const classes = myStyles();
    const history = useHistory();

    const redirectToMyCart = () => {
        history.push('/carts');
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" style={{ marginRight: 20, color: 'white', textDecoration: 'none' }}>Products</Link>
                        <Link to="/posts" style={{ color: 'white', textDecoration: 'none' }} >List Posts</Link>
                    </Typography>
                    <Button color="inherit" onClick={redirectToMyCart}>{total}<i className="fas fa-shopping-cart"></i>My Cart</Button>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        total: state.total
    }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);