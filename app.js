{
const K='bitacora-mvp-v2',TOTAL=195;
/* País en español -> [nombre en el mapa, continente] */
const C={'Perú':['Peru','Sudamérica'],'Colombia':['Colombia','Sudamérica'],'Ecuador':['Ecuador','Sudamérica'],'Bolivia':['Bolivia','Sudamérica'],'Chile':['Chile','Sudamérica'],'Argentina':['Argentina','Sudamérica'],'Brasil':['Brazil','Sudamérica'],'Uruguay':['Uruguay','Sudamérica'],'Paraguay':['Paraguay','Sudamérica'],'Venezuela':['Venezuela','Sudamérica'],
'México':['Mexico','Norteamérica'],'Estados Unidos':['United States','Norteamérica'],'Canadá':['Canada','Norteamérica'],'Guatemala':['Guatemala','Norteamérica'],'Costa Rica':['Costa Rica','Norteamérica'],'Panamá':['Panama','Norteamérica'],'Cuba':['Cuba','Norteamérica'],'República Dominicana':['Dominican Rep.','Norteamérica'],'Honduras':['Honduras','Norteamérica'],'Nicaragua':['Nicaragua','Norteamérica'],'El Salvador':['El Salvador','Norteamérica'],
'España':['Spain','Europa'],'Francia':['France','Europa'],'Italia':['Italy','Europa'],'Portugal':['Portugal','Europa'],'Reino Unido':['United Kingdom','Europa'],'Países Bajos':['Netherlands','Europa'],'Alemania':['Germany','Europa'],'Suiza':['Switzerland','Europa'],'Grecia':['Greece','Europa'],'Irlanda':['Ireland','Europa'],'Bélgica':['Belgium','Europa'],'Austria':['Austria','Europa'],'Croacia':['Croatia','Europa'],'Noruega':['Norway','Europa'],'Suecia':['Sweden','Europa'],'Polonia':['Poland','Europa'],'República Checa':['Czech Rep.','Europa'],'Hungría':['Hungary','Europa'],'Turquía':['Turkey','Europa'],
'Japón':['Japan','Asia'],'China':['China','Asia'],'Corea del Sur':['Korea','Asia'],'Tailandia':['Thailand','Asia'],'Vietnam':['Vietnam','Asia'],'Indonesia':['Indonesia','Asia'],'India':['India','Asia'],'Filipinas':['Philippines','Asia'],'Malasia':['Malaysia','Asia'],'Emiratos Árabes':['United Arab Emirates','Asia'],'Israel':['Israel','Asia'],'Jordania':['Jordan','Asia'],'Nepal':['Nepal','Asia'],
'Marruecos':['Morocco','África'],'Egipto':['Egypt','África'],'Sudáfrica':['South Africa','África'],'Kenia':['Kenya','África'],'Tanzania':['Tanzania','África'],'Túnez':['Tunisia','África'],
'Australia':['Australia','Oceanía'],'Nueva Zelanda':['New Zealand','Oceanía']};
const EN2ES=Object.fromEntries(Object.entries(C).map(([es,[en]])=>[en,es]));
const CONTS=['Sudamérica','Norteamérica','Europa','Asia','África','Oceanía'];
const GAZ=[['Lima','Perú',-12.046,-77.043],['Cusco','Perú',-13.532,-71.967],['Machu Picchu','Perú',-13.163,-72.545],['Arequipa','Perú',-16.409,-71.537],['Paracas','Perú',-13.834,-76.25],['Huacachina','Perú',-14.087,-75.763],['Lago Titicaca','Perú',-15.84,-70.022],['Iquitos','Perú',-3.749,-73.253],['Máncora','Perú',-4.104,-81.045],['Huaraz','Perú',-9.527,-77.528],['Bogotá','Colombia',4.711,-74.072],['Medellín','Colombia',6.244,-75.581],['Cartagena','Colombia',10.391,-75.479],['Quito','Ecuador',-.18,-78.467],['Galápagos','Ecuador',-.743,-90.313],['La Paz','Bolivia',-16.5,-68.15],['Salar de Uyuni','Bolivia',-20.134,-67.489],['Santiago','Chile',-33.449,-70.669],['San Pedro de Atacama','Chile',-22.909,-68.2],['Buenos Aires','Argentina',-34.604,-58.382],['Mendoza','Argentina',-32.889,-68.845],['Bariloche','Argentina',-41.133,-71.31],['Río de Janeiro','Brasil',-22.907,-43.173],['Ciudad de México','México',19.433,-99.133],['Cancún','México',21.161,-86.851],['Oaxaca','México',17.073,-96.726],['Nueva York','Estados Unidos',40.713,-74.006],['Madrid','España',40.417,-3.704],['Barcelona','España',41.385,2.173],['París','Francia',48.857,2.352],['Roma','Italia',41.902,12.496],['Lisboa','Portugal',38.722,-9.139],['Londres','Reino Unido',51.507,-.128],['Ámsterdam','Países Bajos',52.368,4.904],['Tokio','Japón',35.676,139.65],['Kioto','Japón',35.012,135.768],['Bangkok','Tailandia',13.756,100.502],['Bali','Indonesia',-8.34,115.092],['Marrakech','Marruecos',31.629,-7.981],['Ciudad del Cabo','Sudáfrica',-33.925,18.424],['Sídney','Australia',-33.869,151.209]];
const UCOL=['#0f0f0f','#ff5a4e','#2a9d6f','#0a6cff','#c2410c','#7c3aed','#0891b2','#be185d'];
const uid=()=>Math.random().toString(36).slice(2,9);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=s=>document.querySelector(s);
const ico=(n,extra='')=>`<svg class="i" ${extra}><use href="#i-${n}"/></svg>`;

/* Fotos de ejemplo dibujadas (paisajes generados) */
const SC=new Map();
function scene(k,n){
  const key=k+n;if(SC.has(key))return SC.get(key);
  const H=[205,18,330,190,35,255,10,170,45,220,300,25,195,15][n%14],hs=(h,s,l)=>`hsl(${h},${s}%,${l}%)`;
  const sx=70+(n*53)%260,sy=80+(n*29)%70,dk=l=>hs((H+200)%360,28,l);let g='';
  if(k==='mont')g=`<path d="M0 290 L90 165 L150 235 L235 110 L320 245 L400 185 V400 H0Z" fill="${dk(40)}"/><path d="M235 110 L262 150 L246 146 L232 160 L214 142Z" fill="#fff" opacity=".9"/><path d="M0 345 L120 262 L220 322 L310 272 L400 318 V400 H0Z" fill="${dk(24)}"/>`;
  else if(k==='mar')g=`<rect y="245" width="400" height="160" fill="${hs((H+180)%360,55,42)}"/><path d="M0 275 Q50 265 100 275 T200 275 T300 275 T400 275" stroke="#fff" stroke-opacity=".35" stroke-width="3" fill="none"/><path d="M0 305 Q60 295 120 305 T240 305 T360 305" stroke="#fff" stroke-opacity=".25" stroke-width="3" fill="none"/><path d="M0 345 Q200 305 400 352 V400 H0Z" fill="${hs(40,62,78)}"/>`;
  else if(k==='city'){for(let i=0;i<10;i++){const h=90+((n*7+i*37)%130),x=i*41;g+=`<rect x="${x}" y="${400-h-40}" width="38" height="${h+40}" fill="${dk(18+(i%3)*7)}"/>`;for(let w=0;w<Math.floor(h/26);w++)g+=`<rect x="${x+8}" y="${400-h-28+w*26}" width="8" height="10" fill="#ffe7a8" opacity="${(i+w)%3?'.15':'.8'}"/><rect x="${x+22}" y="${400-h-28+w*26}" width="8" height="10" fill="#ffe7a8" opacity="${(i*w)%4?'.15':'.7'}"/>`}}
  else if(k==='selva')g=`<path d="M0 270 Q100 210 200 260 T400 240 V400 H0Z" fill="${hs(140,35,38)}"/><path d="M0 320 Q120 270 240 318 T400 300 V400 H0Z" fill="${hs(150,42,24)}"/>`+[40,110,190,280,350].map((x,i)=>`<circle cx="${x}" cy="${305-(i%2)*20}" r="${26+(i%3)*6}" fill="${hs(130+i*5,40,20+i*2)}"/>`).join('');
  else g=`<path d="M0 280 Q120 230 230 280 T400 265 V400 H0Z" fill="${hs(32,70,66)}"/><path d="M0 335 Q150 285 280 330 T400 320 V400 H0Z" fill="${hs(26,60,52)}"/>`;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hs(H,68,60)}"/><stop offset="1" stop-color="${hs((H+35)%360,85,84)}"/></linearGradient></defs><rect width="400" height="400" fill="url(#s)"/><circle cx="${sx}" cy="${sy}" r="32" fill="#fff6d8" opacity=".92"/>${g}</svg>`;
  const u='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);SC.set(key,u);return u;
}
const src=s=>s.startsWith('scene:')?scene(...s.slice(6).split(':').map((v,i)=>i?+v:v)):s;

function seed(){
  const g=n=>GAZ.find(x=>x[0]===n);
  const pl=(trip,n,date,cat)=>{const x=g(n);return{id:uid(),trip,name:x[0],country:x[1],lat:x[2],lng:x[3],date,cat}};
  const places=[pl('t1','Lima','2026-03-02','Ciudad'),pl('t1','Paracas','2026-03-04','Playa'),pl('t1','Arequipa','2026-03-07','Ciudad'),pl('t1','Cusco','2026-03-10','Ciudad'),pl('t1','Machu Picchu','2026-03-12','Atracción'),pl('t2','Bogotá','2026-07-15','Ciudad'),pl('t2','Medellín','2026-07-18','Ciudad'),pl('t2','Cartagena','2026-07-22','Playa'),pl('t3','Buenos Aires','2025-11-08','Ciudad'),pl('t3','Mendoza','2025-11-12','Naturaleza')];
  const P=n=>places.find(p=>p.name===n).id;
  const po=(trip,place,author,title,text,rating,date,photos,likes=[],comments=[])=>({id:uid(),trip,place:place&&P(place),author,title,text,rating,date,photos,likes,comments});
  return{
    users:[{id:'u1',name:'Ana Torres',handle:'ana.viaja',bio:'Fotógrafa de fin de semana · Lima'},{id:'u2',name:'Luis Rojas',handle:'luisrojas',bio:'Siempre buscando el mejor ceviche'},{id:'u3',name:'Camila Díaz',handle:'cami.mochila',bio:'Mochilera'},{id:'u4',name:'Diego Paz',handle:'diegopaz',bio:'Planifica todo en hojas de cálculo'}],
    links:[{a:'u1',b:'u2',type:'Pareja'},{a:'u1',b:'u3',type:'Amigos'},{a:'u1',b:'u4',type:'Amigos'},{a:'u3',b:'u4',type:'Amigos'}],
    trips:[{id:'t1',title:'Ruta del Sur',start:'2026-03-01',end:'2026-03-14',desc:'Dos semanas por la costa y la sierra sur del Perú.',members:['u1','u2'],privacy:'amigos',cover:'scene:mont:5'},
      {id:'t2',title:'Colombia con amigos',start:'2026-07-14',end:'2026-07-25',desc:'Café, salsa y Caribe.',members:['u1','u3','u4'],privacy:'publico',cover:'scene:mar:9'},
      {id:'t3',title:'Vinos y tango',start:'2025-11-07',end:'2025-11-15',desc:'Una semana entre Buenos Aires y Mendoza.',members:['u2'],privacy:'publico',cover:'scene:city:4'}],
    places,
    posts:[
      po('t1','Lima','u2','Atardecer en Miraflores','Primer día del viaje: caminata por el malecón y parapente al final de la tarde.',4,'2026-03-02',['scene:mar:12'],['u1']),
      po('t1','Paracas','u1','Lobos marinos al amanecer','Salimos a las 8 a las Islas Ballestas. Lleven casaca: el viento en la lancha es fuerte. Vimos lobos marinos, pingüinos y el Candelabro.',5,'2026-03-04',['scene:mar:1','scene:desierto:4'],['u2','u3'],[{u:'u3',t:'¡Qué envidia! Lo agrego a mi lista.'}]),
      po('t1','Arequipa','u1','La ciudad blanca','Vista del Misti desde el mirador de Yanahuara. El rocoto relleno, obligatorio.',5,'2026-03-07',['scene:mont:11'],['u4']),
      po('t1','Cusco','u1','Dos días para aclimatarse','El primer día solo caminamos por San Blas y tomamos mate de coca. Vale la pena no apurarse antes de Machu Picchu.',5,'2026-03-10',['scene:city:2','scene:mont:3'],['u2']),
      po('t1','Machu Picchu','u2','Subimos al Huayna Picchu','Entradas compradas con un mes de anticipación. La subida es empinada pero la vista lo compensa todo.',5,'2026-03-12',['scene:mont:8','scene:selva:2','scene:mont:5'],['u1','u3','u4'],[{u:'u1',t:'El mejor día del viaje.'}]),
      po('t2','Bogotá','u3','Monserrate de mañana','Subimos en teleférico temprano para evitar la cola. Vista increíble de toda la ciudad.',4,'2026-07-15',['scene:mont:13'],['u1']),
      po('t2','Medellín','u3','Comuna 13 con guía local','El tour de grafiti lo hicimos con un guía del barrio. Recomendadísimo para entender la historia de la ciudad.',5,'2026-07-18',['scene:city:7'],['u1','u4']),
      po('t2','Cartagena','u4','Islas del Rosario','Un día completo en lancha. Comparen precios en el muelle y lleven efectivo.',4,'2026-07-23',['scene:mar:9','scene:mar:3'],['u3']),
      po('t2',null,'u1','Resumen del viaje','Doce días, tres ciudades y demasiadas arepas. Lo mejor: la gente.',5,'2026-07-25',['scene:selva:6'],['u3','u4'],[{u:'u4',t:'¿Cuándo es el próximo?'}]),
      po('t3','Mendoza','u2','Bodegas en bicicleta','Recorrimos tres bodegas en Maipú alquilando bici. Plan perfecto.',5,'2025-11-12',['scene:selva:10'],[])
    ],
    me:'u1',seen:{}
  };
}
let S;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}
if(!S||!S.users)S=seed();
S.seen=S.seen||{};
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){toast('No se pudo guardar en este navegador (¿fotos muy pesadas?). Los cambios siguen en esta pestaña.')}};
const ui={view:'home',trip:null,user:null,tab:'grid',mplace:null,pick:false,draft:null,back:null};
const U=id=>S.users.find(u=>u.id===id)||{name:'?',handle:'?',id};
const T=id=>S.trips.find(t=>t.id===id);
const uc=id=>UCOL[Math.max(0,S.users.findIndex(u=>u.id===id))%UCOL.length];
const av=(id,cls='')=>`<span class="av ${cls}" style="background:${uc(id)}" title="${esc(U(id).name)}">${esc(U(id).name[0])}</span>`;
const linked=(a,b)=>S.links.find(l=>(l.a===a&&l.b===b)||(l.a===b&&l.b===a));
const canSee=t=>t&&(t.members.includes(S.me)||t.privacy==='publico'||(t.privacy==='amigos'&&t.members.some(m=>linked(m,S.me))));
const isMember=t=>t&&t.members.includes(S.me);
const fmt=d=>d?new Date(d+'T12:00').toLocaleDateString('es',{day:'numeric',month:'short',year:'numeric'}):'';
const ago=d=>{const n=Math.round((Date.now()-new Date(d+'T12:00'))/864e5);return n<1?'hoy':n<30?`hace ${n} d`:n<365?`hace ${Math.round(n/30)} mes${Math.round(n/30)>1?'es':''}`:fmt(d)};
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('on'),3200)}

