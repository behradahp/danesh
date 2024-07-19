import "./globals.css";

import {
  YekanBakhBold,
  YekanBakhFat,
  YekanBakhHairHeavy,
  YekanBakhHairLight,
  YekanBakhHairline,
  YekanBakhHairMedium,
  YekanBakhHairRegular,
  YekanBakhHairThin,
} from "@/fonts";

const fonts = [
  YekanBakhBold,
  YekanBakhFat,
  YekanBakhHairline,
  YekanBakhHairHeavy,
  YekanBakhHairLight,
  YekanBakhHairMedium,
  YekanBakhHairRegular,
  YekanBakhHairThin,
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fa' dir="rtl" className={`${fonts.map((f) => f.variable).join(" ")}`}>
      <body>{children}</body>
    </html>
  );
}
