import { NextRequest, NextResponse } from "next/server";

// In-memory orders (replace with a database in production)
let orders: any[] = [];

// GET: Fetch all orders
export async function GET() {
    return NextResponse.json(orders, { status: 200 });
}

// GET: Fetch order by ID
export async function getOrdersById(req: NextRequest) {
    try {
        const { id } = await req.json();
        const order = orders.find((order) => order.id === id);
        
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

// POST: Add a new order
export async function POST(req: NextRequest) {
    try {
        const newOrder = await req.json();
        const orderId = Date.now();
        
        const order = { id: orderId, status: "pending", ...newOrder };
        orders.push(order);

        return NextResponse.json({ message: "Order placed successfully", order }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const orderId = parseInt(searchParams.get("id") || "");
        const updateOrder = await req.json();

        const orderIndex = orders.findIndex((order) => order.id === orderId);
        if (orderIndex === -1) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }
        
        orders[orderIndex].status = updateOrder.status; 

        return NextResponse.json({ message: "Order placed successfully", order:orders[orderIndex],index:orderIndex }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
