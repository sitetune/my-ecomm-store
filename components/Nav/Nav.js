import { FaShoppingCart } from 'react-icons/fa';

import { useCart } from '../../hooks/use-cart.js';

import Link from 'next/link';

import styles from './Nav.module.css';
import { CartContext } from '../../hooks/use-cart';
import React from 'react';

const Nav = () => {
  const { subtotal, checkout } = useCart();
  /**
   * @lesson-11-todo Exercise 5
   * Now that can access our cart state anywhere, how
   * can we grab the total cost to show in our
   * navigation and provide a way for someone to
   * check out?
   */
  return (
    <nav className={styles.nav}>
      <p className={styles.navTitle}>
        <Link href="/">
          <a><img src="/images/ma_logo.png" alt="MisterArt.com Kids!" className={styles.logo} /></a>
        </Link>
      </p>
      <p className={styles.navCart}>
        <Link href="/cart">
          <a><FaShoppingCart /> ${ subtotal }</a>
        </Link>
      </p>
    </nav>
  )
}

export default Nav;