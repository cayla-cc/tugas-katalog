import React from 'react';

export default function ProductCard({ produk, onTambah }) {
  const { nama, price, stok } = produk;

  return (
    <div className="product-card">
      <h3>{nama}</h3>
      <p className="price">Rp {price.toLocaleString('id-ID')}</p>
      
      <span className={`badge ${stok ? 'tersedia' : 'habis'}`}>
        {stok ? 'Tersedia' : 'Habis'}
      </span>

      <button 
        onClick={() => onTambah(produk)} 
        disabled={!stok}
        className="btn-add"
      >
        {stok ? '+ Tambah' : 'Stok Habis'}
      </button>
    </div>
  );
}