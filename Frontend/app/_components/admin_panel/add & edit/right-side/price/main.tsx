import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { wordifyRialsInTomans } from "@/app/functions/wordifyfa";

interface PriceInputEvent extends Event {
  data?: string;
}

const ProductPrice = ({
  productPrice,
  productDiscountPrice,
  productData,
  setProductData,
  reset,
}: {
  productPrice?: string;
  productDiscountPrice?: string;
  productData: ProductData;
  setProductData: Dispatch<SetStateAction<ProductData>>;
  reset: boolean;
}) => {
  const [priceQuery, setPriceQuery] = useState<string>("");
  const [priceValue, setPriceValue] = useState<string>("");
  const [wordifyPrice, setWordifyPrice] = useState<string>("");

  const handlePriceQuery = (e: ChangeEvent<HTMLInputElement>) => {
    const x: PriceInputEvent = e.nativeEvent;

    if (x.data === undefined) return;

    let newValue = "";
    if (x.data) {
      newValue = priceValue + x.data;
    } else if (priceValue.length != 0) {
      newValue = priceValue.slice(0, priceValue.length - 1);
    } else {
      newValue = "";
    }
    setPriceValue(newValue);
    setProductData({ ...productData, price: newValue });
    setPriceQuery(Number(newValue).toLocaleString("fa"));
    setWordifyPrice(wordifyRialsInTomans(newValue + "0"));
  };

  const [discountPriceQuery, setDiscountPriceQuery] = useState<string>("");
  const [discountPriceValue, setDiscountPriceValue] = useState<string>("");
  const [wordifyDiscountPrice, setWordifyDiscountPrice] = useState<string>("");

  const handleDiscountPriceQuery = (e: ChangeEvent<HTMLInputElement>) => {
    const x: PriceInputEvent = e.nativeEvent;

    if (x.data === undefined) return;

    let newValue = "";
    if (x.data) {
      newValue = discountPriceValue + x.data;
    } else if (discountPriceValue.length != 0) {
      newValue = discountPriceValue.slice(0, discountPriceValue.length - 1);
    } else {
      newValue = "";
    }
    setDiscountPriceValue(newValue);
    setProductData({ ...productData, discount_price: newValue });
    setDiscountPriceQuery(Number(newValue).toLocaleString("fa"));
    setWordifyDiscountPrice(wordifyRialsInTomans(newValue + "0"));
  };

  useEffect(() => {
    if (reset) {
      setPriceQuery("");
      setPriceValue("");
      setWordifyPrice("");

      setDiscountPriceQuery("");
      setDiscountPriceValue("");
      setWordifyDiscountPrice("");
    }
  }, [reset]);

  useEffect(() => {
    if (productPrice) {
      setPriceValue(productPrice);
      setPriceQuery(Number(productPrice).toLocaleString("fa"));
      setWordifyPrice(wordifyRialsInTomans(productPrice + "0"));
    }

    if (productDiscountPrice) {
      setDiscountPriceValue(productDiscountPrice.toString());
      setDiscountPriceQuery(Number(productDiscountPrice).toLocaleString("fa"));
      setWordifyDiscountPrice(wordifyRialsInTomans(productDiscountPrice + "0"));
    }
  }, [productPrice, productDiscountPrice]);

  return (
    <>
      <div className='h-[20px]'></div>
      {/* title */}
      <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mb-[5px]'>
        قیمت
      </span>

      <div className='relative'>
        <input
          type='number'
          className='relative w-full border border-[#E0E0E0] bg-transparent text-transparent rounded-[10px] p-[5px] z-10'
          value={productData.price}
          onChange={(e) => handlePriceQuery(e)}
        />

        <div className='absolute inset-0 w-full h-full rounded-[10px] p-[5px]'>
          <span className='font-YekanBakhMedium text-[18px]'>
            {priceQuery == "" || priceQuery == "۰" ? "" : priceQuery}
          </span>
        </div>
      </div>

      <span className='text-[14px] text-green-700 font-YekanBakhMedium'>
        {wordifyPrice == "صفر تومان" ? "" : wordifyPrice}
      </span>

      {/* ---------------------------- Product Discount Price ----------------------------------- */}
      <div className='h-[20px]'></div>
      {/* title */}
      <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mb-[5px]'>
        قیمت پس از تخفیف
      </span>

      <div className='relative'>
        <input
          type='number'
          className='relative w-full border border-[#E0E0E0] bg-transparent text-transparent rounded-[10px] p-[5px] z-10'
          value={productData.discount_price}
          onChange={(e) => handleDiscountPriceQuery(e)}
        />

        <div className='absolute inset-0 w-full h-full rounded-[10px] p-[5px]'>
          <span className='font-YekanBakhMedium text-[18px]'>
            {discountPriceQuery == "" || discountPriceQuery == "۰"
              ? ""
              : discountPriceQuery}
          </span>
        </div>
      </div>

      <span className='text-[14px] text-green-700 font-YekanBakhMedium'>
        {wordifyDiscountPrice == "صفر تومان" ? "" : wordifyDiscountPrice}
      </span>

      {/* ---------------------------- Product Discount ----------------------------------- */}
      <div className='h-[20px]'></div>
      {/* title */}
      <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mb-[5px]'>
        میزان تخفیف
      </span>

      <div className='relative flex items-center'>
        <input
          type='number'
          max={100}
          min={0}
          value={
            productData.discount_price == ""
              ? "0"
              : productData.price === "0" || productData.price === ""
              ? ""
              : Math.floor(
                  ((Number(productData.price) -
                    Number(productData.discount_price)) /
                    Number(productData.price)) *
                    100
                )
          }
          className='w-full border border-[#E0E0E0] rounded-[10px] p-[5px] pr-[25px] text-[16px] font-YekanBakhMedium'
          disabled
        />

        <span className='absolute right-2 text-[14px] font-YekanBakhBold'>
          %
        </span>
      </div>
    </>
  );
};

export default ProductPrice;
