'use client'

import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from "../UserSlice";
import Link from "next/link";

interface Props {

}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
const UserOrders: React.FC<Props> = ({ }) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  let orders = useSelector(selectUserOrders);
  let ordersEdit = [];

  const chooseColor = (status: string) => {
    switch(status){
        case 'pending':
            return "text-purple-400"
        case 'dispatched':
            return "text-yellow-400"
        case 'delivered':
            return "text-green-400"
        case 'cancelled':
            return "ext-red-400"
        default:
    }
  } 

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id))
  }, [])

  orders = orders.map((element: any) => {
    let totalAmount = 0;
    let totalItems = 0;

    for (let item of element.items) {
      totalAmount += (item.price * item.quantity);
      totalItems += (item.quantity);
    }

    return { ...element, totalAmount, totalItems }
  });

  return (
    <div>
      {orders && orders.map((order: any) => (
        <div key={order.id} className="border rounded-lg shadow-lg border-gray-300 my-10">
          <h1 className="text-xl pl-10 pt-10 font-bold tracking-tight text-gray-900">Order No : {order.id} &nbsp; Status : &nbsp;<span className={chooseColor(order.status)}> {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span> </h1>
          <div className="my-8 p-10 ">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items && order.items.map((item: any, index: number) => (
                  <li key={index} className="flex py-6">
                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img alt={item.title} src={item.thumbnail} className="size-full object-cover" />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link href={`/products/${item.id}`}>{item.title}</Link>
                          </h3>
                          <p className="ml-4">{item.price}</p>
                        </div>
                        {/* <p className="mt-1 text-sm text-gray-500">{item.color}</p> */}
                        <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty : <span>{item.quantity}</span></p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>


          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total</p>
              <p>${order.totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items</p>
              <p>{order.totalItems} items</p>
            </div>
          </div>

          {order.selectedAddress &&

            (
              <div className="border-t-0 border-gray-200">

                <h1 className="text-xl font-medium tracking-tight text-gray-500 pl-10">Address</h1>
                <div key={order.id} className="flex justify-between gap-x-6 px-5 py-5 m-5 border rounded-lg border-gray-200">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm/6 font-semibold text-gray-900">{order.selectedAddress.firstName} {order.selectedAddress.lastName}</p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">Email : {order.selectedAddress.email}</p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">{order.selectedAddress.street}, {order.selectedAddress.pinCode}</p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm/6 text-gray-900">Phone: {order.selectedAddress.phone}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">{order.selectedAddress.city}, {order.selectedAddress.state}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">{order.selectedAddress.country}</p>
                  </div>
                </div>
              </div>
            )
          }
        </div>

      ))}
    </div>
  )
}

export default UserOrders;