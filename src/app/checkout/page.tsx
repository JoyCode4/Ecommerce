'use client'
import Checkout from "../../components/Checkout/Checkout";
import Protected from "../../components/Protected/Protected";
import { usePageTitle } from "../../hooks/usePageTitle";


export default function Login() {
    usePageTitle("Checkout");
    return (
      <Protected>
        <div className="">
          <Checkout/>
        </div>
      </Protected>
    );
  }