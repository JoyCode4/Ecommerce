'use client'
import Order from "../../../components/Order/Order";
import Protected from "../../../components/Protected/Protected";
import { usePageTitle } from "../../../hooks/usePageTitle";


export default function Login() {
    usePageTitle("Order Success");
    return (
      <Protected >
        <div className="">
          <Order/>
        </div>
      </Protected>
    );
  }