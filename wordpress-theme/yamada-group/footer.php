<?php
$tel = yg_option('tel', '048-878-9116');
$fax = yg_option('fax', '048-878-9117');
$tel_link = preg_replace('/[^0-9+]/', '', $tel);
?>
<footer class="site-footer">
  <div class="shell footer-top">
    <a class="brand footer-brand" href="<?php echo esc_url(home_url('/')); ?>">
      <img class="brand-mark" src="<?php echo esc_url(yg_asset('images/logo-mark.png')); ?>" alt="" width="54" height="54">
      <span class="brand-copy"><b><span class="brand-yamada">YAMADA</span><span class="brand-group">GROUP</span></b><small><span class="brand-for">for</span><span class="brand-company"><?php echo esc_html(yg_option('company_name', '山田運輸有限会社')); ?></span><span class="brand-since">SINCE 1977</span></small></span>
    </a>
    <div class="footer-address"><b><?php echo esc_html(yg_option('saitama_name', '埼玉本社')); ?>（<?php echo esc_html(yg_option('saitama_note', '春日部支店')); ?>）</b><br><?php echo esc_html(yg_option('saitama_address', '〒344-0038 埼玉県春日部市大沼7-50')); ?><br><span><?php echo esc_html(yg_option('saitama_note', '春日部支店')); ?> TEL&nbsp;<?php echo esc_html($tel); ?> ／ FAX&nbsp;<?php echo esc_html($fax); ?></span></div>
    <nav class="footer-nav" aria-label="フッターメニュー"><?php wp_nav_menu(['theme_location' => 'footer', 'container' => false, 'items_wrap' => '%3$s', 'fallback_cb' => 'yg_footer_nav_fallback']); ?></nav>
  </div>
  <div class="shell footer-bottom"><span>© 1977–<?php echo esc_html(wp_date('Y')); ?> YAMADA TRANSPORT CO., LTD.</span><span>KASUKABE, SAITAMA / SINCE 1977</span></div>
</footer>
<aside class="floating-links<?php echo is_front_page() ? ' is-over-hero' : ''; ?>" aria-label="関連サイト">
  <a class="floating-link floating-instagram" href="<?php echo esc_url(yg_option('instagram_url', 'https://www.instagram.com/ymd_transport/')); ?>" target="_blank" rel="noopener noreferrer"><span class="instagram-mark" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25"></rect><circle cx="12" cy="12" r="4.15"></circle><circle class="instagram-dot" cx="17.45" cy="6.65" r="1.15"></circle></svg></span><span class="floating-link-copy"><small>FOLLOW US</small><strong>Instagram</strong></span><span class="floating-link-arrow" aria-hidden="true">↗</span></a>
  <a class="floating-link floating-office" href="<?php echo esc_url(yg_option('marutto_url', 'https://www.office-marutto.com/')); ?>" target="_blank" rel="noopener noreferrer"><span class="floating-link-copy office-marutto-copy"><small>オフィス移転・不用品回収の事なら</small><strong>オフィスまるっと便</strong></span><span class="floating-link-arrow" aria-hidden="true">↗</span></a>
</aside>
<button class="page-top" id="page-top" type="button" aria-label="ページ上部へ">↑</button>
<?php wp_footer(); ?>
</body>
</html>
