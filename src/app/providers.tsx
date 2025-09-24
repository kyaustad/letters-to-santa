import { ThemeSwitcher } from "@/features/theme-switcher-button.tsx/theme-switcher";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { NavBar } from "@/features/navigation/components/nav-bar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {/* <ThemeSwitcher className="fixed top-4 right-4" /> */}
      <Toaster richColors />
      <NavBar />
      <main
        id="page-container"
        className="w-full h-full flex flex-col items-center p-4 max-w-screen-2xl mx-auto pt-20 lg:pt-4 overflow-x-hidden"
      >
        {children}
      </main>
    </ThemeProvider>
  );
}
