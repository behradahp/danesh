export default function FooterInfo() {
  return (
    <section className='w-[529px] flex flex-col gap-[32px]'>
      {/* About */}
      <div className='flex flex-col gap-[14px]'>
        <span className='text-[24px] text-[#666666] font-YekanBakhBold'>
          دانش
        </span>
        <span className='text-[20px] text-[#666666] font-YekanBakhMedium mr-[20px]'>
          شرکت کامپیوتری دانش یک فروشگاه محصولات دیجیتال می‌باشد که فعالیت خود
          را از سال 1403 آغاز کرده است. هدف این مجموعه برطرف کردن نیازهای شما به
          کالاهای دیجیتال و ارائه خدمات مرتبط با همراهی کارشناسان و متخصصان این
          زمینه می باشد
        </span>
      </div>

      {/* Address */}
      <div className='flex flex-col gap-[14px]'>
        <span className='text-[24px] text-[#666666] font-YekanBakhBold'>
          نشانی
        </span>
        <span className='text-[20px] text-[#666666] font-YekanBakhMedium mr-[20px]'>
          زاهدان، خیابان بهشتی، بین بهشتی ۷ و ۹، پلاک ۱۰
        </span>
      </div>

      {/* phone */}
      <div className='flex flex-col gap-[14px]'>
        <span className='text-[24px] text-[#666666] font-YekanBakhBold'>
          شماره تماس
        </span>
        <span className='text-[20px] text-[#666666] font-YekanBakhMedium mr-[20px]'>
          ۰۹۰۱۵۸۲۰۵۷۱
        </span>
      </div>
    </section>
  );
}
