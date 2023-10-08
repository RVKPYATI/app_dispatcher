import { Inter, Irish_Grover } from 'next/font/google';

export const inter = Inter({
  subsets: ["cyrillic", "latin"],
  display: 'swap',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: 'normal',
});

export const irish = Irish_Grover({
  subsets: ["latin"],
  display: 'swap',
  weight: "400",
  style: 'normal',
})

