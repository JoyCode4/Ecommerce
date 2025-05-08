import { NextRequest, NextResponse } from "next/server";
import { withDbConnect } from "../../../lib/withDBConnection";
import Product from "../../../models/Product";

// GET: Fetch all products
export const GET = withDbConnect(async (req:NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const role = searchParams.get('role')

    if (id) {
      const product = await Product.findById(id);

      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }

      return NextResponse.json(product, { status: 200 });
    } else {
      if(role=='admin'){
        const products = await Product.find({});
        return NextResponse.json(products, { status: 200 });
      }
      const products = await Product.find({deleted:false});
      return NextResponse.json(products, { status: 200 });
    }
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
});

export const POST = withDbConnect(async (req: NextRequest) => {
  try {
    const newProduct = await req.json();
    const product = new Product(newProduct);
    const doc = await product.save();
    return NextResponse.json({ message: "Products added to Products", product:doc}, { status: 201 });
  } catch (error) {
      return NextResponse.json({ error: "Invalid request"+error }, { status: 400 });
  }
});

export const PATCH = withDbConnect(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");
      const productInfo = await req.json();
      const product = await Product.findByIdAndUpdate(productId,productInfo,{new:true});
      
      return NextResponse.json({ message: "Item updated", product:product}, { status: 201 });
  } catch (error) {
      return NextResponse.json({ error: "Invalid request"+error }, { status: 400 });
  }
});
