import React from 'react'
import './Products.css';
import { connect } from 'react-redux';
function Products({ items, addItemToCart }) {
    const addToCart = (item) => {
        addItemToCart(item);
    }
    const itemList = items.map(item => {
        return (
            <div className="card" key={item.id}>
                <div className="card-image">
                    <img src={item.img} alt={item.title} />
                    <span className="card-title">{item.title}</span>
                </div>
                <div className="card-content">
                    <p>{item.desc}</p>
                    <p><b>Price: {item.price}$</b></p>
                    <span onClick={() => addToCart(item)}>Add to cart<i className="fas fa-plus-circle add-to-cart"></i></span>
                </div>
            </div>
        )
    })
    return (
        <div>
            <h3 className="center">Our items</h3>
            <div className="box">
                {itemList}
            </div>
        </div>
    )
}

const addItemToCart = (data) => {
    return (dispatch) => {
        dispatch({ type: 'ADD_TO_CART', payload: data })
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = { addItemToCart };

export default connect(mapStateToProps, mapDispatchToProps)(Products);
