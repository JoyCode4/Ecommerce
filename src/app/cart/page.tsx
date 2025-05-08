'use client'
import CartPage from "../../components/Cart/CartPage";
import Protected from "../../components/Protected/Protected";
import { usePageTitle } from "../../hooks/usePageTitle";
import { useState } from "react";


export default function Login() {
    usePageTitle("Cart");
    // const [totalItems, setTotalItems] = useState(0);
    // const [totalAmount, setTotalAmount] = useState(0);
    return (
      // <Protected>
        <div className="">
          {/* <CartPage totalAmount={totalAmount} totalItems={totalItems} setTotalItems={setTotalItems} setTotalAmount={setTotalAmount}/> */}
          <CartPage/>
        </div>
      // </Protected>
    );
  }