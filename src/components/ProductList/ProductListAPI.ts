import { API_URL } from "../../lib/contants"
export function fetchAllProductsAdmin(){
    return new Promise(async (resolve)=>{
        // const response = await fetch("api/productlist")
        const response = await fetch(`${API_URL}/api/productlist?role=admin`)
        const data = await response.json()
        // console.log(data);
        resolve({data})
    })
}

export function fetchAllProducts(){
    return new Promise(async (resolve)=>{
        // const response = await fetch("api/productlist")
        const response = await fetch(`${API_URL}/api/productlist?role=user`)
        let data = await response.json()
        resolve({data})
    })
}

export function fetchProductById(id:string){
    return new Promise(async (resolve)=>{
        // const response = await fetch("api/productlist")
        const response = await fetch(`${API_URL}/api/productlist?id=${id}`)
        const data = await response.json()
        resolve({data})
    })
}

export function createProduct(product:any){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${API_URL}/api/productlist`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(product)
        })
        const data = await response.json()
        resolve({data:data.product})
    })
}

export function updateProduct(product:any){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${API_URL}/api/productlist?id=${product.id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(product)
        })
        const data = await response.json()
        console.log(data.product);
        resolve({data:data.product})
    })
}

