<?php
if (!defined('ABSPATH')) { exit; }

add_action('init', function (): void {
    register_post_type('yamada_news', [
        'labels' => ['name' => 'お知らせ', 'singular_name' => 'お知らせ', 'add_new_item' => 'お知らせを追加', 'edit_item' => 'お知らせを編集'],
        'public' => true, 'show_in_rest' => true, 'menu_icon' => 'dashicons-megaphone',
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],
        'rewrite' => ['slug' => 'news-detail', 'with_front' => false], 'has_archive' => false,
    ]);
    register_taxonomy('yamada_news_category', ['yamada_news'], [
        'labels' => ['name' => 'お知らせカテゴリ'], 'public' => true, 'show_in_rest' => true,
        'hierarchical' => false, 'rewrite' => ['slug' => 'news-category'],
    ]);
    register_post_type('yamada_job', [
        'labels' => ['name' => '募集職種', 'singular_name' => '募集職種', 'add_new_item' => '募集職種を追加', 'edit_item' => '募集職種を編集'],
        'public' => true, 'show_in_rest' => true, 'menu_icon' => 'dashicons-businessperson',
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'page-attributes'],
        'rewrite' => ['slug' => 'jobs', 'with_front' => false], 'has_archive' => false,
    ]);
});
