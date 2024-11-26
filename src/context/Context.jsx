import { createContext, useContext, useReducer, useEffect } from 'react';
import { reducer } from './reducer';
import { calculateTotal } from './utils';
import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from './actions';

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const initialState = {
  loading: false,
  cart: new Map(),
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalAmount, totalPrice } = calculateTotal(state.cart);

  const clearList = () => {
    dispatch({ type: CLEAR_CART });
  };
  const removeItem = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };
  const increase = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };
  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: LOADING });
      try {
        const resp = await fetch(url);
        if (resp.ok) {
          const data = await resp.json();
          dispatch({ type: DISPLAY_ITEMS, payload: { data } });
        }
        dispatch({ type: LOADING });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearList,
        removeItem,
        increase,
        decrease,
        totalAmount,
        totalPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
