import React from 'react'
import './../App.css';
import { connect } from 'react-redux';
import Products from '../components/products/products.js';
// import Row from './row.js';
// import requests from './requests.js';
function Home({ items }) {
  return (
    <div>
      <div className="app">
        {/* <Banner /> */}
        {/* <Row
          title="Netflix originals"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow={true}
        />
        <Row title="Trending now" fetchUrl={requests.fetchTrending} />
        <Row title="Top rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Action movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Romance movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} /> */}
        <Products items={items} />
      </div>
    </div>
  )
}
const mapToStateToProps = (state) => {
  return {
    items: state.items
  }
}

const mapToDispatchToProps = {};
export default connect(mapToStateToProps, mapToDispatchToProps)(Home);
