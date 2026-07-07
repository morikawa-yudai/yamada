/* =========================================================
   山田運輸 — Office Total Planner (Light Corporate)
   ========================================================= */
:root{
  --truck:url("../images/truck.webp");
  --blue:#0B5CD6; --blue-600:#0A50BC; --blue-700:#0E3A78;
  --navy:#0A2540; --ink:#0F2A4A; --mute:#5B6B7F; --mute-2:#8494A6;
  --green:#2E9E5B; --green-d:#237A46;
  --purple:#3B2F71; --purple-2:#5341A0;
  --gold:#E7A33C;
  --sky-1:#E8F2FF; --sky-2:#F5FAFF; --paper:#FFFFFF;
  --line:#E3ECF7; --line-2:#EEF3FA;
  --shadow:0 18px 50px rgba(15,42,74,.10); --shadow-sm:0 8px 24px rgba(15,42,74,.08);
  --fj:'Noto Sans JP',sans-serif; --fs:'Noto Serif JP',serif; --fm:'Zen Old Mincho',serif;
  --fl:'Inter',sans-serif;
  --maxw:1320px; --pad:clamp(18px,4vw,54px); --r:22px;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:var(--fj);color:var(--ink);background:var(--paper);line-height:1.8;-webkit-font-smoothing:antialiased;overflow-x:hidden}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
::selection{background:var(--blue);color:#fff}
.wrap{max-width:var(--maxw);margin:0 auto;padding-inline:var(--pad)}
.section{padding-block:clamp(64px,9vw,120px);position:relative}
[data-reveal]{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}
[data-reveal].in{opacity:1;transform:none}

.eyebrow{font-family:var(--fl);font-size:.72rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--blue);display:inline-flex;align-items:center;gap:.7em}
.eyebrow::before{content:"";width:26px;height:2px;background:var(--blue);border-radius:2px}
.sec-title{font-family:var(--fs);font-weight:700;font-size:clamp(1.7rem,4vw,2.6rem);color:var(--navy);line-height:1.3;margin-top:.5em;letter-spacing:.01em}
.sec-lead{color:var(--mute);margin-top:1em;max-width:52ch;font-size:1rem}

/* =========================================================
   LOGO (差し替え用プレースホルダー: 公式SVGに置換してください)
   ========================================================= */
.logo{display:flex;align-items:center;gap:12px}
.logo .mark{width:46px;height:46px;flex:none}
.logo .mark svg{width:100%;height:100%}
.logo .txt{line-height:1}
.logo .txt .en{font-family:var(--fl);font-weight:700;font-size:.62rem;letter-spacing:.14em;color:var(--blue-700)}
.logo .txt .en b{display:block;font-size:1.02rem;letter-spacing:.06em;color:var(--navy)}
.logo .txt .en small{font-weight:600;font-size:.5rem;color:var(--mute-2);letter-spacing:.2em}
.logo .txt .jp{font-family:var(--fj);font-weight:700;font-size:1.12rem;color:var(--navy);margin-top:2px}

/* =========================================================
   HEADER
   ========================================================= */
