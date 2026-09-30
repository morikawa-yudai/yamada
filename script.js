const btn=document.querySelector('.menu-button');const mobile=document.querySelector('.mobile-nav');
if(btn&&mobile){btn.addEventListener('click',()=>{const open=mobile.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));mobile.setAttribute('aria-hidden',String(!open));});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');btn.setAttribute('aria-expanded','false');mobile.setAttribute('aria-hidden','true');}));}
const io='IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.08}):null;
document.querySelectorAll('.reveal').forEach(el=>io?io.observe(el):el.classList.add('in'));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const form=document.querySelector('#preview-form');if(form){form.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#form-message').textContent='現在は公開前プレビューのため、送信は電話窓口（048-878-9116）をご利用ください。';});}
