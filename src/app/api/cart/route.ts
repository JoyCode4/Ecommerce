import { withDbConnect } from "../../../lib/withDBConnection";
import Cart from "../../../models/cart";
import { NextRequest, NextResponse } from "next/server";

// In-memory cart (replace with a database in production)
let cart: any[] = [
];

export const GET = withDbConnect(async (req:NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userid = searchParams.get('userid');

    if (userid) {
      const cartByUser = await Cart.find({user:userid}).populate("user");

      if (!cartByUser) {
        return NextResponse.json({ error: "No items found" }, { status: 404 });
      }

      return NextResponse.json(cartByUser, { status: 200 });
    } else {
      const items = await Cart.find({});
      return NextResponse.json(items, { status: 200 });
    }
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
});

// POST: Add a new item to the cart
export const POST = withDbConnect(async (req:NextRequest) => {
    try {
        const newItem = await req.json();
        // const existingItem = await Cart.findOneAndUpdate({user:newItem.user,product:newItem.product.id},{ $inc: { quantity: 1 } },{ new: true });
        // console.log(existingItem);
        // if (!existingItem) {
            const item = new Cart({ quantity:1, user:newItem.user,product:{...newItem.product} });
            console.log(item);
            const doc = await item.save();
            return NextResponse.json({ message: "Item added to cart", cart:doc }, { status: 201 });
        // } else {
        //     return NextResponse.json({ message: "Item added to cart", cart:existingItem}, { status: 201 });// Update quantity
        // }
    } catch (error) {
        return NextResponse.json({ error: "Invalid request"+error }, { status: 400 });
    }
});

// PATCH: Update an item in the cart
export const PATCH = withDbConnect(async (req:NextRequest) => {
    try {
        const { product, quantity } = await req.json();

        const item = await Cart.findOneAndUpdate({'product.id':product.id},{quantity:quantity},{new:true});
        if (!item) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Item updated", cart:item }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
});

// DELETE: Remove an item from the cart
export const DELETE = withDbConnect(async (req:NextRequest) => {
    try {
        const { id,user } = await req.json();

        if (!id) {
         return NextResponse.json({ error: "Item Id is required" }, { status: 400 });
        }
      
        // Find and delete all cart items for the user
        console.log(id,user)
        const result = await Cart.findOneAndDelete({'product.id':id});
      
        // If no items were deleted
        if (!result) {
            return NextResponse.json({ message: `No cart items found for this user.`}, { status: 404 });
        }
      
          // Return a success response
        return NextResponse.json(
            { message: "Cart Item deleted successfully." },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
});

