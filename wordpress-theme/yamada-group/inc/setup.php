<?php
if (!defined('ABSPATH')) { exit; }

add_action('after_setup_theme', function (): void {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'gallery', 'caption', 'style', 'script']);
    register_nav_menus(['primary' => 'メインメニュー', 'footer' => 'フッターメニュー']);
});

add_action('wp_enqueue_scripts', function (): void {
    $version = wp_get_theme()->get('Version');
    wp_enqueue_style('yamada-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&family=Noto+Serif+JP:wght@400;500;600;700;900&display=swap', [], null);
    wp_enqueue_style('yamada-main', yg_asset('css/style.css'), ['yamada-fonts'], $version);
    wp_enqueue_style('yamada-wordpress', yg_asset('css/wordpress.css'), ['yamada-main'], $version);
    wp_enqueue_script('yamada-main', yg_asset('js/main.js'), [], $version, true);
});

add_filter('script_loader_tag', function (string $tag, string $handle): string {
    return $handle === 'yamada-main' ? str_replace(' src=', ' defer src=', $tag) : $tag;
}, 10, 2);

add_filter('body_class', function (array $classes): array {
    if (!is_front_page()) { $classes[] = 'subpage'; }
    return $classes;
});

function yg_primary_nav_fallback(): void {
    $items = [
        'company' => '山田運輸について',
        'safety' => '取り組み',
        'logistics' => '事業内容',
        'news' => 'お知らせ',
        'recruit' => '採用情報',
    ];
    foreach ($items as $slug => $label) { printf('<a href="%s">%s</a>', esc_url(yg_page_url($slug)), esc_html($label)); }
    printf('<a class="nav-contact" href="%s">お問い合わせ</a>', esc_url(yg_page_url('contact')));
}

function yg_footer_nav_fallback(): void {
    $items = ['company' => '私たちについて', 'safety' => '取り組み', 'logistics' => '事業内容', 'news' => 'お知らせ', 'recruit' => '採用情報', 'contact' => 'お問い合わせ'];
    foreach ($items as $slug => $label) { printf('<a href="%s">%s</a>', esc_url(yg_page_url($slug)), esc_html($label)); }
}
