import { API_URL } from "@/models/contants"
import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_CREATE_ROOT_CONTAINERS } from "react-dom/client"
export function fetchUsers(){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${API_URL}/api/users`)
        const data = await response.json()
        resolve(data)
    })
}

export function createUser(userData:any){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${API_URL}/api/users`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        })
        const data = await response.json()
        console.log(data);
        resolve({data})
    })
}

export function checkUser(loginInfo:any){
    return new Promise(async (resolve,reject)=>{
        const response = await fetch(`${API_URL}/api/users`);
        const data = await response.json()
        const user = data.find((user:any)=>user.email===loginInfo.email);
        if(user){
            if(user.password === loginInfo.password){
                resolve({data:user})
            }else{
                console.log("Wrong Credentials")
                reject({message:"User not found or Password not correct"})
            }
        }else{
            console.log("User not found")
            reject({message:"User not found or Password not correct"})
        }
    })
}

export function signOut(userId:DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_CREATE_ROOT_CONTAINERS){
    return new Promise(async (resolve,reject)=>{
        resolve({data:'success'});
    })
}