/* ---------- progreso y logros ---------- */
function hav(a,b){const r=Math.PI/180,dLa=(b.lat-a.lat)*r,dLo=(b.lng-a.lng)*r;const x=Math.sin(dLa/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(dLo/2)**2;return 12742*Math.asin(Math.sqrt(x))}
function stats(u){
  const trips=S.trips.filter(t=>t.members.includes(u)),tids=new Set(trips.map(t=>t.id));
  const places=S.places.filter(p=>tids.has(p.trip)),posts=S.posts.filter(p=>p.author===u);
  const countries={};places.forEach(p=>countries[p.country]=(countries[p.country]||0)+1);
  const conts=new Set(Object.keys(countries).map(c=>C[c]?.[1]).filter(Boolean));
  let km=0;trips.forEach(t=>{const s=places.filter(p=>p.trip===t.id).sort((a,b)=>(a.date||'').localeCompare(b.date||''));for(let i=1;i<s.length;i++)km+=hav(s[i-1],s[i])});
  const photos=posts.reduce((n,p)=>n+(p.photos?.length||0),0);
  const hemis=places.some(p=>p.lat>0)&&places.some(p=>p.lat<0);
  const group=trips.some(t=>t.members.length>=3);
  const nc=Object.keys(countries).length;
  const pts=nc*100+places.length*20+posts.length*10+photos*5+conts.size*150;
  return{trips,places,posts,countries,nc,conts,km:Math.round(km),photos,hemis,group,pts};
}
const LEVELS=[[0,'Turista'],[300,'Explorador'],[800,'Trotamundos'],[1600,'Nómada'],[3000,'Leyenda']];
function level(p){let i=0;LEVELS.forEach((l,j)=>{if(p>=l[0])i=j});const nx=LEVELS[i+1];return{name:LEVELS[i][1],i,next:nx,pct:nx?Math.round((p-LEVELS[i][0])/(nx[0]-LEVELS[i][0])*100):100}}
function badges(s){
  const b=(id,icon,name,desc,cur,goal)=>({id,icon,name,desc,cur:Math.min(cur,goal),goal,done:cur>=goal});
  return[b('trip1','bag','Primer viaje','Crea tu primer viaje',s.trips.length,1),b('post1','pen','Primera historia','Publica tu primera entrada',s.posts.length,1),
    b('c3','flag','Coleccionista','Conoce 3 países',s.nc,3),b('c10','globe','Ciudadano del mundo','Conoce 10 países',s.nc,10),
    b('cont2','globe','Dos continentes','Visita 2 continentes',s.conts.size,2),b('p10','pin','Diez paradas','Registra 10 lugares',s.places.length,10),
    b('ph10','cam','Fotógrafo','Sube 10 fotos',s.photos,10),b('group','users','En manada','Viaja con 3 o más personas',s.group?1:0,1),
    b('eq','road','Cruza el ecuador','Lugares en ambos hemisferios',s.hemis?1:0,1),b('km5','road','5.000 km','Recorre 5.000 km en tus rutas',s.km,5000)];
}
function checkRewards(before){
  const s=stats(S.me),seen=new Set(S.seen[S.me]||(before?badges(before).filter(b=>b.done).map(b=>b.id):[])),bs=badges(s);
  const newC=before?Object.keys(s.countries).filter(c=>!before.countries[c]):[];
  const newB=bs.filter(b=>b.done&&!seen.has(b.id));
  S.seen[S.me]=bs.filter(b=>b.done).map(b=>b.id);save();
  if(before&&(newC.length||newB.length))celebrate(newC,newB,s.pts-before.pts,level(before.pts).name!==level(s.pts).name?level(s.pts).name:null);
}
function celebrate(cs,bs,pts,lvl){
  const cols=['#ff5a4e','#ffb04a','#0a6cff','#2a9d6f','#0f0f0f'];
  const conf=Array.from({length:28},(_,i)=>`<i style="left:${(i*37)%100}%;background:${cols[i%5]};animation-delay:${(i%7)*.08}s"></i>`).join('');
  const title=cs.length?`¡Desbloqueaste ${esc(cs.join(' y '))}!`:`¡Nuevo logro: ${esc(bs[0].name)}!`;
  modal(`<div style="position:relative"><div class="confetti">${conf}</div><div class="celebrate"><div class="md">${ico(cs.length?'flag':bs[0].icon)}</div><h2>${title}</h2>
  ${cs.length?`<p style="margin:0;color:var(--mut)">Ya se pinta en tu mapa.</p>`:''}
  ${bs.length&&cs.length?`<p style="margin:0">Además ganaste: <b>${bs.map(b=>esc(b.name)).join(', ')}</b></p>`:''}
  ${lvl?`<p style="margin:0">Subiste a nivel <b>${esc(lvl)}</b></p>`:''}
  <div class="pts">+${pts} puntos</div><button class="btn pri" data-a="close" style="margin-top:8px">Seguir explorando</button></div></div>`);
}

/* ---------- mapa del inicio (dibujado en la página, sin librerías) ---------- */
const LAND=[
[-168,66,-162,70,-156,71.3,-140,69.6,-128,70,-115,68.5,-95,68,-82,68,-80,63,-94,59,-92,57,-82,55,-79,51.5,-77,56,-78,62,-72,61,-65,60,-61,56,-56,52,-60,47.5,-66,44.5,-70,42,-74,40.5,-76,37,-75.5,35,-81,31.5,-80,27,-80.5,25.2,-82.5,27.5,-84,30,-89,30.2,-94,29.5,-97.5,26,-97.5,22,-95.5,18.8,-91,18.5,-90.5,21,-87,21.5,-88,16,-84,15.8,-83.3,10,-79.5,9.5,-77.5,8.5,-79.5,7.3,-81.5,8,-85.7,10,-87.5,13,-91.5,14,-94.5,16,-96.5,15.7,-101,17.3,-105.5,20,-106,23,-110,23,-114,28,-117.2,32.6,-120.5,34.5,-122.5,37.5,-124,40.5,-124.5,43,-124,46.3,-124.7,48.4,-123,49,-127.5,50.5,-130.5,54,-133,57,-137,59,-141,60,-147,61,-152,59,-154,57.5,-158,56.5,-162,55,-164,54.6,-158,58,-162,58.5,-165,60.5,-166,62,-164.5,63.2,-161,64.5,-166,65],
[-73,78,-60,82,-30,83.5,-20,81,-18,77,-22,72,-24,70,-32,68,-40,65,-43,60,-48,61,-52,64.5,-54,67,-55,71,-58,75.5,-66,76.5],
[-80,73.5,-75,72,-68,70,-62,67,-63,65,-67,63,-72,63.5,-78,65,-73,68,-83,70,-90,72],
[-120,77,-100,79,-85,80,-75,82,-62,82.5,-70,79,-80,76.5,-95,74,-105,73.5,-115,71.5,-123,71,-125,74],
[-77.5,8.5,-75.5,10.5,-72,12,-71,11.5,-68,10.5,-64,10.7,-61,10.6,-60,8.5,-57,6,-52,5,-50,1.5,-49,-1,-44,-2.5,-39,-3.5,-35,-5.5,-35,-9,-37.5,-12.5,-39,-17.5,-40.5,-21.5,-44,-23,-48,-25.5,-48.5,-28.5,-51,-31,-53.5,-34,-58,-34.5,-57,-36.5,-58,-38.5,-62,-39,-65,-41,-63.5,-42.5,-65.5,-45,-67.5,-46.5,-66,-48,-69,-51.5,-68.5,-53,-66,-55,-71,-55.5,-74.5,-52.5,-75.5,-48,-74,-43,-73.5,-37.5,-71.5,-32,-71.5,-25,-70.3,-18.5,-75,-15.5,-77,-12,-79.5,-7,-81.2,-5,-80.5,-3,-80.5,-.5,-79,1.5,-77.5,4,-77.5,7],
[-5.6,36,-9,37,-9.5,39,-8.8,42,-9,43.2,-1.8,43.4,-1.2,46,-4.5,47.8,-1.5,48.7,1.5,50.2,4,51.5,5,53.3,8.5,53.7,8.3,55.5,8,57,10.5,57.7,10.5,54.5,14,54,19,54.5,21,56.5,24,57.5,23.5,59.3,29,60,25,60.3,22.5,61.5,21.5,63.5,25,65,22,65.8,17.5,62.5,18.5,60,16.5,57,13,55.5,11.5,58.5,10,59,5.5,58.5,5,61,7.5,63,13,66.5,16,68.5,21,70,28,71,31,70,41,67,44,68.5,53,68.5,60,69.5,68,68.5,69,72.5,73,72.8,80,73.5,87,75,100,76.5,105,77.5,113,73.7,120,73,129,72,140,72.5,150,71.5,160,70,170,70,180,68.5,179,65,173,60.5,163,60,163,57,156.7,51,156,57.5,152,59,142,59.3,136,54,141,52.5,140,48,133,43,129.5,42.5,129.5,40,127.5,39.7,129.2,37,129,35.2,126.5,34.5,126.2,37.8,124.5,39.8,121.5,39,121,40.9,118,39.2,119,37.2,122.5,37,119.5,35,120.8,32,122,30,121,28,119.5,25.5,116.5,23,113,22.3,110.5,21,108,21.5,106.5,20,105.7,18.5,108.7,15.2,109.2,11.6,105,8.7,104.8,10.5,103,10.8,101,12.5,99.5,10.5,100.5,7,103.5,4,104.3,1.3,101.3,2.8,100,6,98.5,8,98.4,12.5,97.7,16.5,94.5,16.5,94,19,92,21.5,90,22,88,21.7,86.5,20,84.5,18.5,82,16.5,80.3,15.5,80,11,79.8,9,77.5,8,76,10,74.5,14,73,19,72.6,21.5,70,21,68.5,23.5,66.5,25.4,61.5,25.2,57.5,25.7,56.5,27,54,26.7,51.5,27.8,50,30,48,30,48.5,28,50,26,51.5,25.3,51.6,24,54,24.2,56.3,26,56.5,24.5,59,22.5,57.8,19,55,17,52,15.8,48.5,14,45,12.8,43.3,12.7,42.7,15.7,40,20,38.5,23.5,36.5,26,34.8,28.2,34.5,29.5,34.2,31.3,35,33,36,35.5,36,36.8,32.5,36.1,30,36.2,27,37,26.2,39.5,26.5,40.6,26,40.8,24,40.7,23.5,38,22,36.5,21,38.3,19.5,40,19.5,41.8,16,43.5,13.7,45.5,12.3,45.3,12.5,44,14,42,16,41.4,18.5,40.2,16.6,38.4,15.7,40,14,40.8,12,41.8,10.5,43,8.8,44.4,7.5,43.8,6,43.1,3,43.3,3.2,42,.8,41,-.3,39.5,0,38.7,-.7,37.6,-2.2,36.7,-4.5,36.6],
[-5.7,50,1.5,51.2,1.7,52.7,0,53.5,-1.5,55,-2,56,-1.8,57.6,-3,58.6,-5,58.6,-6.2,57,-5.5,55.5,-4.8,54.8,-3,54,-4.6,53.3,-4.2,52.3,-5.2,51.7,-3,51.4],
[-6,52,-6,54,-7.5,55.3,-10,54.2,-10,51.6,-8,51.6],
[-24,65.5,-22,66.4,-16,66.5,-13.5,65,-15,64.2,-18.5,63.4,-22.5,63.8],
[130,31.5,131.5,31.4,132,33.8,135,33.5,136.8,34.5,139.8,35,141,36.5,141.5,38.5,142,40,141.5,41.4,140,41.5,140,40,139.5,38,137,37,136,35.6,133,35.5,131,34.4,129.7,33.3],
[140,42,141.5,42.5,143.5,42,145.5,43.3,144.5,44,141.8,45.4,141.5,43.5],
[79.8,6,81.8,7,80.5,9.8,79.8,8],[120.1,23,121.9,25,121.5,22.5,120.7,22],
[95.3,5.6,98,4,100.5,.5,104,-2.5,106,-5.9,104.5,-5.9,101.5,-3,98.5,1],
[105.2,-6.8,108,-6.3,112.5,-6.9,114.5,-7.8,114.4,-8.7,110,-8.1,106,-7.5],
[109,1.5,110,-2.9,114,-4,116.5,-3,118,1,119,5,117,7,115.5,5,113,3.2,111,2],
[119,-5.5,120.5,-5.5,121,-2,123,-1,124.5,1.3,121,1.2,120,0,119,-3],
[131,-1.5,134,-.8,138,-1.6,141,-2.6,145,-4.5,147.5,-6,150,-10.5,147,-10,143.5,-9,141,-9.2,138,-8.3,137.5,-5.5,133,-4,132,-2.8],
[120,18.5,122.3,18.5,122,16,124,13,123,13,121.5,13.5,120.5,14.5,119.8,16],[122,7,124,6,126.2,6.5,126,9.3,125,9,123.5,8.5],
[-5.9,35.8,-2,35.1,1,36.5,5,36.8,10,37.3,11,36.8,10.2,34.3,11.5,33,15.2,32.3,19,30.3,20.1,31.2,20,32.3,23,32.6,25,31.7,29,30.9,32.3,31.3,34.2,31.3,34.5,29.5,32.6,29.9,33.5,27.5,35.5,23.5,37.2,21,38.5,18,39.5,15.5,41.5,13.5,43.3,11.5,44.5,10.4,51,11.8,51.2,10.4,49,6,47.5,4,44,1,41.5,-1.7,39.5,-4.5,39.2,-8,40.5,-10.5,40.5,-15,37,-17.5,35,-20,35.5,-24,33,-25.8,32.5,-28.5,30,-31.3,27.5,-33.3,25,-34,22.5,-34,20,-34.8,18.4,-34,17.8,-31.5,15.2,-27,14.5,-23,11.8,-17.2,13.7,-11.5,12.2,-6,9,-1,9.8,3.5,8.5,4.5,6,4.3,4.5,6.3,1.5,6.1,-2,4.8,-7.5,4.4,-11,6.8,-13.5,9.3,-15,11,-16.7,12.5,-17.3,14.7,-16.5,16.5,-16,20,-17,21,-15,24.5,-13,27.5,-10,29.5,-9.7,31.5,-6.8,34],
[49.3,-12,50.5,-15.5,49.5,-17.5,47.2,-25,45,-25.5,43.5,-22,44.2,-19,44,-17,46.5,-15.7,48,-13.5],
[113.5,-22,114,-26.5,115,-34,117.5,-35,123,-33.9,126,-32.3,131,-31.5,135,-33.5,137.7,-35.6,138.5,-34.5,140,-37.5,143.5,-38.8,146.4,-39.1,150,-37.5,151.3,-33.8,153.6,-28.5,153,-25,150.5,-22.5,146,-18.8,145.3,-15,143.5,-13.7,142.5,-10.8,141.5,-13,141.5,-17,140,-17.7,136.5,-15.7,137,-12.2,135.7,-11.9,132.5,-11.5,130,-13,129.5,-15,126,-14,122.3,-17.5,121,-19.6,117,-20.6],
[144.7,-40.7,148.3,-40.9,147.8,-43.2,146,-43.6],
[172.7,-34.5,174.5,-36.5,178.5,-37.7,177,-39.3,176,-41.3,174.7,-41.3,175,-39.5,173.8,-39.2,174.5,-38],
[172.7,-40.5,174.3,-41.7,173,-43.8,171,-44.5,169,-46.6,166.5,-46,167,-45,168.5,-44,171.5,-41.8],
[-85,21.9,-82,23.1,-77.5,21.8,-74.1,20.2,-77.7,19.9,-80.5,21.6],[-74.4,18.4,-72.8,19.9,-69.9,19.6,-68.3,18.6,-71.4,17.6],
[142,46,143.5,49,144,53.5,142.5,54.3,142,51]];
const HOLES=[[27.5,42.5,28,41.3,29.5,41.2,31.5,41.2,36,41.7,38.5,40.9,41.5,41.5,41.7,42.5,39.5,44,37,44.8,35.5,45.3,33.5,44.5,32.5,45.4,33.5,46,31.5,46.7,30,45.8,28.7,44.5],
[46.8,44.5,47.5,45.6,49.3,46.5,51.5,46.8,53.5,46.5,53,45,51,44.3,52.5,42,53,40,54,37.4,50.5,37,49,37.6,49.3,40.3,48,42,47.5,43]];
const SEEDS=[['Canadá',-110,58,-95,55,-75,52,-100,68,-125,60,-65,48,-90,74,-75,70],['Groenlandia',-42,72],['Estados Unidos',-100,39,-85,36,-118,40,-75,42,-95,31,-150,63,-110,45,-82,29],['México',-102,24,-95,18,-110,29,-89,20],['Guatemala',-90.3,15.5],['Belice',-88.6,17.2],['Honduras',-86.6,14.8],['El Salvador',-88.9,13.7],['Nicaragua',-85,12.8],['Costa Rica',-84,10],['Panamá',-80,8.5],['Cuba',-79,21.7],['República Dominicana',-70.5,18.8],['Haití',-72.5,19],
['Colombia',-73,4,-74,7,-72,1,-70,3.5,-70.5,0],['Venezuela',-66,7.5],['Guyana',-59,5],['Surinam',-56,4],['Guayana Francesa',-53,4],['Ecuador',-78.5,-1.5],['Perú',-75,-9.5,-72,-14,-74.5,-5,-72.5,-9,-73.5,-3],['Brasil',-50,-10,-60,-5,-45,-5,-55,-18,-45,-20,-52,-28,-64,-6.5,-40,-12],['Bolivia',-64.5,-17,-67,-14],['Paraguay',-58,-23.3],['Chile',-70,-23,-71,-32,-72.5,-40,-73,-48,-71,-54],['Argentina',-64,-28,-64,-36,-68,-43,-69,-50,-61,-32,-67,-25],['Uruguay',-56,-33],
['Islandia',-19,65],['Irlanda',-8,53.2],['Reino Unido',-2,53,-4,56.5],['Portugal',-8,39.6],['España',-4,40],['Francia',2.5,46.5],['Bélgica',4.5,50.6],['Países Bajos',5.5,52.2],['Alemania',10,51],['Suiza',8.2,46.8],['Austria',14.5,47.5],['Italia',12.5,42.8,9.5,45.5,16,40],['Dinamarca',9.5,56],['Noruega',9,61,15,67,24,69.5],['Suecia',15,59,18,64],['Finlandia',26,62,27,67],['Polonia',19.5,52],['República Checa',15.5,49.8],['Eslovaquia',19.5,48.7],['Hungría',19.3,47.2],['Croacia',16,45.2],['Bosnia',17.8,44.2],['Serbia',20.8,44],['Albania',20,41],['Grecia',22,39.5],['Bulgaria',25.2,42.7],['Rumania',25,45.9],['Moldavia',28.5,47.2],['Ucrania',31,49,36,48.5],['Bielorrusia',28,53.5],['Lituania',24,55.3],['Letonia',25,56.9],['Estonia',25.5,58.7],
['Rusia',38,56,45,52,50,60,60,65,75,62,90,62,100,67,110,60,125,63,140,65,160,66,135,50,105,73,40,64,85,72,165,62],['Turquía',35,39,29.5,40,41,39],['Georgia',43.5,42.2],['Armenia',45,40.2],['Azerbaiyán',47.7,40.3],['Kazajistán',67,48,77,47,55,47,72,52],['Uzbekistán',64,41.5],['Turkmenistán',59,39],['Kirguistán',74.5,41.5],['Tayikistán',71,38.8],['Afganistán',66,34],['Pakistán',69,30,72,33,66,26.5],['India',79,22,77,13,76,29,86,24,93.5,26,73,19],['Nepal',84,28.3],['Bután',90.4,27.5],['Bangladés',90.3,23.8],['Sri Lanka',80.7,7.8],['Myanmar',96,21,98,16],['Tailandia',101,15.5,99.3,9],['Malasia',102,4,113.5,2.5,117,5.5],['Laos',102.5,19.5],['Camboya',105,12.5],['Vietnam',106,16,105.5,21,106,10.5],['China',90,33,103,35,113,30,115,38,85,41,126,46,110,25,100,25,80,37,118,28],['Mongolia',103,46.8,95,47,112,46],['Corea del Norte',127,40],['Corea del Sur',128,36.3],['Japón',138,36,143,43.2,131,33],['Taiwán',121,23.7],['Filipinas',122,15,125,7.8],['Indonesia',102,-1,110,-7.3,113.5,-1.5,121,-2,138,-4.5],['Papúa Nueva Guinea',145,-6.5],
['Irán',54,32,58,29,48,34,59,35],['Irak',43.7,33],['Siria',38.5,35],['Líbano',35.9,33.9],['Israel',35,31.5],['Jordania',36.5,31],['Arabia Saudita',45,24,40,26,50,21,40,20],['Yemen',47.5,15.5],['Omán',56.5,21],['Emiratos Árabes',54.3,23.9],['Qatar',51.2,25.3],['Kuwait',47.7,29.3],
['Marruecos',-6.5,31.8],['Sáhara Occidental',-13,24.5],['Argelia',3,28,2,34.5,7,31],['Túnez',9.5,34],['Libia',17,27,13,31,22,30],['Egipto',30,26.5,33.8,29.5],['Sudán',30,15.5,25,13],['Sudán del Sur',30.5,7],['Etiopía',39.5,8.6],['Eritrea',38.5,15.5],['Yibuti',42.6,11.8],['Somalia',46,6,43,2,48.5,9],['Kenia',37.9,.2],['Uganda',32.3,1.4],['Ruanda',29.9,-2],['Tanzania',35,-6.3],['Mozambique',35.5,-18,38,-13,33,-24],['Malaui',34.3,-13.3],['Zambia',27.8,-13.5],['Zimbabue',29.8,-19],['Botsuana',24,-22.3],['Namibia',17.5,-22],['Sudáfrica',24,-30,28.5,-26,20,-32],['Lesoto',28.3,-29.6],['Angola',17.8,-12.3],['R. D. del Congo',23.5,-2.5,26,2,26,-8,18,-4],['Congo',15.3,-.8],['Gabón',11.6,-.7],['Camerún',12.4,6,12.6,3.8],['República Centroafricana',20.9,6.6],['Chad',18.7,15.5],['Níger',8.1,17],['Nigeria',8.6,9.5],['Benín',2.3,9.3],['Togo',.9,8.6],['Ghana',-1.2,7.9],['Costa de Marfil',-5.5,7.5],['Liberia',-9.4,6.4],['Sierra Leona',-11.8,8.5],['Guinea',-10.9,10.4],['Guinea-Bisáu',-15,12],['Senegal',-14.5,14.5],['Mali',-2,17.5,-7,13],['Burkina Faso',-1.6,12.3],['Mauritania',-10.5,20.3],['Madagascar',46.9,-19],
['Australia',134,-25,121,-25,145,-22,146,-33,130,-16,117,-31,147,-42],['Nueva Zelanda',174.5,-39,170.5,-44]];
const VW=360,VH=161,X=lng=>lng+180,Y=lat=>(84-lat)*1.15;
const SEEDPTS=[];SEEDS.forEach(s=>{for(let i=1;i<s.length;i+=2)SEEDPTS.push([s[0],s[i],s[i+1]])});
function inPoly(x,y,p){let c=false;for(let i=0,j=p.length-2;i<p.length;j=i,i+=2){const xi=p[i],yi=p[i+1],xj=p[j],yj=p[j+1];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)c=!c}return c}
const isLand=(lng,lat)=>LAND.some(p=>inPoly(lng,lat,p))&&!HOLES.some(p=>inPoly(lng,lat,p));
function countryAt(lng,lat){const cl=Math.cos(lat*Math.PI/180);let best='',bd=1e9;for(const s of SEEDPTS){const dx=(s[1]-lng)*cl,dy=s[2]-lat,d=dx*dx+dy*dy;if(d<bd){bd=d;best=s[0]}}return best}
const V={x:0,y:0,w:VW},ptr=new Map();let mapReady=false,moved=0,pinch=0;
const svgEl=()=>$('#world');
function buildMap(){
  const by={};
  for(let r=0,lat=83;lat>=-56;lat-=2,r++)for(let lng=-180+(r%2?2:1);lng<180;lng+=2){if(isLand(lng,lat))(by[countryAt(lng,lat)]??=[]).push([X(lng),Y(lat)])}
  const rd=.8;
  $('#dots').innerHTML=Object.entries(by).map(([c,pts])=>`<path class="c" data-c="${esc(c)}" d="${pts.map(([x,y])=>`M${(x-rd).toFixed(1)} ${y.toFixed(2)}a${rd} ${rd} 0 1 0 ${2*rd} 0a${rd} ${rd} 0 1 0 ${-2*rd} 0`).join('')}"/>`).join('');
  const s=svgEl();
  s.addEventListener('pointerdown',e=>{ptr.set(e.pointerId,[e.clientX,e.clientY]);moved=0;if(ptr.size===2)pinch=dist();try{s.setPointerCapture(e.pointerId)}catch(_){}});
  s.addEventListener('pointermove',e=>{
    if(!ptr.has(e.pointerId)){hoverTip(e.target);return}
    const prev=ptr.get(e.pointerId),k=V.w/s.clientWidth;ptr.set(e.pointerId,[e.clientX,e.clientY]);
    if(ptr.size===1){const dx=e.clientX-prev[0],dy=e.clientY-prev[1];moved+=Math.abs(dx)+Math.abs(dy);if(moved>4&&V.w<VW){V.x-=dx*k;V.y-=dy*k;apply()}}
    else if(ptr.size===2){const d=dist();if(pinch){const [a,b]=[...ptr.values()],u=toUnits((a[0]+b[0])/2,(a[1]+b[1])/2);zoomAt(pinch/d,u[0],u[1])}pinch=d;moved=99}
  });
  const up=e=>{if(!ptr.has(e.pointerId))return;ptr.delete(e.pointerId);if(ptr.size<2)pinch=0;if(moved<6&&e.type==='pointerup')tap(e)};
  s.addEventListener('pointerup',up);s.addEventListener('pointercancel',up);
  s.addEventListener('pointerleave',()=>{if(!ptr.size&&!ui.mtip)$('#tip').classList.remove('on')});
  s.addEventListener('wheel',e=>{if(!e.ctrlKey&&V.w>=VW&&e.deltaY>0)return;if(!e.ctrlKey&&!e.altKey)return;e.preventDefault();const u=toUnits(e.clientX,e.clientY);zoomAt(Math.exp(e.deltaY*.01),u[0],u[1])},{passive:false});
  const ro=new ResizeObserver(()=>apply());ro.observe(s);
  mapReady=true;drawMap(homeFocus());
}
const dist=()=>{const [a,b]=[...ptr.values()];return Math.hypot(a[0]-b[0],a[1]-b[1])||1};
function toUnits(cx,cy){const r=svgEl().getBoundingClientRect();return[V.x+(cx-r.left)/r.width*V.w,V.y+(cy-r.top)/r.height*V.w*VH/VW]}
function zoomAt(f,ux,uy){const nw=Math.min(VW,Math.max(14,V.w*f)),q=nw/V.w;V.x=ux-(ux-V.x)*q;V.y=uy-(uy-V.y)*q;V.w=nw;apply()}
function apply(){
  const s=svgEl();if(!s)return;const h=V.w*VH/VW;
  V.x=Math.min(Math.max(V.x,0),VW-V.w);V.y=Math.min(Math.max(V.y,0),VH-h);
  s.setAttribute('viewBox',`${V.x.toFixed(2)} ${V.y.toFixed(2)} ${V.w.toFixed(2)} ${h.toFixed(2)}`);
  s.style.touchAction=V.w<VW-.5?'none':'pan-y';
  const k=(s.clientWidth||600)/V.w,r=Math.max(3,Math.min(4.5,s.clientWidth/150))/k;
  s.querySelectorAll('.pin').forEach(p=>{p.setAttribute('r',(p.classList.contains('on')?r*1.6:r).toFixed(3));p.setAttribute('stroke-width',(1.6/k).toFixed(3))});
}
function showTip(html){const t=$('#tip');t.innerHTML=html;t.classList.add('on')}
function tipFor(c){const n=stats(S.me).countries[c];return n?`<b>${esc(c)}</b> · ${n} lugar${n>1?'es':''}`:`${esc(c)} · por descubrir`}
function hoverTip(el){if(ui.mtip)return;if(el?.dataset?.c)showTip(tipFor(el.dataset.c));else if(el?.classList?.contains('pin')){const p=S.places.find(x=>x.id===el.dataset.id);if(p)showTip(`<b>${esc(p.name)}</b> · ${esc(T(p.trip).title)}`)}}
function tap(e){
  const [ux,uy]=toUnits(e.clientX,e.clientY),lng=ux-180,lat=84-uy/1.15;
  if(ui.pick){finishPick([lng,lat],isLand(lng,lat)?countryAt(lng,lat):'');return}
  const el=document.elementFromPoint(e.clientX,e.clientY);
  if(el?.classList.contains('pin')){ui.mplace=el.dataset.id;drawMap();placeCard();return}
  if(el?.dataset?.c){ui.mtip=1;showTip(tipFor(el.dataset.c));clearTimeout(tap.h);tap.h=setTimeout(()=>{ui.mtip=0;$('#tip').classList.remove('on')},2600)}
}
function homeFocus(){const pl=stats(S.me).places;if(!pl.length||innerWidth>=700)return{center:[0,14],zoom:1};const ln=pl.map(p=>p.lng),la=pl.map(p=>p.lat);return{center:[(Math.min(...ln)+Math.max(...ln))/2,(Math.min(...la)+Math.max(...la))/2],zoom:2.2}}
function drawMap(focus){
  if(!mapReady)return;
  const s=stats(S.me);
  $('#dots').querySelectorAll('.c').forEach(p=>{const n=s.countries[p.dataset.c]||0;p.classList.toggle('v1',n>0&&n<3);p.classList.toggle('v2',n>=3)});
  $('#pins').innerHTML=s.places.map(p=>`<circle class="pin${p.id===ui.mplace?' on':''}" data-id="${p.id}" cx="${X(p.lng).toFixed(2)}" cy="${Y(p.lat).toFixed(2)}" r="1"/>`).join('');
  if(focus){const w=VW/focus.zoom,h=w*VH/VW;V.w=w;V.x=X(focus.center[0])-w/2;V.y=Y(focus.center[1])-h/2}
  apply();
}
function initMap(){try{buildMap()}catch(err){$('#world').outerHTML='<div class="empty">No se pudo dibujar el mapa.</div>';console.error(err)}}
function finishPick(c,country){if(!c)return;setPick(false);placeForm({...ui.draft,lng:+c[0].toFixed(4),lat:+c[1].toFixed(4),country:country||ui.draft?.country||''})}
function setPick(on){ui.pick=on;$('#banner').classList.toggle('on',on);if(on){go('home');$('#mapblock').scrollIntoView({behavior:'smooth'})}}
function placeCard(){
  const p=S.places.find(x=>x.id===ui.mplace);if(!p){$('#mcard').innerHTML='';return}
  const ps=S.posts.filter(x=>x.place===p.id&&canSee(T(x.trip)));const ph=ps.flatMap(x=>x.photos.map(s=>[x.id,s]));
  $('#mcard').innerHTML=`<div class="pcard"><div><b>${esc(p.name)}</b> <span style="color:var(--mut)">· ${esc(p.country)}</span><br><small style="color:var(--mut)">${esc(T(p.trip).title)} · ${fmt(p.date)} · ${ps.length} publicación${ps.length===1?'':'es'}</small></div><button class="link" data-a="trip" data-id="${p.trip}">Ver viaje</button>${ph.length?`<div class="thumbs">${ph.map(([id,s])=>`<img src="${src(s)}" alt="Foto en ${esc(p.name)}" data-a="post" data-id="${id}">`).join('')}</div>`:''}</div>`;
}
function progress(){
  const s=stats(S.me),lv=level(s.pts),pct=Math.max(1,Math.round(s.nc/TOTAL*100));
  $('#hi').textContent='Hola, '+U(S.me).name.split(' ')[0];
  $('#lvl').innerHTML=`<i></i>${esc(lv.name)} · ${s.pts} pts`;
  $('#prog').innerHTML=`<div class="progress"><div class="big">${s.nc}<small> / ${TOTAL} países</small></div><div><div class="bar"><i style="width:${pct}%"></i></div><div class="meta"><span>${s.nc?`Conoces el ${pct}% del mundo`:'Registra tu primer lugar para empezar'}</span><span>${s.places.length} lugares · ${s.km.toLocaleString('es')} km</span></div></div></div>
  <div class="conts">${CONTS.map(c=>`<span class="cont${s.conts.has(c)?' on':''}">${c}</span>`).join('')}</div>
  ${lv.next?`<div style="padding:14px 4px 0"><div class="meta" style="margin:0 0 6px"><span>Próximo nivel: <b style="color:var(--ink)">${lv.next[1]}</b></span><span>${lv.next[0]-s.pts} pts</span></div><div class="bar" style="height:5px"><i style="width:${lv.pct}%;background:var(--ink)"></i></div></div>`:''}`;
}

