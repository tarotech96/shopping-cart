import React from 'react'
import './Cart.css';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
function MyCart({ addedCarts, count }) {
    const itemList = addedCarts.map(item => {
        return (
            <div className="card" key={item.id}>
                <div className="card-image">
                    <img src={item.img} alt={item.title} />
                    <span className="card-title">{item.title}</span>
                </div>
                <div className="card-content">
                    <p>{item.desc}</p>
                    <p><b>Price: {item.price}$</b></p>
                    <span><p>Amount: {item.count}</p></span>
                </div>
            </div>
        )
    })
    return (
        <Row>
            <Col xs={4}>
                <div className="list-cart">
                    <h3 className="center">My list items</h3>
                    <div className="cart">
                        {itemList}
                    </div>
                </div>
            </Col>
            <Col xs={8}>
                <h1>Go to payment</h1>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        addedCarts: state.addedItems,
        count: state.count
    }
}

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
