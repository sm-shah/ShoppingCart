export class ProductsModel {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    title: string;
    qty: number;
}

export class ProductsLocalStorageModel {
    products = new Array<ProductsModel>();
}

