type Attribute = {
  id?: number;
  key: string;
  value: string;
};

interface DefaultAttribute {
  title: string;
  options: string[] | null;
  unit: string[] | null;
}

type Image = {
  id: string;
  image: string;
};

type Product = {
  id: number;
  categories: Category[];
  name: string;
  slug: string;
  description: string;
  discount: number;
  price: string;
  discount_price: string;
  main_image: string;
  images: Image[];
  attributes: Attribute[];
  default_attributes: Attribute[];
  brand: string;
  stock: boolean;
  colors: Color[];
  published_date: string;
  admin_username: string;
  last_update_date: string;
  lats_update_admin_username: string;
};
