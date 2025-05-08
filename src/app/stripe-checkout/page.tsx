'use client'

import Protected from "@/components/Protected/Protected";
import StripeCheckout from "@/components/StripeCheckout/StripeCheckout";

import { usePageTitle } from "@/hooks/usePageTitle";


export default function Login() {
    usePageTitle("Payment");

    return (
      <Protected>
        <div className="">
          <StripeCheckout/>
        </div>
      </Protected>
    );
  }