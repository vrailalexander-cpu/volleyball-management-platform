import type { ReactNode } from "react";
export const metadata = { title: "Volleyball CMS", description: "Керування волейбольною командою" };
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="uk"><body style={{ margin: 0 }}>{children}</body></html>;
}
