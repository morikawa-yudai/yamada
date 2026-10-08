<?php
/** Generated from the approved Vercel design. */
get_header();
?>
<main>
    <section class="subhero subhero-company"><img class="subhero-media" src="<?php echo esc_url(yg_asset('images/company-natural.webp')); ?>" alt="現場で打ち合わせをする山田運輸のスタッフ" width="1536" height="1024"><div class="subhero-shade"></div><div class="shell subhero-content"><p class="subhero-code">COMPANY</p><h1>運ぶ会社から、<br>課題を共に解決する会社へ。</h1><p>春日部を拠点に、首都圏の物流と企業活動を支え続けます。</p></div></section>
    <nav class="breadcrumb shell" aria-label="パンくず"><a href="<?php echo esc_url(home_url('/')); ?>">TOP</a><span>／</span><span>会社情報</span></nav>

    <section class="section company-message-page">
      <div class="shell company-message-grid">
        <div class="reveal"><p class="section-code">MESSAGE</p><h2>時代の変化に応え、<br>さらに価値ある物流へ。</h2></div>
        <div class="company-message-text reveal">
          <p>物流業界には、効率化・高品質化・コスト最適化のすべてが求められています。山田運輸は一般運送からオフィス移転、関連施工、倉庫業務まで、幅広いサービスをワンストップで提供できる体制を築いてきました。</p>
          <p>都内を中心とする首都圏の積合せ配送では、複雑なオーダーや中量ロットにも柔軟に対応。単なる「運ぶ会社」ではなく、お客様の課題を共に考え、解決するパートナーであり続けます。</p>
          <div class="representative-sign"><span>代表取締役</span><strong>山田 恭輔</strong></div>
        </div>
      </div>
    </section>

    <section class="section company-profile-section">
      <div class="shell company-profile-grid">
        <div class="company-profile-title reveal"><p class="section-code">PROFILE</p><h2>会社概要</h2><p>1977年の創業以来、現場に根差した物流サービスを提供しています。</p></div>
        <dl class="profile-table reveal">
          <div><dt>会社名</dt><dd><?php echo esc_html(yg_option('company_name', '山田運輸有限会社')); ?></dd></div>
          <div><dt>代表者</dt><dd><?php echo esc_html(yg_option('representative', '代表取締役 山田 恭輔')); ?></dd></div>
          <div><dt>拠点</dt><dd class="profile-locations">
            <span><b><?php echo esc_html(yg_option('tokyo_name', '東京本社')); ?></b><i><?php echo esc_html(yg_option('tokyo_address', '〒110-0015 東京都台東区東上野1-12-2 THE GATE UENO 4F')); ?></i></span>
            <span><b><?php echo esc_html(yg_option('saitama_name', '埼玉本社')); ?></b><i><?php echo esc_html(yg_option('saitama_note', '春日部支店')); ?>　<?php echo esc_html(yg_option('saitama_address', '〒344-0038 埼玉県春日部市大沼7-50')); ?></i></span>
            <span><b><?php echo esc_html(yg_option('ibaraki_name', '茨城支店')); ?></b><i><?php echo esc_html(yg_option('ibaraki_address', '〒300-2505 茨城県常総市中妻町3970-1')); ?></i></span>
          </dd></div>
          <div><dt><?php echo esc_html(yg_option('saitama_note', '春日部支店')); ?> TEL / FAX</dt><dd><?php echo esc_html(yg_option('tel', '048-878-9116')); ?> / <?php echo esc_html(yg_option('fax', '048-878-9117')); ?></dd></div>
          <div><dt>設立</dt><dd>1977年7月（昭和52年）</dd></div>
          <div><dt>グループ従業員</dt><dd><?php echo esc_html(yg_option('employees', '100')); ?>名（<?php echo esc_html(yg_option('profile_updated', '2026年10月')); ?>現在）</dd></div>
          <div><dt>保有車両</dt><dd><?php echo esc_html(yg_option('vehicles', '50')); ?>台（<?php echo esc_html(yg_option('profile_updated', '2026年10月')); ?>現在）</dd></div>
          <div><dt>保有許可・資格</dt><dd class="profile-credentials">
            <span><strong>産業廃棄物収集運搬業許可</strong><small>東京都・千葉県・埼玉県・神奈川県</small></span>
            <span><strong>宅地建物取引士</strong></span>
          </dd></div>
        </dl>
      </div>
    </section>

    <section class="section access-section">
      <div class="shell access-grid"><div class="reveal"><p class="section-code">ACCESS</p><h2>埼玉本社・春日部支店</h2><p>〒344-0038<br>埼玉県春日部市大沼7-50</p><a class="text-link" href="https://maps.google.com/?q=埼玉県春日部市大沼7-50" target="_blank" rel="noopener noreferrer">Google Mapsで見る <span>↗</span></a></div><div class="access-map-placeholder reveal"><span>KASUKABE</span><strong>埼玉県春日部市大沼7-50</strong><small>春日部支店 TEL 048-878-9116</small></div></div>
    </section>
    <section class="sub-cta"><div class="shell sub-cta-inner reveal"><div><p class="section-code">CONTACT</p><h2>物流・移転・保管のご相談はこちら。</h2><p>内容が固まっていない段階でも、お気軽にお問い合わせください。</p></div><a href="<?php echo esc_url(home_url('/contact/')); ?>">お問い合わせ <span>→</span></a></div></section>
  </main>
<?php get_footer(); ?>
