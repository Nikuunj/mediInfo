import { getOneItems } from "@/actions/item";
import Image from "next/image";
import Link from "next/link";

interface ParamProps {
    params: Promise<{ itemId: string }>
}

async function SingleItem({ params }: ParamProps) {
    const { itemId } = await params;
    const product = await getOneItems(itemId);

    console.log(product.item);
    if(!product.item) {
        return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                Product Not Found
            </h2>
            <p className="text-slate-500 text-lg">
                The item you're looking for doesn't exist or has been removed.
            </p>
            </div>
        </div>
    )}
    return (
        <div className="p-5">
            <div className={" shadow-2xl  rounded-2xl border border-zinc-300 flex flex-col md:flex-row py-5 md:py-0 justify-between px-5 items-center min-h-screen gap-5 bg-zinc-50"}>

                 <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/2 flex-shrink-0">
                    <div className="relative w-full items-center flex  aspect-square max-w-md mx-auto md:max-w-none md:h-auto">
                        <Image 
                            src={product.item.url} 
                            height={600} 
                            width={600} 
                            alt={product.item.name || "Product image"}
                            className="object-contain bg-red-600 rounded-lg shadow-2xl md:max-h-[500px] lg:max-h-[600px] xl:max-h-[700px]"
                            priority
                        />
                    </div>
                </div>
                <div className="md:max-w-1/2 break-words space-y-7 max-w-full">
                    <h2 className={"font-bold text-3xl capitalize"}>
                        {product.item.name}
                    </h2>

                    <h2 className={"font-semibold text-2xl capitalize"}>
                        <p className="font-bold underline">
                            description
                        </p>
                        {product.item.description}
                    </h2>
                    <h2 className={"font-semibold text-2xl capitalize"}>
                        <p className="font-bold underline">
                            Use Of
                        </p>
                        {product.item.UseOf}
                    </h2>

                    
                    {product.item.shopUrl && product.item.price  && <div className="flex items-center gap-2"> 
                        <h2 className={" text-2xl capitalize text-green-700"}>
                            ₹ {product.item.price}
                        </h2>
                        <Link
                            href={product.item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out"
                        >
                            Buy Now
                        </Link>
                    </div>}

                </div>
            </div>
        </div>
    )

    
}

export default SingleItem