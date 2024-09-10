type ProductCategoryCount = {
    id: number;
    name: string;
    icon: string;
    count: number;
}

type ProductCount = {
    all: number;
    categories: ProductCategoryCount[];
}