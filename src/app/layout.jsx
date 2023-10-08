import "./globals.css";
import { inter } from "@/fonts";


export const metadata = {
  title: "Диспетчер",
  description: "Приложение для диспетчеризации перевозок",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
