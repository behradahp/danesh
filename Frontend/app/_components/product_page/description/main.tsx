import Image from "next/image";

const ProductPageDescription = ({
  description,
  image,
}: {
  description: string;
  image: string;
}) => {
  return (
    <div className='w-full bg-white rounded p-[14px]'>
      <div className='w-full h-[700px] p-[70px]'>
        <Image
          loader={() => image}
          src={image}
          alt='image'
          sizes='100vw'
          width={0}
          height={0}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <span className='text-[20px] text-[#707070] font-YekanBakhMedium'>
        {description}
      </span>
    </div>
  );
};

export default ProductPageDescription;
