import { API_URL } from "../../models/contants";

export function addToCart(item:any){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${API_URL}/api/cart`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(item)
        })
        const data = await response.json()
        console.log(data);
        resolve({data:data.cart})
    })
}

export function fetchCartItemsByUserId(id:any){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${API_URL}/api/cart?userid=${id}`);
        const data = await response.json();
        resolve({data})
    })
}

export function updateCart(item:any){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${API_URL}/api/cart`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(item)
        })
        const data = await response.json()
        console.log(data.cart);
        resolve({data:data.cart})
    })
}
export function deleteCart(id:any,userId:any){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${API_URL}/api/cart`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id:id,user:userId})
        })
        const data = await response.json()
        resolve({data:data.cart})
    })
}

export function resetCart(userId:any){
    return new Promise(async (resolve)=>{
        const response:any = await fetchCartItemsByUserId(userId);
        const items = response.data;
        console.log(items);
        for(let i of items){
            await deleteCart(i.product.id,userId);
        }

        resolve({status:"success",data:[]})
    })
}