/* ---------- vistas ---------- */
function postHTML(p){
  const pl=S.places.find(x=>x.id===p.place),t=T(p.trip),liked=p.likes.includes(S.me);
  return `<article class="post"><div class="ph"><button data-a="user" data-id="${p.author}">${av(p.author)}</button><div class="who"><button data-a="user" data-id="${p.author}"><b>${esc(U(p.author).handle)}</b></button><button data-a="${pl?'mapplace':'trip'}" data-id="${pl?pl.id:t.id}"><small>${pl?esc(pl.name+', '+pl.country):esc(t.title)}</small></button></div></div>
  ${p.photos.length?`<div class="media" data-dbl="${p.id}"><div class="slides">${p.photos.map((s,i)=>`<img src="${src(s)}" alt="Foto ${i+1} de ${esc(p.title)}" loading="lazy">`).join('')}</div>${p.photos.length>1?`<div class="dots">${p.photos.map((_,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div>`:''}<div class="heart">${ico('heart')}</div></div>`:''}
  <div class="acts"><button class="${liked?'liked':''}" data-a="like" data-id="${p.id}" aria-label="Me gusta" aria-pressed="${liked}">${ico('heart')}</button><button data-a="post" data-id="${p.id}" aria-label="Comentar">${ico('cmt')}</button>${pl?`<button data-a="mapplace" data-id="${pl.id}" aria-label="Ver en el mapa">${ico('pin')}</button>`:''}${p.rating?`<span class="stars" aria-label="${p.rating} de 5">${'★'.repeat(p.rating)}</span>`:''}</div>
  <div class="cap">${p.likes.length?`<b>${p.likes.length} me gusta</b>`:''}<p><b>${esc(U(p.author).handle)}</b> <span class="t">${esc(p.title)}</span><br>${esc(p.text)}</p></div>
  <div class="cmts">${p.comments.length>2?`<button class="mutb" data-a="post" data-id="${p.id}">Ver los ${p.comments.length} comentarios</button>`:''}${p.comments.slice(-2).map(c=>`<p><b>${esc(U(c.u).handle)}</b> ${esc(c.t)}</p>`).join('')}</div>
  <time>${ago(p.date)} · <button class="mutb" style="font-size:12px" data-a="trip" data-id="${t.id}">${esc(t.title)}</button></time>
  <form class="cform" data-c="${p.id}"><input name="t" placeholder="Agrega un comentario…" aria-label="Comentario" autocomplete="off"><button>Publicar</button></form></article>`;
}
function storyRow(trips,addBtn){
  return `<div class="stories">${addBtn?`<button class="story" data-a="newTrip"><span class="ring seen"><div>${ico('plus')}</div></span><span>Nuevo viaje</span></button>`:''}${trips.map(t=>`<button class="story" data-a="trip" data-id="${t.id}"><span class="ring${isMember(t)?'':' seen'}"><img src="${src(t.cover||'scene:mont:1')}" alt=""></span><span>${esc(t.title)}</span></button>`).join('')}</div>`;
}
function vHome(){
  const s=stats(S.me),bs=badges(s).sort((a,b)=>b.done-a.done||(b.cur/b.goal)-(a.cur/a.goal));
  const vis=S.trips.filter(canSee).sort((a,b)=>isMember(b)-isMember(a)||b.start.localeCompare(a.start));
  const feed=S.posts.filter(p=>canSee(T(p.trip))).sort((a,b)=>b.date.localeCompare(a.date));
  return `<div class="col"><div class="sec"><h2>Logros · ${bs.filter(b=>b.done).length}/${bs.length}</h2></div>
  <div class="badges">${bs.map(b=>`<div class="badge${b.done?'':' lock'}"><div class="md">${ico(b.done?b.icon:'lock')}</div><b>${esc(b.name)}</b><small>${esc(b.desc)}</small>${b.done?'':`<div class="bar"><i style="width:${Math.round(b.cur/b.goal*100)}%"></i></div><small>${b.cur.toLocaleString('es')}/${b.goal.toLocaleString('es')}</small>`}</div>`).join('')}</div>
  <div class="sec"><h2>Viajes</h2><button class="link" data-a="go" data-v="trips">Ver todos</button></div>${storyRow(vis,true)}
  <div class="sec"><h2>Para ti</h2></div>${feed.map(postHTML).join('')||'<div class="empty">Todavía no hay publicaciones. Conecta con otros viajeros o publica la tuya.</div>'}</div>`;
}
function vTrips(){
  const mine=S.trips.filter(isMember),others=S.trips.filter(t=>!isMember(t)&&canSee(t));
  const card=t=>{const n=S.places.filter(p=>p.trip===t.id).length;return `<button data-a="trip" data-id="${t.id}" style="display:grid;grid-template-columns:72px minmax(0,1fr) auto;gap:14px;align-items:center;width:100%;text-align:start;padding:10px 0;border-bottom:1px solid var(--line)"><img src="${src(t.cover||'scene:mont:1')}" alt="" style="width:72px;height:72px;border-radius:16px;object-fit:cover"><span><b>${esc(t.title)}</b><br><small style="color:var(--mut)">${fmt(t.start)} · ${n} lugar${n===1?'':'es'}</small></span><span class="avs">${t.members.map(m=>av(m)).join('')}</span></button>`};
  return `<div class="col"><div class="hello"><h1>Viajes</h1><button class="btn pri" data-a="newTrip">Nuevo viaje</button></div>
  <div class="sec"><h2>Mis viajes</h2></div>${mine.map(card).join('')||'<div class="empty">Crea tu primer viaje para empezar a llenar tu mapa.</div>'}
  <div class="sec"><h2>De tus conexiones y públicos</h2></div>${others.map(card).join('')||'<p style="color:var(--mut)">Nada por aquí. Conecta con más viajeros.</p>'}</div>`;
}
function grid(posts){return posts.length?`<div class="grid">${posts.map(p=>`<button data-a="post" data-id="${p.id}" aria-label="${esc(p.title)}">${p.photos.length?`<img src="${src(p.photos[0])}" alt="" loading="lazy">`:`<span style="display:grid;place-items:center;height:100%;padding:10px;font-weight:600;font-size:14px">${esc(p.title)}</span>`}${p.photos.length>1?`<span class="multi">${ico('multi','style="width:20px;height:20px"')}</span>`:''}</button>`).join('')}</div>`:'<div class="empty">Aún no hay publicaciones.</div>'}
function vProfile(){
  const id=ui.user||S.me,me=id===S.me,u=U(id),s=stats(id),lv=level(s.pts),l=linked(id,S.me);
  const posts=S.posts.filter(p=>p.author===id&&canSee(T(p.trip))).sort((a,b)=>b.date.localeCompare(a.date));
  const nl=S.links.filter(x=>x.a===id||x.b===id).length;
  return `<div class="wide"><div class="prof">${av(id,'bigav')}<div><div class="row"><h1>${esc(u.handle)}</h1>${me?'<button class="btn" data-a="editProfile">Editar perfil</button>':l?`<span class="btn" style="cursor:default">${esc(l.type)}</span>`:`<button class="btn pri" data-a="connect" data-id="${id}">Conectar</button>`}</div>
  <div class="pstats"><span><b>${posts.length}</b> publicaciones</span><span><b>${s.nc}</b> países</span><span><b>${s.trips.length}</b> viajes</span><button data-a="conns" data-id="${id}"><b>${nl}</b> conexiones</button></div>
  <b>${esc(u.name)}</b> <span class="lvl" style="margin-inline-start:6px;padding:2px 10px;font-size:12px"><i></i>${esc(lv.name)}</span><div style="color:var(--mut);margin-top:4px">${esc(u.bio||'')}</div>
  ${me?`<div class="row" style="margin-top:12px;display:none" id="mobacct"></div>`:''}</div></div>
  ${storyRow(s.trips.filter(canSee),me)}
  <div class="ptabs" style="margin-top:12px"><button class="on">${ico('grid','style="width:14px;height:14px"')}PUBLICACIONES</button></div>${grid(posts)}</div>`;
}
function vTrip(){
  const t=T(ui.trip);if(!t||!canSee(t)){ui.view='trips';return vTrips()}
  const m=isMember(t),pl=S.places.filter(p=>p.trip===t.id).sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  const posts=S.posts.filter(p=>p.trip===t.id).sort((a,b)=>b.date.localeCompare(a.date));
  const nc=new Set(pl.map(p=>p.country)).size,priv={publico:'Público',amigos:'Solo conexiones',privado:'Privado'}[t.privacy];
  return `<div class="wide"><div class="prof"><span class="av bigav trip"><img src="${src(t.cover||'scene:mont:1')}" alt=""></span><div>
  <div class="row"><h1>${esc(t.title)}</h1>${m?'<button class="btn" data-a="editTrip">Editar</button>':''}</div>
  <div class="pstats"><span><b>${pl.length}</b> paradas</span><span><b>${posts.length}</b> publicaciones</span><span><b>${nc}</b> país${nc===1?'':'es'}</span></div>
  <div style="color:var(--mut)">${fmt(t.start)} – ${fmt(t.end)} · ${priv}</div>${t.desc?`<div style="margin-top:4px">${esc(t.desc)}</div>`:''}
  <div class="row" style="margin-top:10px">${t.members.map(id=>`<button class="row" style="gap:6px" data-a="user" data-id="${id}">${av(id)}<small>${esc(U(id).handle)}</small></button>`).join('')}</div>
  ${m?`<div class="row" style="margin-top:14px"><button class="btn coral" data-a="newPlace">Agregar lugar</button><button class="btn pri" data-a="create" data-id="${t.id}">Publicar</button></div>`:''}</div></div>
  <div class="ptabs"><button class="${ui.tab==='grid'?'on':''}" data-a="tab" data-id="grid">${ico('grid','style="width:14px;height:14px"')}PUBLICACIONES</button><button class="${ui.tab==='route'?'on':''}" data-a="tab" data-id="route">${ico('route','style="width:14px;height:14px"')}RUTA</button></div>
  ${ui.tab==='grid'?grid(posts):pl.length?`<ol class="route">${pl.map((p,i)=>`<li><span class="n">${i+1}</span><div><b>${esc(p.name)}</b> <small>· ${esc(p.country)}</small><br><small>${fmt(p.date)} · ${esc(p.cat||'')} · ${posts.filter(x=>x.place===p.id).length} publicaciones</small></div><div class="row"><button class="link" data-a="mapplace" data-id="${p.id}">Mapa</button>${m?`<button class="link" style="color:var(--coral)" data-a="delplace" data-id="${p.id}">Quitar</button>`:''}</div></li>`).join('')}</ol>`:'<div class="empty" style="margin-top:12px">Este viaje aún no tiene lugares. Agrega el primero y se pintará en tu mapa.</div>'}</div>`;
}
function go(v,extra={}){Object.assign(ui,{view:v},extra);if(v!=='trip')ui.tab='grid';if(v==='profile'&&!('user' in extra))ui.user=S.me;render();window.scrollTo(0,0)}
function render(){
  $('#who').innerHTML=S.users.map(u=>`<option value="${u.id}"${u.id===S.me?' selected':''}>${esc(u.name)}</option>`).join('');
  document.querySelectorAll('[data-a=go]').forEach(b=>b.classList.toggle('on',b.dataset.v===ui.view||(ui.view==='trip'&&b.dataset.v==='trips')));
  const home=ui.view==='home';$('#mapblock').classList.toggle('on',home);
  if(home){progress();placeCard();drawMap()}
  $('#content').innerHTML={home:vHome,trips:vTrips,trip:vTrip,profile:vProfile}[ui.view]();
  const ma=$('#mobacct');if(ma&&innerWidth<=760){ma.style.display='flex';ma.innerHTML=`<label style="font-size:13px;color:var(--mut);width:100%">Cambiar de cuenta (demo)<select id="who2">${S.users.map(u=>`<option value="${u.id}"${u.id===S.me?' selected':''}>${esc(u.name)}</option>`).join('')}</select></label>`}
}

