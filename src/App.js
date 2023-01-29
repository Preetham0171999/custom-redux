import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
//import { useSelector } from "react-redux";
import Notification from "./components/UI/Notification";

let isInitial= true;

function App() {
  const dispatch = useDispatch();
  
  const showCart = useSelector((state) => state.ui.cartisVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "Pending",
          title: "Sending...",
          message: "Sending Cart Data!",
        })
      );
      const response = await fetch(
        "https://react-http-6df0f-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
       throw new Error("Sending cart data failed")
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success",
          message: "Sent Cart data successfully",
        })
      );

      
    };
    if(isInitial){
      isInitial=false;
      return;
    }
    
    
    sendCartData().catch((error)=>{
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending Cart data failed",
        })
      );
    })
  }, [cart,dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
