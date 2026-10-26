import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Volley Pro — команда, що перемагає",
  description: "Тренування, склад команди та календар волейбольних змагань."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="uk"><body>{children}</body></html>;
}