/* ---------- modales ---------- */
function modal(html,big){const m=$('#modal');m.className='modal'+(big?' big':'');m.innerHTML=html;$('#ov').classList.add('on');m.querySelector('input,select,textarea')?.focus()}
const close=()=>$('#ov').classList.remove('on');
const head=t=>`<div class="mh"><h2>${t}</h2><button class="link" data-a="close">Cerrar</button></div>`;
function detail(id){
  const p=S.posts.find(x=>x.id===id);if(!p)return;const pl=S.places.find(x=>x.id===p.place),liked=p.likes.includes(S.me);
  modal(`<div class="detail">${p.photos.length?`<div class="media" data-dbl="${p.id}"><div class="slides">${p.photos.map(s=>`<img src="${src(s)}" alt="">`).join('')}</div>${p.photos.length>1?`<div class="dots">${p.photos.map((_,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div>`:''}<div class="heart">${ico('heart')}</div></div>`:`<div style="display:grid;place-items:center;padding:40px;background:var(--soft);font-weight:700;font-size:20px;text-align:center">${esc(p.title)}</div>`}
  <div class="side2"><div class="ph" style="justify-content:space-between"><div class="row">${av(p.author)}<div class="who"><b>${esc(U(p.author).handle)}</b><small>${pl?esc(pl.name+', '+pl.country):esc(T(p.trip).title)}</small></div></div><button class="link" data-a="close">Cerrar</button></div>
  <div class="cap" style="flex:1"><p><b>${esc(p.title)}</b>${p.rating?` <span style="color:var(--coral)">${'★'.repeat(p.rating)}</span>`:''}<br>${esc(p.text)}</p>
  <div class="cmts" style="padding:8px 0">${p.comments.map(c=>`<p><b>${esc(U(c.u).handle)}</b> ${esc(c.t)}</p>`).join('')||'<p style="color:var(--mut)">Sé el primero en comentar.</p>'}</div></div>
  <div class="acts"><button class="${liked?'liked':''}" data-a="like" data-id="${p.id}" data-in="1" aria-label="Me gusta">${ico('heart')}</button>${pl?`<button data-a="mapplace" data-id="${pl.id}" aria-label="Ver en el mapa">${ico('pin')}</button>`:''}${p.author===S.me?`<span class="stars" style="letter-spacing:0"><button class="link" data-a="editpost" data-id="${p.id}">Editar</button> · <button class="link" style="color:var(--coral)" data-a="delpost" data-id="${p.id}">Borrar</button></span>`:''}</div>
  <div class="cap">${p.likes.length?`<b>${p.likes.length} me gusta</b>`:''}</div><time>${fmt(p.date)}</time>
  <form class="cform" data-c="${p.id}" data-in="1"><input name="t" placeholder="Agrega un comentario…" aria-label="Comentario" autocomplete="off"><button>Publicar</button></form></div></div>`,true);
}
function tripForm(t){
  const conns=S.links.filter(l=>l.a===S.me||l.b===S.me).map(l=>l.a===S.me?l.b:l.a),sel=t?t.members:[S.me];
  const covers=['mont:5','mar:9','city:4','selva:6','desierto:4','mont:11','mar:12','city:7'];let cover=t?.cover||'scene:'+covers[S.trips.length%covers.length];
  modal(head(t?'Editar viaje':'Nuevo viaje')+`<div class="mb"><form id="fTrip"><label>Portada<div class="row" id="covers">${covers.map(c=>`<button type="button" data-cv="scene:${c}" style="width:52px;height:52px;border-radius:12px;overflow:hidden;outline:${cover==='scene:'+c?'3px solid var(--blue)':'0'}"><img src="${scene(...c.split(':').map((v,i)=>i?+v:v))}" alt="" style="width:100%;height:100%"></button>`).join('')}</div></label>
  <label>Nombre<input name="title" required value="${esc(t?.title)}" placeholder="Ej. Verano en el norte"></label>
  <div class="two"><label>Inicio<input type="date" name="start" required value="${t?.start||''}"></label><label>Fin<input type="date" name="end" value="${t?.end||''}"></label></div>
  <label>Descripción<textarea name="desc" style="min-height:70px">${esc(t?.desc)}</textarea></label>
  <label>¿Quiénes viajan?<div class="checks"><label><input type="checkbox" checked disabled> ${esc(U(S.me).name)} (tú)</label>${conns.map(c=>`<label><input type="checkbox" name="m" value="${c}"${sel.includes(c)?' checked':''}> ${esc(U(c).name)} · ${esc(linked(c,S.me).type)}</label>`).join('')||'<span style="font-weight:400">Conecta con alguien para invitarlo.</span>'}</div></label>
  <label>¿Quién lo puede ver?<select name="privacy">${[['amigos','Solo mis conexiones'],['publico','Público'],['privado','Solo quienes viajan']].map(([v,l])=>`<option value="${v}"${(t?.privacy||'amigos')===v?' selected':''}>${l}</option>`).join('')}</select></label>
  <button class="btn pri">${t?'Guardar cambios':'Crear viaje'}</button></form></div>`);
  $('#covers').onclick=e=>{const b=e.target.closest('[data-cv]');if(!b)return;cover=b.dataset.cv;$('#covers').querySelectorAll('button').forEach(x=>x.style.outline=x===b?'3px solid var(--blue)':'0')};
  $('#fTrip').onsubmit=e=>{e.preventDefault();const fd=new FormData(e.target),before=stats(S.me);
    const members=[...new Set([S.me,...fd.getAll('m'),...(t?t.members.filter(x=>x!==S.me&&!conns.includes(x)):[])])];
    const data={title:fd.get('title').trim(),start:fd.get('start'),end:fd.get('end'),desc:fd.get('desc').trim(),privacy:fd.get('privacy'),members,cover};
    if(t)Object.assign(t,data);else{const nt={id:uid(),...data};S.trips.push(nt);ui.trip=nt.id}
    save();close();go('trip',{trip:ui.trip});toast(t?'Viaje actualizado':'Viaje creado. Agrega lugares para pintar tu mapa.');checkRewards(before)};
}
function placeForm(d={}){
  ui.draft=d;const t=T(ui.trip);
  modal(head('Agregar lugar · '+esc(t.title))+`<div class="mb"><form id="fPlace"><label>Buscar destino<input name="q" list="gaz" placeholder="Cusco, Cartagena, Tokio…" value="${esc(d.q||'')}"></label><datalist id="gaz">${GAZ.map(g=>`<option value="${esc(g[0]+', '+g[1])}">`).join('')}</datalist>
  <button type="button" class="btn" data-a="pick">${ico('pin','style="width:16px;height:16px;vertical-align:-3px"')} ¿No aparece? Márcalo en el mapa</button>
  <div class="two"><label>Nombre<input name="name" required value="${esc(d.name||'')}"></label><label>País<input name="country" required list="ctry" value="${esc(d.country||'')}"></label></div><datalist id="ctry">${Object.keys(C).map(c=>`<option value="${esc(c)}">`).join('')}</datalist>
  <div class="two"><label>Latitud<input name="lat" type="number" step="any" required value="${d.lat??''}"></label><label>Longitud<input name="lng" type="number" step="any" required value="${d.lng??''}"></label></div>
  <div class="two"><label>Fecha de visita<input type="date" name="date" value="${d.date||t.start||''}"></label><label>Tipo<select name="cat">${['Ciudad','Naturaleza','Playa','Atracción','Restaurante','Hospedaje','Otro'].map(c=>`<option${d.cat===c?' selected':''}>${c}</option>`).join('')}</select></label></div>
  <button class="btn pri">Agregar al mapa</button></form></div>`);
  const f=$('#fPlace');
  f.q.oninput=()=>{const g=GAZ.find(g=>(g[0]+', '+g[1])===f.q.value);if(g){f.name.value=g[0];f.country.value=g[1];f.lat.value=g[2];f.lng.value=g[3]}};
  f.onsubmit=e=>{e.preventDefault();const lat=+f.lat.value,lng=+f.lng.value;if(Math.abs(lat)>90||Math.abs(lng)>180)return toast('Coordenadas fuera de rango');
    const before=stats(S.me),p={id:uid(),trip:t.id,name:f.name.value.trim(),country:f.country.value.trim(),lat,lng,date:f.date.value,cat:f.cat.value};
    S.places.push(p);save();close();ui.mplace=p.id;go('trip',{trip:t.id,tab:'route'});ui.tab='route';render();toast(p.name+' ya está en tu mapa');checkRewards(before)};
}
function resize(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>{const img=new Image();img.onload=()=>{const sc=Math.min(1,1080/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.round(img.width*sc);c.height=Math.round(img.height*sc);c.getContext('2d').drawImage(img,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.72))};img.onerror=rej;img.src=r.result};r.onerror=rej;r.readAsDataURL(file)})}
function postForm(tripId,post){
  const mine=S.trips.filter(isMember);if(!mine.length){toast('Primero crea un viaje');return tripForm()}
  let tid=post?.trip||tripId||ui.trip&&isMember(T(ui.trip))&&ui.trip||mine[0].id,photos=[...(post?.photos||[])];
  const placeOpts=()=>`<option value="">Sobre todo el viaje</option>`+S.places.filter(p=>p.trip===tid).map(p=>`<option value="${p.id}"${post?.place===p.id?' selected':''}>${esc(p.name)}</option>`).join('');
  modal(head(post?'Editar publicación':'Nueva publicación')+`<div class="mb"><form id="fPost">
  <label>Fotos<input type="file" name="files" accept="image/*" multiple></label><div class="prev" id="prev"></div>
  <div class="two"><label>Viaje<select name="trip"${post?' disabled':''}>${mine.map(t=>`<option value="${t.id}"${t.id===tid?' selected':''}>${esc(t.title)}</option>`).join('')}</select></label><label>Lugar<select name="place">${placeOpts()}</select></label></div>
  <label>Título<input name="title" required value="${esc(post?.title)}" placeholder="El mejor atardecer"></label>
  <label>Tu historia o reseña<textarea name="text" required placeholder="Qué hiciste, qué recomiendas, cuánto costó…">${esc(post?.text)}</textarea></label>
  <div class="two"><label>Puntuación<select name="rating">${[5,4,3,2,1,0].map(n=>`<option value="${n}"${(post?.rating??5)===n?' selected':''}>${n?'★'.repeat(n):'Sin puntuar'}</option>`).join('')}</select></label><label>Fecha<input type="date" name="date" value="${post?.date||new Date().toISOString().slice(0,10)}"></label></div>
  <button class="btn pri">${post?'Guardar':'Compartir'}</button></form></div>`);
  const f=$('#fPost'),prev=()=>{$('#prev').innerHTML=photos.map((s,i)=>`<div><img src="${src(s)}" alt="Foto ${i+1}"><button type="button" data-rm="${i}" aria-label="Quitar foto">×</button></div>`).join('')};prev();
  $('#prev').onclick=e=>{const i=e.target.dataset.rm;if(i!=null){photos.splice(+i,1);prev()}};
  f.trip.onchange=()=>{tid=f.trip.value;f.place.innerHTML=placeOpts()};
  f.files.onchange=async()=>{for(const file of [...f.files.files].slice(0,10)){try{photos.push(await resize(file))}catch(e){toast('No se pudo leer '+file.name)}}f.files.value='';prev()};
  f.onsubmit=e=>{e.preventDefault();const before=stats(S.me),d={place:f.place.value||null,title:f.title.value.trim(),text:f.text.value.trim(),rating:+f.rating.value,date:f.date.value||new Date().toISOString().slice(0,10),photos};
    if(post)Object.assign(post,d);else S.posts.push({id:uid(),trip:tid,author:S.me,likes:[],comments:[],...d});
    save();close();if(!post)go('home');else render();toast(post?'Publicación actualizada':'Publicado');checkRewards(before)};
}
function connsModal(id=S.me){
  const ls=S.links.filter(l=>l.a===id||l.b===id),opts=S.users.filter(u=>u.id!==S.me&&!linked(u.id,S.me));
  modal(head('Conexiones de '+esc(U(id).handle))+`<div class="mb">${ls.map(l=>{const o=l.a===id?l.b:l.a;return `<div class="row" style="justify-content:space-between;padding:8px 0"><button class="row" data-a="user" data-id="${o}">${av(o)}<span style="text-align:start"><b>${esc(U(o).handle)}</b><br><small style="color:var(--mut)">${esc(U(o).name)} · ${esc(l.type)}</small></span></button>${id===S.me?`<button class="btn" data-a="unlink" data-id="${o}">Quitar</button>`:''}</div>`}).join('')||'<p style="color:var(--mut)">Sin conexiones todavía.</p>'}
  ${id===S.me&&opts.length?`<h3 style="font-size:14px;margin:18px 0 8px">Sugerencias</h3>${opts.map(u=>`<div class="row" style="justify-content:space-between;padding:8px 0"><span class="row">${av(u.id)}<b>${esc(u.handle)}</b></span><button class="btn pri" data-a="connect" data-id="${u.id}">Conectar</button></div>`).join('')}`:''}</div>`);
}
function connectModal(id){
  modal(head('Conectar con '+esc(U(id).handle))+`<div class="mb"><form id="fLink"><label>¿Qué son?<select name="type"><option>Amigos</option><option>Pareja</option><option>Familia</option><option>Grupo de viaje</option></select></label><button class="btn pri">Conectar</button></form></div>`);
  $('#fLink').onsubmit=e=>{e.preventDefault();S.links.push({a:S.me,b:id,type:e.target.type.value});save();close();render();toast('Ahora estás conectado con '+U(id).name)};
}
function profileModal(){
  const u=U(S.me);
  modal(head('Editar perfil')+`<div class="mb"><form id="fProf"><label>Nombre<input name="name" required value="${esc(u.name)}"></label><label>Usuario<input name="handle" required value="${esc(u.handle)}"></label><label>Bio<input name="bio" value="${esc(u.bio||'')}"></label><button class="btn pri">Guardar</button></form>
  <div style="border-top:1px solid var(--line);margin-top:18px;padding-top:14px;display:grid;gap:8px"><button class="btn" data-a="newUser">Crear otra cuenta (demo)</button><button class="btn" data-a="reset">Restaurar datos de ejemplo</button><small style="color:var(--mut)">Prototipo: los datos se guardan solo en este navegador.</small></div></div>`);
  $('#fProf').onsubmit=e=>{e.preventDefault();Object.assign(u,{name:e.target.name.value.trim(),handle:e.target.handle.value.trim().replace(/\s+/g,'.').toLowerCase(),bio:e.target.bio.value.trim()});save();close();render();toast('Perfil guardado')};
}
function userModal(){
  modal(head('Crear cuenta')+`<div class="mb"><form id="fUser"><label>Nombre<input name="name" required></label><label>Usuario<input name="handle" required placeholder="mi.usuario"></label><label>Bio<input name="bio"></label><button class="btn pri">Crear y entrar</button></form></div>`);
  $('#fUser').onsubmit=e=>{e.preventDefault();const u={id:uid(),name:e.target.name.value.trim(),handle:e.target.handle.value.trim().replace(/\s+/g,'.').toLowerCase(),bio:e.target.bio.value.trim()};S.users.push(u);S.me=u.id;save();close();ui.mplace=null;go('home');drawMap();toast('Bienvenido, '+u.name+'. Crea tu primer viaje.')};
}
function like(id,force){
  const p=S.posts.find(x=>x.id===id);if(!p)return;const i=p.likes.indexOf(S.me);
  if(i<0)p.likes.push(S.me);else if(!force)p.likes.splice(i,1);save();
  const inModal=$('#ov').classList.contains('on');render();if(inModal)detail(id);
}

