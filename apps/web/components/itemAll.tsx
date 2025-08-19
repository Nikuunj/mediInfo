"use client"

import { FilePenLine, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation'
import Link from 'next/link';

interface IntemAllPropos {
    admin: boolean;
    productDetail: {
        imageUrl: string;
        name: string;
        id: string;
    }
}

function ItemAll({ admin, productDetail }: IntemAllPropos) {

    function handleRouteEdit() {
        redirect(`/admin/${productDetail.id}`)
    }

    function handleRoute() {
        redirect(`/item/${productDetail.id}`)
    }

    return (
        <div className="bg-gray-200 shadow-2xl p-3 rounded-lg space-y-2.5 min-h-72 flex flex-col justify-between">
            {/* Content that should be clickable for navigation */}
            <Link 
                href={`item/${productDetail.id}`}
                rel="noopener noreferrer"
                className="flex-1 space-y-3">
                <div>
                    <Image
                        className='max-w-64 h-36 rounded-lg'
                        src={productDetail.imageUrl}
                        width={500}
                        height={500}
                        alt="image of product"
                    />
                </div>
                
                <h2 className='font-bold text-2xl capitalize break-words max-w-64'>
                    {productDetail.name}
                </h2>
            </Link>

            {/* Buttons outside of Link */}
            <div>
                { !admin && 
                <div className='justify-end flex'>
                    <button className='text-end cursor-pointer capitalize font-semibold text-blue-600 underline' onClick={handleRoute}>
                        more details...
                    </button>
                </div>
                }

                { admin && (
                    <div className='flex justify-between'>
                        <button className='cursor-pointer' onClick={handleRouteEdit}>
                            <FilePenLine className='text-gray-500'/>
                        </button>
                        <button className='text-red-600 cursor-pointer' onClick={() => console.log('click')
                        }>
                            <Trash2 />
                        </button>
                    </div>
                ) }
            </div>
        </div>
    )
}

export default ItemAll