type ProductCategoryCount = {
    id: Number;
    name: string;
    color: string;
    count: Number;
}

type ProductCount = {
    all: Number;
    categories: ProductCategoryCount[];
}