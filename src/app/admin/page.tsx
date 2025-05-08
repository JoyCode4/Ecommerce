'use client'
import AdminProductList from "../../components/Admin/AdminProductList";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import Protected from "../../components/Protected/Protected";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function Home() {
  usePageTitle("E-Commerce");

  return (
    <div className="">
      <Protected redirectPath='/admin'>
        <CategoryFilter>
          <AdminProductList/>
        </CategoryFilter>
      </Protected>
    </div>
  );
}