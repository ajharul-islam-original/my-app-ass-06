import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "FitLog",
  description: "Workout Library",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#090a0d] text-white antialiased">
        <div className="flex min-h-screen flex-col">

          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />

        </div>
      </body>
    </html>
  );
}