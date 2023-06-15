import "./globals.css";
import { Inter } from "next/font/google";
import { GameProvider } from "@/Hooks/useGameBoard";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Doodlebug Simulator",
  description: "Life Simulation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
