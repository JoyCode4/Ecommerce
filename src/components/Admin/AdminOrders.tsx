'use client'

import { useDispatch, useSelector } from "react-redux"
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from "../Order/OrderSlice"
import { useEffect, useState } from "react"
import { AppDispatch } from "@/lib/store"
import { EyeIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline"
import { toast } from "react-toastify"

interface Props {

}
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const AdminOrders: React.FC<Props> = ({ }) => {

    let orders=useSelector(selectOrders);
    const dispatch: AppDispatch = useDispatch();
    const [editableOrderStatus, setEditableOrderStatus] = useState(-1);
    let [sortAsc,setSortAsc]=useState(false);

    const handleUpdate = (e: any, order: any) => {
        dispatch(updateOrderAsync({ ...order, status: e.target.value }));
        setEditableOrderStatus(-1);
        toast.success("Orders Status Updated");
    }

    const handleSort = ()=>{
        setSortAsc((previous:boolean)=>!previous);
        dispatch(fetchAllOrdersAsync({asc:sortAsc}));
        console.log(orders);
      }

    const chooseColor = (status: string) => {
        switch(status){
            case 'pending':
                return "bg-purple-200 text-purple-600"
            case 'dispatched':
                return "bg-yellow-200 text-yellow-600"
            case 'delivered':
                return "bg-green-200 text-green-600"
            case 'cancelled':
                return "bg-red-200 text-red-600"
            default:
                return "bg-purple-200 text-purple-600"
        }
    }

    useEffect(() => {
        dispatch(fetchAllOrdersAsync());
    }, [dispatch])

    
    return (
        <div>
            <div className="overflow-x-auto">
                <div className=" bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
                    <div className="w-full">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left" onClick={()=>handleSort()}>Order No. <span className="w-6 ml-2 inline-block">{sortAsc?<ArrowUpIcon/>:<ArrowDownIcon/>}</span></th> 
                                        <th className="py-3 px-6 text-left">Items</th>
                                        <th className="py-3 px-6 text-center">Total Amount</th>
                                        <th className="py-3 px-6 text-center">Address</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {
                                        orders.map((order: any, index: number) => (

                                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="mr-2">

                                                        </div>
                                                        <span className="font-medium">{order.id}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2 text-left">
                                                    {order.items.map((item: any, index: number) => (
                                                        <div key={index} className="flex items-center flex-wrap">
                                                            <div className="mr-1">
                                                                <img
                                                                    className="w-6 h-6 rounded-full"
                                                                    src={item.thumbnail}
                                                                />
                                                            </div>
                                                            <span>{`${item.title} (${item.quantity}) - $${item.price}`}</span>
                                                        </div>
                                                    ))}
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center">
                                                        ${order.totalAmount}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="inline-block align-middle">
                                                        <p>{order.selectedAddress.name}</p>
                                                        <p>{`${order.selectedAddress.street}, ${order.selectedAddress.city}, ${order.selectedAddress.state}`}</p>
                                                        <p>{`${order.selectedAddress.country}, ${order.selectedAddress.pinCode}`} </p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    {order.id === editableOrderStatus ?
                                                        (
                                                            <select value={order.status} onChange={(e) => handleUpdate(e, order)}>
                                                                <option value="pending">Pending</option>
                                                                <option value="dispatched">Dispatched</option>
                                                                <option value="delivered">Delivered</option>
                                                                <option value="cancelled">Cancelled</option>
                                                            </select>
                                                        )
                                                        :
                                                        (
                                                            <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                                                                {order.status && `${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`}
                                                            </span>
                                                        )
                                                    }
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex item-center justify-center">
                                                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                            <EyeIcon />
                                                        </div>
                                                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110" onClick={()=>setEditableOrderStatus(order.id)}>
                                                            <PencilIcon />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminOrders;