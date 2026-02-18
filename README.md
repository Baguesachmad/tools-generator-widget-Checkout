# Widget Cart Generator

Generator ini memungkinkan Anda membuat widget **Keranjang Belanja** + **Checkout Bank Transfer** secara live.

## Fitur
1. Input **Nama Blog** & **Link Blog**
2. Tambah produk beserta harga
3. Preview widget langsung
4. Tombol checkout menampilkan bank, no rekening, nama penerima
5. Form **Konfirmasi Transfer**
6. Copy kode HTML, CSS, JS

## Cara Pakai
1. Isi form Nama Blog & Link Blog
2. Tambahkan produk
3. Preview muncul secara otomatis
4. Klik "Generate Code" → copy HTML / CSS / JS
5. Tempel HTML di halaman produk/blog
6. Tempel CSS di `<style>` atau file terpisah
7. Tempel JS di `<script>` atau host eksternal

## Hosting JS Eksternal
1. Buat file `widget.js` dan upload ke GitHub Pages atau hosting
2. Tambahkan di HTML:
```html
<script src="https://username.github.io/widget-generator/widget.js"></script>
