// Icons
import ProductAuthenticityIcon from "../icons/danesh_features_icons/product_authenticity_icon";
import PriceGuaranteeIcon from "../icons/danesh_features_icons/price_guarantee_icon";
import FastShippingIcon from "../icons/danesh_features_icons/fast_shipping_icon";
import SecurePaymentIcon from "../icons/danesh_features_icons/secure_payment_icon";

const FEATURES = [
  {
    title: "ضمانت اصالت",
    icon: ProductAuthenticityIcon,
  },
  {
    title: "تضمین قیمت",
    icon: PriceGuaranteeIcon,
  },
  {
    title: "ارسال سریع",
    icon: FastShippingIcon,
  },
  {
    title: "پرداخت امن",
    icon: SecurePaymentIcon,
  },
];

export default function DaneshFeatures() {
  return (
    <section className='w-full px-[45px]'>
      <div className='w-full flex justify-between border border-[#8e64dc61] pt-[53px] pb-[43px] px-[53px] rounded-[10px]'>
        {FEATURES.map((item, index) => {
          return (
            <div key={index} className='flex items-center gap-[10px]'>
              <item.icon />
              <span className='text-[28px] text-[#666666] font-YekanBakhMedium'>
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
