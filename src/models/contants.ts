export const API_URL=""

export function discountPrice(item:any){
    return Math.round((item.price*(1-item.discountPercentage/100))*100)/100;
}