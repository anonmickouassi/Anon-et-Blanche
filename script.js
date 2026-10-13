/* =====================================================
   NOTRE MARIAGE - script.js
   - CFG (juste en dessous) : numéro WhatsApp, date/heure, lieu
   - PH : liste des photos (dossier images/)
   Pour ajouter une photo : mettez le fichier dans images/,
   ajoutez-le dans PH, puis ajoutez un bloc <div class="gs"> dans index.html
   ===================================================== */
/* =====================================================
   NOTRE MARIAGE - script.js
   - CFG : numéro WhatsApp, date/heure, lieu
   - PH : liste des photos (dossier images/)
   ===================================================== */
var CFG={
  whatsapp:"2250777368778", // numéro des mariés, sans + ni espaces
  debut:"2026-12-26T12:30:00Z",      // Abidjan = heure UTC
  fin:"2026-12-26T18:00:00Z",
  lieu:"École Primaire Secondaire Président, Yopougon Akadjoba, Abidjan", carte:"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent("Ecole Primaire Secondaire Président Yopougon Abidjan")
};

var PH={1:"images/portrait-1.jpg",2:"images/portraits-serie.jpg",3:"images/couleur-1.jpeg",4:"images/portrait-2.jpeg"};

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

  function startMusic() {
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(error => {
        console.log("Lecture automatique en attente d'interaction utilisateur :", error);
      });
    }
  }

  // Tente de lancer la musique dès l'apparition de la page
  startMusic();
  document.addEventListener("click", function initAudio() {
    startMusic();
    document.removeEventListener("click", initAudio);
  }, { once: true });

  mbtn.onclick = function() {
    if (!audio) return;
    muted = !muted;
    audio.muted = muted;
    mIco();
  };

  document.addEventListener("visibilitychange", function() {
    if (!audio) return;
    if (document.hidden) {
      audio.pause();
    } else if (!muted) {
      audio.play().catch(() => {});
    }
  });

  // ============================================================
  // PAGE DE PÉTALES (15 secondes d'introduction)
  // ============================================================
  var RAIN_MS = 15000; 

  var FLEURS = [
    ["#d4af37", "#f1d57a", "#7a4a2b"], // or
    ["#2f8a5a", "#58b588", "#d4af37"], // vert
    ["#ffffff", "#efe6d2", "#d4af37"], // blanc
    ["#7a4a2b", "#a8704a", "#e3c987"]  // marron
  ];
  function flowerSVG(c, n) {
    var s = '<svg viewBox="-24 -24 48 48" aria-hidden="true">', i;
    function petal(len, w, fill, rot) {
      return '<path d="M0 0 C' + (-w) + ' ' + (-len * .3) + ',' + (-w) + ' ' + (-len * .85) + ',0 ' + (-len) +
             ' C' + w + ' ' + (-len * .85) + ',' + w + ' ' + (-len * .3) + ',0 0Z" fill="' + fill +
             '" stroke="rgba(0,0,0,.18)" stroke-width=".5" transform="rotate(' + rot + ')"/>';
    }
    for (i = 0; i < n; i++) s += petal(22, 9, c[0], i * 360 / n);
    for (i = 0; i < n; i++) s += petal(14, 6, c[1], i * 360 / n + 180 / n);
    return s + '<circle r="4" fill="' + c[2] + '"/><circle r="1.6" cx="-1" cy="-1" fill="rgba(255,255,255,.55)"/></svg>';
  }

  function rainOn(L, msInfinite, o) {
    var cols = [["#9a6a43", "#5e3720"], ["#7a4a2b", "#4a2a15"],
                ["#ecd27f", "#b98a22"], ["#d4af37", "#9c7a1c"],
                ["#4aa77a", "#1d6b45"], ["#2f8a5a", "#124a2f"],
                ["#ffffff", "#ece2cc"], ["#fffdf7", "#e6dbc2"]];
    var shapes = ["100% 0 100% 0", "60% 40% 70% 30% / 60% 60% 40% 40%", "0 100% 0 100%"];
    var k = 0;
    function rnd(a, b) { return a + Math.random() * (b - a); }
    function make() {
      if (Math.random() < o.fl) {
        var n = Math.random() < .5 ? 6 : 8, f = FLEURS[Math.floor(Math.random() * 4)];
        var p = document.createElement("span"); p.className = "fl"; p.style.setProperty("--s", rnd(26, 46) + "px");
        p.innerHTML = flowerSVG.call(null, f, n).replace("<svg", '<svg style="animation-duration:' + rnd(3.5, 8) + 's"');
        return p;
      }
      var p = document.createElement("span"), q = document.createElement("i"), c = cols[Math.floor(Math.random() * cols.length)];
      p.className = "pt"; p.style.setProperty("--s", rnd(11, 25) + "px");
      q.style.background = "linear-gradient(135deg," + c[0] + "," + c[1] + ")";
      q.style.borderRadius = shapes[k++ % 3];
      q.style.setProperty("--sw", rnd(0.9, 1.8) + "s");
      q.style.animationDelay = (-Math.random()) + "s";
      p.appendChild(q);
      return p;
    }
    function drop(delay) {
      var p = make();
      p.style.left = rnd(-2, 102) + "vw";
      p.style.setProperty("--drift", rnd(-80, 80) + "px");
      p.style.setProperty("--d", rnd(4, 6.6) + "s");
      p.style.animationDelay = delay + "s";
      p.addEventListener("animationend", function (ev) { if (ev.target === p) p.remove(); });
      L.appendChild(p);
    }
    function fly(side, delay) {
      var W = window.innerWidth, H = window.innerHeight, p = make();
      p.style.animation = "none"; p.style.left = "0"; p.style.top = "0";
      var x0, y0, xm, ym, xe, ye = H + 70;
      if (side === "left")   { x0 = -40;    y0 = rnd(.05, .8) * H; xm = rnd(.2, .65) * W; ym = y0 - rnd(0, .25) * H; }
      if (side === "right")  { x0 = W + 40; y0 = rnd(.05, .8) * H; xm = rnd(.35, .8) * W; ym = y0 - rnd(0, .25) * H; }
      if (side === "bottom") { x0 = rnd(0, 1) * W; y0 = H + 40;    xm = x0 + rnd(-140, 140); ym = rnd(.2, .6) * H; }
      xe = xm + rnd(-110, 110);
      var a = p.animate([
        { transform: "translate3d(" + x0 + "px," + y0 + "px,0)", opacity: 1, offset: 0, easing: "cubic-bezier(.15,.7,.3,1)" },
        { transform: "translate3d(" + xm + "px," + ym + "px,0)", opacity: 1, offset: 0.38, easing: "ease-in" },
        { transform: "translate3d(" + xe + "px," + ye + "px,0)", opacity: 1, offset: 1 }
      ], { duration: rnd(4200, 6400), delay: delay * 1000, fill: "both" });
      a.onfinish = function () { p.remove(); };
      L.appendChild(p);
    }
    var sides = ["left", "right", "bottom"], per = o.per, t0 = Date.now(), i;
    if (o.burst) {
      var burst = window.innerWidth < 600 ? 22 : 34;
      for (i = 0; i < burst; i++) sides.forEach(function (s) { fly(s, rnd(0, 1.4)); });
    }
    for (i = 0; i < 20; i++) drop(rnd(0, 1.2));
    var tick = 0;
    var iv = setInterval(function () {
      if (msInfinite !== true && (Date.now() - t0 > msInfinite - 3800)) { clearInterval(iv); return; }
      for (var j = 0; j < per; j++) drop(0);
      if (tick++ % 2 === 0) fly(sides[Math.floor(Math.random() * 3)], 0);
    }, 240);
  }

  function startRain(ms) {
    var L = $("#rain");
    if (!L) { L = document.createElement("div"); L.id = "rain"; L.setAttribute("aria-hidden", "true"); intro.appendChild(L); }
    rainOn(L, ms, { burst: true, fl: 0, per: window.innerWidth < 600 ? 3 : 5 });
  }

  // --- PLUIE INFINIE SUR LE SITE ---
  function bloomShower() {
    var L = $("#bloom");
    if (!L) { L = document.createElement("div"); L.id = "bloom"; L.setAttribute("aria-hidden", "true"); document.body.appendChild(L); }
    rainOn(L, true, { burst: false, fl: 0, per: window.innerWidth < 600 ? 1 : 2 });
  }

  /* ----- Clic sur "Ouvrir" ----- */
  $("#open").onclick = function (e) {
    e.currentTarget.disabled = true;
    startMusic();
    var wait = reduce ? 1000 : RAIN_MS;
    intro.classList.add("rain");
    if (!reduce) startRain(RAIN_MS);

    // Après les 15 secondes de transition : on arrive sur le site et les pétales continuent à l'infini
    setTimeout(function () {
      intro.classList.add("out");
      document.body.classList.add("go");
      document.body.classList.remove("lock");
      window.scrollTo(0, 0);
      setTimeout(function () { intro.setAttribute("hidden", ""); var R = $("#rain"); if (R) R.innerHTML = ""; }, 1100);
      setIco(false);
      if (!reduce) { bloomShower(); setTimeout(start, 3200); }
    }, wait);
  };

  /* compte à rebours */
  var T=new Date(CFG.debut);
  function pl(n,u){return n+" "+u+(n>1&&u!=="min"&&u!=="sec"?"s":"")}
  function tick(){
    var s=Math.max(0,Math.floor((T-new Date())/1000));
    $("#cd").textContent=pl(Math.floor(s/86400),"jour")+" "+pl(Math.floor(s%86400/3600),"heure")+" "+Math.floor(s%3600/60)+" min "+s%60+" sec";
  }
  tick();setInterval(tick,1000);

  /* calendrier décembre 2026 */
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

  /* livre d'or */
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

/* Gestion de la vidéo dans le carrousel */
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('wedding-video');

  if (video) {
    video.addEventListener('click', () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    const observer = new MutationObserver(() => {
      const parentSlide = video.closest('.gs');
      if (parentSlide && parentSlide.getAttribute('data-pos') !== '0') {
        video.pause();
      }
    });

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