/* ---------- eventos ---------- */
const switchUser=v=>{S.me=v;ui.mplace=null;save();go('home');drawMap(homeFocus())};
$('#who').onchange=e=>switchUser(e.target.value);
document.addEventListener('change',e=>{if(e.target.id==='who2')switchUser(e.target.value)});
$('#ov').onclick=e=>{if(e.target.id==='ov')close()};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();if(ui.pick)setPick(false)}});
document.addEventListener('submit',e=>{const id=e.target.dataset?.c;if(!id)return;e.preventDefault();const t=e.target.t.value.trim();if(!t)return;const p=S.posts.find(x=>x.id===id);p.comments.push({u:S.me,t});save();const inM=!!e.target.dataset.in;render();if(inM)detail(id)});
document.addEventListener('dblclick',e=>{const m=e.target.closest('[data-dbl]');if(!m)return;const h=m.querySelector('.heart');h.classList.remove('go');void h.offsetWidth;h.classList.add('go');setTimeout(()=>like(m.dataset.dbl,true),450)});
document.addEventListener('scroll',e=>{const s=e.target;if(!s.classList?.contains('slides'))return;const i=Math.round(s.scrollLeft/s.clientWidth);s.parentElement.querySelectorAll('.dots i').forEach((d,j)=>d.classList.toggle('on',i===j))},true);
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,id=b.dataset.id;
  const A={
    go:()=>{close();go(b.dataset.v)},close,
    trip:()=>{close();go('trip',{trip:id,tab:'grid'})},
    user:()=>{close();go('profile',{user:id})},
    post:()=>detail(id),like:()=>like(id),
    mapplace:()=>{close();const p=S.places.find(x=>x.id===id);ui.mplace=id;go('home');drawMap({center:[p.lng,p.lat],zoom:7});$('#mapblock').scrollIntoView({behavior:'smooth'})},
    create:()=>postForm(id),newTrip:()=>tripForm(),editTrip:()=>tripForm(T(ui.trip)),newPlace:()=>placeForm(),
    pick:()=>{const f=$('#fPlace');ui.draft={name:f.name.value,country:f.country.value,date:f.date.value,cat:f.cat.value};ui.back={view:ui.view,trip:ui.trip};close();setPick(true)},
    cancelPick:()=>{setPick(false);placeForm(ui.draft)},
    tab:()=>{ui.tab=id;render()},
    zin:()=>zoomAt(.6,V.x+V.w/2,V.y+V.w*VH/VW/2),zout:()=>zoomAt(1/.6,V.x+V.w/2,V.y+V.w*VH/VW/2),zreset:()=>drawMap(V.w<VW-1?{center:[0,14],zoom:1}:homeFocus()),
    conns:()=>connsModal(id),connect:()=>connectModal(id),editProfile:profileModal,newUser:userModal,
    unlink:()=>{S.links=S.links.filter(l=>!((l.a===S.me&&l.b===id)||(l.b===S.me&&l.a===id)));save();render();connsModal()},
    editpost:()=>postForm(null,S.posts.find(x=>x.id===id)),
    delpost:()=>{if(!b.dataset.sure){b.dataset.sure=1;b.textContent='¿Seguro? Toca otra vez';return}S.posts=S.posts.filter(x=>x.id!==id);save();close();render();toast('Publicación borrada')},
    delplace:()=>{if(!b.dataset.sure){b.dataset.sure=1;b.textContent='¿Seguro?';return}S.places=S.places.filter(x=>x.id!==id);S.posts.forEach(p=>{if(p.place===id)p.place=null});if(ui.mplace===id)ui.mplace=null;save();render();toast('Lugar quitado')},
    reset:()=>{if(!b.dataset.sure){b.dataset.sure=1;b.textContent='Toca otra vez para confirmar';return}S=seed();save();close();ui.mplace=null;go('home');drawMap(homeFocus());toast('Datos de ejemplo restaurados')}
  };
  A[a]?.();
});
initMap();
S.seen[S.me]=S.seen[S.me]||badges(stats(S.me)).filter(b=>b.done).map(b=>b.id);
render();
}
