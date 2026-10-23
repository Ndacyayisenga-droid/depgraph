import type { Metadata } from "next";
import localFont from "next/font/local";

import { TooltipProvider } from "@/components/ui/tooltip";
import { locale } from "@/lib/format";
import { messages } from "@/messages/en";

import "./globals.css";

const lato = localFont({
  src: [
    { path: "../fonts/Lato-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Lato-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/Lato-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-lato",
  display: "swap",
});

const montserrat = localFont({
  src: "../fonts/Montserrat-VariableFont_wght.ttf",
  weight: "100 900",
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: messages.app.title,
    template: `%s · ${messages.app.name}`,
  },
  description: messages.app.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={locale} className={`${lato.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full">
        <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
