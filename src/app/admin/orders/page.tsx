'use client'
import AdminOrders from "@/components/Admin/AdminOrders";
import Protected from "@/components/Protected/Protected";
import { usePageTitle } from "@/hooks/usePageTitle";


export default function Login() {
    usePageTitle("Orders");
    return (
      <Protected redirectPath='/admin'>
        <div className="">
          <AdminOrders/>
        </div>
      </Protected>
    );
  }