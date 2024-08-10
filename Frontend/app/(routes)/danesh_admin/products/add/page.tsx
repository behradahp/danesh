"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import useClickOutside from "@/app/hooks/useClickOutside";
import Image from "next/image";
import { wordifyRialsInTomans } from "@/app/functions/wordifyfa";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Audio } from "react-loader-spinner";

// Components
import PanelLayout from "@/app/_components/admin_panel/panel_layout";

// Icons
import AddImageIcon from "@/app/_components/icons/add_image_icon";
import EditIcon from "@/app/_components/icons/edit_icon";
import ChevronDownIcon from "@/app/_components/icons/chevron_down_icon";
import ImageDeleteIcon from "@/app/_components/icons/image_delete_icon";

// Images
import DesktopModal from "@/app/_components/common/modals/desktop_modal";

// api
import {
  addCategory,
  createProduct,
  deleteCategory,
  editCategory,
  getCategories,
} from "@/app/actions/actions";

interface ProductData {
  category_id: Number;
  name: string;
  description: string;
  discount_price: string;
  price: string;
}

interface Attribute {
  key: string;
  value: string;
}

interface PriceInputEvent extends Event {
  data?: string;
}

interface MainImage {
  file: File;
  url: string;
}

export default function AddProduct() {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setIsCategoryOptionsOpen(false);
    setAddCategoryMode(false);
    setEditCategoryMode(false);
    setEditCategoryValue(null);
    setEditCategoryId(null);
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [productImages, setProductImages] = useState<File[]>([]);
  const [showableImages, setShowableImages] = useState<string[]>([]);
  const [showedImage, setShowedImage] = useState<string>("");
  const [mainImage, setMainImage] = useState<MainImage | null>(null);
  const [isImagesModalOpen, setIsImagesModalOpen] = useState<boolean>(false);
  const [addImageHover, setAddImageHover] = useState<boolean>(false);

  const handleAddImages = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files!.length) {
      const files: File[] = [];
      const showableImagesList: string[] = [];
      for (let index = 0; index < e.target.files.length; index++) {
        files.push(e.target.files[index]);
        showableImagesList.push(URL.createObjectURL(e.target.files[index]));
      }

      if (mainImage == null) {
        setMainImage({
          file: files[0],
          url: showableImagesList[0],
        });
        setProductImages([...productImages, ...files.splice(1)]);
        setShowableImages([...showableImages, ...showableImagesList.splice(1)]);

        setShowedImage(showableImagesList[0]);

        return;
      }

      setProductImages([...productImages, ...files]);
      setShowableImages([...showableImages, ...showableImagesList]);
    }
  };

  const handleChangeMainImage = () => {
    if (showedImage == mainImage?.url) return;

    const index = showableImages.findIndex((image) => image == showedImage);

    const newShowableImages = showableImages.filter(
      (image) => image != showedImage
    );
    const newProductImages = productImages.filter(
      (image) => image != productImages[index]
    );

    if (mainImage != null) {
      newProductImages.push(mainImage.file);
      newShowableImages.push(mainImage.url);
    }

    setMainImage({
      file: productImages[index],
      url: showableImages[index],
    });

    setProductImages(newProductImages);
    setShowableImages(newShowableImages);
  };

  const handleDeleteImage = (index: number) => {
    const newShowableImages = showableImages.filter(
      (image) => image != showableImages[index]
    );
    const newProductImages = productImages.filter(
      (image) => image != productImages[index]
    );

    setProductImages(newProductImages);
    setShowableImages(newShowableImages);
  };

  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isCategoryOptionsOpen, setIsCategoryOptionsOpen] =
    useState<boolean>(false);
  const [addCategoryMode, setAddCategoryMode] = useState<boolean>(false);
  const [editCategoryMode, setEditCategoryMode] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<Number | null>(null);
  const [editCategoryValue, setEditCategoryValue] = useState<string | null>(
    null
  );
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [editCategoryHover, setEditCategoryHover] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();

      if (res.success) {
        setCategories(res.data);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCatgory = async () => {
    if (!newCategoryName) {
      toast.error("اسم دسته بندی خالی است!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      return;
    }

    const data = new FormData();
    data.append("name", newCategoryName);

    const res = await addCategory(data);

    if (res.success) {
      const catgRes = await getCategories();

      if (catgRes.success) {
        setCategories(catgRes.data);
      }

      setAddCategoryMode(false);

      return;
    }

    toast.error("مشکلی پیش آمده. لطفا دوباره تلاش کنید!", {
      position: "top-right",
      autoClose: 5000,
      transition: Bounce,
      closeOnClick: true,
      hideProgressBar: false,
      pauseOnHover: false,
    });
  };

  const handleDeleteCatgory = async () => {
    if (editCategoryId == null) {
      toast.error("اسم دسته بندی خالی است!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      return;
    }

    const res = await deleteCategory({ id: editCategoryId.toString() });

    if (res.success) {
      const catgRes = await getCategories();

      if (catgRes.success) {
        setCategories(catgRes.data);
      }

      setEditCategoryMode(false);
      setEditCategoryValue(null);
      setEditCategoryId(null);

      return;
    }

    toast.error("مشکلی پیش آمده. لطفا دوباره تلاش کنید!", {
      position: "top-right",
      autoClose: 5000,
      transition: Bounce,
      closeOnClick: true,
      hideProgressBar: false,
      pauseOnHover: false,
    });
  };

  const handleEditCatgory = async () => {
    if (editCategoryId == null) {
      toast.error("اسم دسته بندی خالی است!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      return;
    }

    const data = new FormData();
    data.append("name", editCategoryValue!);
    const res = await editCategory({ id: editCategoryId.toString(), data });

    if (res.success) {
      const catgRes = await getCategories();

      if (catgRes.success) {
        setCategories(catgRes.data);
      }

      setEditCategoryMode(false);
      setEditCategoryValue(null);
      setEditCategoryId(null);

      return;
    }

    toast.error("مشکلی پیش آمده. لطفا دوباره تلاش کنید!", {
      position: "top-right",
      autoClose: 5000,
      transition: Bounce,
      closeOnClick: true,
      hideProgressBar: false,
      pauseOnHover: false,
    });
  };

  const getCategoryOptions = () => {
    if (!categories || productData.category_id == -1) {
      return "انتخاب دسته بندی";
    }

    for (let category of categories) {
      if (category.id == productData.category_id) return category.name;
    }
  };

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

  const [productAttributes, setProductAttributes] = useState<Attribute[]>([]);
  const [isAddAttributesOpen, setIsAddAttributesOpen] =
    useState<boolean>(false);
  const [attributeKey, setAttributeKey] = useState<string>("");
  const [attributeValue, setAttributeValue] = useState<string>("");
  const [attributeEditValue, setAttributeEditValue] = useState<number | null>(
    null
  );
  const [addAttributeHover, setAddAttributeHove] = useState<boolean>(false);

  const handleAddAttribute = () => {
    if (!attributeKey) {
      toast.error("ویژگی خالی است!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      return;
    }

    if (!attributeValue) {
      toast.error("مقدار خالی است!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      return;
    }

    setProductAttributes([
      ...productAttributes,
      {
        key: attributeKey,
        value: attributeValue,
      },
    ]);

    setAttributeKey("");
    setAttributeValue("");
    setAttributeEditValue(null);

    setIsAddAttributesOpen(false);
  };

  const handleDeleteAttribute = (key: string, value: string) => {
    const newAttributeList = productAttributes.filter(
      (item) => item.key != key && item.value != value
    );

    setProductAttributes(newAttributeList);
  };

  const handleEditAttribute = () => {
    const newAttributeList = productAttributes;
    newAttributeList[attributeEditValue!].key = attributeKey;
    newAttributeList[attributeEditValue!].value = attributeValue;

    setProductAttributes(newAttributeList);

    setIsAddAttributesOpen(false);
    setAttributeEditValue(null);
  };

  const [brandValue, setBrandValue] = useState<string>("");

  const [productData, setProductData] = useState<ProductData>({
    category_id: -1,
    name: "",
    description: "",
    discount_price: "",
    price: "",
  });

  const handleAddProduct = async () => {
    let error = false;
    if (productData.category_id == -1) {
      error = true;
      toast.error("انتخاب دسته بندی اجباریست!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
    }

    if (productData.name == "") {
      error = true;
      toast.error("انتخاب اسم محصول اجباریست!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
    }

    if (productData.price == "") {
      error = true;
      toast.error("انتخاب قیمت محصول اجباریست!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
    }

    if (Number(productData.price) == 0) {
      error = true;
      toast.error("قیمت محصول نمیتواند صفر باشد!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
    }

    if (!error) {
      setLoading(true);
      const formData = new FormData();
      formData.append("category_id", productData.category_id.toString());
      formData.append("name", productData.name);
      formData.append(
        "description",
        productData.description ? productData.description : " No description"
      );
      formData.append("price", productData.price);
      formData.append("discount_price", productData.discount_price ?? "0");
      formData.append("brand", brandValue);

      const userJson = localStorage.getItem("user");
      if (!userJson) {
        toast.error("خطایی رخ داده است. لطفا دوباره تلاش کنید.!", {
          position: "top-right",
          autoClose: 5000,
          transition: Bounce,
          closeOnClick: true,
          hideProgressBar: false,
          pauseOnHover: false,
        });
        setLoading(false);
        return;
      }

      const admin = JSON.parse(userJson);
      formData.append("admin_username", admin.username);
      formData.append("lats_update_admin_username", admin.username);

      if (productAttributes.length != 0) {
        formData.append("attributes", JSON.stringify(productAttributes));
      }

      if (mainImage != null) {
        formData.append("main_image", mainImage.file);
      }

      if (productImages.length != 0) {
        if (productImages.length > 1) {
          for (let index = 0; index < productImages.length - 1; index++) {
            formData.append("images", productImages[index]);
          }
        }
      }

      const res = await createProduct(formData);

      if (res.success) {
        setLoading(false);
        toast.success("محصول اصافه شد.", {
          position: "top-right",
          autoClose: 5000,
          transition: Bounce,
          closeOnClick: true,
          hideProgressBar: false,
          pauseOnHover: false,
        });

        setProductData({
          category_id: -1,
          name: "",
          description: "",
          discount_price: "",
          price: "",
        });

        setProductImages([]);
        setShowableImages([]);
        setShowedImage("");
        setPriceQuery("");
        setPriceValue("");
        setWordifyPrice("");

        setDiscountPriceQuery("");
        setDiscountPriceValue("");
        setWordifyDiscountPrice("");

        setProductAttributes([]);
        setAttributeKey("");
        setAttributeValue("");
        setAttributeEditValue(null);
        setMainImage(null);
        setBrandValue("");

        return;
      }

      toast.error("خطایی رخ داده است. لطفا دوباره تلاش کنید.!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <PanelLayout section_id='3'>
        <div className='flex-grow w-[100%] pt-[26px] px-[30px] dsk:px-[62px] overflow-y-auto'>
          {/* ---------------------------- Title ----------------------------------- */}
          <div className='flex gap-[600px]'>
            <span className='text-[24px] text-back font-YekanBakhBold'>
              اضافه کردن محصول
            </span>

            <button
              className='w-[200px] h-[35px] flex justify-center items-center text-[14px] text-white font-YekanBakhMedium bg-[#6695FF] rounded-[5px]'
              onClick={handleAddProduct}
            >
              {loading ? (
                <Audio height={20} width={20} color='white' />
              ) : (
                "اضافه کردن"
              )}
            </button>
          </div>

          <div className='h-[35px]'></div>

          {/* ---------------------------- Content ----------------------------------- */}
          <div className='w-full flex justify-between gap-[10px]'>
            {/* ---------------------------- Right Side ----------------------------------- */}
            <div className='w-[529px] h-[690px] flex flex-col py-[14px] px-[17px] bg-white rounded-[10px]'>
              {/* ---------------------------- Add Image ----------------------------------- */}
              {/* title */}
              <div className='flex items-center gap-[10px] mb-[5px]'>
                <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium'>
                  تصاویر محصول
                </span>

                <span
                  className={`${
                    mainImage != null ? "" : "hidden"
                  } text-[13px] text-[#633333] font-YekanBakhMedium cursor-pointer`}
                  onClick={() => {
                    setProductImages([]);
                    setShowableImages([]);
                    setMainImage(null);
                  }}
                >
                  حذف تصاویر
                </span>
              </div>

              {/* images */}
              <div className='w-full flex gap-[7px] p-[8px] border-2 border-[#EBEBEB] rounded-[10px]'>
                {/* Add */}
                <label htmlFor='product_images'>
                  <input
                    type='file'
                    id='product_images'
                    accept='image/*'
                    className='hidden'
                    multiple
                    onChange={(e) => handleAddImages(e)}
                  />
                  <div
                    className='w-[150px] h-[160px] flex justify-center items-center border border-dashed border-[#707070] rounded-[10px] cursor-pointer hover:border-solid hover:border-[#C6D7FF]'
                    onMouseEnter={() => setAddImageHover(true)}
                    onMouseLeave={() => setAddImageHover(false)}
                  >
                    <AddImageIcon
                      color={addImageHover ? "#6695FF" : undefined}
                    />
                  </div>
                </label>

                {/* Other Images */}
                <div className='flex-shrink-0 w-[160px] flex flex-row-reverse flex-wrap gap-[8px]'>
                  {[0, 0, 0, 0].map((item, index) => {
                    return (
                      <div
                        key={index}
                        className='relative w-[75px] h-[75px] border border-[#EBEBEB] rounded-[10px] p-[3px]'
                        onClick={() => setIsImagesModalOpen(true)}
                      >
                        {showableImages[index] != undefined ? (
                          <Image
                            loader={() => showableImages[index]}
                            src={showableImages[index]}
                            alt='product-images'
                            width={0}
                            height={0}
                            sizes='100vw'
                            style={{ width: "100%", height: "100%" }}
                          />
                        ) : (
                          <></>
                        )}

                        <div
                          className={`${
                            index == 3 && showableImages.length > 4
                              ? ""
                              : "hidden"
                          } absolute inset-0 w-full h-full flex justify-center items-center rounded-[10px] bg-black/30 cursor-pointer`}
                          onClick={() => setIsImagesModalOpen(true)}
                        >
                          <span className='text-16px] text-white font-YekanBakhMedium'>
                            +{(showableImages.length - 4).toLocaleString("fa")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Main Image */}
                <div
                  className='w-[150px] h-[160px] border border-[#EBEBEB] rounded-[10px] p-[3px]'
                  onClick={() => setIsImagesModalOpen(true)}
                >
                  {mainImage != null ? (
                    <Image
                      loader={() => mainImage.url}
                      src={mainImage.url}
                      alt='product-images'
                      width={0}
                      height={0}
                      sizes='100vw'
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/* ---------------------------- Product Name ----------------------------------- */}
              <div className='h-[20px]'></div>
              {/* title */}
              <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mb-[5px]'>
                نام محصول
              </span>

              <input
                type='text'
                className='w-full border border-[#E0E0E0] rounded-[10px] p-[5px]'
                value={productData.name}
                onChange={(e) =>
                  setProductData({ ...productData, name: e.target.value })
                }
              />

              {/* ---------------------------- Product Category ----------------------------------- */}
              <div className='h-[20px]'></div>
              {/* title */}
              <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mb-[5px]'>
                دسته بندی
              </span>

              <div
                className='relative w-full h-[35.6px] flex justify-between items-center border border-[#E0E0E0] rounded-[10px] p-[5px] cursor-pointer'
                onClick={() => setIsCategoryOptionsOpen((prev) => !prev)}
                ref={ref}
              >
                <span className='text-[16px] text-black font-YekanBakhMedium'>
                  {getCategoryOptions()}
                </span>

                <ChevronDownIcon />

                {/* category options */}
                <div
                  className={`${
                    isCategoryOptionsOpen ? "" : "hidden"
                  } absolute left-0 top-[40px] w-full flex flex-col gap-[10px] p-[10px] bg-white rounded-[10px] shadow-default z-20`}
                >
                  {categories?.map((category, index) => {
                    return (
                      <div
                        key={category.id.toString()}
                        className='w-full p-[5px] hover:bg-[#C6D7FF] rounded-[5px] cursor-pointer'
                        onClick={(e) =>
                          !editCategoryMode
                            ? setProductData({
                                ...productData,
                                category_id: category.id,
                              })
                            : (setEditCategoryId(category.id),
                              setEditCategoryValue(category.name),
                              e.stopPropagation())
                        }
                      >
                        <span className='text-[16px] text-black font-YekanBakhMedium'>
                          {category.name}
                        </span>
                      </div>
                    );
                  })}

                  <div
                    className={`${
                      addCategoryMode || editCategoryMode ? "hidden" : ""
                    } flex items-center gap-[10px] text-[#4E5A60] hover:text-[#87abff]`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setAddCategoryMode(true);
                    }}
                  >
                    <span className='text-[16px] font-YekanBakhMedium'>
                      اضافه کردن دسته بندی
                    </span>
                    <span className='text-[25px] font-YekanBakhMedium'>+</span>
                  </div>

                  <div
                    className={`${
                      addCategoryMode || editCategoryMode ? "hidden" : ""
                    } flex items-center gap-[10px] text-[#4E5A60] hover:text-[#87abff]`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditCategoryMode(true);
                    }}
                    onMouseEnter={() => setEditCategoryHover(true)}
                    onMouseLeave={() => setEditCategoryHover(false)}
                  >
                    <span className='text-[16px] font-YekanBakhMedium'>
                      ویرایش دسته بندی
                    </span>
                    <EditIcon
                      color={editCategoryHover ? "#87abff" : "#4E5A60"}
                      size='17px'
                    />
                  </div>

                  <div className={`${addCategoryMode ? "" : "hidden"}`}>
                    <span className='text-[16px] font-YekanBakhMedium text-[#4E5A60]'>
                      دسته بندی جدید
                    </span>

                    <div className='h-[8px]'></div>

                    <input
                      type='text'
                      className='w-full bg-white border border-[#E0E0E0] rounded-[10px] p-[5px]'
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      value={newCategoryName}
                    />

                    <div className='h-[26px]'></div>

                    <div className='w-ful flex justify-evenly'>
                      <button
                        className={
                          "w-[169px] h-[35px] flex justify-center items-center rounded-[10px] border border-[#4E5A60]"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          setAddCategoryMode(false);
                          setNewCategoryName("");
                        }}
                      >
                        <span className='text-[14px] text-[#4E5A60] font-YekanBakhMedium'>
                          حذف
                        </span>
                      </button>
                      <button
                        className='w-[169px] h-[35px] flex justify-center items-center rounded-[10px] bg-[#6695FF]'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddCatgory();
                        }}
                      >
                        <span className='text-[14px] text-white font-YekanBakhMedium'>
                          تایید
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className={`${editCategoryMode ? "" : "hidden"}`}>
                    <span className='text-[16px] font-YekanBakhMedium text-[#4E5A60]'>
                      دسته بندی مورد نظر را انتخاب کنید
                    </span>

                    <div className='h-[8px]'></div>

                    <input
                      type='text'
                      className='w-full bg-white border border-[#E0E0E0] rounded-[10px] p-[5px]'
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        setEditCategoryValue(e.target.value);
                      }}
                      disabled={editCategoryId == null ? true : false}
                      value={editCategoryId == null ? "" : editCategoryValue!}
                    />

                    <div className='h-[26px]'></div>

                    <div className='w-ful flex justify-evenly'>
                      <button
                        className={
                          "w-[169px] h-[35px] flex justify-center items-center rounded-[10px] border border-[#4E5A60]"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCatgory();
                        }}
                      >
                        <span className='text-[14px] text-[#4E5A60] font-YekanBakhMedium'>
                          حذف
                        </span>
                      </button>
                      <button
                        className='w-[169px] h-[35px] flex justify-center items-center rounded-[10px] bg-[#6695FF]'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCatgory();
                        }}
                      >
                        <span className='text-[14px] text-white font-YekanBakhMedium'>
                          تایید
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------------------------- Product Price ----------------------------------- */}
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
                {wordifyDiscountPrice == "صفر تومان"
                  ? ""
                  : wordifyDiscountPrice}
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
            </div>

            {/* ---------------------------- Left Side ----------------------------------- */}
            <div className='w-[529px] h-[690px] flex flex-col py-[14px] px-[28px] bg-white rounded-[10px]'>
              {/* ---------------------------- Product Description ----------------------------------- */}
              {/* title */}
              <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mb-[5px]'>
                توضیحات
              </span>
              <textarea
                name=''
                id=''
                className='w-full min-h-[180px] max-h-[180px] p-[10px] border-2 border-[#E0E0E0] rounded-[10px]'
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              ></textarea>

              {/* ---------------------------- Product Attributes ----------------------------------- */}
              <div className='h-[20px]'></div>
              <div className='w-full m-h-[387px] border-2 border-[#E0E0E0] rounded-[10px] overflow-y-auto'>
                <div className='flex'>
                  <div className='w-[145.5px] h-[48.5px] flex justify-center items-center border-b-2 border-l-2 border-[#E0E0E0]'>
                    <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium'>
                      ویژگی
                    </span>
                  </div>
                  <div className='flex-grow h-[48.5px] flex justify-center items-center border-b-2 border-[#E0E0E0]'>
                    <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium'>
                      نوع یا مقدار
                    </span>
                  </div>
                </div>
                <div className='relative flex'>
                  <div className='w-[145.5px] h-[48.5px] flex justify-center items-center border-b-2 border-l-2 border-[#E0E0E0]'>
                    <span className='text-[16px] text-black font-YekanBakhMedium'>
                      برند
                    </span>
                  </div>
                  <div className='flex-grow h-[48.5px] flex justify-center items-center border-b-2 border-[#E0E0E0]'>
                    <span className='text-[16px] text-black font-YekanBakhMedium'>
                      {brandValue}
                    </span>
                  </div>

                  <div className='absolute inset-0 w-full h-full flex items-center pr-[130.5px] opacity-[0.01] hover:opacity-[1] transition-all ease-linear duration-200'>
                    <div
                      className='w-[30px] h-[30px] flex justify-center items-center border border-[#4e5a60] rounded-[5px] hover:bg-[#c1d1da8a] transition-all ease-linear duration-150 cursor-pointer'
                      onClick={() => {
                        setAttributeEditValue(100);
                        setIsAddAttributesOpen(true);
                      }}
                    >
                      <EditIcon color='#6695FF' />
                    </div>
                  </div>
                </div>
                {productAttributes.map((item, index) => {
                  return (
                    <div key={index} className='relative flex'>
                      <div className='w-[145.5px] h-[48.5px] flex justify-center items-center border-b-2 border-l-2 border-[#E0E0E0]'>
                        <span className='text-[16px] text-black font-YekanBakhMedium'>
                          {item.key}
                        </span>
                      </div>
                      <div className='flex-grow h-[48.5px] flex justify-center items-center border-b-2 border-[#E0E0E0]'>
                        <span className='text-[16px] text-black font-YekanBakhMedium'>
                          {item.value}
                        </span>
                      </div>

                      <div className='absolute inset-0 w-full h-full flex items-center pr-[130.5px] opacity-[0.01] hover:opacity-[1] transition-all ease-linear duration-200'>
                        <div
                          className='w-[30px] h-[30px] flex justify-center items-center border border-[#4e5a60] rounded-[5px] hover:bg-[#c1d1da8a] transition-all ease-linear duration-150 cursor-pointer'
                          onClick={() => {
                            setAttributeEditValue(index);
                            setIsAddAttributesOpen(true);
                          }}
                        >
                          <EditIcon color='#6695FF' />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div
                  className='w-full h-[48.5px] flex items-center justify-center gap-[31.8px] cursor-pointer'
                  onClick={() => setIsAddAttributesOpen(true)}
                  onMouseEnter={() => setAddAttributeHove(true)}
                  onMouseLeave={() => setAddAttributeHove(false)}
                >
                  <AddImageIcon
                    color={addAttributeHover ? "#6695FF" : undefined}
                  />
                  <span
                    className={`text-[16px] ${
                      addAttributeHover ? "text-[#6695FF]" : "text-[#4E5A60]"
                    } font-YekanBakhMedium`}
                  >
                    اضافه کردن ویژگی
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='h-[30px]'></div>
      </PanelLayout>

      {/* Images Modal */}
      <DesktopModal
        isOpen={isImagesModalOpen}
        title='تصاویر محصول'
        handleCloseModal={() => setIsImagesModalOpen((prev) => !prev)}
      >
        <button
          className='absolute left-[30px] top-[30px] bg-[#6695FF] py-[5px] px-[10px] rounded-[5px] text-white font-YekanBakhMedium'
          onClick={handleChangeMainImage}
        >
          عکس اصلی
        </button>

        {/* showed Image */}
        <div className='w-full flex justify-center'>
          <div className='w-[450px] h-[450px]'>
            <Image
              loader={() => showedImage}
              src={showedImage}
              alt='main-image'
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        {/* Other Images */}
        <div className='w-[800px] max-w-[800px] flex gap-[10px] overflow-x-auto overflow-y-auto pb-[10px] pt-[20px] pr-[10px] pl-[10px]'>
          <div
            className={`relative border-2 border-[#b69a67] p-[5px] rounded-[10px] cursor-pointer`}
            onClick={() =>
              setShowedImage(mainImage != null ? mainImage.url : "")
            }
          >
            <div className='absolute inset-0 w-full h-full rounded-[10px] z-[10] opacity-[0.001] hover:opacity-[1] transition-all duration-150'>
              <div
                className='absolute left-[-10px] top-[-10px] bg-[#bf3d3d] rounded-[100px] hover:scale-125 transition-all duration-150'
                onClick={(e) => {
                  e.stopPropagation();
                  setMainImage(null);
                }}
              >
                <ImageDeleteIcon color='white' />
              </div>
            </div>

            <div className='relative w-[75px] h-[75px] flex justify-center'>
              <span className='absolute top-[-23px] text-[12px] text-[#b69a67] font-YekanBakhMedium'>
                عکس اصلی
              </span>
              {mainImage != null ? (
                <Image
                  loader={mainImage != null ? () => mainImage.url : () => ""}
                  src={mainImage != null ? mainImage.url : ""}
                  alt='main-image'
                  width={0}
                  height={0}
                  sizes='100vw'
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          {showableImages.map((image, index) => {
            return (
              <div
                key={index}
                className={`relative ${
                  image == showedImage
                    ? "border-2 border-[#A4C0FF]"
                    : "border border-[#EBEBEB]"
                } p-[5px] rounded-[10px] cursor-pointer`}
                onClick={() => setShowedImage(image)}
              >
                <div className='absolute inset-0 w-full h-full rounded-[10px] z-[10] opacity-[0.001] hover:opacity-[1] transition-all duration-150'>
                  <div
                    className='absolute left-[-5px] top-[-5px] bg-[#bf3d3d] rounded-[100px] hover:scale-125 transition-all duration-150'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(index);
                    }}
                  >
                    <ImageDeleteIcon color='white' />
                  </div>
                </div>
                <div className='w-[75px] h-[75px]'>
                  <Image
                    loader={() => image}
                    src={image}
                    alt='main-image'
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className='h-[5px]'></div>
      </DesktopModal>

      {/* Attributes Modal */}
      <DesktopModal
        isOpen={isAddAttributesOpen}
        title='اضافه کردن ویژگی'
        handleCloseModal={() => {
          setIsAddAttributesOpen(false);
          setAttributeEditValue(null);
        }}
      >
        <div className='flex flex-col gap-[10px] p-[17px]'>
          {/* title */}
          <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium'>
            ویژگی
          </span>

          <input
            type='text'
            className='w-[426px] border border-[#E0E0E0] rounded-[10px] p-[5px] font-YekanBakhMedium'
            onChange={(e) => setAttributeKey(e.target.value)}
            defaultValue={
              attributeEditValue == 100
                ? "برند"
                : attributeEditValue != null &&
                  productAttributes[attributeEditValue] != undefined
                ? productAttributes[attributeEditValue!].key
                : ""
            }
            disabled={attributeEditValue == 100 ? true : false}
          />

          <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mt-[10px]'>
            نوع یا مقدار
          </span>

          <input
            type='text'
            className='w-[426px] border border-[#E0E0E0] rounded-[10px] p-[5px] font-YekanBakhMedium'
            onChange={(e) => {
              if (attributeEditValue == 100) {
                setBrandValue(e.target.value);
              } else {
                setAttributeValue(e.target.value);
              }
            }}
            defaultValue={
              attributeEditValue == 100
                ? brandValue
                : attributeEditValue != null &&
                  productAttributes[attributeEditValue] != undefined
                ? productAttributes[attributeEditValue!].value
                : ""
            }
          />

          <div className='w-ful flex justify-evenly mt-[10px]'>
            <button
              className={`${
                attributeEditValue == null
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } w-[169px] h-[35px] flex justify-center items-center rounded-[10px] border border-[#4E5A60]`}
              onClick={(e) => {
                if (attributeEditValue == null) return;

                handleDeleteAttribute(
                  productAttributes[attributeEditValue].key,
                  productAttributes[attributeEditValue].value
                );

                setIsAddAttributesOpen(false);
              }}
              disabled={attributeEditValue == 100 ? true : false}
            >
              <span className='text-[14px] text-[#4E5A60] font-YekanBakhMedium'>
                حذف
              </span>
            </button>
            <button
              className='w-[169px] h-[35px] flex justify-center items-center rounded-[10px] bg-[#6695FF]'
              onClick={
                attributeEditValue == 100
                  ? () => {
                      setIsAddAttributesOpen(false);
                      setAttributeEditValue(null);
                    }
                  : attributeEditValue != null
                  ? handleEditAttribute
                  : handleAddAttribute
              }
            >
              <span className='text-[14px] text-white font-YekanBakhMedium'>
                تایید
              </span>
            </button>
          </div>
        </div>
      </DesktopModal>
    </>
  );
}
