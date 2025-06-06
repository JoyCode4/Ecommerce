import Pagination from "../Pagination/Pagination";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../lib/store";
import { fetchAllProductsAdminAsync, selectAllProducts } from "../ProductList/ProductListSlice";
import { useEffect } from "react";
import Link from "next/link";

const AdminProductList: React.FC = () => {
  const products: any[] = useSelector(selectAllProducts);
  let categories: any[] = [];
  let brands: any[] = [];
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProductsAdminAsync());
  }, [])
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-0 pb-16 sm:px-6 sm:py-0 sm:pb-24 lg:max-w-7xl lg:px-8">
          <Link
          href={"/admin/productform"}
          className="rounded-md my-5 bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add New Product
          </Link>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products && products.map((product,index) => (
              <div key={index}>
              <Link href={`admin/product/${product.id}`}>
                <div className="group relative">
                  <img
                    alt={product.title}
                    src={product.thumbnail}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        {/* <Link href={product.thumbnail}> */}
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.title}
                        {/* </Link> */}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        <StarIcon className="w-6 h-6 inline" />
                        <span className="align-bottom">{product.rating}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium block text-gray-900">${Math.round(product.price * (1 - product.discountPercentage / 100))}</p>
                      <p className="text-sm font-medium block line-through text-gray-500">${product.price}</p>
                    </div>
                  </div>
                  { product.deleted &&
                      (<div className='text-sm font-medium block text-red-400'>
                        Deleted Product
                      </div>)
                    }
                  { product.stock<=0 &&
                      (<div className='text-sm font-medium block text-red-400'>
                        Out of stock
                      </div>)
                    }
                </div>
              </Link>
                <div className="mt-3">
                  <Link
                  href={`/admin/productform/${product.id}`}
                  className="rounded-md my-5 bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Edit Product
                  </Link>
                </div>
                </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination />
    </>
  )
}

export default AdminProductList;