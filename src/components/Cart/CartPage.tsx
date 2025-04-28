'use client'

import Link from 'next/link';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartAsync, selectCart, selectCartTotalAmount, selectCartTotalItems, updateCartAsync} from './CartSlice';
import { AppDispatch } from '@/lib/store';
import { toast } from 'react-toastify';
import { selectLoggedInUser } from '../Auth/AuthSlice';

interface Props{
  buttonName?:string;
  hrefName?:string;
  handleOrder?:any;
//   totalAmount?:number;
//   totalItems?:number;
//   setTotalAmount:React.Dispatch<React.SetStateAction<number>>;
//   setTotalItems:React.Dispatch<React.SetStateAction<number>>;
//   isModalOpen:boolean
//   setOpen:React.Dispatch<React.SetStateAction<boolean>>;
}


const CartPage: React.FC<Props> = ({buttonName="Checkout",hrefName="/checkout",handleOrder}) =>{
    let items = useSelector(selectCart);
    const dispatch:AppDispatch=useDispatch();
    const totalAmount = useSelector(selectCartTotalAmount);
    const totalItems = useSelector(selectCartTotalItems);
    const user = useSelector(selectLoggedInUser);
    // let amount = 0;
    // let itemsx=0;
    
    // for(let item of items){
    //     amount += (item.price*item.quantity);
    //     itemsx += (item.quantity);
    // }
    
    // setTotalAmount(Math.round(amount*100)/100);
    // setTotalItems(itemsx);

    const handleChange = (e:any,item:any)=>{
        e.preventDefault();
        
        dispatch(updateCartAsync({...item,quantity:+e.target.value}));
        toast.success("Quantity Updated");
    }
    
    const deleteItem = (e:any,id:any)=>{
        e.preventDefault();
        console.log(id);
        const details:any = {user:user.id,id:id}; 
        dispatch(deleteCartAsync(details));
        toast.success("Cart Item Deleted");
    }


  return (
    <>
        <div className="my-8">
            <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item:any,index:number) => (
                    <li key={index} className="flex py-6">
                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img alt={item.product.title} src={item.product.thumbnail} className="size-full object-cover" />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                        <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                            <Link href={`/products/${item.product.id}`}>{item.product.title}</Link>
                            </h3>
                            <p className="ml-4">{item.product.price}</p>
                        </div>
                        {/* <p className="mt-1 text-sm text-gray-500">{item.color}</p> */}
                        <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty 
                            <select className="" value={item.quantity} onChange={(e)=>handleChange(e,item)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </p>
                            

                        <div className="flex">
                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={(e)=>deleteItem(e,item.product.id)}>
                            Remove
                            </button>
                        </div>
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
            <p>${totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items</p>
            <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
                {buttonName!="Pay and Order"?
                    (<Link
                    href={hrefName}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                    >
                        {buttonName}
                    </Link>):
                    (
                        <div
                        onClick={(e)=>handleOrder(e)}
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                        >
                            {buttonName}
                        </div>
                    )
            }
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
                or{' '}
                <Link href={"/"}>
                <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
                </button>
                </Link>
            </p>
            </div>
        </div>
    </>
  )
}

  
export default CartPage;