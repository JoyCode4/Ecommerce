'use client'

import Protected from "@/components/Protected/Protected";
import UserOrders from "@/components/User/Pages/UserOrders";
import { usePageTitle } from "@/hooks/usePageTitle";


export default function Login() {
    usePageTitle("Orders");

    return (
      <Protected>
        <div className="">
          <UserOrders/>
        </div>
      </Protected>
    );
  }