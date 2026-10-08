<?php
/** Generated from the approved Vercel design. */
get_header();
?>
<main>
    <section class="subhero subhero-recruit"><img class="subhero-media" src="<?php echo esc_url(yg_asset('images/hero-natural.webp')); ?>" alt="山田運輸のトラックと物流拠点" width="1672" height="941"><div class="subhero-shade"></div><div class="shell subhero-content"><p class="subhero-code">RECRUIT</p><h1>自分に合った働き方で、<br>物流を支える。</h1><p>経験よりも、素直に学ぶ姿勢とチームを大切にする気持ちを歓迎します。</p></div></section>
    <nav class="breadcrumb shell" aria-label="パンくず"><a href="<?php echo esc_url(home_url('/')); ?>">TOP</a><span>／</span><span>採用情報</span></nav>

    <section class="section recruit-philosophy">
      <div class="shell service-overview-grid">
        <div class="service-overview-copy reveal"><p class="section-code">WORK STYLE</p><h2>明るいうちに働いて、<br>明るいうちに帰る。</h2></div>
        <div class="service-overview-text reveal"><p>山田運輸は、長く安心して働ける環境づくりに取り組んでいます。コースや勤務日数を相談しながら、自分に合ったペースで働くことができます。</p><p>各部門の経験者と連携できる教育体制があるため、未経験からドライバーを目指す方も歓迎します。</p></div>
      </div>
    </section>

    <section class="section person-section">
      <div class="shell"><header class="section-heading reveal"><p class="section-code">WHO WE WANT</p><h2>求める人物像</h2></header><div class="reason-grid recruit-person-grid">
        <article class="reason-card reveal"><b>01</b><h3>目標を持ち続けられる方</h3><p>独立したい、技術を身につけたい、安定して働きたい。自分の未来に意欲を持てる方。</p></article>
        <article class="reason-card reveal"><b>02</b><h3>素直に学べる方</h3><p>経験以上に、吸収する力を重視。新しい仕事を前向きに覚えられる方。</p></article>
        <article class="reason-card reveal"><b>03</b><h3>仲間を大切にできる方</h3><p>挨拶や報告・連絡・相談を大切にし、チームで協力して仕事を進められる方。</p></article>
      </div></div>
    </section>

    <?php get_template_part('template-parts/recruit/job-cards'); ?>

    <?php get_template_part('template-parts/recruit/requirements'); ?>

    <section class="section benefit-section">
      <div class="shell"><header class="section-heading reveal"><p class="section-code">BENEFITS</p><h2>福利厚生・サポート</h2></header><div class="benefit-grid">
        <article class="benefit-card reveal"><h3>社会保険完備</h3><p>健康保険・厚生年金・労災保険・雇用保険</p></article>
        <article class="benefit-card reveal"><h3>各種手当</h3><p>資格手当・役職手当・通勤手当（上限あり）</p></article>
        <article class="benefit-card reveal"><h3>資格取得支援</h3><p>業務に関わる資格取得を会社が費用面からサポート</p></article>
        <article class="benefit-card reveal"><h3>休暇制度</h3><p>有給休暇・年末年始休暇・慶弔休暇など</p></article>
        <article class="benefit-card reveal"><h3>制服貸与</h3><p>仕事に集中できるよう、作業服を支給</p></article>
        <article class="benefit-card reveal"><h3>健康サポート</h3><p>定期健康診断を実施し、社員の健康を継続的に確認</p></article>
      </div></div>
    </section>
    <section class="sub-cta sub-cta-gold"><div class="shell sub-cta-inner reveal"><div><p class="section-code">ENTRY</p><h2>まずは働き方から相談してください。</h2><p>経験の有無や希望する勤務スタイルを確認し、合うコースをご案内します。</p></div><a href="<?php echo esc_url(home_url('/contact/')); ?>">応募・採用相談 <span>→</span></a></div></section>
  </main>
<?php get_footer(); ?>
