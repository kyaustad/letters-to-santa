import { ThemeSwitcher } from "@/features/theme-switcher-button.tsx/theme-switcher";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <ThemeSwitcher className="fixed top-4 right-4" />
      {children}
    </ThemeProvider>
  );
}
