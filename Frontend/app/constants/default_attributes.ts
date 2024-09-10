interface CustomAttributes {
  id: number;
  category: string;
  attributes: DefaultAttribute[];
}

const customAttributes: CustomAttributes[] = [
  {
    id: 2,
    category: "لپ تاپ",
    attributes: [
      { title: "پردازنده", options: null, unit: null },
      { title: "رم", options: null, unit: ["GB"] },
      { title: "حافظه داخلی", options: null, unit: ["GB", "TB"] },
      { title: "اندازه صفحه نمایش", options: null, unit: ["inch"] },
      { title: "صفحه نمایش لمسی", options: ["دارد", "ندارد"], unit: null },
      { title: "پشتیبانی از سیمکارت", options: ["دارد", "ندارد"], unit: null },
      {
        title: "نوع پردازنده گرافیکی",
        options: ["یکپارچه", "مجزا"],
        unit: null,
      },
      {
        title: "نور صفحه کلید",
        options: ["بدون نورپردازی", "تک‌رنگ", "RGB"],
        unit: null,
      },
      { title: "کاستوم شده", options: ["هست", "نیست"], unit: null },
    ],
  },
  {
    id: 1,
    category: "آل این وان",
    attributes: [
      { title: "پردازنده", options: null, unit: null },
      { title: "رم", options: null, unit: ["GB"] },
      { title: "حافظه داخلی", options: null, unit: ["GB", "TB"] },
      { title: "اندازه صفحه نمایش", options: null, unit: ["inch"] },
      { title: "صفحه نمایش لمسی", options: ["دارد", "ندارد"], unit: null },
      { title: "پشتیبانی از سیمکارت", options: ["دارد", "ندارد"], unit: null },
      {
        title: "نوع پردازنده گرافیکی",
        options: ["یکپارچه", "مجزا"],
        unit: null,
      },
      {
        title: "نور صفحه کلید",
        options: ["بدون نورپردازی", "تک‌رنگ", "RGB"],
        unit: null,
      },
      { title: "کاستوم شده", options: ["هست", "نیست"], unit: null },
    ],
  },
  {
    id: 6,
    category: "تحهیزات ذخیره سازی",
    attributes: [{ title: "ظرفیت", options: null, unit: ["GB", "TB"] }],
  },
];

export default customAttributes;