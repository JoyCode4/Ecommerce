import { API_URL } from "../../lib/contants"
import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_CREATE_ROOT_CONTAINERS } from "react-dom/client"
export function fetchUsers(){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${API_URL}/api/users`)
        const data = await response.json()
        resolve(data)
    })
}

