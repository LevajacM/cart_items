import cartIt from '../data';
import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from './actions';

export const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }

  if (action.type === REMOVE) {
    let newCart = new Map(state.cart);
    newCart.delete(action.payload.id);
    return { ...state, cart: newCart };
  }

  if (action.type === INCREASE) {
    let newCart = new Map(state.cart);
    let item = newCart.get(action.payload.id);
    let newAmount = item.amount;
    newAmount++;
    item = { ...item, amount: newAmount };
    newCart.set(action.payload.id, item);
    return { ...state, cart: newCart };
  }

  if (action.type === DECREASE) {
    let newCart = new Map(state.cart);
    let item = newCart.get(action.payload.id);
    let newAmount = item.amount;
    if (newAmount === 1) {
      newCart.delete(action.payload.id);
      return { ...state, cart: newCart };
    }
    newAmount--;
    item = { ...item, amount: newAmount };
    newCart.set(action.payload.id, item);
    return { ...state, cart: newCart };
  }

  if (action.type === LOADING) {
    if (!state.loading) {
      return { ...state, loading: true };
    }
    return { ...state, loading: false };
  }

  if (action.type === DISPLAY_ITEMS) {
    let newCart = new Map();
    action.payload.data.forEach((item) => newCart.set(item.id, { ...item }));
    return { ...state, cart: newCart };
  }

  throw new Error(`no action: "${action.type}"`);
};
