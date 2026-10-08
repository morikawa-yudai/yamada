import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const theme = path.join(root, "wordpress-theme", "yamada-group");

const pages = {
  index: "front-page.php",
  company: "page-company.php",
  safety: "page-safety.php",
  logistics: "page-logistics.php",
  office: "page-office.php",
  group: "page-group.php",
  news: "page-news.php",
  recruit: "page-recruit.php",
  contact: "page-contact.php",
};

const defaults = {
  company_name: "山田運輸有限会社",
  representative: "代表取締役 山田 恭輔",
  tokyo_name: "東京本社",
  tokyo_address: "〒110-0015 東京都台東区東上野1-12-2 THE GATE UENO 4F",
  saitama_name: "埼玉本社",
  saitama_note: "春日部支店",
  saitama_address: "〒344-0038 埼玉県春日部市大沼7-50",
  ibaraki_name: "茨城支店",
  ibaraki_address: "〒300-2505 茨城県常総市中妻町3970-1",
  tel: "048-878-9116",
  fax: "048-878-9117",
  employees: "100",
  vehicles: "50",
  clients: "500",
};

function write(relative, content) {
  const target = path.join(theme, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  content = content.replace(/\n\+/g, "\n");
  content = content.replace(
    "'location' => [[['param' => 'page', 'operator' => '==', 'value' => 'contact']]],",
    "'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'page']]],"
  );
  content = content.replace(
    "'location' => [[['param' => 'page_template', 'operator' => '==', 'value' => 'page-contact.php']]],",
    "'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'page']]],"
  );
  content = content.replace(
    ".menu-item { list-style:none; }\n",
    ".menu-item { list-style:none; }\n.global-nav .menu-item, .footer-nav .menu-item { display:contents; }\n"
  );
  if (relative === "functions.php") {
    content = content.replace(
      "require_once get_template_directory() . '/inc/acf.php';",
      "require_once get_template_directory() . '/inc/admin.php';"
    );
  }
  if (relative === "inc/helpers.php") {
    content = content.replace(
      /function yg_field[\s\S]*?(?=function yg_option)/,
      `function yg_field(string $name, $default = '', $post_id = false) {
    $settings = get_option('yg_settings', []);
    if (is_array($settings) && array_key_exists($name, $settings) && $settings[$name] !== '') { return $settings[$name]; }
    if ($post_id !== 'option') {
        $resolved_id = $post_id ?: get_the_ID();
        if ($resolved_id) {
            $meta_value = get_post_meta((int) $resolved_id, $name, true);
            if ($meta_value !== '') { return $meta_value; }
        }
    }
    if (function_exists('get_field')) {
        $value = get_field($name, $post_id ?: get_the_ID());
        if ($value !== null && $value !== false && $value !== '') { return $value; }
    }
    return $default;
}

`
    );
    content = content.replace(
      "    return (!is_wp_error($terms) && !empty($terms)) ? $terms[0]->name : 'NEWS';",
      "    if (!is_wp_error($terms) && !empty($terms)) { return $terms[0]->name; }\n    $categories = get_the_category($post_id);\n    return !empty($categories) ? $categories[0]->name : 'NEWS';"
    );
  }
  if (relative === "inc/seed.php") {
    content = content.replace(
      /\n    if \(!get_posts\(\['post_type' => 'yamada_news'[\s\S]*?(?=\n    if \(!get_posts\(\['post_type' => 'yamada_job')/,
      "\n"
    );
    content = content.replace(
      "            if ($id && !is_wp_error($id) && function_exists('update_field')) {\n                update_field('job_code', $code, $id); update_field('job_summary', $summary, $id);\n            }",
      "            if ($id && !is_wp_error($id)) {\n                update_post_meta($id, 'job_code', $code);\n                update_post_meta($id, 'job_summary', $summary);\n                if (function_exists('update_field')) { update_field('job_code', $code, $id); update_field('job_summary', $summary, $id); }\n            }"
    );
  }
  if (relative.startsWith("template-parts/home/") || relative.startsWith("template-parts/news/")) {
    content = content.replaceAll("'post_type' => 'yamada_news'", "'post_type' => ['yamada_news', 'post']");
  }
  if (relative === "README.md") {
    content = content.replace("## 必須・推奨プラグイン", "## 推奨プラグイン");
    content = content.replace("- Advanced Custom Fields PRO（共通設定・トップ・募集条件）\n", "");
    content = content.replace("3. ACF PRO と Contact Form 7 を有効化", "3. Contact Form 7 を有効化");
  }
  fs.writeFileSync(target, content);
}

function extractMain(html) {
  const match = html.match(/<main>[\s\S]*?<\/main>/);
  if (!match) throw new Error("<main> not found");
  return match[0];
}

function replaceRange(source, start, end, replacement) {
  const a = source.indexOf(start);
  const b = source.indexOf(end, a + start.length);
  if (a < 0 || b < 0) throw new Error(`Range not found: ${start} -> ${end}`);
  return source.slice(0, a) + replacement + source.slice(b);
}

function wordpressify(html) {
  const links = {
    "index.html": "/",
    "company.html": "/company/",
    "safety.html": "/safety/",
    "logistics.html": "/logistics/",
    "office.html": "/office/",
    "group.html": "/group/",
    "news.html": "/news/",
    "recruit.html": "/recruit/",
    "contact.html": "/contact/",
  };

  html = html.replace(/(src|data-hero-preview)="assets\/([^"]+)"/g, (_m, attr, asset) =>
    `${attr}="<?php echo esc_url(yg_asset('${asset}')); ?>"`
  );
  html = html.replace(/href="([a-z-]+\.html)(#[^"]+)?"/g, (_m, file, hash = "") => {
    const url = links[file];
    return url ? `href="<?php echo esc_url(home_url('${url}${hash}')); ?>"` : _m;
  });
  return html;
}

function phpPage(main) {
  return `<?php\n/** Generated from the approved Vercel design. */\nget_header();\n?>\n${wordpressify(main)}\n<?php get_footer(); ?>\n`;
}

fs.mkdirSync(theme, { recursive: true });
fs.cpSync(path.join(root, "assets"), path.join(theme, "assets"), { recursive: true });

for (const [sourceName, targetName] of Object.entries(pages)) {
  const source = fs.readFileSync(path.join(root, `${sourceName}.html`), "utf8");
  let main = extractMain(source);

  if (sourceName === "index") {
    main = replaceRange(main, '    <section class="news-flash"', '    <section class="section message"', `    <?php get_template_part('template-parts/home/latest-news'); ?>\n\n`);
    main = replaceRange(main, '    <section class="section news-list-section"', '    <section class="recruit recruit-stories"', `    <?php get_template_part('template-parts/home/news-list'); ?>\n\n`);
    main = main.replace('<p class="hero-intro">私たちは、物流のその先へ</p>', '<p class="hero-intro"><?php echo esc_html(yg_field(\'hero_intro\', \'私たちは、物流のその先へ\')); ?></p>');
    main = main.replace('<h1><span>物流を起点に、</span><em>企業の未来をひらく。</em></h1>', '<h1><span><?php echo esc_html(yg_field(\'hero_title_1\', \'物流を起点に、\')); ?></span><em><?php echo esc_html(yg_field(\'hero_title_2\', \'企業の未来をひらく。\')); ?></em></h1>');
    main = main.replace('<p class="hero-lead">物流・オフィス・デジタル・採用。地域に根ざした実行力で、企業の成長を一気通貫で支えます。</p>', '<p class="hero-lead"><?php echo esc_html(yg_field(\'hero_lead\', \'物流・オフィス・デジタル・採用。地域に根ざした実行力で、企業の成長を一気通貫で支えます。\')); ?></p>');
    main = main.replace('src="assets/images/hero-city-network.webp"', 'src="<?php echo esc_url(yg_image_url(\'hero_image\', yg_asset(\'images/hero-city-network.webp\'))); ?>"');
    main = main.replace('<strong>100<em>名</em></strong>', `<strong><?php echo esc_html(yg_option('employees', '${defaults.employees}')); ?><em>名</em></strong>`);
    main = main.replace('<strong>50<em>台</em></strong>', `<strong><?php echo esc_html(yg_option('vehicles', '${defaults.vehicles}')); ?><em>台</em></strong>`);
    main = main.replace('<strong>500<em>社+</em></strong>', `<strong><?php echo esc_html(yg_option('clients', '${defaults.clients}')); ?><em>社+</em></strong>`);
    main = main.replace('<span>東京本社</span><span>埼玉本社（春日部支店）</span><span>茨城支店</span>', `<span><?php echo esc_html(yg_option('tokyo_name', '${defaults.tokyo_name}')); ?></span><span><?php echo esc_html(yg_option('saitama_name', '${defaults.saitama_name}')); ?>（<?php echo esc_html(yg_option('saitama_note', '${defaults.saitama_note}')); ?>）</span><span><?php echo esc_html(yg_option('ibaraki_name', '${defaults.ibaraki_name}')); ?></span>`);
  }

  if (sourceName === "news") {
    main = replaceRange(main, '    <section class="section news-archive"', '    <section class="sub-cta"', `    <?php get_template_part('template-parts/news/archive-list'); ?>\n\n`);
  }

  if (sourceName === "recruit") {
    main = replaceRange(main, '    <section class="section job-section"', '    <section class="section requirements-section"', `    <?php get_template_part('template-parts/recruit/job-cards'); ?>\n\n`);
    main = replaceRange(main, '    <section class="section requirements-section"', '    <section class="section benefit-section"', `    <?php get_template_part('template-parts/recruit/requirements'); ?>\n\n`);
  }

  if (sourceName === "contact") {
    const start = '      <form class="contact-form reveal"';
    const end = '    </div></section>';
    const a = main.indexOf(start);
    const b = main.indexOf(end, a);
    if (a < 0 || b < 0) throw new Error("Contact form range not found");
    const form = `      <div class="contact-form reveal wp-contact-form">\n        <?php $shortcode = yg_field('contact_form_shortcode', '', get_the_ID()); ?>\n        <?php if ($shortcode) : ?>\n          <?php echo do_shortcode(wp_kses_post($shortcode)); ?>\n        <?php else : ?>\n          <p class="form-setup-note">管理画面の「お問い合わせフォーム」欄に、Contact Form 7のショートコードを設定してください。</p>\n        <?php endif; ?>\n      </div>\n`;
    main = main.slice(0, a) + form + main.slice(b);
  }

  if (sourceName === "company") {
    main = main.replace('<div><dt>会社名</dt><dd>山田運輸有限会社</dd></div>', `<div><dt>会社名</dt><dd><?php echo esc_html(yg_option('company_name', '${defaults.company_name}')); ?></dd></div>`);
    main = main.replace('<div><dt>代表者</dt><dd>代表取締役 山田 恭輔</dd></div>', `<div><dt>代表者</dt><dd><?php echo esc_html(yg_option('representative', '${defaults.representative}')); ?></dd></div>`);
    main = main.replace('<span><b>東京本社</b><i>〒110-0015 東京都台東区東上野1-12-2 THE GATE UENO 4F</i></span>', `<span><b><?php echo esc_html(yg_option('tokyo_name', '${defaults.tokyo_name}')); ?></b><i><?php echo esc_html(yg_option('tokyo_address', '${defaults.tokyo_address}')); ?></i></span>`);
    main = main.replace('<span><b>埼玉本社</b><i>春日部支店　〒344-0038 埼玉県春日部市大沼7-50</i></span>', `<span><b><?php echo esc_html(yg_option('saitama_name', '${defaults.saitama_name}')); ?></b><i><?php echo esc_html(yg_option('saitama_note', '${defaults.saitama_note}')); ?>　<?php echo esc_html(yg_option('saitama_address', '${defaults.saitama_address}')); ?></i></span>`);
    main = main.replace('<span><b>茨城支店</b><i>〒300-2505 茨城県常総市中妻町3970-1</i></span>', `<span><b><?php echo esc_html(yg_option('ibaraki_name', '${defaults.ibaraki_name}')); ?></b><i><?php echo esc_html(yg_option('ibaraki_address', '${defaults.ibaraki_address}')); ?></i></span>`);
    main = main.replace('<div><dt>春日部支店 TEL / FAX</dt><dd>048-878-9116 / 048-878-9117</dd></div>', `<div><dt><?php echo esc_html(yg_option('saitama_note', '${defaults.saitama_note}')); ?> TEL / FAX</dt><dd><?php echo esc_html(yg_option('tel', '${defaults.tel}')); ?> / <?php echo esc_html(yg_option('fax', '${defaults.fax}')); ?></dd></div>`);
    main = main.replace('<div><dt>グループ従業員</dt><dd>100名（2026年10月現在）</dd></div>', `<div><dt>グループ従業員</dt><dd><?php echo esc_html(yg_option('employees', '${defaults.employees}')); ?>名（<?php echo esc_html(yg_option('profile_updated', '2026年10月')); ?>現在）</dd></div>`);
    main = main.replace('<div><dt>保有車両</dt><dd>50台（2026年10月現在）</dd></div>', `<div><dt>保有車両</dt><dd><?php echo esc_html(yg_option('vehicles', '${defaults.vehicles}')); ?>台（<?php echo esc_html(yg_option('profile_updated', '2026年10月')); ?>現在）</dd></div>`);
  }

  write(targetName, phpPage(main));
}

write("style.css", `/*\nTheme Name: YAMADA GROUP\nTheme URI: https://yamadaunyu.co.jp/\nAuthor: YAMADA GROUP\nDescription: 山田グループ公式サイト専用のオリジナルWordPressテーマ。\nVersion: 1.0.0\nRequires at least: 6.4\nRequires PHP: 8.0\nText Domain: yamada-group\n*/\n`);

write("functions.php", `<?php\nif (!defined('ABSPATH')) { exit; }\nrequire_once get_template_directory() . '/inc/helpers.php';\nrequire_once get_template_directory() . '/inc/setup.php';\nrequire_once get_template_directory() . '/inc/content-types.php';\nrequire_once get_template_directory() . '/inc/acf.php';\nrequire_once get_template_directory() . '/inc/seed.php';\n`);

write("inc/helpers.php", `<?php\nif (!defined('ABSPATH')) { exit; }\n\nfunction yg_asset(string $path): string {\n    return trailingslashit(get_template_directory_uri()) . 'assets/' . ltrim($path, '/');\n}\n\nfunction yg_field(string $name, $default = '', $post_id = false) {\n    if (function_exists('get_field')) {\n        $value = get_field($name, $post_id ?: get_the_ID());\n        if ($value !== null && $value !== false && $value !== '') { return $value; }\n    }\n    return $default;\n}\n\nfunction yg_option(string $name, $default = '') {\n    return yg_field($name, $default, 'option');\n}\n\nfunction yg_image_url(string $name, string $default, $post_id = false): string {\n    $value = yg_field($name, '', $post_id ?: get_the_ID());\n    if (is_array($value) && !empty($value['url'])) { return $value['url']; }\n    if (is_numeric($value)) {\n        $url = wp_get_attachment_image_url((int) $value, 'full');\n        if ($url) { return $url; }\n    }\n    if (is_string($value) && $value !== '') { return $value; }\n    return $default;\n}\n\nfunction yg_page_url(string $slug = ''): string {\n    return home_url($slug ? '/' . trim($slug, '/') . '/' : '/');\n}\n\nfunction yg_news_category_label(int $post_id): string {\n    $terms = get_the_terms($post_id, 'yamada_news_category');\n    return (!is_wp_error($terms) && !empty($terms)) ? $terms[0]->name : 'NEWS';\n}\n`);

write("inc/setup.php", `<?php\nif (!defined('ABSPATH')) { exit; }\n\nadd_action('after_setup_theme', function (): void {\n    add_theme_support('title-tag');\n    add_theme_support('post-thumbnails');\n    add_theme_support('html5', ['search-form', 'gallery', 'caption', 'style', 'script']);\n    register_nav_menus(['primary' => 'メインメニュー', 'footer' => 'フッターメニュー']);\n});\n\nadd_action('wp_enqueue_scripts', function (): void {\n    $version = wp_get_theme()->get('Version');\n    wp_enqueue_style('yamada-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&family=Noto+Serif+JP:wght@400;500;600;700;900&display=swap', [], null);\n    wp_enqueue_style('yamada-main', yg_asset('css/style.css'), ['yamada-fonts'], $version);\n    wp_enqueue_style('yamada-wordpress', yg_asset('css/wordpress.css'), ['yamada-main'], $version);\n    wp_enqueue_script('yamada-main', yg_asset('js/main.js'), [], $version, true);\n});\n\nadd_filter('script_loader_tag', function (string $tag, string $handle): string {\n    return $handle === 'yamada-main' ? str_replace(' src=', ' defer src=', $tag) : $tag;\n}, 10, 2);\n\nadd_filter('body_class', function (array $classes): array {\n    if (!is_front_page()) { $classes[] = 'subpage'; }\n    return $classes;\n});\n\nfunction yg_primary_nav_fallback(): void {\n    $items = [\n        'company' => '山田運輸について',\n        'safety' => '取り組み',\n        'logistics' => '事業内容',\n        'news' => 'お知らせ',\n        'recruit' => '採用情報',\n    ];\n    foreach ($items as $slug => $label) { printf('<a href="%s">%s</a>', esc_url(yg_page_url($slug)), esc_html($label)); }\n    printf('<a class="nav-contact" href="%s">お問い合わせ</a>', esc_url(yg_page_url('contact')));\n}\n\nfunction yg_footer_nav_fallback(): void {\n    $items = ['company' => '私たちについて', 'safety' => '取り組み', 'logistics' => '事業内容', 'news' => 'お知らせ', 'recruit' => '採用情報', 'contact' => 'お問い合わせ'];\n    foreach ($items as $slug => $label) { printf('<a href="%s">%s</a>', esc_url(yg_page_url($slug)), esc_html($label)); }\n}\n`);

write("inc/content-types.php", `<?php\nif (!defined('ABSPATH')) { exit; }\n\nadd_action('init', function (): void {\n    register_post_type('yamada_news', [\n        'labels' => ['name' => 'お知らせ', 'singular_name' => 'お知らせ', 'add_new_item' => 'お知らせを追加', 'edit_item' => 'お知らせを編集'],\n        'public' => true, 'show_in_rest' => true, 'menu_icon' => 'dashicons-megaphone',\n        'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],\n        'rewrite' => ['slug' => 'news-detail', 'with_front' => false], 'has_archive' => false,\n    ]);\n    register_taxonomy('yamada_news_category', ['yamada_news'], [\n        'labels' => ['name' => 'お知らせカテゴリ'], 'public' => true, 'show_in_rest' => true,\n        'hierarchical' => false, 'rewrite' => ['slug' => 'news-category'],\n    ]);\n    register_post_type('yamada_job', [\n        'labels' => ['name' => '募集職種', 'singular_name' => '募集職種', 'add_new_item' => '募集職種を追加', 'edit_item' => '募集職種を編集'],\n        'public' => true, 'show_in_rest' => true, 'menu_icon' => 'dashicons-businessperson',\n        'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'page-attributes'],\n        'rewrite' => ['slug' => 'jobs', 'with_front' => false], 'has_archive' => false,\n    ]);\n});\n`);

write("inc/acf.php", `<?php\nif (!defined('ABSPATH')) { exit; }\n\nadd_action('admin_notices', function (): void {\n    if (!current_user_can('activate_plugins') || function_exists('get_field')) { return; }\n    echo '<div class="notice notice-warning"><p><strong>YAMADA GROUPテーマ:</strong> 管理画面から会社情報を編集するには Advanced Custom Fields PRO を有効化してください。テーマは未導入でも初期値で表示されます。</p></div>';\n});\n\nadd_action('acf/init', function (): void {\n    if (!function_exists('acf_add_local_field_group')) { return; }\n    if (function_exists('acf_add_options_page')) {\n        acf_add_options_page(['page_title' => '山田グループ共通設定', 'menu_title' => '山田グループ設定', 'menu_slug' => 'yamada-group-settings', 'capability' => 'manage_options', 'redirect' => false, 'icon_url' => 'dashicons-building']);\n    }\n\n    $text = fn(string $key, string $label, string $name, string $default = ''): array => ['key' => $key, 'label' => $label, 'name' => $name, 'type' => 'text', 'default_value' => $default];\n    acf_add_local_field_group([\n        'key' => 'group_yamada_options', 'title' => '会社・拠点情報',\n        'fields' => [\n            $text('field_company_name', '会社名', 'company_name', '山田運輸有限会社'),\n            $text('field_representative', '代表者', 'representative', '代表取締役 山田 恭輔'),\n            $text('field_tokyo_name', '東京拠点名', 'tokyo_name', '東京本社'),\n            $text('field_tokyo_address', '東京本社住所', 'tokyo_address', '〒110-0015 東京都台東区東上野1-12-2 THE GATE UENO 4F'),\n            $text('field_saitama_name', '埼玉拠点名', 'saitama_name', '埼玉本社'),\n            $text('field_saitama_note', '埼玉拠点補足', 'saitama_note', '春日部支店'),\n            $text('field_saitama_address', '埼玉本社住所', 'saitama_address', '〒344-0038 埼玉県春日部市大沼7-50'),\n            $text('field_ibaraki_name', '茨城拠点名', 'ibaraki_name', '茨城支店'),\n            $text('field_ibaraki_address', '茨城支店住所', 'ibaraki_address', '〒300-2505 茨城県常総市中妻町3970-1'),\n            $text('field_tel', '電話番号', 'tel', '048-878-9116'),\n            $text('field_fax', 'FAX番号', 'fax', '048-878-9117'),\n            $text('field_employees', 'グループ従業員数', 'employees', '100'),\n            $text('field_vehicles', '保有車両数', 'vehicles', '50'),\n            $text('field_clients', '取引企業実績', 'clients', '500'),\n            $text('field_profile_updated', '人数・車両の更新年月', 'profile_updated', '2026年10月'),\n            ['key' => 'field_instagram', 'label' => 'Instagram URL', 'name' => 'instagram_url', 'type' => 'url', 'default_value' => 'https://www.instagram.com/ymd_transport/'],\n            ['key' => 'field_marutto', 'label' => 'まるっと便 URL', 'name' => 'marutto_url', 'type' => 'url', 'default_value' => 'https://www.office-marutto.com/'],\n        ],\n        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'yamada-group-settings']]],\n    ]);\n\n    acf_add_local_field_group([\n        'key' => 'group_yamada_home', 'title' => 'トップページ設定',\n        'fields' => [\n            ['key' => 'field_hero_image', 'label' => 'メイン画像', 'name' => 'hero_image', 'type' => 'image', 'return_format' => 'array', 'preview_size' => 'medium'],\n            $text('field_hero_intro', '導入文', 'hero_intro', '私たちは、物流のその先へ'),\n            $text('field_hero_title_1', 'メインコピー1行目', 'hero_title_1', '物流を起点に、'),\n            $text('field_hero_title_2', 'メインコピー2行目', 'hero_title_2', '企業の未来をひらく。'),\n            ['key' => 'field_hero_lead', 'label' => 'リード文', 'name' => 'hero_lead', 'type' => 'textarea', 'rows' => 3, 'default_value' => '物流・オフィス・デジタル・採用。地域に根ざした実行力で、企業の成長を一気通貫で支えます。'],\n        ],\n        'location' => [[['param' => 'page_type', 'operator' => '==', 'value' => 'front_page']]],\n    ]);\n\n    acf_add_local_field_group([\n        'key' => 'group_yamada_job', 'title' => '募集条件',\n        'fields' => [\n            $text('field_job_code', '表示コード', 'job_code', '4t'),\n            $text('field_job_summary', '短い説明', 'job_summary'),\n            $text('field_job_employment', '雇用形態', 'job_employment', '正社員 / アルバイト・パート'),\n            ['key' => 'field_job_salary', 'label' => '給与', 'name' => 'job_salary', 'type' => 'textarea', 'rows' => 3],\n            $text('field_job_location', '勤務地', 'job_location', '埼玉県春日部市大沼7-50'),\n            $text('field_job_qualification', '応募資格', 'job_qualification', '中型免許または普通免許'),\n            $text('field_job_holidays', '休日', 'job_holidays', '月4日〜8日（会社カレンダーによる）'),\n            $text('field_job_hours', '勤務時間', 'job_hours', 'コース・運行シフトによる（実働8時間）'),\n            ['key' => 'field_job_benefits', 'label' => '待遇', 'name' => 'job_benefits', 'type' => 'textarea', 'rows' => 3],\n        ],\n        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'yamada_job']]],\n    ]);\n\n    acf_add_local_field_group([\n        'key' => 'group_yamada_contact', 'title' => 'お問い合わせフォーム',\n        'fields' => [['key' => 'field_contact_form_shortcode', 'label' => 'Contact Form 7 ショートコード', 'name' => 'contact_form_shortcode', 'type' => 'text', 'instructions' => '例: [contact-form-7 id="123" title="お問い合わせ"]']],\n        'location' => [[['param' => 'page', 'operator' => '==', 'value' => 'contact']]],\n    ]);\n});\n`);

write("inc/seed.php", `<?php\nif (!defined('ABSPATH')) { exit; }\n\nadd_action('after_switch_theme', function (): void {\n    $pages = ['home' => 'ホーム', 'company' => '山田運輸について', 'safety' => '取り組み', 'logistics' => '事業内容', 'office' => 'オフィスソリューション', 'group' => 'グループソリューション', 'news' => 'お知らせ', 'recruit' => '採用情報', 'contact' => 'お問い合わせ'];\n    $ids = [];\n    foreach ($pages as $slug => $title) {\n        $existing = get_page_by_path($slug);\n        $ids[$slug] = $existing ? $existing->ID : wp_insert_post(['post_type' => 'page', 'post_status' => 'publish', 'post_title' => $title, 'post_name' => $slug]);\n    }\n    if (!empty($ids['home']) && !is_wp_error($ids['home'])) {\n        update_option('show_on_front', 'page');\n        update_option('page_on_front', (int) $ids['home']);\n    }\n\n    if (!get_posts(['post_type' => 'yamada_news', 'numberposts' => 1, 'post_status' => 'any'])) {\n        $samples = [\n            ['2026-05-20', 'RECRUIT', 'つくば周辺に新拠点を開設。ドライバー・業務委託の募集を開始しました。'],\n            ['2026-04-01', 'SERVICE', 'オフィスソリューション事業に「まるっと施工」を追加しました。'],\n            ['2026-01-05', 'COMPANY', 'グループ企業との連携体制を強化しました。'],\n        ];\n        foreach ($samples as [$date, $category, $title]) {\n            $id = wp_insert_post(['post_type' => 'yamada_news', 'post_status' => 'publish', 'post_title' => $title, 'post_date' => $date . ' 09:00:00', 'post_content' => $title]);\n            if ($id && !is_wp_error($id)) { wp_set_object_terms($id, $category, 'yamada_news_category'); }\n        }\n    }\n\n    if (!get_posts(['post_type' => 'yamada_job', 'numberposts' => 1, 'post_status' => 'any'])) {\n        $jobs = [\n            ['夜間ルート配送', '4t', '決まったルートを中心とした夜間配送。0:00〜10:00を基本とするコースです。'],\n            ['企業向け集配', '4t', '法人のお客様への集荷・配送。6:00〜16:00を基本とするコースです。'],\n            ['アパレル店舗配送', '2t', '1日数件程度の店舗配送。女性ドライバーも活躍しています。'],\n            ['センター間配送', '4t', '自社倉庫を起点としたセンター間配送。運行シフトはコースにより異なります。'],\n        ];\n        foreach ($jobs as [$title, $code, $summary]) {\n            $id = wp_insert_post(['post_type' => 'yamada_job', 'post_status' => 'publish', 'post_title' => $title, 'post_excerpt' => $summary]);\n            if ($id && !is_wp_error($id) && function_exists('update_field')) {\n                update_field('job_code', $code, $id); update_field('job_summary', $summary, $id);\n            }\n        }\n    }\n    flush_rewrite_rules();\n});\n`);

write("header.php", `<!DOCTYPE html>\n<html <?php language_attributes(); ?>>\n<head>\n  <meta charset="<?php bloginfo('charset'); ?>">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="theme-color" content="#ffffff">\n  <?php wp_head(); ?>\n</head>\n<body <?php body_class(); ?>>\n<?php wp_body_open(); ?>\n<header class="site-header" id="header">\n  <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="YAMADA GROUP トップへ">\n    <img class="brand-mark" src="<?php echo esc_url(yg_asset('images/logo-mark.png')); ?>" alt="" width="54" height="54">\n    <span class="brand-copy"><b><span class="brand-yamada">YAMADA</span><span class="brand-group">GROUP</span></b><small><span class="brand-for">for</span><span class="brand-company"><?php echo esc_html(yg_option('company_name', '山田運輸有限会社')); ?></span><span class="brand-since">SINCE 1977</span></small></span>\n  </a>\n  <nav class="global-nav" id="global-nav" aria-label="メインメニュー">\n    <?php wp_nav_menu(['theme_location' => 'primary', 'container' => false, 'items_wrap' => '%3$s', 'fallback_cb' => 'yg_primary_nav_fallback']); ?>\n  </nav>\n  <button class="menu-button" id="menu-button" type="button" aria-label="メニューを開く" aria-controls="global-nav" aria-expanded="false"><span></span><span></span><span></span></button>\n</header>\n`);

write("footer.php", `<?php\n+$tel = yg_option('tel', '048-878-9116');\n+$fax = yg_option('fax', '048-878-9117');\n+$tel_link = preg_replace('/[^0-9+]/', '', $tel);\n+?>\n<footer class="site-footer">\n  <div class="shell footer-top">\n    <a class="brand footer-brand" href="<?php echo esc_url(home_url('/')); ?>">\n      <img class="brand-mark" src="<?php echo esc_url(yg_asset('images/logo-mark.png')); ?>" alt="" width="54" height="54">\n      <span class="brand-copy"><b><span class="brand-yamada">YAMADA</span><span class="brand-group">GROUP</span></b><small><span class="brand-for">for</span><span class="brand-company"><?php echo esc_html(yg_option('company_name', '山田運輸有限会社')); ?></span><span class="brand-since">SINCE 1977</span></small></span>\n    </a>\n    <div class="footer-address"><b><?php echo esc_html(yg_option('saitama_name', '埼玉本社')); ?>（<?php echo esc_html(yg_option('saitama_note', '春日部支店')); ?>）</b><br><?php echo esc_html(yg_option('saitama_address', '〒344-0038 埼玉県春日部市大沼7-50')); ?><br><span><?php echo esc_html(yg_option('saitama_note', '春日部支店')); ?> TEL&nbsp;<?php echo esc_html($tel); ?> ／ FAX&nbsp;<?php echo esc_html($fax); ?></span></div>\n    <nav class="footer-nav" aria-label="フッターメニュー"><?php wp_nav_menu(['theme_location' => 'footer', 'container' => false, 'items_wrap' => '%3$s', 'fallback_cb' => 'yg_footer_nav_fallback']); ?></nav>\n  </div>\n  <div class="shell footer-bottom"><span>© 1977–<?php echo esc_html(wp_date('Y')); ?> YAMADA TRANSPORT CO., LTD.</span><span>KASUKABE, SAITAMA / SINCE 1977</span></div>\n</footer>\n<aside class="floating-links<?php echo is_front_page() ? ' is-over-hero' : ''; ?>" aria-label="関連サイト">\n  <a class="floating-link floating-instagram" href="<?php echo esc_url(yg_option('instagram_url', 'https://www.instagram.com/ymd_transport/')); ?>" target="_blank" rel="noopener noreferrer"><span class="instagram-mark" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25"></rect><circle cx="12" cy="12" r="4.15"></circle><circle class="instagram-dot" cx="17.45" cy="6.65" r="1.15"></circle></svg></span><span class="floating-link-copy"><small>FOLLOW US</small><strong>Instagram</strong></span><span class="floating-link-arrow" aria-hidden="true">↗</span></a>\n  <a class="floating-link floating-office" href="<?php echo esc_url(yg_option('marutto_url', 'https://www.office-marutto.com/')); ?>" target="_blank" rel="noopener noreferrer"><span class="floating-link-copy office-marutto-copy"><small>オフィス移転・不用品回収の事なら</small><strong>オフィスまるっと便</strong></span><span class="floating-link-arrow" aria-hidden="true">↗</span></a>\n</aside>\n<button class="page-top" id="page-top" type="button" aria-label="ページ上部へ">↑</button>\n<?php wp_footer(); ?>\n</body>\n</html>\n`);

write("template-parts/home/latest-news.php", `<?php\n+$latest = new WP_Query(['post_type' => 'yamada_news', 'posts_per_page' => 1, 'post_status' => 'publish']);\n+?>\n<section class="news-flash" id="news" aria-labelledby="news-title">\n+  <div class="shell news-flash-inner">\n+    <div class="news-label"><span>NEWS</span><a href="<?php echo esc_url(yg_page_url('news')); ?>">VIEW ALL</a></div>\n+    <?php if ($latest->have_posts()) : $latest->the_post(); ?>\n+      <a class="news-latest" href="<?php the_permalink(); ?>"><time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('Y.m.d')); ?></time><span class="news-category"><?php echo esc_html(yg_news_category_label(get_the_ID())); ?></span><strong id="news-title"><?php the_title(); ?></strong><span class="round-arrow" aria-hidden="true">→</span></a>\n+    <?php else : ?><p>現在お知らせはありません。</p><?php endif; wp_reset_postdata(); ?>\n+  </div>\n+</section>\n`);

write("template-parts/home/news-list.php", `<?php $news = new WP_Query(['post_type' => 'yamada_news', 'posts_per_page' => 3, 'post_status' => 'publish']); ?>\n<section class="section news-list-section" id="news-list">\n+  <div class="shell"><div class="list-heading reveal"><div><p class="section-code">NEWS</p><h2>最新情報</h2></div><a class="text-link" href="<?php echo esc_url(yg_page_url('news')); ?>">VIEW ALL <span>→</span></a></div>\n+    <div class="news-list">\n+      <?php while ($news->have_posts()) : $news->the_post(); ?>\n+        <a href="<?php the_permalink(); ?>" class="news-item reveal"><time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('Y.m.d')); ?></time><span><?php echo esc_html(yg_news_category_label(get_the_ID())); ?></span><strong><?php the_title(); ?></strong><i>→</i></a>\n+      <?php endwhile; wp_reset_postdata(); ?>\n+    </div>\n+  </div>\n+</section>\n`);

write("template-parts/news/archive-list.php", `<?php\n+$paged = max(1, get_query_var('paged'));\n+$news = new WP_Query(['post_type' => 'yamada_news', 'posts_per_page' => 10, 'post_status' => 'publish', 'paged' => $paged]);\n+?>\n<section class="section news-archive"><div class="shell"><div class="news-list">\n+  <?php if ($news->have_posts()) : while ($news->have_posts()) : $news->the_post(); ?>\n+    <a class="news-item reveal" href="<?php the_permalink(); ?>"><time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('Y.m.d')); ?></time><span><?php echo esc_html(yg_news_category_label(get_the_ID())); ?></span><strong><?php the_title(); ?></strong><i>→</i></a>\n+  <?php endwhile; else : ?><p>現在お知らせはありません。</p><?php endif; ?>\n+</div><?php echo wp_kses_post(paginate_links(['total' => $news->max_num_pages, 'current' => $paged, 'type' => 'list'])); wp_reset_postdata(); ?></div></section>\n`);

write("template-parts/recruit/job-cards.php", `<?php $jobs = new WP_Query(['post_type' => 'yamada_job', 'posts_per_page' => -1, 'orderby' => ['menu_order' => 'ASC', 'date' => 'ASC']]); ?>\n<section class="section job-section"><div class="shell"><header class="section-heading reveal"><p class="section-code">OPEN POSITIONS</p><h2>募集職種</h2><p>2t・4tドライバーを中心に、複数の配送コースがあります。</p></header><div class="job-card-grid">\n+<?php $index = 0; while ($jobs->have_posts()) : $jobs->the_post(); $index++; ?>\n+  <a class="job-card reveal" href="#job-<?php echo esc_attr(get_the_ID()); ?>"><small><?php echo esc_html(sprintf('%02d', $index)); ?> / <?php echo esc_html(yg_field('job_code', '')); ?></small><h3><?php the_title(); ?></h3><p><?php echo esc_html(yg_field('job_summary', get_the_excerpt())); ?></p></a>\n+<?php endwhile; wp_reset_postdata(); ?>\n+</div></div></section>\n`);

write("template-parts/recruit/requirements.php", `<?php $jobs = new WP_Query(['post_type' => 'yamada_job', 'posts_per_page' => -1, 'orderby' => ['menu_order' => 'ASC', 'date' => 'ASC']]); ?>\n<section class="section requirements-section"><div class="shell"><header class="section-heading reveal"><p class="section-code">REQUIREMENTS</p><h2>募集要項</h2><p>仕事内容の詳細は面接時にご説明します。ご自身に合うコースをご相談ください。</p></header><div class="job-requirements-list">\n+<?php while ($jobs->have_posts()) : $jobs->the_post(); ?>\n+  <article class="job-requirement reveal" id="job-<?php echo esc_attr(get_the_ID()); ?>"><h3><?php the_title(); ?></h3><dl class="profile-table">\n+    <div><dt>雇用形態</dt><dd><?php echo esc_html(yg_field('job_employment', '正社員 / アルバイト・パート')); ?></dd></div>\n+    <div><dt>給与</dt><dd><?php echo nl2br(esc_html(yg_field('job_salary', '経験・能力・コース・業務内容によります。'))); ?></dd></div>\n+    <div><dt>勤務地</dt><dd><?php echo esc_html(yg_field('job_location', '埼玉県春日部市大沼7-50')); ?></dd></div>\n+    <div><dt>応募資格</dt><dd><?php echo esc_html(yg_field('job_qualification', '中型免許または普通免許')); ?></dd></div>\n+    <div><dt>休日</dt><dd><?php echo esc_html(yg_field('job_holidays', '月4日〜8日（会社カレンダーによる）')); ?></dd></div>\n+    <div><dt>勤務時間</dt><dd><?php echo esc_html(yg_field('job_hours', 'コース・運行シフトによる（実働8時間）')); ?></dd></div>\n+    <div><dt>待遇</dt><dd><?php echo nl2br(esc_html(yg_field('job_benefits', '交通費支給、マイカー通勤可、社会保険完備'))); ?></dd></div>\n+  </dl></article>\n+<?php endwhile; wp_reset_postdata(); ?>\n+</div></div></section>\n`);

write("single-yamada_news.php", `<?php get_header(); ?>\n<main><section class="subhero subhero-compact"><div class="subhero-shade"></div><div class="shell subhero-content"><p class="subhero-code">NEWS</p><h1>お知らせ</h1></div></section><nav class="breadcrumb shell"><a href="<?php echo esc_url(home_url('/')); ?>">TOP</a><span>／</span><a href="<?php echo esc_url(yg_page_url('news')); ?>">お知らせ</a><span>／</span><span><?php the_title(); ?></span></nav><article class="section single-news"><div class="shell single-news-inner"><?php while (have_posts()) : the_post(); ?><div class="single-news-meta"><time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('Y.m.d')); ?></time><span><?php echo esc_html(yg_news_category_label(get_the_ID())); ?></span></div><h1><?php the_title(); ?></h1><div class="entry-content"><?php the_content(); ?></div><?php endwhile; ?><a class="text-link" href="<?php echo esc_url(yg_page_url('news')); ?>">お知らせ一覧へ <span>→</span></a></div></article></main>\n<?php get_footer(); ?>\n`);

write("single-yamada_job.php", `<?php get_header(); ?>\n<main><section class="subhero subhero-compact"><div class="subhero-shade"></div><div class="shell subhero-content"><p class="subhero-code">RECRUIT</p><h1><?php the_title(); ?></h1></div></section><nav class="breadcrumb shell"><a href="<?php echo esc_url(home_url('/')); ?>">TOP</a><span>／</span><a href="<?php echo esc_url(yg_page_url('recruit')); ?>">採用情報</a><span>／</span><span><?php the_title(); ?></span></nav><section class="section requirements-section"><div class="shell company-profile-grid"><div class="company-profile-title"><p class="section-code">REQUIREMENTS</p><h2><?php the_title(); ?></h2></div><dl class="profile-table"><?php while (have_posts()) : the_post(); ?><div><dt>雇用形態</dt><dd><?php echo esc_html(yg_field('job_employment', '')); ?></dd></div><div><dt>給与</dt><dd><?php echo nl2br(esc_html(yg_field('job_salary', ''))); ?></dd></div><div><dt>勤務地</dt><dd><?php echo esc_html(yg_field('job_location', '')); ?></dd></div><div><dt>応募資格</dt><dd><?php echo esc_html(yg_field('job_qualification', '')); ?></dd></div><div><dt>休日</dt><dd><?php echo esc_html(yg_field('job_holidays', '')); ?></dd></div><div><dt>勤務時間</dt><dd><?php echo esc_html(yg_field('job_hours', '')); ?></dd></div><div><dt>待遇</dt><dd><?php echo nl2br(esc_html(yg_field('job_benefits', ''))); ?></dd></div><?php endwhile; ?></dl></div></section></main>\n<?php get_footer(); ?>\n`);

write("index.php", `<?php get_header(); ?>\n<main><section class="section"><div class="shell"><h1><?php bloginfo('name'); ?></h1><?php if (have_posts()) : while (have_posts()) : the_post(); ?><article><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><?php the_excerpt(); ?></article><?php endwhile; endif; ?></div></section></main>\n<?php get_footer(); ?>\n`);

write("404.php", `<?php get_header(); ?>\n<main><section class="subhero subhero-compact"><div class="subhero-shade"></div><div class="shell subhero-content"><p class="subhero-code">404</p><h1>ページが見つかりません。</h1><p>URLをご確認いただくか、トップページへお戻りください。</p></div></section><section class="section"><div class="shell"><a class="text-link" href="<?php echo esc_url(home_url('/')); ?>">トップページへ <span>→</span></a></div></section></main>\n<?php get_footer(); ?>\n`);

write("inc/admin.php", `<?php
if (!defined('ABSPATH')) { exit; }

function yg_setting_fields(): array {
    return [
        'company_name' => ['会社名', 'text'],
        'representative' => ['代表者', 'text'],
        'tokyo_name' => ['東京拠点名', 'text'],
        'tokyo_address' => ['東京本社住所', 'text'],
        'saitama_name' => ['埼玉拠点名', 'text'],
        'saitama_note' => ['埼玉拠点補足', 'text'],
        'saitama_address' => ['埼玉本社住所', 'text'],
        'ibaraki_name' => ['茨城拠点名', 'text'],
        'ibaraki_address' => ['茨城支店住所', 'text'],
        'tel' => ['電話番号', 'text'],
        'fax' => ['FAX番号', 'text'],
        'employees' => ['グループ従業員数', 'number'],
        'vehicles' => ['保有車両数', 'number'],
        'clients' => ['取引企業実績', 'number'],
        'profile_updated' => ['人数・車両の更新年月', 'text'],
        'instagram_url' => ['Instagram URL', 'url'],
        'marutto_url' => ['まるっと便 URL', 'url'],
        'hero_image' => ['トップ・メイン画像URL', 'url'],
        'hero_intro' => ['トップ・導入文', 'text'],
        'hero_title_1' => ['トップ・メインコピー1行目', 'text'],
        'hero_title_2' => ['トップ・メインコピー2行目', 'text'],
        'hero_lead' => ['トップ・リード文', 'textarea'],
        'contact_form_shortcode' => ['Contact Form 7 ショートコード', 'text'],
    ];
}

add_action('admin_menu', function (): void {
    add_options_page('山田グループ設定', '山田グループ設定', 'manage_options', 'yamada-group-native-settings', 'yg_render_settings_page');
});

add_action('admin_init', function (): void {
    register_setting('yg_settings_group', 'yg_settings', [
        'type' => 'array',
        'default' => [],
        'sanitize_callback' => function ($input): array {
            $clean = [];
            foreach (yg_setting_fields() as $name => $definition) {
                $value = $input[$name] ?? '';
                if ($definition[1] === 'url') { $clean[$name] = esc_url_raw($value); }
                elseif ($definition[1] === 'textarea') { $clean[$name] = sanitize_textarea_field($value); }
                else { $clean[$name] = sanitize_text_field($value); }
            }
            return $clean;
        },
    ]);
});

function yg_render_settings_page(): void {
    if (!current_user_can('manage_options')) { return; }
    $values = wp_parse_args(get_option('yg_settings', []), [
        'company_name' => '山田運輸有限会社', 'representative' => '代表取締役 山田 恭輔',
        'tokyo_name' => '東京本社', 'tokyo_address' => '〒110-0015 東京都台東区東上野1-12-2 THE GATE UENO 4F',
        'saitama_name' => '埼玉本社', 'saitama_note' => '春日部支店', 'saitama_address' => '〒344-0038 埼玉県春日部市大沼7-50',
        'ibaraki_name' => '茨城支店', 'ibaraki_address' => '〒300-2505 茨城県常総市中妻町3970-1',
        'tel' => '048-878-9116', 'fax' => '048-878-9117', 'employees' => '100', 'vehicles' => '50', 'clients' => '500', 'profile_updated' => '2026年10月',
        'instagram_url' => 'https://www.instagram.com/ymd_transport/', 'marutto_url' => 'https://www.office-marutto.com/',
        'hero_image' => '', 'hero_intro' => '私たちは、物流のその先へ', 'hero_title_1' => '物流を起点に、', 'hero_title_2' => '企業の未来をひらく。',
        'hero_lead' => '物流・オフィス・デジタル・採用。地域に根ざした実行力で、企業の成長を一気通貫で支えます。', 'contact_form_shortcode' => '',
    ]);
    ?>
    <div class="wrap"><h1>山田グループ設定</h1><p>サイト全体の会社情報とトップ表示を更新できます。</p><form action="options.php" method="post">
        <?php settings_fields('yg_settings_group'); ?>
        <table class="form-table" role="presentation"><tbody>
        <?php foreach (yg_setting_fields() as $name => [$label, $type]) : ?>
            <tr><th scope="row"><label for="yg-<?php echo esc_attr($name); ?>"><?php echo esc_html($label); ?></label></th><td>
                <?php if ($type === 'textarea') : ?>
                    <textarea class="large-text" rows="4" id="yg-<?php echo esc_attr($name); ?>" name="yg_settings[<?php echo esc_attr($name); ?>]"><?php echo esc_textarea($values[$name] ?? ''); ?></textarea>
                <?php else : ?>
                    <input class="regular-text" id="yg-<?php echo esc_attr($name); ?>" name="yg_settings[<?php echo esc_attr($name); ?>]" type="<?php echo esc_attr($type); ?>" value="<?php echo esc_attr($values[$name] ?? ''); ?>">
                <?php endif; ?>
            </td></tr>
        <?php endforeach; ?>
        </tbody></table><?php submit_button('設定を保存'); ?>
    </form></div>
    <?php
}

add_action('add_meta_boxes_yamada_job', function (): void {
    add_meta_box('yg-job-details', '募集条件', 'yg_render_job_meta_box', 'yamada_job', 'normal', 'high');
});

function yg_job_fields(): array {
    return ['job_code' => '表示コード', 'job_summary' => '短い説明', 'job_employment' => '雇用形態', 'job_salary' => '給与', 'job_location' => '勤務地', 'job_qualification' => '応募資格', 'job_holidays' => '休日', 'job_hours' => '勤務時間', 'job_benefits' => '待遇'];
}

function yg_render_job_meta_box(WP_Post $post): void {
    wp_nonce_field('yg_save_job', 'yg_job_nonce');
    foreach (yg_job_fields() as $name => $label) {
        $value = get_post_meta($post->ID, $name, true);
        printf('<p><label for="%1$s"><strong>%2$s</strong></label><br><textarea class="widefat" rows="2" id="%1$s" name="%1$s">%3$s</textarea></p>', esc_attr($name), esc_html($label), esc_textarea($value));
    }
}

add_action('save_post_yamada_job', function (int $post_id): void {
    if (!isset($_POST['yg_job_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['yg_job_nonce'])), 'yg_save_job')) { return; }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) { return; }
    if (!current_user_can('edit_post', $post_id)) { return; }
    foreach (yg_job_fields() as $name => $_label) {
        if (isset($_POST[$name])) { update_post_meta($post_id, $name, sanitize_textarea_field(wp_unslash($_POST[$name]))); }
    }
});
`);

write("assets/css/wordpress.css", `/* WordPress-specific layout additions */\n.menu-item { list-style:none; }\n.global-nav .menu-item a, .footer-nav .menu-item a { display:inline-flex; }\n.form-setup-note { padding:24px; border:1px solid var(--line); color:var(--muted); background:#fff; }\n.wpcf7-form label { display:block; margin-bottom:22px; }\n.wpcf7-form-control:not(.wpcf7-submit) { width:100%; margin-top:8px; padding:15px 16px; border:1px solid var(--line); background:#fff; color:var(--navy); }\n.wpcf7-textarea { min-height:180px; resize:vertical; }\n.wpcf7-submit { width:100%; padding:18px 24px; border:0; color:#fff; background:var(--navy); cursor:pointer; }\n.job-card { color:inherit; }\n.job-requirements-list { display:grid; gap:54px; }\n.job-requirement { scroll-margin-top:110px; }\n.job-requirement h3 { margin-bottom:24px; color:var(--navy); font-family:var(--serif); font-size:clamp(1.45rem,2.5vw,2rem); }\n.single-news-inner { max-width:860px; }\n.single-news-meta { display:flex; gap:18px; color:var(--blue); font-family:var(--latin); font-size:.75rem; }\n.single-news h1 { margin-top:20px; color:var(--navy); font-size:clamp(2rem,4vw,3.2rem); line-height:1.5; }\n.entry-content { margin-top:42px; color:var(--muted); line-height:2; }\n.entry-content > * + * { margin-top:1.5em; }\n.page-numbers { display:flex; gap:8px; margin-top:38px; list-style:none; }\n.page-numbers a, .page-numbers span { min-width:40px; min-height:40px; display:grid; place-items:center; border:1px solid var(--line); }\n.page-numbers .current { color:#fff; background:var(--navy); }\n`);

write("README.md", "# YAMADA GROUP WordPress Theme\n\n承認済みのVercelプレビューをWordPress用のオリジナルテーマへ移植したものです。\n\n## 必須・推奨プラグイン\n\n- Advanced Custom Fields PRO（共通設定・トップ・募集条件）\n- Contact Form 7（お問い合わせフォーム）\n\n## 導入\n\n1. yamada-group.zip を「外観 > テーマ > 新規追加」からアップロード\n2. テーマを有効化\n3. ACF PRO と Contact Form 7 を有効化\n4. 「山田グループ設定」で会社情報を確認\n5. お問い合わせページにContact Form 7のショートコードを設定\n6. 「設定 > パーマリンク」で「変更を保存」を1回実行\n\n## 更新できる主な内容\n\n- メイン画像・トップコピー\n- 会社・拠点・電話・FAX\n- 従業員数・保有車両・取引企業実績\n- お知らせ\n- 募集職種・給与・勤務条件\n- Instagram / まるっと便リンク\n");

fs.copyFileSync(path.join(theme, "single-yamada_news.php"), path.join(theme, "single.php"));
fs.rmSync(path.join(theme, "inc", "acf.php"), { force: true });

console.log(`Theme generated: ${theme}`);
