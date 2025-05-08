'use client'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import CartPage from '../Cart/CartPage'
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, selectCartTotalAmount, selectCartTotalItems } from '../Cart/CartSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AppDispatch } from '../../lib/store';
import { addToOrderAsync, selectCurrentOrder } from '../Order/OrderSlice';
import { selectUserInfo, updateUserAsync } from '../User/UserSlice';
import { toast } from 'react-toastify';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
interface Props {

}

interface  IFormInput {
    email: string
    firstName: string
    lastName: string
    street: string
    city: string
    pinCode: number
    state: string
    country: string
    phone:String
  }


// Suggested code may be subject to a license. Learn more: ~LicenseLog:1406467835.
const Checkout: React.FC<Props> = ({ }) => {
    const items = useSelector(selectCart);
    const user = useSelector(selectUserInfo);
    const currentOrder = useSelector(selectCurrentOrder);
    const totalAmount = useSelector(selectCartTotalAmount);
    const totalItems = useSelector(selectCartTotalItems);
    // const [totalAmount,setTotalAmount] = useState(0);
    // const [totalItems,setTotalItems] = useState(0);
    const dispatch:AppDispatch = useDispatch();
    const router = useRouter();
    useEffect(()=>{
        if(items.length==0){
            router.push("/");
        }
    },[])

    useEffect(()=>{
        if(currentOrder && currentOrder.paymentMethod === 'cash'){
            router.push(`/ordersuccess/${currentOrder.id}`);
        }else if(currentOrder){
            router.push(`/stripe-checkout`);
        }
    },[currentOrder])

    const [add,setAdd] = useState(null);
    const [paymentMethod,setPaymentMethod] = useState('cash');
    const { register, handleSubmit, formState: { errors },reset } = useForm<IFormInput>();

    const handlePaymentMethodChange = (e:any) => {
        setPaymentMethod(e.target.value);
    };
    
    const handleAdd = (e:any)=>{
        setAdd(user.addresses[e.target.value]);
    }

    const handleOrder = (e:any)=>{
        e.preventDefault();
        if(paymentMethod == null || paymentMethod=="" || add==null ){
            if(paymentMethod == null || paymentMethod==""){
                toast.error("Please select a payment method");
            }
            if(add==null){
                toast.error("Please select an address")
            }
        }else{
            const order = {items,totalAmount,totalItems, user:user.id, paymentMethod,selectedAddress : add};
            dispatch(addToOrderAsync(order));
            toast.success("Order Placed");
        }
    }

    return (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
            <div className="col-span-3">
            <div className="bg-white p-5 lg:p-10">
                <form onSubmit={
                    handleSubmit((data:any)=>{
                        const newAddress = { ...data, id: Date.now() };
                        const updatedUser = {
                            ...user,
                            addresses: [...user.addresses, newAddress],
                        };
                        dispatch(updateUserAsync(updatedUser));
                        reset();
                        toast.success("Address Added successfully");
                    })
                } noValidate>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
                            <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                        First name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="first-name"
                                            {...register('firstName',{required:'First Name is required'})}
                                            type="text"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                        {errors.firstName && <p className="text-red-500">{String(errors.firstName.message)}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                        Last name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="last-name"
                                            {...register('lastName',{required:'Last Name is required'})}
                                            type="text"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                        {errors.lastName && <p className="text-red-500">{String(errors.lastName.message)}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            {...register('email',{required:'Email is required',pattern:{value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "Email Not Valid"}})}
                                            type="email"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                        {errors.email && <p className="text-red-500">{String(errors.email.message)}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                        Phone
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="phone"
                                            {...register('phone',{required:'Phone is required'})}
                                            type="tel"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                        {errors.phone && <p className="text-red-500">{String(errors.phone.message)}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                        Country
                                    </label>
                                    <div className="mt-2 grid grid-cols-1">
                                        <select
                                            id="country"
                                            {...register('country',{required:'Country is required'})}
                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        >
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Mexico</option>
                                        </select>
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        />
                                        {errors.country && <p className="text-red-500">{String(errors.country.message)}</p>}
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                                        Street address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="street-address"
                                            {...register('street',{required:'Street is required'})}
                                            type="text"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                        {errors.street && <p className="text-red-500">{String(errors.street.message)}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="city"
                                            {...register('city',{required:'City is required'})}
                                            type="text"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                        {errors.city && <p className="text-red-500">{String(errors.city.message)}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                                        State / Province
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="region"
                                            {...register('state',{required:'State / Province is required'})}
                                            type="text"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                        {errors.state && <p className="text-red-500">{String(errors.state.message)}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                                        ZIP / Postal code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="postal-code"
                                            {...register('pinCode',{required:'ZIP / Postal Code is required'})}
                                            type="text"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                        {errors.pinCode && <p className="text-red-500">{String(errors.pinCode.message)}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm/6 font-semibold text-gray-900"onClick={()=>reset()}>
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add Address
                                </button>
                            </div>
                        </div>

                        <div className="pb-12">
                            <h2 className="text-base/7 font-semibold text-gray-900">Addresses</h2>
                            <p className="mt-1 text-sm/6 text-gray-600">
                                Choose from Existing Addresses
                            </p>
                            <ul role="list" className="divide-y divide-gray-100">
                                {user.addresses.map((address:any,index:number) => (
                                    <li key={index} className="flex justify-between gap-x-6 py-5">
                                    <div className="flex min-w-0 gap-x-4">
                                        <input
                                            id={index.toString()}
                                            name="address"
                                            type="radio"
                                            value={index}
                                            onChange={(e)=>handleAdd(e)}
                                            checked={add === user.addresses[index]}
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white mt-5 before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                            />
                                        {/* <img alt="" src={address.imageUrl} className="size-12 flex-none rounded-full bg-gray-50" /> */}
                                        <label htmlFor={index.toString()}>
                                        <div className="min-w-0 flex-auto">
                                        <p className="text-sm/6 font-semibold text-gray-900">{address.firstName} {address.lastName}</p>
                                        <p className="mt-1 truncate text-xs/5 text-gray-500">Email : {address.email}</p>
                                        <p className="mt-1 truncate text-xs/5 text-gray-500">{address.street}, {address.pinCode}</p>
                                        </div>
                                        </label>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm/6 text-gray-900">Phone: {address.phone}</p>
                                        <p className="mt-1 truncate text-xs/5 text-gray-500">{address.city}, {address.state}</p>
                                        <p className="mt-1 truncate text-xs/5 text-gray-500">{address.country}</p>
                                    </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-10 space-y-10">
                                <fieldset>
                                    <legend className="text-sm/6 font-semibold text-gray-900">Payment Methods</legend>
                                    <p className="mt-1 text-sm/6 text-gray-600">Choose One.</p>
                                    <div className="mt-6 space-y-6">
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="cash"
                                                name="payments"
                                                type="radio"
                                                value="cash"
                                                onChange={(e)=>handlePaymentMethodChange(e)}
                                                checked={paymentMethod === 'cash'}
                                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                                />
                                            <label htmlFor="push-everything" className="block text-sm/6 font-medium text-gray-900">
                                                Cash
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="card"
                                                name="payments"
                                                type="radio"
                                                value="card"
                                                onChange={(e)=>handlePaymentMethodChange(e)}
                                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                                checked={paymentMethod === 'card'}
                                                />
                                            <label htmlFor="push-email" className="block text-sm/6 font-medium text-gray-900">
                                                Card
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="online"
                                                name="payments"
                                                type="radio"
                                                value="online"
                                                onChange={(e)=>handlePaymentMethodChange(e)}
                                                checked={paymentMethod === 'online'}
                                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                            />
                                            <label htmlFor="push-nothing" className="block text-sm/6 font-medium text-gray-900">
                                                Online (UPI)
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>

                    
                </form>
            </div>
            </div>
            <div className="lg:col-span-2">
            <div className="bg-white p-5 lg:p-10">
                {/* <CartPage buttonName='Pay and Order' hrefName="/" handleOrder={handleOrder} totalAmount={totalAmount} setTotalAmount={setTotalAmount} totalItems={totalItems} setTotalItems={setTotalItems}/> */}
                <CartPage buttonName='Pay and Order' hrefName="/" handleOrder={handleOrder} />
            </div>
            </div>
        </div>
    )
}
export default Checkout;
