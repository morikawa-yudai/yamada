/* ===== Hero entrance animation (GSAP) =====
   WP移植メモ: front-page でのみ enqueue。スクロール追従は使わず、初回表示だけを演出 */
(function(){
  "use strict";
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce || typeof gsap==='undefined') return;

  var tl=gsap.timeline({defaults:{ease:'power3.out'}});
  tl.from('.hero-photo',{opacity:0,scale:1.015,duration:1.05,ease:'power2.out',transformOrigin:'50% 100%'},0)
    .from('.hero-copy h1 .l>span',{yPercent:112,duration:.8,stagger:.11,ease:'power4.out'},.2)
    .from('.hero-lead',{y:18,opacity:0,duration:.55},'-=.4')
    .from('.hero-actions .btn',{y:14,opacity:0,duration:.45,stagger:.07},'-=.35')
    .from('.hero-play',{y:10,opacity:0,duration:.4},'-=.28');
})();