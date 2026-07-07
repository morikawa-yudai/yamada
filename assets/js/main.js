/* ===== サイト共通: ヘッダー状態・メニュー・スムーススクロール・スクロール表示 =====
   WP移植メモ: wp_enqueue_script で読込。依存: Lenis(CDN) */
(function(){
  "use strict";
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch=matchMedia('(hover:none),(pointer:coarse)').matches;
  var capable=!reduce && !touch && (navigator.hardwareConcurrency||8)>4 && innerWidth>1024;

  /* header scroll state + to-top */
  var header=document.getElementById('header'), toTop=document.getElementById('toTop');
  function onScroll(){
    var y=scrollY;
    header.classList.toggle('scrolled', y>30);
    toTop.classList.toggle('show', y>600);
  }
  addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* mobile menu */
  var burger=document.getElementById('burger');
  burger.addEventListener('click',function(){document.body.classList.toggle('menu-open');});
  document.querySelectorAll('#nav a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('menu-open');});});
  toTop.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'});});

  /* smooth scroll (capable devices only) */
  var lenis=null;
  if(typeof Lenis!=='undefined' && capable){
    lenis=new Lenis({lerp:.1,smoothWheel:true});
    function raf(t){lenis.raf(t);requestAnimationFrame(raf);} requestAnimationFrame(raf);
  }
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var id=a.getAttribute('href'); if(id.length<2)return;
      var el=document.querySelector(id); if(!el)return;
      e.preventDefault();
      if(lenis) lenis.scrollTo(el,{offset:-72});
      else el.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  /* reveal on scroll */
  var io=new IntersectionObserver(function(es){
    es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} });
  },{threshold:.14,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('[data-reveal]').forEach(function(el){io.observe(el);});
})();
