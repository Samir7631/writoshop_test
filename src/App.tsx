import { HashRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}
