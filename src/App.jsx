import React, { useState, useEffect } from 'react';
import { products } from './data/products';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import CheckoutForm from './components/CheckoutForm';
import './App.css';

export default function App() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua');
  const [formData, setFormData] = useState({ nama: '', email: '' });
  const [errors, setErrors] = useState({ nama: '', email: '' });

  useEffect(() => {
    console.log("App loaded");
  }, []);

  useEffect(() => {
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    document.title = totalQty > 0 ? `Keranjang (${totalQty})` : 'Mini Product Catalog';
  }, [cart]);

  const handleTambahKeCart = (produk) => {
    setCart((prevCart) => {
      const itemAda = prevCart.find((item) => item.id === produk.id);
      if (itemAda) {
        return prevCart.map((item) =>
          item.id === produk.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...produk, qty: 1 }];
    });
  };

  const handleHapusDariCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const hitungTotalHarga = () => {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    let errorMsg = '';
    if (id === 'nama') {
      if (!value.trim()) errorMsg = 'Nama tidak boleh kosong.';
      else if (value.trim().length < 3) errorMsg = 'Nama minimal harus 3 karakter.';
    }
    if (id === 'email') {
      if (!value.trim()) errorMsg = 'Email tidak boleh kosong.';
      else if (!value.includes('@')) errorMsg = 'Email harus mengandung karakter "@".';
    }

    setErrors((prev) => ({ ...prev, [id]: errorMsg }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    alert(`🎉 Transaksi Sukses!\nTerima kasih ${formData.nama}, pesanan segera dikirim.`);
    
    setCart([]);
    setFormData({ nama: '', email: '' });
    setErrors({ nama: '', email: '' });
    setSearchQuery('');
    setSelectedKategori('Semua');
  };

  const filteredProducts = products.filter((produk) => {
    const cocokSearch = produk.nama.toLowerCase().includes(searchQuery.toLowerCase().trim());
    const cocokKategori = selectedKategori === 'Semua' || produk.kategori === selectedKategori;
    return cocokSearch && cocokKategori;
  });

  return (
    <div className="app-layout">
      <header className="main-header">
        <h1>Mini Product Catalog</h1>
      </header>

      <div className="main-container">
        <div className="left-side">
          <div className="filter-panel">
            <div className="form-group search-box">
              <label htmlFor="search">Cari Produk</label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik nama alat tulis..."
              />
            </div>

            <div className="category-container">
              <span className="filter-label">Kategori:</span>
              {['Semua', 'Tulis', 'Kertas'].map((kat) => (
                <button
                  key={kat}
                  className={`btn-filter ${selectedKategori === kat ? 'active' : ''}`}
                  onClick={() => setSelectedKategori(kat)}
                >
                  {kat}
                </button>
              ))}
            </div>
          </div>

          <ProductList dataProduk={filteredProducts} onTambah={handleTambahKeCart} />
        </div>

        <div className="right-side">
          <CartSidebar 
            cart={cart} 
            onHapus={handleHapusDariCart} 
            totalHarga={hitungTotalHarga()} 
          />
          
          <CheckoutForm
            formData={formData}
            errors={errors}
            onChange={handleFormChange}
            onSubmit={handleCheckoutSubmit}
            isCartEmpty={cart.length === 0}
          />
        </div>
      </div>
    </div>
  );
}