<?php
/** Generated from the approved Vercel design. */
get_header();
?>
<main>
    <section class="subhero subhero-compact"><div class="subhero-shade"></div><div class="shell subhero-content"><p class="subhero-code">NEWS</p><h1>お知らせ</h1><p>サービス・採用・会社に関する最新情報をご案内します。</p></div></section>
    <nav class="breadcrumb shell" aria-label="パンくず"><a href="<?php echo esc_url(home_url('/')); ?>">TOP</a><span>／</span><span>お知らせ</span></nav>
    <?php get_template_part('template-parts/news/archive-list'); ?>

    <section class="sub-cta"><div class="shell sub-cta-inner reveal"><div><p class="section-code">CONTACT</p><h2>サービスに関するお問い合わせはこちら。</h2><p>配送・保管・移転・採用など、お気軽にご相談ください。</p></div><a href="<?php echo esc_url(home_url('/contact/')); ?>">お問い合わせ <span>→</span></a></div></section>
  </main>
<?php get_footer(); ?>
