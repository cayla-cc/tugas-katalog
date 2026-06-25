import React from 'react';

export default function CheckoutForm({ 
  formData, 
  errors, 
  onChange, 
  onSubmit, 
  isCartEmpty 
}) {
  const { nama, email } = formData;

  const isFormInvalid = 
    !nama.trim() || 
    nama.trim().length < 3 || 
    !email.trim() || 
    !email.includes('@') || 
    isCartEmpty;

  return (
    <div className="checkout-section">
      <h2>Form Checkout</h2>
      <form onSubmit={onSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="nama">Nama Penerima</label>
          <input 
            type="text" 
            id="nama" 
            value={nama} 
            onChange={onChange}
            placeholder="Masukkan nama lengkap..."
          />
          {errors.nama && <span className="error-text">{errors.nama}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Alamat Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={onChange}
            placeholder="contoh@email.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        {isCartEmpty && <span className="error-text block-error">Keranjang tidak boleh kosong untuk melakukan checkout.</span>}

        <button type="submit" disabled={isFormInvalid} className="btn-checkout">
          Checkout Pesanan
        </button>
      </form>

      {nama.trim().length >= 3 && email.includes('@') && (
        <div className="live-preview">
          <p>✨ <strong>Live Preview:</strong> Halo, {nama}! Pesanan akan dikirim ke {email}.</p>
        </div>
      )}
    </div>
  );
}