.header{position:fixed;inset:0 0 auto 0;z-index:100;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:14px var(--pad);transition:background .4s,box-shadow .4s,padding .4s;border-bottom:1px solid transparent}
.header.scrolled{background:rgba(255,255,255,.92);box-shadow:0 4px 24px rgba(15,42,74,.06);border-bottom-color:var(--line);padding-block:10px;}
.nav{display:flex;align-items:center;gap:26px}
.nav a{font-size:.86rem;font-weight:500;color:var(--ink);display:inline-flex;align-items:center;gap:5px;position:relative;transition:color .25s}
.nav a .caret{width:8px;height:8px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:rotate(45deg) translateY(-1px);opacity:.5}
.nav a::after{content:"";position:absolute;left:0;bottom:-6px;height:2px;width:0;background:var(--blue);transition:width .3s;border-radius:2px}
.nav a:hover{color:var(--blue)}.nav a:hover::after{width:100%}
.head-cta{background:var(--navy);color:#fff;font-weight:700;font-size:.86rem;padding:13px 22px;border-radius:100px;display:inline-flex;align-items:center;gap:9px;transition:.3s;white-space:nowrap}
.head-cta:hover{background:var(--blue);transform:translateY(-2px);box-shadow:0 10px 24px rgba(11,92,214,.3)}
.head-cta svg{width:16px;height:16px}
.burger{display:none;flex-direction:column;gap:5px;background:none;border:0;cursor:pointer;padding:8px}
.burger span{width:26px;height:2px;background:var(--navy);transition:.3s;border-radius:2px}
@media(max-width:1140px){
  .nav{position:fixed;inset:0;flex-direction:column;justify-content:center;gap:22px;background:rgba(255,255,255,.98);transform:translateY(-100%);transition:transform .5s cubic-bezier(.7,0,.2,1)}
  .nav a{font-size:1.2rem}
  body.menu-open .nav{transform:translateY(0)}
  .header>.head-cta{display:none}.nav .head-cta{display:inline-flex}
  .burger{display:flex;z-index:101}
  body.menu-open .burger span:nth-child(1){transform:translateY(7px) rotate(45deg)}
  body.menu-open .burger span:nth-child(2){opacity:0}
  body.menu-open .burger span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
}

/* =========================================================
   HERO v6 — デザインマスター画像を直接使用（完全再現）
   写真・空・路面・右端実写帯はマスター画像そのもの。
   テキスト/ボタン/動画チップのみライブHTMLで重ねる。
   基準キャンバス: 1402x612（座標・サイズはすべてvw比率で追従）
   ========================================================= */
/* 微調整用変数（森川さん向け: ここだけ触れば位置調整できます） */
.hero{--copy-left:6.2%;--copy-top:22.7%;--h1-size:4.28vw;--h1-lh:1.15;
  --lead-gap:1.6vw;--btn-gap:1.92vw;
  position:relative;overflow:hidden;background:#fff}
.hero::before{content:"";display:block;padding-top:43.65%} /* 612/1402 マスター縦横比 */
.hero-photo{position:absolute;left:0;bottom:0;width:100%;line-height:0;z-index:1}
.hero-photo img{width:100%;height:auto;display:block;user-select:none;-webkit-user-drag:none}

/* ---------- 左コピー（マスター実測座標） ---------- */
.hero-main{position:absolute;inset:0;z-index:3}
.hero-copy{position:absolute;left:var(--copy-left);top:var(--copy-top);max-width:36%}
.hero-copy h1{font-family:var(--fj);font-weight:900;color:#16324F;
  font-size:var(--h1-size);line-height:var(--h1-lh);letter-spacing:.02em}
.hero-copy h1 .l{display:block;overflow:hidden;padding-bottom:.08em;margin-bottom:-.08em}
.hero-copy h1 .l>span{display:block;will-change:transform}
.hero-copy h1 .maru{color:var(--blue)}
.hero-lead{margin-top:var(--lead-gap);color:#33475E;font-weight:500;font-size:1.07vw;line-height:1.88;white-space:nowrap}
.hero-actions{display:flex;flex-wrap:wrap;gap:1.2vw;margin-top:var(--btn-gap)}

/* base buttons (site-wide) */
.btn{display:inline-flex;align-items:center;gap:12px;font-weight:700;font-size:.95rem;padding:16px 30px;border-radius:100px;transition:transform .25s,box-shadow .3s,background .3s,color .3s;cursor:pointer;border:1.5px solid transparent}
.btn svg{width:18px;height:18px;transition:transform .3s}.btn:hover svg{transform:translateX(4px)}
.btn-primary{background:var(--blue);color:#fff;box-shadow:0 12px 30px rgba(11,92,214,.28)}
.btn-primary:hover{background:var(--blue-600);transform:translateY(-3px);box-shadow:0 16px 40px rgba(11,92,214,.4)}
.btn-outline{background:rgba(255,255,255,.7);border-color:var(--blue);color:var(--blue-700)}
.btn-outline:hover{background:#fff;transform:translateY(-3px);box-shadow:var(--shadow-sm)}
/* heroのみ: マスター寸法 + 光が流れるホバー */
.hero .btn{position:relative;overflow:hidden;isolation:isolate;
  padding:.9vw 1.32vw;font-size:.95vw;gap:.7vw}
.hero .btn svg{width:1.15vw;height:1.15vw}
.hero .btn::after{content:"";position:absolute;top:-30%;bottom:-30%;left:-46%;width:34%;
  transform:skewX(-22deg);pointer-events:none;opacity:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)}
.hero .btn-outline::after{background:linear-gradient(90deg,transparent,rgba(11,92,214,.15),transparent)}
.hero .btn:hover::after{opacity:1;animation:sweep .75s ease forwards}
@keyframes sweep{to{left:124%}}

/* ---------- 動画チップ（マスターの焼き込みチップを覆うライブ要素・仮リンク） ---------- */
.hero-play{position:absolute;right:3.1%;bottom:2.4%;z-index:5;
  display:inline-flex;align-items:center;gap:.85vw;font-weight:700;color:#16324F;
  font-size:1.05vw;background:#fff;border-radius:100px;
  padding:.45vw 1.5vw .45vw .6vw;box-shadow:0 .6vw 1.6vw rgba(10,30,60,.3);
  transition:transform .3s,box-shadow .3s;white-space:nowrap}
.hero-play:hover{transform:translateY(-2px);box-shadow:0 .9vw 2vw rgba(10,30,60,.35)}
.hero-play .pp{position:relative;width:3vw;height:3vw;flex:none;border-radius:50%;color:#fff;
  background:linear-gradient(140deg,#2b8cff,var(--blue-700));display:grid;place-items:center;
  box-shadow:0 .45vw 1vw rgba(11,92,214,.4)}
.hero-play .pp::after{content:"";position:absolute;inset:-.3vw;border-radius:50%;border:1px solid rgba(255,255,255,.5);animation:ppring 2.6s ease-out infinite}
@keyframes ppring{0%{transform:scale(.82);opacity:.9}100%{transform:scale(1.4);opacity:0}}
.hero-play .pp svg{width:36%;height:36%;margin-left:6%}

/* 上空の光ライン（Recruitセクションが基底スタイルを参照するため維持） */
.lightlines{position:absolute;right:-4%;top:8%;width:min(78%,1000px);height:80%;z-index:1;pointer-events:none}
.lightlines svg{width:100%;height:100%}
.lightlines path{fill:none;stroke:url(#lg);stroke-width:2;stroke-linecap:round;opacity:.6;
  stroke-dasharray:16 22;animation:llflow 3.4s linear infinite}
.lightlines path:nth-child(2){animation-duration:4.6s;opacity:.4}
.lightlines path:nth-child(3){animation-duration:2.8s;opacity:.5}
@keyframes llflow{to{stroke-dashoffset:-380}}

/* ---------- responsive（PC=マスター比率固定 / SPは縦積みに再構成） ---------- */
@media(max-width:1024px){
  .hero::before{display:none}
  .hero{padding-top:96px;display:flex;flex-direction:column}
  .hero-main{position:static;inset:auto}
  .hero-copy{position:static;max-width:640px;padding:6px var(--pad) 0}
  .hero-copy h1{font-size:clamp(2.15rem,10vw,2.8rem);line-height:1.25}
  .hero-lead{white-space:normal;font-size:.92rem;line-height:1.9;margin-top:16px}
  .hero-lead br{display:none}
  .hero-actions{gap:12px;margin-top:22px}
  .hero .btn{padding:13px 24px;font-size:.9rem;gap:10px}
  .hero .btn svg{width:16px;height:16px}
  .hero-photo{position:relative;margin-top:18px}
  .hero-play{font-size:11px;gap:8px;padding:5px 14px 5px 5px;right:3%;bottom:5%;
    box-shadow:0 6px 16px rgba(10,30,60,.3)}
  .hero-play .pp{width:30px;height:30px}
  .hero-play .pp::after{inset:-3px}
}
@media (prefers-reduced-motion:reduce){
  .lightlines path,.hero-play .pp::after{animation:none!important}
}

/* =========================================================
   STATS BAR — ネイビー（デザインマスター準拠）
   ========================================================= */
.stats{background:linear-gradient(180deg,#0C2C4A,#092440);border:0}
.stats-row{display:grid;grid-template-columns:repeat(6,1fr);gap:0}
@media(max-width:900px){.stats-row{grid-template-columns:repeat(3,1fr)}}
@media(max-width:520px){.stats-row{grid-template-columns:repeat(2,1fr)}}
.stat{display:flex;flex-direction:column;align-items:center;gap:7px;text-align:center;padding:30px 12px 28px;position:relative}
.stat+.stat::before{content:"";position:absolute;left:0;top:24%;height:52%;width:1px;background:rgba(255,255,255,.14)}
@media(max-width:900px){.stat+.stat::before{display:none}}
.stat .s-top{display:inline-flex;align-items:center;gap:8px;color:#9fb9dd;font-size:.72rem;font-weight:700;letter-spacing:.06em}
.stat .s-top svg{width:17px;height:17px;color:#7db8ff;flex:none}
.stat .v{font-family:var(--fj);font-weight:900;color:#fff;font-size:clamp(1.5rem,2vw,1.9rem);line-height:1.1}
.stat .v small{font-size:.66rem;font-weight:700;margin-left:2px;color:#c6d8f2}
.stat .c{color:rgba(255,255,255,.55);font-size:.66rem;font-weight:500;line-height:1.5}

/* =========================================================
   BUSINESS (3 cards)
   ========================================================= */
.biz{background:linear-gradient(180deg,#fff,#f4f8fe)}
.biz-head{text-align:center}
.biz-head .sec-lead{margin-inline:auto}
.biz-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:56px;align-items:stretch}
@media(max-width:1080px){.biz-grid{grid-template-columns:1fr;max-width:560px;margin-inline:auto}}
.bcard{background:#fff;border:1px solid var(--line);border-radius:24px;overflow:hidden;display:flex;flex-direction:column;box-shadow:var(--shadow-sm);transition:transform .5s cubic-bezier(.2,.8,.2,1),box-shadow .5s;position:relative}
.bcard:hover{transform:translateY(-8px);box-shadow:var(--shadow)}
.bcard .band{height:6px}
.bcard.blue .band{background:linear-gradient(90deg,var(--blue),#4b8bef)}
.bcard.green .band{background:linear-gradient(90deg,var(--green),#5cc487)}
.bcard.purple .band{background:linear-gradient(90deg,var(--purple),var(--purple-2))}
.bcard-body{padding:28px 26px 84px;flex:1;display:flex;flex-direction:column}
.bcard-head{display:flex;align-items:center;gap:14px;margin-bottom:20px}
.bcard-head .cico{width:52px;height:52px;flex:none;border-radius:15px;display:grid;place-items:center;color:#fff}
.bcard.blue .cico{background:linear-gradient(140deg,var(--blue),#4b8bef)}
.bcard.green .cico{background:linear-gradient(140deg,var(--green),#4bb877)}
.bcard.purple .cico{background:linear-gradient(140deg,var(--purple),var(--purple-2))}
.bcard-head .cico svg{width:26px;height:26px}
.bcard-head .en{font-family:var(--fl);font-weight:700;font-size:.62rem;letter-spacing:.16em}
.bcard.blue .en{color:var(--blue)}.bcard.green .en{color:var(--green-d)}.bcard.purple .en{color:var(--purple-2)}
.bcard-head h3{font-family:var(--fs);font-weight:700;font-size:1.34rem;color:var(--navy);line-height:1.2}

/* まるっと sub-logos (差し替え用: 公式ロゴ画像に置換) */
.maru-tags{display:flex;flex-wrap:wrap;gap:8px 10px;margin-bottom:20px}
.maru-tag{font-family:var(--fj);font-weight:700;font-size:.9rem;display:inline-flex;align-items:center;gap:2px;position:relative;padding-bottom:5px;background:var(--g);-webkit-background-clip:text;background-clip:text;color:transparent}
.maru-tag::after{content:"";position:absolute;left:5%;right:5%;bottom:-1px;height:3px;border-radius:3px;background:var(--g);opacity:.9}
.m1{--g:linear-gradient(90deg,#0B5CD6,#17B0C4)}.m2{--g:linear-gradient(90deg,#2E9E5B,#8CC152)}.m3{--g:linear-gradient(90deg,#E7A33C,#F0683C)}.m4{--g:linear-gradient(90deg,#17B0C4,#2B8CFF)}.m5{--g:linear-gradient(90deg,#3B4F9E,#6A4FBF)}.m6{--g:linear-gradient(90deg,#7C8AA0,#0B5CD6)}
.maru-big{font-family:var(--fj);font-weight:900;font-size:1.5rem;color:var(--blue);display:inline-flex;align-items:center;gap:3px;margin-bottom:6px;position:relative}
.maru-big .swoosh{width:18px;height:18px;color:var(--gold)}

.svc-list{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:9px 16px;margin-top:auto}
.bcard.green .svc-list{grid-template-columns:1fr 1fr 1fr}
@media(max-width:1080px){.bcard.green .svc-list{grid-template-columns:1fr 1fr}}
.svc-list li{font-size:.84rem;color:var(--ink);display:flex;align-items:center;gap:8px;line-height:1.4}
.svc-list li svg{width:15px;height:15px;flex:none}
.bcard.blue .svc-list li svg{color:var(--blue)}.bcard.green .svc-list li svg{color:var(--green)}.bcard.purple .svc-list li svg{color:var(--purple-2)}

/* group sub-companies */
.grp{border-top:1px dashed var(--line);padding-top:16px;margin-top:6px}
.grp:first-of-type{border-top:0;padding-top:0}
.grp .gname{font-family:var(--fs);font-weight:700;color:var(--navy);font-size:1.08rem}
.grp .gname .r{font-family:var(--fl);color:var(--purple-2)}
.grp .gsub{font-size:.72rem;color:var(--mute);margin:2px 0 10px;font-weight:500}

.bcard .arrow{position:absolute;right:24px;bottom:24px;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;color:#fff;transition:.35s}
.bcard.blue .arrow{background:var(--blue)}.bcard.green .arrow{background:var(--green)}.bcard.purple .arrow{background:var(--purple-2)}
.bcard:hover .arrow{transform:translateX(4px) scale(1.06)}
.bcard .arrow svg{width:20px;height:20px}

/* =========================================================
   QUALIFICATIONS BAR
   ========================================================= */
.quals{background:var(--navy);color:#fff}
.quals-row{display:flex;align-items:center;flex-wrap:wrap;gap:0;padding-block:20px}
.quals-row .q{font-size:.82rem;font-weight:500;padding:8px 22px;position:relative;color:rgba(255,255,255,.9)}
.quals-row .q+.q::before{content:"";position:absolute;left:0;top:20%;height:60%;width:1px;background:rgba(255,255,255,.18)}
.quals-more{margin-left:auto;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);color:#fff;font-weight:700;font-size:.82rem;padding:10px 20px;border-radius:100px;display:inline-flex;align-items:center;gap:8px;transition:.3s}
.quals-more:hover{background:var(--blue);border-color:var(--blue)}
.quals-more svg{width:15px;height:15px}
@media(max-width:820px){.quals-row .q+.q::before{display:none}.quals-more{margin-left:0;margin-top:8px}}

/* =========================================================
   ABOUT
   ========================================================= */
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;margin-top:52px;align-items:center}
@media(max-width:900px){.about-grid{grid-template-columns:1fr;gap:36px}}
.about-photo{position:relative;border-radius:24px;overflow:hidden;box-shadow:var(--shadow);aspect-ratio:4/3;background:linear-gradient(135deg,#dfeafc,#f3f8ff);border:1px solid var(--line)}
.about-photo .about-truck{width:100%;height:100%;background:var(--truck) center/cover no-repeat;transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.about-photo:hover .about-truck{transform:scale(1.05)}
.about-photo .about-badge{position:absolute;left:16px;bottom:16px;z-index:2;font-family:var(--fl);font-weight:700;font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;color:#fff;background:rgba(11,92,214,.85);padding:7px 14px;border-radius:100px}
.about-photo .lab{color:#8299bb;font-weight:700;font-size:.82rem;text-align:center;padding:20px;line-height:1.7}
.about-photo .lab svg{width:40px;height:40px;margin:0 auto 8px;opacity:.7}
.about-msg h3{font-family:var(--fs);font-weight:700;font-size:clamp(1.4rem,3vw,1.9rem);color:var(--navy);line-height:1.5;margin-bottom:20px}
.about-msg p{color:var(--mute);margin-bottom:14px;line-height:2}
.about-msg .sign{margin-top:20px;font-weight:700;color:var(--navy)}
.about-msg .sign b{font-size:1.2rem}
.spec{margin-top:34px;border:1px solid var(--line);border-radius:16px;overflow:hidden}
.spec dl{display:grid;grid-template-columns:34% 66%}
.spec dt,.spec dd{padding:12px 18px;border-bottom:1px solid var(--line-2);font-size:.84rem}
.spec dt{background:#f6f9fd;font-weight:700;color:var(--navy)}
.spec dd{color:var(--mute)}
.spec dl>*:nth-last-child(-n+2){border-bottom:0}

/* =========================================================
   NEWS
   ========================================================= */
.news{background:#f4f8fe}
.news-list{margin-top:44px;background:#fff;border:1px solid var(--line);border-radius:20px;overflow:hidden}
.news-row{display:grid;grid-template-columns:130px 110px 1fr auto;gap:18px;align-items:center;padding:20px 26px;border-bottom:1px solid var(--line-2);transition:background .3s}
.news-row:last-child{border-bottom:0}
.news-row:hover{background:#f7fafe}
.news-row time{font-family:var(--fl);font-weight:600;color:var(--blue);font-size:.84rem}
.news-row .cat{font-size:.66rem;font-weight:700;text-align:center;border:1px solid var(--line);border-radius:100px;padding:5px 0;color:var(--mute);letter-spacing:.08em}
.news-row .tt{font-size:.9rem;color:var(--ink)}
.news-row .go{width:16px;height:16px;color:var(--mute-2)}
@media(max-width:640px){.news-row{grid-template-columns:1fr;gap:6px}.news-row .go{display:none}}

/* =========================================================
   RECRUIT
   ========================================================= */
.recruit{background:linear-gradient(135deg,var(--navy),#123a6b);color:#fff;border-radius:0;position:relative;overflow:hidden}
.recruit .lightlines{opacity:.4}
.recruit .wrap{position:relative;z-index:2}
.recruit .eyebrow{color:#8fc0ff}.recruit .eyebrow::before{background:#8fc0ff}
.recruit .sec-title{color:#fff}
.recruit .sec-lead{color:rgba(255,255,255,.8)}
.rec-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:40px;margin-top:44px;align-items:center}
@media(max-width:860px){.rec-grid{grid-template-columns:1fr}}
.rec-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px}
.rec-chips span{font-weight:700;font-size:.84rem;padding:9px 16px;border-radius:100px;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.06)}
.pay{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);border-radius:20px;padding:28px}
.pay .k{font-family:var(--fl);font-size:.68rem;letter-spacing:.18em;color:#8fc0ff;font-weight:700}
.pay .v{font-family:var(--fj);font-weight:900;font-size:clamp(1.9rem,5vw,2.6rem);line-height:1.1;margin-top:6px}
.pay .v small{font-size:.4em;color:rgba(255,255,255,.7)}
.pay .n{color:rgba(255,255,255,.75);font-size:.82rem;margin-top:12px}
.pay .btn{margin-top:20px;width:100%;justify-content:center;background:#fff;color:var(--navy)}
.pay .btn:hover{background:var(--gold);color:#fff}

/* =========================================================
   CONTACT
   ========================================================= */
.contact{background:#fff;text-align:center}
.contact .box{background:linear-gradient(135deg,#0b5cd6,#0e3a78);border-radius:28px;padding:clamp(40px,7vw,72px);color:#fff;position:relative;overflow:hidden}
.contact h2{font-family:var(--fs);font-weight:700;font-size:clamp(1.7rem,4.5vw,2.8rem);line-height:1.3}
.contact p{color:rgba(255,255,255,.85);margin:18px auto 32px;max-width:44ch}
.contact .actions{display:flex;justify-content:center;flex-wrap:wrap;gap:14px}
.contact .btn-primary{background:#fff;color:var(--blue)}
.contact .btn-primary:hover{background:var(--gold);color:#fff}
.contact .btn-outline{background:transparent;border-color:rgba(255,255,255,.6);color:#fff}
.contact .tel{margin-top:28px;font-family:var(--fl);font-weight:700;font-size:clamp(1.5rem,4vw,2.1rem);display:inline-flex;align-items:center;gap:12px}
.contact .tel small{display:block;font-family:var(--fj);font-weight:400;font-size:.68rem;color:rgba(255,255,255,.7);letter-spacing:.1em}

/* =========================================================
   FOOTER
   ========================================================= */
.footer{background:var(--navy);color:#fff;padding-top:64px}
.foot-grid{display:grid;grid-template-columns:1.7fr 1fr 1fr 1fr;gap:36px;padding-bottom:40px}
@media(max-width:900px){.foot-grid{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.foot-grid{grid-template-columns:1fr}}
.footer .logo .txt .en,.footer .logo .txt .en b,.footer .logo .txt .jp{color:#fff}
.footer .logo .txt .en{color:#9fc0ee}
.foot-brand p{color:rgba(255,255,255,.66);font-size:.84rem;margin-top:16px;max-width:34ch}
.foot-brand .addr{color:rgba(255,255,255,.6);font-size:.8rem;margin-top:16px;line-height:1.9}
.foot-col h5{font-family:var(--fl);font-size:.66rem;letter-spacing:.16em;color:#9fc0ee;text-transform:uppercase;margin-bottom:16px}
.foot-col a{display:block;color:rgba(255,255,255,.72);font-size:.85rem;padding:6px 0;transition:.3s}
.foot-col a:hover{color:#fff;padding-left:6px}
.foot-bottom{border-top:1px solid rgba(255,255,255,.12);padding-block:22px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:.74rem;color:rgba(255,255,255,.55)}
.foot-bottom .en{font-family:var(--fl)}

.to-top{position:fixed;right:22px;bottom:22px;z-index:90;width:48px;height:48px;border-radius:50%;background:var(--blue);color:#fff;display:grid;place-items:center;box-shadow:0 10px 26px rgba(11,92,214,.4);opacity:0;pointer-events:none;transition:.4s;cursor:pointer;border:0}
.to-top.show{opacity:1;pointer-events:auto}
.to-top:hover{background:var(--navy);transform:translateY(-3px)}
.to-top svg{width:20px;height:20px}

@media (prefers-reduced-motion:reduce){
  *{animation:none !important}
  [data-reveal]{opacity:1;transform:none;transition:none}
}

/* =========================================================
   実アセット適用（ロゴ実画像のサイズ調整）
   ========================================================= */
.logo{gap:10px}
.logo .mark{height:42px;width:auto;flex:none}
.logo .word{height:26px;width:auto;flex:none}
.logo .jp{font-family:var(--fm);font-weight:700;font-size:1.16rem;letter-spacing:.04em;color:var(--navy);border-left:1px solid var(--line);padding-left:12px;margin-left:2px}
.footer .logo .jp{color:#fff;border-left-color:rgba(255,255,255,.2)}
@media(max-width:520px){.logo .word{display:none}.logo .jp{border-left:0;padding-left:0}}

