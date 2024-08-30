type Attribute = {
    key: string;
    value: string;
}

type Image = {
    id: string;
    image: string;
}

type Product = {
    id: Number;
    categories: Category[];
    name: string;
    description: string;
    discount: number;
    price: Number;
    discount_price: string;
    main_image: string;
    images: Image[];
    attributes: Attribute[];
    brand: string;
    stock: boolean;
    colors: Color[];
    published_date: string;
    admin_username: string;
    last_update_date: string;
    lats_update_admin_username: string;
}