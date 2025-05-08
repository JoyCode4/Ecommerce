import { API_URL } from "../../lib/contants"
export function addOrder(item:any){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${API_URL}/api/orders`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(item)
        })
        const data = await response.json()
        resolve({data:data.order})
    })
}
export function fetchProductById(id:string){
    return new Promise(async (resolve)=>{
        // const response = await fetch("api/productlist")
        const response = await fetch(`${API_URL}/api/productlist`)
        const data = await response.json()
        const product = data.find((p:any)=>p.id==id)
        resolve({data:product})
    })
}


export function fetchAllOrders(){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${API_URL}/api/orders`)
        const data = await response.json()
        console.log(data);
        resolve({data:data})
    })
}

export function updateOrder(item:any){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${API_URL}/api/orders?id=${item.id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(item)
        })
        const data = await response.json()
        console.log(data);
        resolve({data})
    })
}

