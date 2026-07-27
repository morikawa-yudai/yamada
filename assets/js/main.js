/* ===== サイト共通: ヘッダー状態・メニュー・アンカー移動・スクロール表示 =====
   WP移植メモ: 外部スムーススクロールライブラリは使わず、ブラウザ標準の軽いスクロールを使用 */
(function(){
  "use strict";
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* header scroll state + to-top */
  var header=document.getElementById('header'), toTop=document.getElementById('toTop');
  var ticking=false;
  function updateScrollState(){
    var y=scrollY;
    if(header) header.classList.toggle('scrolled', y>30);
    if(toTop) toTop.classList.toggle('show', y>600);
    ticking=false;
  }
  function onScroll(){
    if(!ticking){
      ticking=true;
      requestAnimationFrame(updateScrollState);
    }
  }
  addEventListener('scroll',onScroll,{passive:true});
  updateScrollState();

  /* mobile menu */
  var burger=document.getElementById('burger');
  if(burger){
    burger.addEventListener('click',function(){document.body.classList.toggle('menu-open');});
  }
  document.querySelectorAll('#nav a').forEach(function(a){
    a.addEventListener('click',function(){document.body.classList.remove('menu-open');});
  });
  if(toTop){
    toTop.addEventListener('click',function(){
      scrollTo({top:0,behavior:reduce?'auto':'smooth'});
    });
  }

  /* anchor links: native scrolling only, so wheel/touch input stays responsive */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var id=a.getAttribute('href');
      if(!id || id.length<2) return;
      var el=document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      var top=el.getBoundingClientRect().top+scrollY-72;
      scrollTo({top:Math.max(0,top),behavior:reduce?'auto':'smooth'});
    });
  });

  /* reveal on scroll */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(en.isIntersecting){
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    },{threshold:.14,rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('[data-reveal]').forEach(function(el){io.observe(el);});
  }else{
    document.querySelectorAll('[data-reveal]').forEach(function(el){el.classList.add('in');});
  }
})();