<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#ffffff">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header" id="header">
  <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="YAMADA GROUP トップへ">
    <img class="brand-mark" src="<?php echo esc_url(yg_asset('images/logo-mark.png')); ?>" alt="" width="54" height="54">
    <span class="brand-copy"><b><span class="brand-yamada">YAMADA</span><span class="brand-group">GROUP</span></b><small><span class="brand-for">for</span><span class="brand-company"><?php echo esc_html(yg_option('company_name', '山田運輸有限会社')); ?></span><span class="brand-since">SINCE 1977</span></small></span>
  </a>
  <nav class="global-nav" id="global-nav" aria-label="メインメニュー">
    <?php wp_nav_menu(['theme_location' => 'primary', 'container' => false, 'items_wrap' => '%3$s', 'fallback_cb' => 'yg_primary_nav_fallback']); ?>
  </nav>
  <button class="menu-button" id="menu-button" type="button" aria-label="メニューを開く" aria-controls="global-nav" aria-expanded="false"><span></span><span></span><span></span></button>
</header>
