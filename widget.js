let products = [];
let cart = [];

// Copy Code
function copyCode(id){
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);
  alert('Code berhasil dicopy!');
}

// Tambah produk ke list
document.getElementById('addProductBtn').addEventListener('click', function(){
  const name = document.getElementById('prodName').value;
  const price = parseInt(document.getElementById('prodPrice').value);
  if(!name || !price) { alert('Isi nama dan harga produk!'); return; }
  products.push({name, price});
  updatePreview();
  document.getElementById('prodName').value='';
  document.getElementById('prodPrice').value='';
});

// Update preview
function updatePreview(){
  const preview = document.getElementById('preview-widget');
  const blogName = document.getElementById('blogName').value || 'Nama Blog';
  let html = `<div id="cart-widget"><h3>Keranjang ${blogName}</h3><ul id="cart-items"></ul><strong>Total: Rp <span id="cart-total">0</span></strong><br><br><button id="checkout-btn">Checkout via Bank Transfer</button></div><hr>`;
  html += `<h4>Produk</h4>`;
  products.forEach((p,index)=>{
    html += `<button onclick="addToCart('${p.name}',${p.price})">${p.name} - Rp ${p.price.toLocaleString()}</button> `;
  });
  preview.innerHTML = html;
}

// Tambah ke cart
function addToCart(name, price){
  cart.push({name, price});
  renderCart();
}

// Render cart
function renderCart(){
  const items = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  if(!items || !total) return;
  items.innerHTML='';
  let sum=0;
  cart.forEach((item,i)=>{
    sum+=item.price;
    items.innerHTML += `<li>${item.name} - Rp ${item.price.toLocaleString()} <button onclick="removeFromCart(${i})">Hapus</button></li>`;
  });
  total.textContent = sum.toLocaleString();
}

// Hapus item cart
function removeFromCart(i){
  cart.splice(i,1);
  renderCart();
}

// Checkout + konfirmasi transfer
document.addEventListener('click',function(e){
  if(e.target && e.target.id=='checkout-btn'){
    if(cart.length===0){alert('Keranjang kosong!'); return;}
    let totalAmount = cart.reduce((sum,i)=>sum+i.price,0);
    let banks = [
      {bank:"BCA", no:"1234567890", nama:"PT. GueTemenin Indonesia"},
      {bank:"Mandiri", no:"0987654321", nama:"PT. GueTemenin Indonesia"},
      {bank:"BNI", no:"1122334455", nama:"PT. GueTemenin Indonesia"}
    ];
    let w = window.open('','_blank','width=500,height=600,scrollbars=yes');
    let html=`<h3>Informasi Transfer Bank</h3><p>Total: Rp ${totalAmount.toLocaleString()}</p>`;
    html+='<ul>';
    banks.forEach(b=>html+=`<li><strong>${b.bank}</strong><br>No.Rek: ${b.no} <button onclick="navigator.clipboard.writeText('${b.no}'); alert('Disalin: ${b.no}')">Copy</button><br>Nama: ${b.nama} <button onclick="navigator.clipboard.writeText('${b.nama}'); alert('Disalin: ${b.nama}')">Copy</button></li><br>`);
    html+='</ul>';
    // Form Konfirmasi Transfer
    html+=`<h3>Konfirmasi Transfer</h3>
      <form onsubmit="alert('Terima kasih, konfirmasi terkirim!'); return false;">
        <label>Nama Pengirim:</label><input type="text" required><br>
        <label>Bank Pengirim:</label><input type="text" required><br>
        <label>Jumlah Transfer:</label><input type="number" required><br>
        <label>Bukti Transfer (link/foto):</label><input type="text" required><br><br>
        <button type="submit">Kirim Konfirmasi</button>
      </form>`;
    w.document.write(html);
  }
});
