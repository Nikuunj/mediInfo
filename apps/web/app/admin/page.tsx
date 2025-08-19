import { getAllProduct } from '@/actions/item';
import ItemAll from '@/components/itemAll';

async function Admin() {

    const product = await getAllProduct();

    if (!Array.isArray(product.items)) {
        return (
            <div className="bg-white text-black flex flex-wrap min-h-screen justify-center items-center">
                <p>No products found</p>
            </div>
        );
    }

    const renderItems = (product.items ?? []).map((item: any) => (
        <ItemAll
            key={item.id}
            admin={true}
            productDetail={{
                imageUrl: item.url,
                id: item.id,
                name: item.name
            }}
        />
    ));



    return (
        <div className="bg-white text-black flex flex-wrap min-h-screen justify-center items-center gap-10">
            {renderItems}
        </div>
    )
}

export default Admin