export function fetchProduct(id:number){
    return new Promise(async (resolve)=>{
        const response = await fetch("api/product/"+id)
        const data = await response.json()
        resolve(data)
    })
}