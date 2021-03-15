import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/Home.module.css'

import { useCart } from '../hooks/use-cart.js';

import products from '../products.json';



export default function Home() {

  const { subtotal, totalItems, addToCart, checkout } = useCart();
  

  

  return (
    <div className={styles.container}>
      <Head>
        <title>MisterArt.com Kids</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          The Original Art Supply Superstore
        </h1>

        

        <ul className={styles.grid}>
          {products.map(product => {
            const { id, title, price, description, image } = product;

            return (
              
              <li key={id} className={styles.card}>
                <Link href={`/products/${id}`}>
                  <a>
                    <img src={ image } alt={ title }></img>
                    <h3>{ title }</h3>
                    <p>{ description }</p>
                    <p className={ styles.price }>${ price }</p>
                  </a>
                </Link>
                <p>
                  <button className={styles.button} onClick={() => {
                    addToCart({
                      id
                    }) 
                    
                  
                  }} >
                    Add to Cart
                  </button>
                </p>
              </li>
            )
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
      This is a demo site for - 
        <Link href={`https://www.misterart.com`}><a>MisterArt.com</a></Link>
      </footer>
    </div>
  )
}
