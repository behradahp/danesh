type Attribute = {
    key: string;
    value: string;
}

type Product = {
    id: Number;
    category_id: Number;
    name: string;
    description: string;
    discount: number;
    price: Number;
    main_image: string;
    discount_price: string;
    images: string[];
    attributes: Attribute[];
    published_date: string;
    admin_username: string;
    lats_update_admin_username: string;
}