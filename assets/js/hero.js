/* ===== Hero アニメーション (GSAP) =====
   WP移植メモ: front-page でのみ enqueue。依存: gsap + ScrollTrigger(CDN) */
/* ===== HERO v6 motion (GSAP) — 他セクションには影響しません ===== */
(function(){
  "use strict";
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce || typeof gsap==='undefined') return; /* 未読込時は静的表示にフォールバック */
  gsap.registerPlugin(ScrollTrigger);

  var tl=gsap.timeline({defaults:{ease:'power3.out'}});
  tl.from('.hero-photo',{opacity:0,scale:1.015,duration:1.3,ease:'power2.out',transformOrigin:'50% 100%'},0)
    .from('.hero-copy h1 .l>span',{yPercent:112,duration:.95,stagger:.13,ease:'power4.out'},.25)
    .from('.hero-lead',{y:22,opacity:0,duration:.7},'-=.5')
    .from('.hero-actions .btn',{y:18,opacity:0,duration:.55,stagger:.09},'-=.45')
    .from('.hero-play',{y:14,opacity:0,duration:.5},'-=.35');

  /* パララックス: コピーのみ（写真は実績バーと接するため固定） */
  gsap.matchMedia().add('(min-width:1025px)',function(){
    gsap.to('.hero-copy',{y:24,ease:'none',
      scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  });
})();
