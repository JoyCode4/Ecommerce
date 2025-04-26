'use client'
import AdminProductDetail from "@/components/Admin/AdminProductDetail";
import Protected from "@/components/Protected/Protected";
import { usePageTitle } from "@/hooks/usePageTitle";


export default function Login() {
    usePageTitle("Product Detail");
    return (
      <Protected redirectPath='/admin'>
        <div className="">
          <AdminProductDetail/>
        </div>
      </Protected>
    );
  }