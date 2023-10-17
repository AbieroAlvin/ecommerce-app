import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import { BsTrash3 } from "react-icons/bs";
import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <div className="container grid sm:grid-cols-[70%_30%]  grid-cols-1 gap-12 sm:gap-6 my-4 lg:px-[100px] md:px-[40px] px-[30px] h-[600px]">
        <div className="mb-12 sm:mb-4">
          <div className="col h-[100px] text-center">
            {cartItems.length === 0 ? (
              <h2 className="text-xl text-center">
                No items added to the cart
              </h2>
            ) : (
              <table className="w-full table">
                <thead className="border-b-[1px] border-gray-400">
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item, index) => {
                    return <Tr key={index} item={item} />;
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="col ">
          <div>
            <div className="flex items-center justify-between font-[500]">
              <h6>Subtotal</h6>
              <span>${totalAmount}</span>
            </div>

            <p className="font-[400] mt-2">
              taxes and shipping will calculate in checkout
            </p>
            <div>
              <motion.button
                whileTap={{ scale: 1.1 }}
                className="shop__btn w-full"
              >
                <Link to="/checkout">Checkout</Link>
              </motion.button>
              <motion.button
                whileTap={{ scale: 1.1 }}
                className="shop__btn w-full"
              >
                <Link to="/shop">Continue Shopping</Link>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  return (
    <tr className="border-b-[1px] border-gray-400 pl-[50px]">
      <td className="ml-4">
        <img src={item.imgUrl} alt="/" />
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}px</td>
      <motion.td
        whileTap={{ scale: 1.1 }}
        className="lg:pl-16 md:pl-12 pl-6"
        onClick={deleteProduct}
      >
        <BsTrash3 className="cursor-pointer" />
      </motion.td>
    </tr>
  );
};

export default Cart;
