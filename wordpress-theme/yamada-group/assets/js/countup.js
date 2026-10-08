/* ===== 実績数値 CountUp =====
   WP移植メモ: 数値は .count[data-target] を書き換えるだけで動作。
   ACF「実績数値」フィールドの値を data-target に出力する想定 */
(function(){
  "use strict";
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  function countUp(el){
    var target=parseInt(el.getAttribute('data-target'),10);
    if(reduce){el.textContent=target;return;}
    var dur=1400,s=performance.now();
    (function tick(now){var p=Math.min((now-s)/dur,1);var e=1-Math.pow(1-p,3);el.textContent=Math.round(target*e);if(p<1)requestAnimationFrame(tick);})(s);
  }
  var done=false;
  var co=new IntersectionObserver(function(es){
    es.forEach(function(en){ if(en.isIntersecting && !done){done=true;document.querySelectorAll('.count').forEach(countUp);} });
  },{threshold:.4});
  var sr=document.querySelector('.stats-row'); if(sr)co.observe(sr);

})();
