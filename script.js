const COPY={secret:'swe',arrival:`On this day, the universe quietly introduced someone who would make ordinary moments warmer, conversations brighter, and life a little more beautiful.<br><br><b> Before there Was US, There Was YOU - Swetha✨</b>`,letterFrom:'Vignesh',photos:[['assets/memory-1.jpg','I did not know this moment would become a favourite while we were living it.'],['assets/memory-2.png','Some photographs capture faces. This one captured happiness.'],['assets/memory-3.png','Proof that the best memories are often the ones we never planned.']]};
const views=[...document.querySelectorAll('.view')];
const seen=new Set();
const modal=document.getElementById('modal');
const modalBody=document.getElementById('modalBody');
const secretInput=document.getElementById('secret');
const unlockButton=document.getElementById('unlock');
const hintText=document.getElementById('hint');
const countText=document.getElementById('count');
const wishButton=document.getElementById('wishBtn');
const candleEl=document.getElementById('candle');
const finalTitleEl=document.getElementById('finalTitle');
const tapTextEl=document.getElementById('tapText');
const finalMessageEl=document.getElementById('finalMessage');
const replayButton=document.getElementById('replay');
const skyCanvas=document.getElementById('sky');
const confettiCanvas=document.getElementById('confetti');
const floatersLayer=document.getElementById('floaters');
function show(id){views.forEach(v=>v.classList.toggle('active',v.id===id));}
function attemptUnlock(){
 const entered=secretInput.value.trim().toLowerCase().replace(/✨/g,'');
 if(entered===COPY.secret.toLowerCase()){
   hintText.style.opacity=0;
   show('welcome');
 }else{
   hintText.style.opacity=1;
   const card=document.querySelector('.gate-card');
   card.classList.remove('shake');
   void card.offsetWidth;
   card.classList.add('shake');
   secretInput.focus();
 }
}
unlockButton.addEventListener('click',attemptUnlock);
secretInput.addEventListener('keydown',e=>{if(e.key==='Enter')attemptUnlock();});
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.open)));
const sections={
 arrival:()=>`<div class="mini">THE DAY THE UNIVERSE GOT SWEETER</div><h2>Where It Began ✨</h2><p>${COPY.arrival}</p>`,
 effect:()=>`<div class="mini">A BEAUTIFUL PHENOMENON</div><h2>The Swe Effect ✨</h2><p>Possible side effects include unexpected smiles, brighter days, longer conversations, and memories that make everything better.</p><div class="formula-grid">${[['A Long Conversation + Swe','Never Long Enough'],['Random Conversation + Swe','Favourite Part of the Day'],['A Little Stress + Swe’s Smile','Everything Feels Okay'],['Any Moment + You','A Memory I Want to Keep']].map(x=>`<div class="formula">${x[0]}<br><b>= ${x[1]}</b></div>`).join('')}</div><p><b>Best Part:</b> The Swe Effect cannot be explained. It can only be felt ❤️</p>`,
 memories:()=>`<div class="mini">MEMORY CONSTELLATION</div><h2>Moments That Became Our Stars</h2><div class="photos">${COPY.photos.map((p,i)=>`<figure class="photo" style="--r:${i%2?2:-2}deg"><img src="${p[0]}" alt="A shared memory"><figcaption>${p[1]}</figcaption></figure>`).join('')}</div><p>And somehow, every beautiful memory leads back to you.</p>`
};
document.querySelectorAll('.star').forEach(star=>{
 star.addEventListener('click',()=>{
  const key=star.dataset.modal;
  modalBody.innerHTML=sections[key]();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  seen.add(key);star.classList.add('visited');countText.textContent=seen.size;
  if(seen.size===3){wishButton.classList.remove('locked');wishButton.textContent='Your birthday wish is waiting ✨';}
 });
});
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');}
document.querySelector('.close').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
wishButton.addEventListener('click',()=>{if(seen.size===3)show('finale');});
function blow(){if(candleEl.classList.contains('out'))return;candleEl.classList.add('out');finalTitleEl.hidden=true;tapTextEl.hidden=true;setTimeout(()=>{finalMessageEl.hidden=false;party();},500);}
candleEl.addEventListener('click',blow);
candleEl.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')blow();});
replayButton.addEventListener('click',()=>show('universe'));
const c=skyCanvas,x=c.getContext('2d');function size(){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}size();addEventListener('resize',size);let stars=Array.from({length:innerWidth<600?100:180},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.5+.2,a:Math.random(),d:Math.random()*.02+.004}));(function draw(){x.clearRect(0,0,innerWidth,innerHeight);let g=x.createRadialGradient(innerWidth*.5,innerHeight*.4,0,innerWidth*.5,innerHeight*.4,innerWidth*.7);g.addColorStop(0,'#321750');g.addColorStop(1,'#0c071b');x.fillStyle=g;x.fillRect(0,0,innerWidth,innerHeight);stars.forEach(s=>{s.a+=s.d;if(s.a>1||s.a<.15)s.d*=-1;x.globalAlpha=s.a;x.fillStyle='#fff';x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill()});x.globalAlpha=1;requestAnimationFrame(draw)})();setInterval(()=>{let f=document.createElement('span');f.className='floater';f.textContent=['✨','💗','✦'][Math.floor(Math.random()*3)];f.style.cssText=`left:${Math.random()*100}%;animation-duration:${7+Math.random()*5}s`;floatersLayer.appendChild(f);setTimeout(()=>f.remove(),12000)},1100);
function party(){const c=confettiCanvas,x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;let p=Array.from({length:180},()=>({x:innerWidth/2,y:innerHeight*.38,vx:(Math.random()-.5)*13,vy:-4-Math.random()*9,g:.18,s:4+Math.random()*7,h:Math.random()*360})),n=0;(function d(){x.clearRect(0,0,c.width,c.height);p.forEach(q=>{q.x+=q.vx;q.y+=q.vy;q.vy+=q.g;x.fillStyle=`hsl(${q.h} 90% 65%)`;x.fillRect(q.x,q.y,q.s,q.s*1.5)});if(n++<260)requestAnimationFrame(d)})()}
show('gate');