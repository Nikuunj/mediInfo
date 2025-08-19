import { getOneItems } from "@/actions/item";

interface ParamProps {
  params: Promise<{ itemId: string }>;
}

async function EditItem({ params }: ParamProps) {
  const { itemId } = await params;
  const product = await getOneItems(itemId);

    if (!product.item) {
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
        );
    }

    return (
        <div>
            hi here from product edit
        </div>  
    );
}

export default EditItem;