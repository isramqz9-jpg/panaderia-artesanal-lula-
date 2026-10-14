/* ================================================================
   LULA — PANADERÍA ARTESANAL
   PERSONALIZA AQUÍ: WhatsApp, productos, precios y categorías.
   El número de WhatsApp debe llevar país y número, solo dígitos.
   Ejemplo ficticio mexicano: 521234567890
   ================================================================ */
const LULA_CONFIG = {
  whatsapp: "9842806135", // <-- ESCRIBE AQUÍ EL WHATSAPP COMERCIAL DE LULA
  instagram: "https://instagram.com/lula.panaderiaartesanal",
  currency: "MXN",
  locale: "es-MX",
  storageKey: "lula-panaderia-v1"
};

// Son productos de ejemplo. Reemplaza nombres, descripciones, precios y fotos.
// Las fotos son enlaces públicos de ejemplo; puedes cambiarlos por tus fotos.
const PRODUCTS = [
  {id:"pan-artesanal",name:"Pan artesanal",category:"Panadería",price:45,description:"Un clásico para acompañar tu café o compartir.",badge:"DE LA CASA",image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85"},
  {id:"dulce-casa",name:"Dulce de la casa",category:"Postres",price:35,description:"Un antojito dulce para regalarte un momento.",badge:"DULCE ANTOJO",image:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85"},
  {id:"pastelitos",name:"Pastelitos",category:"Postres",price:55,description:"Pequeños bocados para compartir y disfrutar.",badge:"PARA COMPARTIR",image:"https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=85"},
  {id:"pan-dulce",name:"Pan dulce",category:"Panadería",price:40,description:"Una pieza deliciosa para hacer más bonito tu día.",badge:"RECIÉN HORNEADO",image:"https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=900&q=85"},
  {id:"seleccion-especial",name:"Selección especial",category:"Especiales",price:80,description:"Una idea dulce para ocasiones especiales.",badge:"ESPECIAL",image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85"},
  {id:"favorito-lula",name:"Favorito LULA",category:"Especiales",price:65,description:"Un antojo para acompañar tus mejores momentos.",badge:"FAVORITO",image:"https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=900&q=85"}
];

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const money = amount => new Intl.NumberFormat(LULA_CONFIG.locale,{style:"currency",currency:LULA_CONFIG.currency}).format(amount);
const state = {category:"Todos",search:"",cart:new Map(),favorites:new Set(),theme:"light"};
let toastTimer;

function readSavedState(){
  try {
    const saved=JSON.parse(localStorage.getItem(LULA_CONFIG.storageKey)||"{}");
    if(Array.isArray(saved.cart)) saved.cart.forEach(([id,qty])=>{if(PRODUCTS.some(p=>p.id===id)&&Number.isInteger(qty)&&qty>0)state.cart.set(id,qty)});
    if(Array.isArray(saved.favorites)) saved.favorites.forEach(id=>{if(PRODUCTS.some(p=>p.id===id))state.favorites.add(id)});
    if(saved.theme==="dark")state.theme="dark";
  } catch(error){console.warn("No se pudo recuperar el estado guardado.",error)}
}
function saveState(){
  try{localStorage.setItem(LULA_CONFIG.storageKey,JSON.stringify({cart:[...state.cart],favorites:[...state.favorites],theme:state.theme}))}
  catch(error){console.warn("No se pudo guardar el estado. Si abriste el archivo directamente, prueba usar Live Server.",error)}
}
function safeText(value){return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]))}
function productCard(product,compact=false){
  const favorite=state.favorites.has(product.id);
  return `<article class="product-card" data-product="${safeText(product.id)}"><div class="product-image"><img src="${safeText(product.image)}" alt="${safeText(product.name)}" loading="lazy"><span class="product-badge">${safeText(product.badge||product.category)}</span><button class="favorite-button ${favorite?"is-favorite":""}" data-favorite="${safeText(product.id)}" aria-label="${favorite?"Quitar de favoritos":"Añadir a favoritos"}" aria-pressed="${favorite}">${favorite?"♥":"♡"}</button></div><div class="product-info"><div class="product-title-row"><h3>${safeText(product.name)}</h3><span class="product-price">${money(product.price)}</span></div><p class="product-description">${safeText(product.description)}</p><div class="product-actions"><button class="add-button" data-add="${safeText(product.id)}">＋ Agregar al pedido</button><button class="details-button" data-details="${safeText(product.id)}" aria-label="Ver detalles de ${safeText(product.name)}" title="Ver detalles">↗</button></div></div></article>`;
}
function renderCategories(){
  const categories=["Todos",...new Set(PRODUCTS.map(p=>p.category))];
  $("#categoryTabs").innerHTML=categories.map(cat=>`<button class="category-tab ${state.category===cat?"active":""}" data-category="${safeText(cat)}" aria-pressed="${state.category===cat}">${safeText(cat)}</button>`).join("");
}
function filteredProducts(){
  const term=state.search.trim().toLocaleLowerCase(LULA_CONFIG.locale);
  return PRODUCTS.filter(p=>(state.category==="Todos"||p.category===state.category)&&(!term||`${p.name} ${p.category} ${p.description}`.toLocaleLowerCase(LULA_CONFIG.locale).includes(term)));
}
function renderProducts(){
  const items=filteredProducts();
  $("#productGrid").innerHTML=items.map(p=>productCard(p)).join("");
  $("#emptyState").classList.toggle("hidden",items.length!==0);
  $("#catalogStatus").textContent=`${items.length} ${items.length===1?"producto disponible":"productos disponibles"}`;
}
function renderFavorites(){
  const items=PRODUCTS.filter(p=>state.favorites.has(p.id));
  $("#favoritesGrid").innerHTML=items.map(p=>productCard(p,true)).join("");
  $("#favoritesEmpty").classList.toggle("hidden",items.length!==0);
}
function cartQuantity(){return [...state.cart.values()].reduce((sum,qty)=>sum+qty,0)}
function cartTotal(){return [...state.cart.entries()].reduce((sum,[id,qty])=>sum+PRODUCTS.find(p=>p.id===id).price*qty,0)}
function renderCart(){
  const quantity=cartQuantity(),total=cartTotal();
  $("#headerCartCount").textContent=quantity;$("#cartDockCount").textContent=quantity;
  $("#cartSummaryText").textContent=quantity?`${quantity} producto(s) · ${money(total)}`:"Aún no agregas productos";
  $("#cartItems").innerHTML=[...state.cart.entries()].map(([id,qty])=>{
    const p=PRODUCTS.find(item=>item.id===id);return `<div class="cart-line"><img src="${safeText(p.image)}" alt="" loading="lazy"><div><h3>${safeText(p.name)}</h3><small>${money(p.price)} por pieza</small><div class="quantity-controls"><button data-qty="${safeText(id)}" data-delta="-1" aria-label="Quitar una unidad">−</button><span>${qty}</span><button data-qty="${safeText(id)}" data-delta="1" aria-label="Agregar una unidad">＋</button><button class="remove-item" data-remove="${safeText(id)}">Eliminar</button></div></div><span class="line-total">${money(p.price*qty)}</span></div>`;
  }).join("");
  $("#cartEmpty").classList.toggle("hidden",quantity!==0);$("#cartTotal").textContent=money(total);$("#checkoutButton").disabled=quantity===0;
}
function renderAll(){renderCategories();renderProducts();renderFavorites();renderCart()}
function showToast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2400)}
function toggleFavorite(id){if(state.favorites.has(id)){state.favorites.delete(id);showToast("Quitaste este producto de tus favoritos.")}else{state.favorites.add(id);showToast("Guardado en tus favoritos. ♡")}saveState();renderProducts();renderFavorites()}
function addToCart(id){const p=PRODUCTS.find(item=>item.id===id);if(!p)return;state.cart.set(id,(state.cart.get(id)||0)+1);saveState();renderCart();showToast(`${p.name} se agregó a tu pedido. ♡`)}
function openCart(){renderCart();$("#cartModal").classList.remove("hidden");document.body.style.overflow="hidden";setTimeout(()=>$("#customerName").focus({preventScroll:true}),80)}
function closeCart(){$("#cartModal").classList.add("hidden");document.body.style.overflow=""}
function whatsappReady(){return /^\d{8,15}$/.test(LULA_CONFIG.whatsapp)}
function openWhatsApp(message){
  if(!whatsappReady()){
    $("#formMessage").textContent="Falta configurar el número comercial. Abre app.js y escribe el WhatsApp de LULA en LULA_CONFIG.whatsapp (solo números, con código de país).";
    showToast("Configura el número de WhatsApp en app.js.");return false;
  }
  const url=`https://wa.me/${LULA_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
  const win=window.open(url,"_blank","noopener,noreferrer");
  if(!win)window.location.href=url;
  return true;
}
function productDetails(id){const p=PRODUCTS.find(item=>item.id===id);if(!p)return;const choice=window.confirm(`${p.name}\n\n${p.description}\n\nPrecio de ejemplo: ${money(p.price)}\n\nPresiona Aceptar para agregarlo a tu pedido.`);if(choice)addToCart(id)}
function applyTheme(){document.body.classList.toggle("theme-dark",state.theme==="dark");$("#themeToggle").textContent=state.theme==="dark"?"☾":"☼";$("#themeToggle").setAttribute("aria-label",state.theme==="dark"?"Activar tema claro":"Activar tema oscuro")}

$("#categoryTabs").addEventListener("click",event=>{const button=event.target.closest("[data-category]");if(!button)return;state.category=button.dataset.category;renderCategories();renderProducts()});
$("#productSearch").addEventListener("input",event=>{state.search=event.target.value;renderProducts()});
$("#clearSearch").addEventListener("click",()=>{state.category="Todos";state.search="";$("#productSearch").value="";renderCategories();renderProducts()});
function productAction(event){const favorite=event.target.closest("[data-favorite]"),add=event.target.closest("[data-add]"),details=event.target.closest("[data-details]");if(favorite)toggleFavorite(favorite.dataset.favorite);else if(add)addToCart(add.dataset.add);else if(details)productDetails(details.dataset.details)}
$("#productGrid").addEventListener("click",productAction);$("#favoritesGrid").addEventListener("click",productAction);
$("#cartItems").addEventListener("click",event=>{const qty=event.target.closest("[data-qty]"),remove=event.target.closest("[data-remove]");if(remove){state.cart.delete(remove.dataset.remove)}else if(qty){const id=qty.dataset.qty,next=(state.cart.get(id)||0)+Number(qty.dataset.delta);if(next<=0)state.cart.delete(id);else state.cart.set(id,next)}else return;saveState();renderCart()});
$("#openCart").addEventListener("click",openCart);$("#goCart").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closeCart);
$("#cartModal").addEventListener("click",event=>{if(event.target===$("#cartModal"))closeCart()});document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!$("#cartModal").classList.contains("hidden"))closeCart()});
$("#checkoutForm").addEventListener("submit",event=>{
  event.preventDefault();$("#formMessage").textContent="";
  if(cartQuantity()===0){$("#formMessage").textContent="Agrega al menos un producto antes de enviar tu pedido.";return}
  const name=$("#customerName").value.trim(),phone=$("#customerPhone").value.trim(),notes=$("#orderNotes").value.trim();
  if(name.length<2){$("#formMessage").textContent="Escribe tu nombre para preparar el mensaje.";$("#customerName").focus();return}
  if(phone&&!/^[+\d\s()-]{7,20}$/.test(phone)){ $("#formMessage").textContent="Revisa el teléfono: usa números y, si quieres, +, espacios o guiones.";$("#customerPhone").focus();return }
  const lines=["¡Hola, LULA! ♡","Quisiera consultar este pedido:",""];
  for(const [id,qty] of state.cart){const p=PRODUCTS.find(item=>item.id===id);lines.push(`• ${qty} × ${p.name} — ${money(p.price*qty)}`)}
  lines.push("",`Total estimado: ${money(cartTotal())}`,"",`Nombre: ${name}`);if(phone)lines.push(`Teléfono: ${phone}`);if(notes)lines.push(`Notas: ${notes}`);lines.push("","¿Me confirman disponibilidad, precio final y opciones de entrega? ¡Gracias!");
  if(openWhatsApp(lines.join("\n")))$("#formMessage").textContent="Se abrió WhatsApp con el mensaje preparado. Revísalo y envíalo desde WhatsApp para completar la consulta.";
});
$("#contactWhatsapp").addEventListener("click",()=>{openWhatsApp("¡Hola, LULA! ♡ Quisiera información sobre sus productos, disponibilidad y pedidos, por favor.")});
$("#themeToggle").addEventListener("click",()=>{state.theme=state.theme==="dark"?"light":"dark";applyTheme();saveState()});
$("#menuToggle").addEventListener("click",()=>{const nav=$("#mainNav"),opened=nav.classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(opened));$("#menuToggle").textContent=opened?"×":"☰"});
$$("#mainNav a").forEach(link=>link.addEventListener("click",()=>{$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");$("#menuToggle").textContent="☰"}));

readSavedState();applyTheme();renderAll();$("#year").textContent=new Date().getFullYear();
if(whatsappReady())$("#contactHint").textContent="También puedes consultarnos por WhatsApp.";
/* LULA EXTRAS — pega este bloque al FINAL de app.js.
   Los precios son ejemplos: cámbialos por los precios vigentes de LULA. */

const LULA_EXTRA_PRODUCTS = [
  {id:"rol-canela-lula",name:"Rol de canela",category:"Roles de canela",price:55,description:"Masa suave, canela aromática y glaseado dulce.",badge:"FAVORITO LULA",image:"https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=900&q=85"},
  {id:"rol-canela-nuez-lula",name:"Rol de canela con nuez",category:"Roles de canela",price:65,description:"Nuestro rol clásico con un toque crujiente de nuez.",badge:"DULCE ANTOJO",image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85"},
  {id:"rol-moras-lula",name:"Rol de moras",category:"Roles de canela",price:65,description:"Una opción frutal inspirada en los roles de la casa.",badge:"ESPECIAL",image:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85"},
  {id:"concha-vainilla-lula",name:"Concha de vainilla",category:"Pan dulce",price:25,description:"Pan dulce suave con cubierta tradicional de vainilla.",badge:"CLÁSICO",image:"https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=900&q=85"},
  {id:"concha-chocolate-lula",name:"Concha de chocolate",category:"Pan dulce",price:27,description:"Concha dulce con cubierta sabor chocolate.",badge:"CHOCOLATOSA",image:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85"},
  {id:"dona-lula",name:"Dona glaseada",category:"Pan dulce",price:25,description:"Un antojo dulce con glaseado y mucho cariño.",badge:"DONITA LULA",image:"https://images.unsplash.com/photo-1551024506-0bdd9d7a9a3f?auto=format&fit=crop&w=900&q=85"},
  {id:"oreja-lula",name:"Oreja de hojaldre",category:"Pan dulce",price:24,description:"Hojaldre crujiente con un toque dulce.",badge:"CRUJIENTITA",image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85"},
  {id:"croissant-lula",name:"Croissant",category:"Panadería",price:38,description:"Hojaldre dorado para acompañar tu bebida favorita.",badge:"DE LA CASA",image:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85"},
  {id:"brownie-lula",name:"Brownie de chocolate",category:"Postres",price:45,description:"Un bocado de chocolate para acompañar tu café.",badge:"CHOCOLATE",image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85"},
  {id:"frappe-moka-lula",name:"Frappé moka",category:"Bebidas frías",price:75,description:"Café, chocolate y hielo en una bebida cremosa.",badge:"FRÍO Y CREMOSO",image:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85"},
  {id:"frappe-caramelo-lula",name:"Frappé de caramelo",category:"Bebidas frías",price:75,description:"Una mezcla fría de café y caramelo.",badge:"FAVORITO",image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85"},
  {id:"frappe-vainilla-lula",name:"Frappé de vainilla",category:"Bebidas frías",price:70,description:"Bebida fría y cremosa con sabor a vainilla.",badge:"DULCE ANTOJO",image:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85"},
  {id:"latte-helado-lula",name:"Latte frío",category:"Bebidas frías",price:60,description:"Espresso con leche fría y hielo.",badge:"CAFÉ HELADO",image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85"},
  {id:"cold-brew-lula",name:"Cold brew",category:"Bebidas frías",price:65,description:"Café preparado en frío, refrescante y aromático.",badge:"PARA CAFETEROS",image:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85"},
  {id:"limonada-lula",name:"Limonada natural",category:"Bebidas frías",price:45,description:"Una bebida fresca para acompañar tus antojos.",badge:"REFRESCANTE",image:"https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?auto=format&fit=crop&w=900&q=85"},
  {id:"americano-lula",name:"Americano caliente",category:"Bebidas calientes",price:40,description:"Café aromático servido caliente.",badge:"CAFÉ CLÁSICO",image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85"},
  {id:"latte-caliente-lula",name:"Latte caliente",category:"Bebidas calientes",price:58,description:"Espresso con leche vaporizada y textura suave.",badge:"CREMOSITO",image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85"},
  {id:"capuchino-lula",name:"Capuchino",category:"Bebidas calientes",price:55,description:"Espresso, leche vaporizada y una capa de espuma.",badge:"ESPUMA PERFECTA",image:"https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=85"},
  {id:"chocolate-caliente-lula",name:"Chocolate caliente",category:"Bebidas calientes",price:50,description:"Chocolate calientito para acompañar un pan dulce.",badge:"ABRAZO EN TAZA",image:"https://images.unsplash.com/photo-1542990253-0b8be3b2e7a6?auto=format&fit=crop&w=900&q=85"},
  {id:"chai-latte-lula",name:"Chai latte",category:"Bebidas calientes",price:60,description:"Bebida especiada con leche, aromática y reconfortante.",badge:"AROMÁTICO",image:"https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=85"},
  {id:"te-caliente-lula",name:"Té caliente",category:"Bebidas calientes",price:35,description:"Una taza caliente para disfrutar con tranquilidad.",badge:"MOMENTO TRANQUILO",image:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=85"}
];

/* Agregar los productos al arreglo que ya usa el catálogo y el carrito. */
for (const producto of LULA_EXTRA_PRODUCTS) {
  if (!PRODUCTS.some(actual => actual.id === producto.id)) PRODUCTS.push(producto);
}

/* Ubicación publicada en una ficha comercial: confirma que siga vigente. */
const LULA_DIRECCION = "Calle Av Petempich, SM Multiplaza, Playa del Carmen, Quintana Roo, México local D6";
const LULA_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(LULA_DIRECCION);

/* Añadir el apartado antes de Contacto, sin borrar secciones existentes. */
if (!document.querySelector("#ubicacion-lula")) {
  const contacto = document.querySelector("#contacto");
  const main = document.querySelector("main");
  const ubicacion = document.createElement("section");
  ubicacion.id = "ubicacion-lula";
  ubicacion.className = "lula-location";
  ubicacion.innerHTML = `
    <div class="lula-location-inner">
      <div>
        <p class="eyebrow">VEN A VISITARNOS</p>
        <h2>Encuentra tu<br><em>rinconcito LULA.</em></h2>
        <p>Ven por tu pan dulce favorito, un rol de canela o una bebida fría o caliente.</p>
        <p><strong>Ubicación publicada:</strong><br><span id="lula-location-address"></span></p>
        <p>Confirma la dirección antes de publicar la página.</p>
      </div>
      <div class="lula-location-card">
        <span class="lula-location-pin">⌖</span>
        <h3>Te esperamos en LULA</h3>
        <p>Abre el mapa para consultar cómo llegar.</p>
        <a href="${LULA_MAPS_URL}" target="_blank" rel="noopener noreferrer">Abrir Google Maps ↗</a>
      </div>
    </div>`;
  if (contacto) main.insertBefore(ubicacion, contacto);
  else if (main) main.appendChild(ubicacion);
  const direccion = document.querySelector("#lula-location-address");
  if (direccion) direccion.textContent = LULA_DIRECCION;
}

/* Agregar enlace a Ubicación al menú sin repetirlo. */
const navLula = document.querySelector("#mainNav");
if (navLula && !navLula.querySelector('a[href="#ubicacion-lula"]')) {
  const enlace = document.createElement("a");
  enlace.href = "#ubicacion-lula";
  enlace.textContent = "Ubicación";
  const contactoNav = navLula.querySelector('a[href="#contacto"]');
  if (contactoNav) navLula.insertBefore(enlace, contactoNav);
  else navLula.appendChild(enlace);
}

/* Releer carrito/favoritos guardados ahora que ya existe el nuevo menú. */
readSavedState();
/*
EJEMPLOS PARA ORGANIZAR EL MENÚ LULA.
Estos datos son una guía; todavía no están conectados
automáticamente con tu catálogo ni con tu carrito.
*/

const menuLulaPorSecciones = {
  panDulce: [
    { nombre: "Concha de vainilla", precio: 25 },
    { nombre: "Rol de canela", precio: 38 },
    { nombre: "Croissant dulce", precio: 42 }
  ],

  panSalado: [
    { nombre: "Croissant de queso", precio: 45 },
    { nombre: "Baguette artesanal", precio: 35 },
    { nombre: "Pan de ajo", precio: 30 }
  ],

  bebidasFrias: [
    { nombre: "Café frío", precio: 55 },
    { nombre: "Latte helado", precio: 60 },
    { nombre: "Chocolate frío", precio: 50 }
  ],

  bebidasCalientes: [
    { nombre: "Espresso", precio: 35 },
    { nombre: "Cappuccino", precio: 50 },
    { nombre: "Chocolate caliente", precio: 48 }
  ]
};

renderAll();
