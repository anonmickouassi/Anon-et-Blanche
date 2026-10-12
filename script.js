/* =====================================================
   NOTRE MARIAGE - script.js
   - CFG (juste en dessous) : numéro WhatsApp, date/heure, lieu
   - PH : liste des photos (dossier images/)
   Pour ajouter une photo : mettez le fichier dans images/,
   ajoutez-le dans PH, puis ajoutez un bloc <div class="gs"> dans index.html
   ===================================================== */
var CFG={
  whatsapp:"2250777368778", // numéro des mariés, sans + ni espaces (ex. 2250700000000)
  debut:"2026-12-26T12:30:00Z",      // Abidjan = heure UTC
  fin:"2026-12-26T18:00:00Z",
  lieu:"École Primaire Secondaire Président, Yopougon Akadjoba, Abidjan", carte:"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent("Ecole Primaire Secondaire Président Yopougon Abidjan")
};

var PH={1:"images/portrait-1.jpg",2:"images/portraits-serie.jpg",3:"images/couleur-1.jpeg",4:"images/portrait-2.jpeg",};
(function(){
  var $=function(s){return document.querySelector(s)};
  var $$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};

  $$("img[data-photo]").forEach(function(i){i.src=PH[i.getAttribute("data-photo")]});


  /* écran d'accueil */
  var intro=$("#intro");
  document.body.classList.add("lock");
  try{var q=new URLSearchParams(location.search).get("invite");if(q)$("#inv").textContent="Cordialement invité : "+q}catch(e){}
  for(var i=0;i<30;i++){var d=document.createElement("span"),z=1+Math.random()*2.5;d.className="sp";
    d.style.cssText="left:"+Math.random()*100+"%;top:"+Math.random()*100+"%;width:"+z+"px;height:"+z+"px;animation-delay:"+(Math.random()*5)+"s;animation-duration:"+(4+Math.random()*4)+"s";
    intro.insertBefore(d,intro.firstChild)}
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  var auto=false,pos=0,last=null,SPEED=42,btn=$("#auto"),ico=$("#auto-i");
  var PAUSE='<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',PLAY='<path d="M7 4.500 L19 12 L7 19.500Z"/>';
  function setIco(on){ico.innerHTML=on?PAUSE:PLAY;btn.setAttribute("aria-label",on?"Arrêter le défilement automatique":"Reprendre le défilement automatique")}
  function step(t){
    if(!auto)return;
    if(last===null)last=t;
    pos+=SPEED*(t-last)/1000;last=t;
    var max=document.documentElement.scrollHeight-window.innerHeight;
    if(pos>=max){window.scrollTo(0,max);stop();return}
    window.scrollTo(0,pos);requestAnimationFrame(step);
  }
  function start(){if(auto)return;auto=true;last=null;pos=window.scrollY;setIco(true);requestAnimationFrame(step)}
  function stop(){auto=false;setIco(false)}
  ["wheel","touchstart","keydown","mousedown"].forEach(function(ev){window.addEventListener(ev,function(e){if(auto&&e.target!==btn&&!btn.contains(e.target))stop()},{passive:true})});
  btn.onclick=function(){auto?stop():start()};

  function petals(x,y){
    var cols=["#2f8a5a","#c9a24a","#e9dcb5","#1d6b45"];
    for(var i=0;i<20;i++){var p=document.createElement("span");p.className="petal";
      p.style.left=x+"px";p.style.top=y+"px";p.style.background=cols[i%4];
      p.style.setProperty("--dx",(Math.random()*300-150)+"px");p.style.setProperty("--dy",(120+Math.random()*320)+"px");p.style.setProperty("--r",(Math.random()*540-270)+"deg");
      p.style.animationDelay=(Math.random()*.3)+"s";document.body.appendChild(p);
      setTimeout(function(el){el.remove()},2400,p)}
  }

  
  // --- Gestion de la musique de fond (goodnessofgod.m4a) ---


  var audio = document.getElementById('bg-music');
var muted = false;
var mbtn = $("#mus");
var mi = $("#mus-i");

var ON = '<path d="M4 9 H8 L13 5 V19 L8 15 H4 Z"/><path d="M16.500 9 C18 10.500 18 13.500 16.500 15"/><path d="M19 6.500 C22 9.500 22 14.500 19 17.500"/>';
var OFF = '<path d="M4 9 H8 L13 5 V19 L8 15 H4 Z"/><path d="M17 9.500 L22 14.500 M22 9.500 L17 14.500"/>';

function mIco() {
  mi.innerHTML = muted ? OFF : ON;
  mbtn.setAttribute("aria-label", muted ? "Activer la musique" : "Couper la musique");
}
mIco();

// Fonction pour démarrer la musique
function startMusic() {
  if (audio) {
    audio.volume = 0.5; // Ajustez le volume si besoin (entre 0.0 et 1.0)
    audio.play().catch(error => {
      console.log("Lecture automatique bloquée par le navigateur :", error);
    });
  }
}

// Gestion du bouton Muet / Actif
mbtn.onclick = function() {
  if (!audio) return;
  muted = !muted;
  audio.muted = muted;
  mIco();
};

// Pause automatique si l'utilisateur change d'onglet
document.addEventListener("visibilitychange", function() {
  if (!audio) return;
  if (document.hidden) {
    audio.pause();
  } else if (!muted) {
    audio.play().catch(() => {});
  }
});

// Fonction personnalisée pour générer des pétales en continu pendant les 10 secondes
  function startPetalsShower() {
    var cols = ["#5c3a21", "#c9a24a", "#2f8a5a", "#ffffff"]; // Marron, Or, Vert, Blanc
    
    // Crée des vagues de pétales en continu pendant 10 secondes (tous les 300ms)
    var petalInterval = setInterval(function() {
      for (var i = 0; i < 5; i++) {
        var p = document.createElement("span");
        p.className = "petal";
        // Position aléatoire sur toute la largeur de l'écran en haut
        p.style.left = Math.random() * window.innerWidth + "px";
        p.style.top = "-20px";
        p.style.background = cols[Math.floor(Math.random() * cols.length)];
        
        // Mouvement de chute et rotation
        p.style.setProperty("--dx", (Math.random() * 200 - 100) + "px");
        p.style.setProperty("--dy", (window.innerHeight + 100) + "px");
        p.style.setProperty("--r", (Math.random() * 720 - 360) + "deg");
        
        document.body.appendChild(p);
        
        // Suppression après la chute
        setTimeout(function(el) { el.remove(); }, 3500, p);
      }
    }, 300);

    // Arrêter la création de nouveaux pétales après 10 secondes
    setTimeout(function() {
      clearInterval(petalInterval);
    }, 10000);
  }

// Déclenchement lors de l'ouverture de l'invitation
$("#open").onclick = function(e) {

  startMusic();
  startMusic();

    // 2. Masquer la carte d'introduction et lancer la pluie de pétales de 10s
    intro.classList.add("out");
    
    if (!reduce) {
      startPetalsShower();
    }

    // 3. Attendre exactement 10 secondes (10000ms) avant de révéler le contenu du site
    setTimeout(function() {
      intro.setAttribute("hidden", "");
      document.body.classList.add("go");
      document.body.classList.remove("lock");
      window.scrollTo(0, 0);
      setIco(false);
      if (!reduce) setTimeout(start, 3200);
    }, 20000); // 10 secondes de transition

  var r = e.currentTarget.getBoundingClientRect();
  if (!reduce) petals(r.left + r.width / 2, r.top + r.height / 2);
  intro.classList.add("out");
  document.body.classList.add("go");
  document.body.classList.remove("lock");
  window.scrollTo(0, 0);
  setTimeout(function () { intro.setAttribute("hidden", ""); }, 1000);
  setIco(false);

  // Lancement de votre musique au clic sur "Ouvrir"
  startMusic();

  if (!reduce) setTimeout(start, 3200);
};

  /* compte à rebours */
  var T=new Date(CFG.debut);
  function pl(n,u){return n+" "+u+(n>1&&u!=="min"&&u!=="sec"?"s":"")}
  function tick(){
    var s=Math.max(0,Math.floor((T-new Date())/1000));
    $("#cd").textContent=pl(Math.floor(s/86400),"jour")+" "+pl(Math.floor(s%86400/3600),"heure")+" "+Math.floor(s%3600/60)+" min "+s%60+" sec";
  }
  tick();setInterval(tick,1000);

  /* calendrier décembre 2026 (1er = mardi) */
  var h="",c=1,first=1,days=31;
  for(var r=0;r<6&&c<=days;r++){h+="<tr>";for(var k=0;k<7;k++){
    if((r===0&&k<first)||c>days){h+="<td></td>"}
    else{h+=(c===26)?'<td class="on"><span>26</span></td>':"<td>"+c+"</td>";c++}
  }h+="</tr>"}
  $("#cb").innerHTML=h;

  /* agenda + itinéraire */
  function st(d){return d.toISOString().replace(/[-:]/g,"").replace(/\.\d+/,"")}
  $("#gcal").href="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent("Mariage d'Anon et Blanche")+"&dates="+st(new Date(CFG.debut))+"/"+st(new Date(CFG.fin))+"&location="+encodeURIComponent(CFG.lieu);
  $("#route").href=CFG.carte;$("#maplink").href=CFG.carte;

  /* galerie 3D : défile seule */
  var sl=$$(".gs"),N=sl.length,cur=0,dots=$("#gd"),holdUntil=0,seen=true;
  sl.forEach(function(_,i){var b=document.createElement("button");b.setAttribute("aria-label","Photo "+(i+1));b.onclick=function(){hold();show(i)};dots.appendChild(b)});
  function show(n){
    cur=((n%N)+N)%N;
    sl.forEach(function(e,i){var d=((i-cur)%N+N)%N;if(d>N/2)d-=N;e.setAttribute("data-pos",d===0?"0":d===1?"1":d===-1?"-1":"far")});
    $$("#gd button").forEach(function(b,i){b.setAttribute("aria-current",i===cur?"true":"false")});
  }
  function hold(){holdUntil=Date.now()+9000}
  show(0);
  $("#gp").onclick=function(){hold();show(cur-1)};$("#gn").onclick=function(){hold();show(cur+1)};
  var x0=null,g=$("#gal");
  g.addEventListener("pointerdown",function(e){x0=e.clientX;hold()});
  g.addEventListener("pointerup",function(e){if(x0===null)return;var dx=e.clientX-x0;x0=null;if(Math.abs(dx)>40)show(cur+(dx<0?1:-1))});
  g.addEventListener("mouseenter",hold);
  if("IntersectionObserver" in window){new IntersectionObserver(function(en){seen=en[0].isIntersecting},{threshold:.3}).observe(g)}
  if(!reduce)setInterval(function(){if(seen&&!document.hidden&&Date.now()>holdUntil)show(cur+1)},3200);

  /* confirmer la présence */
  var dlg=$("#dlg");
  $("#open-rsvp").onclick=function(){dlg.showModal();setTimeout(function(){$("#rn").focus()},30)};
  $("#dx").onclick=function(){dlg.close()};
  dlg.addEventListener("click",function(e){if(e.target===dlg)dlg.close()});
  $("#rf").addEventListener("submit",function(e){
    e.preventDefault();
    var n=$("#rn").value.trim();
    if(!n){$("#re").hidden=false;$("#rn").focus();return}
    $("#re").hidden=true;
    var ok=$("input[name=att]:checked").value==="oui",p=$("#rp").value;
    var m=ok?"Bonjour ! C'est "+n+". Nous serons présents à votre mariage ("+p+" personne"+(p>1?"s":"")+"). Félicitations !"
            :"Bonjour ! C'est "+n+". Nous ne pourrons malheureusement pas être présents à votre mariage. Tous nos vœux de bonheur !";
    window.open("https://wa.me/"+CFG.whatsapp+"?text="+encodeURIComponent(m),"_blank","noopener");
    dlg.close();
  });

  /* livre d'or (enregistré dans le navigateur) */
  var K="livre-dor-anon-blanche",W=[];
  try{W=JSON.parse(localStorage.getItem(K)||"[]")}catch(e){W=[]}
  function esc(t){var d=document.createElement("div");d.textContent=t;return d.innerHTML}
  function draw(){$("#wl").innerHTML=W.length?W.slice().reverse().map(function(w){return '<div class="wish"><b>'+esc(w.n)+"</b>"+esc(w.m)+"</div>"}).join(""):'<p class="empty" style="margin:16px 0 0">Pas encore de vœux. Soyez le premier !</p>'}
  draw();
  $("#gf").addEventListener("submit",function(e){
    e.preventDefault();
    var n=$("#gn1").value.trim(),m=$("#gm").value.trim();
    if(!n||!m){$("#ge").hidden=false;return}
    $("#ge").hidden=true;W.push({n:n,m:m});
    try{localStorage.setItem(K,JSON.stringify(W))}catch(x){}
    $("#gm").value="";draw();
  });
})();


