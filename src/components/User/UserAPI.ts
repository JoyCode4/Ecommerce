export function fetchLoggedInUser(id:number){
    return new Promise(async (resolve)=>{
        const response = await fetch("api/users/")
        const res = await response.json()
        const data = res.find((user:any)=>user.id===id);
        resolve({data})
    })
}
export function fetchLoggedInUserOrders(id:number){
    return new Promise(async (resolve)=>{
        const response = await fetch("api/orders")
        const orders = await response.json()
        const data = (orders && orders.length>0)?orders.filter((order:any)=>order.user.id===id):[];
        resolve({data})
    })
}

export function updateUser(userId:number, updatedUser:any) {
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