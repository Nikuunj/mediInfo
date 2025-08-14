interface ParamProps {
    params: Promise<{ itemId: string }>
}

async function SingleItem({ params }: ParamProps) {
    const { itemId } = await params;
    return (
        <div>{itemId}</div>
    )
}

export default SingleItem