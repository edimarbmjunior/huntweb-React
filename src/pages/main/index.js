import React, { Component } from 'react';
import api from '../../services/api';

import { Link } from 'react-router-dom';

import './styles.css';
//import Product from '../products';

export default class Main extends Component {
    //No react se salva dados em um objeto chamado estado
    state = {
        products: [],
        productInfo: {},
        page: 1,
    };

    //Esse metodo é executado assim que o componente é executado
    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        // console.log('dados api');
        // console.log('api:', response.data.docs);
        
        // this.setState({ 
        //     products: response.data.docs
        // });

        const { docs, ...productInfo } = response.data;

        this.setState({ 
            products: docs,
            productInfo,
            page
        });
    };

    prevPage = () => {
        const { page } = this.state;

        if(page === 1) return;
        const pageNumber = page - 1;
        // console.log('page>', page);
        // console.log('page>', pageNumber);
        // console.log('pages>', productInfo.pages);
        this.loadProducts(pageNumber);
    }

    nextPage = () => {
        const { page, productInfo } = this.state;
        if(page === productInfo.pages ) return;

        const pageNumber = page + 1;
        // console.log('page>', page);
        // console.log('page>', pageNumber);
        // console.log('pages>', productInfo.pages);
        this.loadProducts(pageNumber);
    }

    render(){
        //return <h1>Contagem de produtos: { this.state.products.length }</h1>

        // return (
        //     <div className="product-list">
        //         {this.state.products.map( product => (
        //             <article key={product._id}>
        //                 <strong>{product.title}</strong>
        //                 <p>{ product.description}</p>
        //                 <a href="">Acessar</a>
        //             </article>
        //         ))}
        //     </div>
        // )

        const { products, page, productInfo } = this.state;

        return (
            <div className="product-list">
                {products.map( product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{ product.description}</p>
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}