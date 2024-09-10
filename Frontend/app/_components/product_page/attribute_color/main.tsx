const ProductPageAttributeAndColor = ({
  attributes,
  colors,
}: {
  attributes: Attribute[];
  colors: Color[];
}) => {
  return (
    <div className='flex flex-col gap-[45px]'>
      {/* Colors */}
      <div className='flex gap-[10px] items-center'>
        <span className='text-[18px] text-black font-YekanBakhMedium'>
          رنگ‌ها:
        </span>

        <div className='flex gap-[5px]'>
          {colors.map((item) => {
            return (
              <div
                key={item.id}
                className='w-[20px] h-[20px] rounded-[100px] border border-black'
                style={{ backgroundColor: item.hex }}
              ></div>
            );
          })}
        </div>
      </div>

      {/* Attributes */}
      <div className='w-[387px] flex flex-col gap-[5px] bg-white px-[28px] py-[16px] rounded'>
        {attributes.map((item) => {
          return (
            <div key={item.id} className='flex gap-[5px] items-center'>
              {" "}
              <span className="text-[18px] text-[#707070] font-YekanBakhBold">{item.key}:</span>
              <span className="text-[16px] text-[#707070] font-YekanBakhMedium">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductPageAttributeAndColor;
