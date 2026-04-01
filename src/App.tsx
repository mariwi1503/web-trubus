import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import CollectionPage from "./pages/CollectionPage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import TestimoniPage from "./pages/TestimoniPage";
import TentangKamiPage from "./pages/TentangKamiPage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <AuthProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/collections/:handle" element={<CollectionPage />} />
                <Route path="/produk" element={<ProductListPage />} />
                <Route path="/produk/:handle" element={<ProductDetailPage />} />
                <Route path="/keranjang" element={<Navigate to="/produk" replace />} />
                <Route path="/checkout" element={<Navigate to="/produk" replace />} />
                <Route path="/order-confirmation" element={<Navigate to="/produk" replace />} />
                <Route path="/artikel" element={<ArticleListPage />} />
                <Route path="/artikel/kategori/:category" element={<ArticleListPage />} />
                <Route path="/artikel/:slug" element={<ArticleDetailPage />} />
                <Route path="/testimoni" element={<TestimoniPage />} />
                <Route path="/tentang-kami" element={<TentangKamiPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </CartProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
