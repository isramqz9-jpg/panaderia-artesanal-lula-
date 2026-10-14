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
const LULA_DIRECCION = "Calle Av Petempich, SM Multiplaza, Playa del Carmen, Quintana Roo, México";
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
renderAll();