document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('wedding-video');

  if (video) {
    // 1. Lancer ou Mettre en pause la vidéo au clic
    video.addEventListener('click', () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    // 2. Gestion automatique selon la position dans le carrousel
    // (Ajuster la logique selon la façon dont votre carrousel gère data-pos)
    const observer = new MutationObserver(() => {
      const parentSlide = video.closest('.gs');
      
      // Si la vidéo n'est plus la diapositive active (ex: si data-pos n'est plus "0"), on la met en pause
      if (parentSlide && parentSlide.getAttribute('data-pos') !== '0') {
        video.pause();
      }
    });

    // Surveiller les changements sur l'élément parent
    const parentSlide = video.closest('.gs');
    if (parentSlide) {
      observer.observe(parentSlide, { attributes: true, attributeFilter: ['data-pos'] });
    }
  }
});


// /* musique d'ambiance romantique (synthétisée, sans fichier) */
  
  // var AC=window.AudioContext||window.webkitAudioContext,ctx=null,master=null,wet=null,timer=null,nextT=0,barN=0,muted=false,mbtn=$("#mus"),mi=$("#mus-i");
  // var ON='<path d="M4 9 H8 L13 5 V19 L8 15 H4 Z"/><path d="M16.500 9 C18 10.500 18 13.500 16.500 15"/><path d="M19 6.500 C22 9.500 22 14.500 19 17.500"/>',OFF='<path d="M4 9 H8 L13 5 V19 L8 15 H4 Z"/><path d="M17 9.500 L22 14.500 M22 9.500 L17 14.500"/>';
  // function mIco(){mi.innerHTML=muted?OFF:ON;mbtn.setAttribute("aria-label",muted?"Activer la musique":"Couper la musique")}
  // mIco();
  // var CH=[[48,55,59,64],[45,55,60,64],[41,57,60,64],[43,55,59,62]];
  // var ME=[[[0,79,1.5],[1.5,76,.5],[2,74,1],[3,76,1]],[[0,72,1.5],[1.5,74,.5],[2,76,2]],[[0,77,1.5],[1.5,76,.5],[2,72,1],[3,74,1]],[[0,74,2],[2,71,1],[3,67,1]]];
  // var AR=[0,1,2,3,2,1,3,2],BEAT=60/68;
  // function fq(m){return 440*Math.pow(2,(m-69)/12)}
  // function note(m,t,dur,g,type){
  //   var o=ctx.createOscillator(),o2=ctx.createOscillator(),e=ctx.createGain();
  //   o.type=type||"triangle";o.frequency.value=fq(m);o2.type="sine";o2.frequency.value=fq(m)*2;
  //   var g2=ctx.createGain();g2.gain.value=.25;
  //   e.gain.setValueAtTime(0.0001,t);e.gain.linearRampToValueAtTime(g,t+.012);e.gain.exponentialRampToValueAtTime(.0001,t+dur);
  //   o.connect(e);o2.connect(g2);g2.connect(e);e.connect(master);e.connect(wet);
  //   o.start(t);o2.start(t);o.stop(t+dur+.05);o2.stop(t+dur+.05);
  // }
  // function pad(ms,t,dur){
  //   var f=ctx.createBiquadFilter();f.type="lowpass";f.frequency.value=800;
  //   var e=ctx.createGain();e.gain.setValueAtTime(0.0001,t);e.gain.linearRampToValueAtTime(.05,t+1);e.gain.linearRampToValueAtTime(.05,t+dur-.8);e.gain.linearRampToValueAtTime(.0001,t+dur+.6);
  //   f.connect(e);e.connect(master);e.connect(wet);
  //   ms.forEach(function(m){[-3,3].forEach(function(dt){var o=ctx.createOscillator();o.type="sine";o.frequency.value=fq(m+12);o.detune.value=dt;o.connect(f);o.start(t);o.stop(t+dur+.7)})});
  // }
  // function bar(t){
  //   var c=CH[barN%4],me=ME[barN%4];
  //   pad(c,t,4*BEAT);
  //   for(var i=0;i<8;i++){note(c[AR[i]]+(i===0?0:12),t+i*BEAT/2,i===0?2.2:1.3,i===0?.2:.085)}
  //   me.forEach(function(n){note(n[1],t+n[0]*BEAT,Math.max(1.2,n[2]*BEAT*1.4),.13,"sine")});
  //   barN++;
  // }
  // function sched(){while(nextT<ctx.currentTime+1.2){bar(nextT);nextT+=4*BEAT}}
  // function startMusic(){
  //   if(!AC||ctx)return;
  //   try{
  //     ctx=new AC();master=ctx.createGain();master.gain.value=0;
  //     var comp=ctx.createDynamicsCompressor();master.connect(comp);comp.connect(ctx.destination);
  //     var conv=ctx.createConvolver(),len=ctx.sampleRate*2.8,buf=ctx.createBuffer(2,len,ctx.sampleRate);
  //     for(var ch=0;ch<2;ch++){var d=buf.getChannelData(ch);for(var i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.4)}
  //     conv.buffer=buf;wet=ctx.createGain();wet.gain.value=.55;wet.connect(conv);conv.connect(master);
  //     master.gain.linearRampToValueAtTime(.42,ctx.currentTime+3);
  //     nextT=ctx.currentTime+.2;sched();timer=setInterval(sched,400);
  //   }catch(e){ctx=null}
  // }
  // mbtn.onclick=function(){
  //   if(!ctx){muted=false;startMusic();mIco();return}
  //   muted=!muted;
  //   if(muted){master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setTargetAtTime(0,ctx.currentTime,.15);setTimeout(function(){if(muted)ctx.suspend()},600)}
  //   else{ctx.resume();master.gain.setTargetAtTime(.42,ctx.currentTime,.4)}
  //   mIco();
  // };
  // document.addEventListener("visibilitychange",function(){if(!ctx)return;if(document.hidden)ctx.suspend();else if(!muted)ctx.resume()});
  // $("#open").onclick=function(e){
  //   var r=e.currentTarget.getBoundingClientRect();
  //   if(!reduce)petals(r.left+r.width/2,r.top+r.height/2);
  //   intro.classList.add("out");document.body.classList.add("go");document.body.classList.remove("lock");
  //   window.scrollTo(0,0);setTimeout(function(){intro.setAttribute("hidden","")},1000);
  //   setIco(false);
  //   startMusic();
  //   if(!reduce)setTimeout(start,3200);
  // };
