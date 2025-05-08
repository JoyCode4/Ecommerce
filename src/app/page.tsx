'use client'
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import ProductList from "../components/ProductList/ProductList";
import Protected from "../components/Protected/Protected";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Home() {
  usePageTitle("E-Commerce");

  return (
    <div className="">
      <Protected>
        <CategoryFilter>
          <ProductList/>
        </CategoryFilter>
      </Protected>
    </div>
  );
}
