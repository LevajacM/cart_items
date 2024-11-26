export const calculateTotal = (map) => {
  let totalAmount = 0;
  let totalPrice = 0;

  for (let item of map.values()) {
    totalAmount += item.amount;
    totalPrice += item.price * item.amount;
  }

  totalPrice = totalPrice.toFixed(2);
  return { totalAmount, totalPrice };
};
