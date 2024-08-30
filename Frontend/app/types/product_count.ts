type ProductCategoryCount = {
    id: Number;
    name: string;
    icon: string;
    count: Number;
}

type ProductCount = {
    all: Number;
    categories: ProductCategoryCount[];
}