import type { Metadata } from "next";
import { Lexend, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

// 1. Tipografía Display / Logotipo: Fluidez cognitiva y solidez geométrica
const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// 2. Tipografía Principal: Titulares y lectura continua editorial
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// 3. Tipografía Técnica: Fórmulas matemáticas, metadatos y SKUs
const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saber En Piezas | Recursos Didácticos con Verdadera Conciencia",
  description:
    "Material didáctico táctil y kits matemáticos basados en Montessori y cognición encarnada. Fabricado en Tarímbaro, Michoacán con corte láser e impresión 3D.",
  keywords: [
    "material didáctico Michoacán",
    "cognición encarnada",
    "pedagogía Montessori",
    "kits matemáticos 3D",
    "material educativo Tarímbaro",
    "rompecabezas MDF",
  ],
  authors: [{ name: "Saber En Piezas" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${lexend.variable} ${dmSans.variable} ${dmMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="h-full">
        {children}
      </body>
    </html>
  );
}