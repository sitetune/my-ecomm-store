import Head from 'next/head'
import styles from '../../styles/Product.module.css'
import Link from 'next/link';

import { useCart } from '../../hooks/use-cart.js';

import products from '../../products.json';

export default function Product({ product }) {
  // console.log('product', product);
  const { id, title, description, image, price } = product;

  const { addToCart } = useCart();

  return (
    <div className={styles.container}>
      <Head>
        <title>{ title } - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.productImage}>
          <img src={image} alt={title} />
        </div>

        <div>
          <h1>
            { title }
          </h1>

          <p className={styles.description}>
            { description }
          </p>

          <p className={styles.description}>
            ${ price.toFixed(2) }
          </p>

          <p>
            <button className={styles.button} onClick={() => {
              addToCart({
                id
              })
            }}>
              Add to Cart
            </button>
          </p>
        </div>

      </main>

      <footer className={styles.footer}>
      This is a demo site for - 
        <Link href={`https://www.misterart.com`}><a>MisterArt.com</a></Link>
      </footer>
    </div>
  )
}

  export async function getStaticProps({ params }) {
    const product = products.find(({ id }) => id === params.productId)
    console.log('params', params);
    return {
      props: {
        product
      }
    }
  }

  export async function getStaticPaths() {
    const paths = products.map((product) => {
      return {
        params: {
          productId: product.id
        }
      }
    })

    return {
      paths,
      fallback: false
    }
  }