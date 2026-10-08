<?php
/** Generated from the approved Vercel design. */
get_header();
?>
<main>
    <section class="subhero subhero-compact"><div class="subhero-shade"></div><div class="shell subhero-content"><p class="subhero-code">CONTACT</p><h1>まずは、状況を<br>お聞かせください。</h1><p>配送・倉庫・移転・施工・廃棄・採用まで、担当者が内容を確認してご案内します。</p></div></section>
    <nav class="breadcrumb shell" aria-label="パンくず"><a href="<?php echo esc_url(home_url('/')); ?>">TOP</a><span>／</span><span>お問い合わせ</span></nav>

    <section class="section contact-page-section"><div class="shell contact-page-grid">
      <div class="contact-guide reveal"><p class="section-code">GET IN TOUCH</p><h2>ご相談・お見積りは無料です。</h2><p>内容が固まっていない段階でも構いません。現在のお困りごと、希望時期、荷物や作業の概要をお知らせください。</p>
        <div class="contact-channel"><small>TEL</small><a href="tel:0488789116">048-878-9116</a><span>平日 8:00〜18:00</span></div>
        <div class="contact-channel"><small>FAX</small><strong>048-878-9117</strong></div>
      </div>
      <div class="contact-form reveal wp-contact-form">
        <?php $shortcode = yg_field('contact_form_shortcode', '', get_the_ID()); ?>
        <?php if ($shortcode) : ?>
          <?php echo do_shortcode(wp_kses_post($shortcode)); ?>
        <?php else : ?>
          <p class="form-setup-note">管理画面の「お問い合わせフォーム」欄に、Contact Form 7のショートコードを設定してください。</p>
        <?php endif; ?>
      </div>
    </div></section>
  </main>
<?php get_footer(); ?>
