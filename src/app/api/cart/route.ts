import { NextRequest, NextResponse } from "next/server";

// In-memory cart (replace with a database in production)
let cart: any[] = [
];

// GET: Fetch all cart items
export async function GET() {
    return NextResponse.json(cart, { status: 200 });
}

// POST: Add a new item to the cart
export async function POST(req: NextRequest) {
    try {
        const newItem = await req.json();

        // Check if the product already exists in the cart
        const existingItem = cart.find((item) => item.id === newItem.id && item.user === newItem.user);
        let item = {};

        if (existingItem) {
            existingItem.quantity += newItem.quantity || 1; // Update quantity
        } else {
            item={ id: Date.now(),quantity:1, ...newItem };
            cart.push(item); // Add new item
        }
        if(existingItem){
            return NextResponse.json({ message: "Item added to cart", cart:{...existingItem,quantity:existingItem.quantity+1}}, { status: 201 });
        }else{
            return NextResponse.json({ message: "Item added to cart", cart:item }, { status: 201 });
        }

        
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

// PATCH: Update an item in the cart
export async function PATCH(req: NextRequest) {
    try {
        const { id, quantity } = await req.json();

        const item = cart.find((item) => item.id === id);
        if (!item) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        item.quantity = quantity ?? item.quantity; // Update only the quantity
        return NextResponse.json({ message: "Item updated", cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

// DELETE: Remove an item from the cart
export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        cart = cart.filter((item) => item.id !== id);
        return NextResponse.json({ message: "Item removed", cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

