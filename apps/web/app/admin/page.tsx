import { getAllProduct } from '@/actions/item';
import ItemAll from '@/components/itemAll';

async function Admin() {

    const product = await getAllProduct();
    
    return (
        <div className="bg-white text-black flex flex-wrap min-h-screen justify-center items-center">
            <ItemAll admin={false} productDetail={{ imageUrl: '', id: '21122', name: 'product Name' }} />
        </div>
    )
}

export default Admin