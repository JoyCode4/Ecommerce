'use client'
import ProductForm from "../../../components/Admin/ProductForm";
import Protected from "../../../components/Protected/Protected";
import { usePageTitle } from "../../../hooks/usePageTitle";


export default function Login() {
    usePageTitle("Product Form");
    return (
      <Protected redirectPath='/admin'>
        <div className="">
          <ProductForm/>
        </div>
      </Protected>
    );
  }