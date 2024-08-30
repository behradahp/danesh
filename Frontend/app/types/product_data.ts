type Color = {
  hex: string;
  name: string;
}

type ProductData = {
    categories: Category[];
    name: string;
    description: string;
    discount_price: string;
    price: string;
    main_image: File | null;
    images: File[];
    attributes: Attribute[];
    brand: string;
    stock: boolean;
    colors: Color[];
  }