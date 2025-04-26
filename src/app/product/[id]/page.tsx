'use client'
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import Protected from "@/components/Protected/Protected";
import { usePageTitle } from "@/hooks/usePageTitle";


export default function Login() {
    usePageTitle("Product Detail");
    return (
      <Protected >
        <div className="">
          <ProductDetail/>
        </div>
      </Protected>
    );
  }