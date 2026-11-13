const WA="917448700144"; // WhatsApp number: country code + number, no + or spaces
const IMG=[
 "images/products/avarampoo-tea.webp",
 "images/products/hibiscus-tea.webp",
 "images/products/moringa-soup-mix.webp",
 "images/products/sathu-maavu.webp",
 "images/products/pirandai-powder.webp",
 "images/products/mudakathan-powder.webp",
 "images/products/moringa-leaf-powder.webp",
 "images/products/curry-leaf-powder.webp",
 "images/products/sesame-powder.webp",
 "images/products/paruppu-podi.webp",
 "images/products/idli-podi.webp",
 "images/products/curry-masala.webp",
 "images/products/sambar-powder.webp",
 "images/products/chicken-masala.webp",
 "images/products/chilli-powder.webp",
 "images/products/coriander-powder.webp",
 "images/products/turmeric-powder.webp"
];
const CATS=[["tea","Herbal teas & mixes",1],["podi","Traditional podis",4],["masala","Authentic masalas",16]];
const P=[
["Avarampoo Tea","ஆவாரம்பூ தேநீர்",150,"50g","tea"],["Hibiscus Tea","செம்பருத்தி தேநீர்",140,"50g","tea"],
["Moringa Soup Mix","முருங்கை சூப் மிக்ஸ்",130,"100g","tea"],["Sathu Maavu","சத்து மாவு",110,"100g","tea"],
["Pirandai Powder","பிரண்டை பொடி",150,"100g","podi"],["Mudakathan Powder","முடக்கத்தான் பொடி",140,"100g","podi"],
["Moringa Leaf Powder","முருங்கை இலை பொடி",130,"100g","podi"],["Curry Leaf Powder","கறிவேப்பிலை பொடி",120,"100g","podi"],
["Sesame Powder","எள்ளு பொடி",130,"100g","podi"],["Paruppu Podi","பருப்பு பொடி",110,"100g","podi"],["Idli Podi","இட்லி பொடி",80,"100g","podi"],
["Curry Masala","கறி மசாலா",80,"100g","masala"],["Sambar Powder","சாம்பார் பொடி",80,"100g","masala"],["Chicken Masala","சிக்கன் மசாலா",80,"100g","masala"],
["Chilli Powder","மிளகாய் பொடி",70,"100g","masala"],["Coriander Powder","மல்லி பொடி",70,"100g","masala"],["Turmeric Powder","மஞ்சள் பொடி",70,"100g","masala"]];
const q=P.map(()=>0),$=id=>document.getElementById(id);
const grid=$("grid"),tabs=$("tabs");
const tabList=[["all","All"],...CATS.map(c=>[c[0],c[1]])];
tabs.innerHTML=tabList.map((t,i)=>`<button type="button" data-f="${t[0]}" aria-pressed="${i==0}">${t[1]}</button>`).join("");
$("cats").innerHTML=CATS.map(c=>`<button class="cat" type="button" data-f="${c[0]}"><img src="${IMG[c[2]]}" alt=""><span>${c[1]}</span></button>`).join("");
grid.innerHTML=P.map((p,i)=>`<article class="card" data-c="${p[4]}"><div class="ph"><img src="${IMG[i]}" alt="${p[0]} pouch" loading="lazy"></div><h3>${p[0]}</h3><p class="ta" lang="ta">${p[1]}</p><p class="pr"><b>₹${p[2]}</b> · ${p[3]}</p><div class="act" data-i="${i}"></div></article>`).join("");
function act(i){const a=grid.querySelector(`.act[data-i="${i}"]`);
 a.innerHTML=q[i]?`<div class="step"><button type="button" data-d="-1" aria-label="Remove one ${P[i][0]}">−</button><output>${q[i]}</output><button type="button" data-d="1" aria-label="Add one ${P[i][0]}">+</button></div>`:`<button type="button" class="add" data-d="1">Add</button>`}
P.forEach((_,i)=>act(i));
function filter(f){tabs.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.f==f));
 grid.querySelectorAll(".card").forEach(c=>c.hidden=!(f=="all"||c.dataset.c==f))}
tabs.onclick=e=>{const b=e.target.closest("button");if(b)filter(b.dataset.f)};
$("cats").onclick=e=>{const b=e.target.closest("button");if(b){filter(b.dataset.f);$("shop").scrollIntoView()}};
function change(i,d,f){q[i]=Math.max(0,q[i]+d);act(i);if(f){const a=grid.querySelector(`.act[data-i="${i}"] button`);a&&a.focus()}update()}
grid.onclick=e=>{const b=e.target.closest("button[data-d]");if(b)change(+b.closest(".act").dataset.i,+b.dataset.d,1)};
$("lines").onclick=e=>{const b=e.target.closest("button[data-d]");if(b)change(+b.dataset.i,+b.dataset.d)};
function update(){let n=0,t=0,L=[],H="";
 P.forEach((p,i)=>{if(q[i]){n+=q[i];t+=q[i]*p[2];L.push(`${q[i]} x ${p[0]} (${p[3]}) - ₹${q[i]*p[2]}`);
  H+=`<li><div>${p[0]}<small>₹${p[2]} · ${p[3]}</small></div><div class="step" style="min-width:104px"><button type="button" data-i="${i}" data-d="-1" aria-label="Remove one ${p[0]}">−</button><output>${q[i]}</output><button type="button" data-i="${i}" data-d="1" aria-label="Add one ${p[0]}">+</button></div></li>`}});
 $("n").textContent=n;$("lines").innerHTML=H||"<li>Your order is empty. Add products to begin.</li>";$("tot").textContent="₹"+t;
 $("bar").hidden=!n;$("c2").textContent=n+(n>1?" items":" item");$("t2").textContent="₹"+t;
 const a=$("wa");if(!n){a.setAttribute("aria-disabled","true");a.href="#";return}
 a.removeAttribute("aria-disabled");
 a.href=`https://wa.me/${WA}?text=`+encodeURIComponent(`Hi Uzhavu, I would like to order:\n${L.join("\n")}\n\nProducts total: ₹${t}\n\nName: ${$("fn").value.trim()}\nDelivery address: ${$("fa").value.trim()}\n\nPlease confirm delivery charges and share the payment link.`)}
const dr=$("drawer"),sc=$("scrim");
function openD(){dr.classList.add("open");sc.hidden=false;$("close").focus()}
function closeD(){dr.classList.remove("open");sc.hidden=true;$("open").focus()}
$("open").onclick=openD;$("open2").onclick=openD;$("close").onclick=closeD;sc.onclick=closeD;
document.addEventListener("keydown",e=>{if(e.key=="Escape"&&dr.classList.contains("open"))closeD()});
$("fwa").href=`https://wa.me/${WA}`;
const wa=t=>`https://wa.me/${WA}?text=`+encodeURIComponent(t);
$("b1").href=wa("Hi Uzhavu, I would like to enquire about a bulk order.\nProducts and quantities:");
$("b2").href=wa("Hi Uzhavu, I run a store and would like to stock your products.\nStore name and location:");
["fn","fa"].forEach(id=>$(id).addEventListener("input",()=>{$("err").hidden=true;update()}));
$("wa").addEventListener("click",e=>{const n=$("fn").value.trim(),a=$("fa").value.trim();
 if(!n||!a){e.preventDefault();$("err").hidden=false;(n?$("fa"):$("fn")).focus()}});
update();
