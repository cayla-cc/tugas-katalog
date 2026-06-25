import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ dataProduk, onTambah }) {
  return (
    <div className="product-list-grid">
      {dataProduk.length > 0 ? (
        dataProduk.map((produk) => (
          <ProductCard 
            key={produk.id} 
            produk={produk} 
            onTambah={onTambah} 
          />
        ))
      ) : (
        <p className="empty-msg">Produk tidak ditemukan.</p>
      )}
    </div>
  );
}