import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "../contexts/AuthContext";

export const metadata = {
  title: "Vidya Vikas Academy",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>

        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}