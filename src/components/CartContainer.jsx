import CartItem from './CartItem';

import { useGlobalContext } from '../context/Context';

const CartContainer = () => {
  const { cart, clearList, totalPrice } = useGlobalContext();
  const cartArray = Array.from(cart.entries());

  if (cartArray.length === 0) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className='cart'>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartArray.map((cartItem) => {
          return <CartItem key={cartItem[0]} {...cartItem[1]} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div>
          <h5 className='cart-total'>
            total <span>${totalPrice}</span>
          </h5>
        </div>
        <button className='btn' onClick={clearList}>
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
