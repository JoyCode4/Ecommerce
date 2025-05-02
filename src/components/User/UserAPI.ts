export function fetchLoggedInUser(id:any){
    return new Promise(async (resolve)=>{
        const response = await fetch(`/api/users?id=${id}`)
        const data = await response.json()
        resolve({data})
    })
}
export function fetchLoggedInUserOrders(id:any){
    return new Promise(async (resolve)=>{
        const response = await fetch(`api/orders?userid=${id}`)
        const orders = await response.json()
        resolve({data:orders})
    })
}

export function updateUser(userId:any, updatedUser:any) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/api/users?id=${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userInfo: updatedUser })
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                console.log("User updated with Address successfully:", data);
                resolve({data:data.user});
            } else {
                console.error("Error updating address:", data.error);
                reject({ message: data.error });
            }
        } catch (error:any) {
            console.error("Request failed:", error);
            reject({ message: error.message });
        }
    });
}