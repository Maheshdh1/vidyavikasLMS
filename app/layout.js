import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Vidya Vikas Academy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>

        <Navbar />

        {children}
      </body>
    </html>
  );
}