import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
  <div className="flex h-screen w-full items-center justify-center">
    <h1 className="text-2xl font-bold">Click to toggle themes <ThemeToggle/></h1>
  </div>
  );
}
 