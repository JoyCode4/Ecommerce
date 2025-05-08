import { withDbConnect } from "../../../lib/withDBConnection";
import Order from "../../../models/Order";
import { NextRequest, NextResponse } from "next/server";

// In-memory orders (replace with a database in production)
let orders: any[] = [];

// GET: Fetch all orders
export const GET = withDbConnect(async (req:NextRequest) => {
    try{
        const { searchParams } = new URL(req.url);
        const userid = searchParams.get('userid');

        if (userid) {
            const orders = await Order.find({user:userid});
    
            if (!orders) {
                return NextResponse.json({ error: "No Order found" }, { status: 404 });
            }
    
            return NextResponse.json(orders, { status: 200 });
        }else{
            const orders = await Order.find({});
            return NextResponse.json(orders, { status: 200 });
        }
    }catch(error){
        console.error("GET error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
});

// POST: Add a new order
export const POST = withDbConnect(async (req:NextRequest) => {
    try {
        const newOrder = await req.json();
        const order = new Order({status:"pending", ...newOrder});
        const doc = await order.save();

        return NextResponse.json({ message: "Order placed successfully", order:doc }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request"+error }, { status: 400 });
    }
});

export const PATCH = withDbConnect(async (req:NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get("id");
        const updateOrder = await req.json();

        const orderIndex = orders.findIndex((order) => order.id === orderId);
        const order = await Order.findById(orderId);
        order.status = updateOrder.status;
        const doc = await order.save(); 

        return NextResponse.json({ message: "Order placed successfully", order:doc,index:orderIndex }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
});
