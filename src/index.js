import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Posts from './components/posts/posts.js';
import Footer from './commom/footer.js';
import CreatePost from './components/posts/createPost.js';
import MyCart from './components/cart/myCart.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducer.js';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

const appStore = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={appStore}>
    <BrowserRouter>
      <Footer />
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/posts" component={Posts} />
        <Route path="/posts/add" component={CreatePost} />
        <Route path="/carts" component={MyCart} />
        <Redirect from="/" to="/" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
