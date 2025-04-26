import { API_URL } from "@/models/contants";

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
        resolve({data:data.cart})
    })
}

export function fetchCartItemsByUserId(id:any){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${API_URL}/api/cart`);
        const data = await response.json()
        const result = data.filter((d:any)=>d.user == id);
        resolve({data:result})
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
export function deleteCart(id:number){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${API_URL}/api/cart`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id})
        })
        const data = await response.json()
        console.log(data.cart);
        resolve({data:data.cart})
    })
}

export function resetCart(userId:number){
    return new Promise(async (resolve)=>{
        const response:any = await fetchCartItemsByUserId(userId);
        const items = response.data;
        for(let i of items){
            await deleteCart(i.id);
        }

        resolve({status:"success",data:[]})
    })
}