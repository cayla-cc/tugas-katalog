import React from 'react';

export default function CartSidebar({ cart, onHapus, totalHarga }) {
  return (
    <div className="cart-sidebar">
      <h2>Keranjang Belanja ({cart.length} item)</h2>
      
      {cart.length === 0 ? (
        <p className="empty-cart-text">Keranjang kosong</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <div>
                <span className="item-name">{item.nama}</span>
                <span className="item-qty"> × {item.qty}</span>
              </div>
              <div className="cart-item-right">
                <span>Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                <button className="btn-delete-item" onClick={() => onHapus(item.id)}>
                  hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      <div className="cart-total">
        <h3>Total: <span>Rp {totalHarga.toLocaleString('id-ID')}</span></h3>
      </div>
    </div>
  );
}