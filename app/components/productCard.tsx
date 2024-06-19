
interface Product {
    name: string;
    description: string;
    price: number;
}
const ProductCard:React.FC<Product> = (p: Product) => {
    return (
        <div className="flex flex-row bg-white rounded-lg shadow-lg p-4">
                <div className="w-32 h-32 bg-black"></div>
                <div className="mt-4">
                    <p className="text-black text-xl font-bold">{p.name}</p>
                    <p className="text-gray-500">${p.price}</p>
                </div>
            </div>
    );
}

export default ProductCard;