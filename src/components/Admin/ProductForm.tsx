import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, selectedProduct as selectProduct, updateProductAsync } from '../ProductList/ProductListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface Props {

}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const ProductForm: React.FC<Props> = ({ }) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    let brands: any[] = [
        {
            "value": "Apple",
            "label": "Apple",
            "checked": false
        },
        {
            "value": "Samsung",
            "label": "Samsung",
            "checked": false
        },
        {
            "value": "OPPO",
            "label": "OPPO",
            "checked": false
        },
        {
            "value": "Huawei",
            "label": "Huawei",
            "checked": false
        },
        {
            "value": "Microsoft Surface",
            "label": "Microsoft Surface",
            "checked": false
        },
        {
            "value": "Infinix",
            "label": "Infinix",
            "checked": false
        },
        {
            "value": "HP Pavilion",
            "label": "HP Pavilion",
            "checked": false
        },
        {
            "value": "Impression of Acqua Di Gio",
            "label": "Impression of Acqua Di Gio",
            "checked": false
        },
        {
            "value": "Royal_Mirage",
            "label": "Royal_Mirage",
            "checked": false
        },
        {
            "value": "Fog Scent Xpressio",
            "label": "Fog Scent Xpressio",
            "checked": false
        },
        {
            "value": "Al Munakh",
            "label": "Al Munakh",
            "checked": false
        },
        {
            "value": "Lord - Al-Rehab",
            "label": "Lord   Al Rehab",
            "checked": false
        },
        {
            "value": "L'Oreal Paris",
            "label": "L'Oreal Paris",
            "checked": false
        },
        {
            "value": "Hemani Tea",
            "label": "Hemani Tea",
            "checked": false
        },
        {
            "value": "Dermive",
            "label": "Dermive",
            "checked": false
        },
        {
            "value": "ROREC White Rice",
            "label": "ROREC White Rice",
            "checked": false
        },
        {
            "value": "Fair & Clear",
            "label": "Fair & Clear",
            "checked": false
        },
        {
            "value": "Saaf & Khaas",
            "label": "Saaf & Khaas",
            "checked": false
        },
        {
            "value": "Bake Parlor Big",
            "label": "Bake Parlor Big",
            "checked": false
        },
        {
            "value": "Baking Food Items",
            "label": "Baking Food Items",
            "checked": false
        },
        {
            "value": "fauji",
            "label": "fauji",
            "checked": false
        },
        {
            "value": "Dry Rose",
            "label": "Dry Rose",
            "checked": false
        },
        {
            "value": "Boho Decor",
            "label": "Boho Decor",
            "checked": false
        },
        {
            "value": "Flying Wooden",
            "label": "Flying Wooden",
            "checked": false
        },
        {
            "value": "LED Lights",
            "label": "LED Lights",
            "checked": false
        },
        {
            "value": "luxury palace",
            "label": "luxury palace",
            "checked": false
        },
        {
            "value": "Golden",
            "label": "Golden",
            "checked": false
        },
        {
            "value": "Furniture Bed Set",
            "label": "Furniture Bed Set",
            "checked": false
        },
        {
            "value": "Ratttan Outdoor",
            "label": "Ratttan Outdoor",
            "checked": false
        },
        {
            "value": "Kitchen Shelf",
            "label": "Kitchen Shelf",
            "checked": false
        },
        {
            "value": "Multi Purpose",
            "label": "Multi Purpose",
            "checked": false
        },
        {
            "value": "AmnaMart",
            "label": "AmnaMart",
            "checked": false
        },
        {
            "value": "Professional Wear",
            "label": "Professional Wear",
            "checked": false
        },
        {
            "value": "Soft Cotton",
            "label": "Soft Cotton",
            "checked": false
        },
        {
            "value": "Top Sweater",
            "label": "Top Sweater",
            "checked": false
        },
        {
            "value": "RED MICKY MOUSE..",
            "label": "RED MICKY MOUSE..",
            "checked": false
        },
        {
            "value": "Digital Printed",
            "label": "Digital Printed",
            "checked": false
        },
        {
            "value": "Ghazi Fabric",
            "label": "Ghazi Fabric",
            "checked": false
        },
        {
            "value": "IELGY",
            "label": "IELGY",
            "checked": false
        },
        {
            "value": "IELGY fashion",
            "label": "IELGY fashion",
            "checked": false
        },
        {
            "value": "Synthetic Leather",
            "label": "Synthetic Leather",
            "checked": false
        },
        {
            "value": "Sandals Flip Flops",
            "label": "Sandals Flip Flops",
            "checked": false
        },
        {
            "value": "Maasai Sandals",
            "label": "Maasai Sandals",
            "checked": false
        },
        {
            "value": "Arrivals Genuine",
            "label": "Arrivals Genuine",
            "checked": false
        },
        {
            "value": "Vintage Apparel",
            "label": "Vintage Apparel",
            "checked": false
        },
        {
            "value": "FREE FIRE",
            "label": "FREE FIRE",
            "checked": false
        },
        {
            "value": "The Warehouse",
            "label": "The Warehouse",
            "checked": false
        },
        {
            "value": "Sneakers",
            "label": "Sneakers",
            "checked": false
        },
        {
            "value": "Rubber",
            "label": "Rubber",
            "checked": false
        },
        {
            "value": "Naviforce",
            "label": "Naviforce",
            "checked": false
        },
        {
            "value": "SKMEI 9117",
            "label": "SKMEI 9117",
            "checked": false
        },
        {
            "value": "Strap Skeleton",
            "label": "Strap Skeleton",
            "checked": false
        },
        {
            "value": "Stainless",
            "label": "Stainless",
            "checked": false
        },
        {
            "value": "Eastern Watches",
            "label": "Eastern Watches",
            "checked": false
        },
        {
            "value": "Luxury Digital",
            "label": "Luxury Digital",
            "checked": false
        },
        {
            "value": "Watch Pearls",
            "label": "Watch Pearls",
            "checked": false
        },
        {
            "value": "Bracelet",
            "label": "Bracelet",
            "checked": false
        },
        {
            "value": "LouisWill",
            "label": "LouisWill",
            "checked": false
        },
        {
            "value": "Copenhagen Luxe",
            "label": "Copenhagen Luxe",
            "checked": false
        },
        {
            "value": "Steal Frame",
            "label": "Steal Frame",
            "checked": false
        },
        {
            "value": "Darojay",
            "label": "Darojay",
            "checked": false
        },
        {
            "value": "Fashion Jewellery",
            "label": "Fashion Jewellery",
            "checked": false
        },
        {
            "value": "Cuff Butterfly",
            "label": "Cuff Butterfly",
            "checked": false
        },
        {
            "value": "Designer Sun Glasses",
            "label": "Designer Sun Glasses",
            "checked": false
        },
        {
            "value": "mastar watch",
            "label": "mastar watch",
            "checked": false
        },
        {
            "value": "Car Aux",
            "label": "Car Aux",
            "checked": false
        },
        {
            "value": "W1209 DC12V",
            "label": "W1209 DC12V",
            "checked": false
        },
        {
            "value": "TC Reusable",
            "label": "TC Reusable",
            "checked": false
        },
        {
            "value": "Neon LED Light",
            "label": "Neon LED Light",
            "checked": false
        },
        {
            "value": "METRO 70cc Motorcycle - MR70",
            "label": "METRO 70cc Motorcycle   MR70",
            "checked": false
        },
        {
            "value": "BRAVE BULL",
            "label": "BRAVE BULL",
            "checked": false
        },
        {
            "value": "shock absorber",
            "label": "shock absorber",
            "checked": false
        },
        {
            "value": "JIEPOLLY",
            "label": "JIEPOLLY",
            "checked": false
        },
        {
            "value": "Xiangle",
            "label": "Xiangle",
            "checked": false
        },
        {
            "value": "lightingbrilliance",
            "label": "lightingbrilliance",
            "checked": false
        },
        {
            "value": "Ifei Home",
            "label": "Ifei Home",
            "checked": false
        },
        {
            "value": "DADAWU",
            "label": "DADAWU",
            "checked": false
        },
        {
            "value": "YIOSI",
            "label": "YIOSI",
            "checked": false
        }
    ]
    let categories: any[] = [
        {
            "value": "smartphones",
            "label": "smartphones",
            "checked": false
        },
        {
            "value": "laptops",
            "label": "laptops",
            "checked": false
        },
        {
            "value": "fragrances",
            "label": "fragrances",
            "checked": false
        },
        {
            "value": "skincare",
            "label": "skincare",
            "checked": false
        },
        {
            "value": "groceries",
            "label": "groceries",
            "checked": false
        },
        {
            "value": "home-decoration",
            "label": "home decoration",
            "checked": false
        },
        {
            "value": "furniture",
            "label": "furniture",
            "checked": false
        },
        {
            "value": "tops",
            "label": "tops",
            "checked": false
        },
        {
            "value": "womens-dresses",
            "label": "womens dresses",
            "checked": false
        },
        {
            "value": "womens-shoes",
            "label": "womens shoes",
            "checked": false
        },
        {
            "value": "mens-shirts",
            "label": "mens shirts",
            "checked": false
        },
        {
            "value": "mens-shoes",
            "label": "mens shoes",
            "checked": false
        },
        {
            "value": "mens-watches",
            "label": "mens watches",
            "checked": false
        },
        {
            "value": "womens-watches",
            "label": "womens watches",
            "checked": false
        },
        {
            "value": "womens-bags",
            "label": "womens bags",
            "checked": false
        },
        {
            "value": "womens-jewellery",
            "label": "womens jewellery",
            "checked": false
        },
        {
            "value": "sunglasses",
            "label": "sunglasses",
            "checked": false
        },
        {
            "value": "automotive",
            "label": "automotive",
            "checked": false
        },
        {
            "value": "motorcycle",
            "label": "motorcycle",
            "checked": false
        },
        {
            "value": "lighting",
            "label": "lighting",
            "checked": false
        }
    ];
      const dispatch:AppDispatch = useDispatch();
      const params:any = useParams();
      const selectedProduct = useSelector(selectProduct);
      const router = useRouter();

      useEffect(() => {
        if (params.id) {
          dispatch(fetchProductByIdAsync(params.id));
        } else {
          dispatch(clearSelectedProduct());
        }
      }, [params.id, dispatch]);

      useEffect(() => {
        if (selectedProduct && params.id) {
          setValue('title', selectedProduct.title);
          setValue('description', selectedProduct.description);
          setValue('price', selectedProduct.price);
          setValue('discountPercentage', selectedProduct.discountPercentage);
          setValue('thumbnail', selectedProduct.thumbnail);
          setValue('stock', selectedProduct.stock);
          setValue('image1', selectedProduct.images[0]);
          setValue('image2', selectedProduct.images[1]);
          setValue('image3', selectedProduct.images[2]);
          setValue('brand', selectedProduct.brand);
          setValue('category', selectedProduct.category);
        }
      }, [selectedProduct, params.id, setValue]);


      const handleDelete = () =>{
        const product = {...selectedProduct};
        product.id = Number(params.id);
        product.deleted = true;
        console.log(product);
        dispatch(updateProductAsync(product));
        toast.success("Product Deleted")
        router.push("/admin");
      }

    return (
        <form
            onSubmit={handleSubmit((data) => {
                const product = { ...data };
                product.images = [
                  product.image1,
                  product.image2,
                  product.image3,
                  product.thumbnail,
                ];
                product.rating = 0;
                delete product['image1'];
                delete product['image2'];
                delete product['image3'];
                product.price = +product.price;
                product.stock = +product.stock;
                product.discountPercentage = +product.discountPercentage;
                console.log(product);

                if (params.id) {
                  product.id = Number(params.id);
                  product.rating = selectedProduct.rating || 0;
                  dispatch(updateProductAsync(product));
                  reset();
                  toast.success("Product Updated")
                } else {
                    product.id=Date.now();
                  dispatch(createProductAsync(product));
                  reset();
                  toast.success("Product Added")
                  //TODO:  on product successfully added clear fields and show a message
                }
                router.push("/admin");
            })}
        >
            <div className="space-y-12 bg-white p-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Add Product
                    </h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Product Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('title', {
                                            required: 'name is required',
                                        })}
                                        id="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    {...register('description', {
                                        required: 'description is required',
                                    })}
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Write a few sentences about product.
                            </p>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="brand"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Brand
                            </label>
                            <div className="mt-2">
                                <select
                                    {...register('brand', {
                                        required: 'brand is required',
                                    })}
                                >
                                    <option value="">--choose brand--</option>
                                    {brands.map((brand,index) => (
                                        <option key={index} value={brand.value}>{brand.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Category
                            </label>
                            <div className="mt-2">
                                <select
                                    {...register('category', {
                                        required: 'category is required',
                                    })}
                                >
                                    <option value="">--choose category--</option>
                                    {categories.map((category,index) => (
                                        <option key={index} value={category.value}>{category.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Price
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="number"
                                        {...register('price', {
                                            required: 'price is required',
                                            min: 1,
                                            max: 10000,
                                        })}
                                        id="price"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="discountPercentage"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Discount Percentage
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="number"
                                        {...register('discountPercentage', {
                                            required: 'discountPercentage is required',
                                            min: 0,
                                            max: 100,
                                        })}
                                        id="discountPercentage"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="stock"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Stock
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="number"
                                        {...register('stock', {
                                            required: 'stock is required',
                                            min: 0,
                                        })}
                                        id="stock"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label
                                htmlFor="thumbnail"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Thumbnail
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('thumbnail', {
                                            required: 'thumbnail is required',
                                        })}
                                        id="thumbnail"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label
                                htmlFor="image1"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Image 1
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('image1', {
                                            required: 'image1 is required',
                                        })}
                                        id="image1"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label
                                htmlFor="image2"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Image 2
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('image2', {
                                            required: 'image is required',
                                        })}
                                        id="image2"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label
                                htmlFor="image2"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Image 3
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('image3', {
                                            required: 'image is required',
                                        })}
                                        id="image3"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Extra{' '}
                    </h2>

                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">
                                By Email
                            </legend>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="comments"
                                            name="comments"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label
                                            htmlFor="comments"
                                            className="font-medium text-gray-900"
                                        >
                                            Comments
                                        </label>
                                        <p className="text-gray-500">
                                            Get notified when someones posts a comment on a posting.
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="candidates"
                                            name="candidates"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label
                                            htmlFor="candidates"
                                            className="font-medium text-gray-900"
                                        >
                                            Candidates
                                        </label>
                                        <p className="text-gray-500">
                                            Get notified when a candidate applies for a job.
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="offers"
                                            name="offers"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label
                                            htmlFor="offers"
                                            className="font-medium text-gray-900"
                                        >
                                            Offers
                                        </label>
                                        <p className="text-gray-500">
                                            Get notified when a candidate accepts or rejects an offer.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link
                    href="/admin"
                    className="text-sm font-semibold leading-6 text-gray-900"
                >
                    Cancel
                </Link>

                {selectedProduct && <div
                    onClick={(e)=>handleDelete()}
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Delete
                    </div>
                }

                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default ProductForm;