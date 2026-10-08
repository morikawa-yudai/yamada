<?php
if (!defined('ABSPATH')) { exit; }

function yg_asset(string $path): string {
    return trailingslashit(get_template_directory_uri()) . 'assets/' . ltrim($path, '/');
}

function yg_field(string $name, $default = '', $post_id = false) {
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

function yg_option(string $name, $default = '') {
    return yg_field($name, $default, 'option');
}

function yg_image_url(string $name, string $default, $post_id = false): string {
    $value = yg_field($name, '', $post_id ?: get_the_ID());
    if (is_array($value) && !empty($value['url'])) { return $value['url']; }
    if (is_numeric($value)) {
        $url = wp_get_attachment_image_url((int) $value, 'full');
        if ($url) { return $url; }
    }
    if (is_string($value) && $value !== '') { return $value; }
    return $default;
}

function yg_page_url(string $slug = ''): string {
    return home_url($slug ? '/' . trim($slug, '/') . '/' : '/');
}

function yg_news_category_label(int $post_id): string {
    $terms = get_the_terms($post_id, 'yamada_news_category');
    if (!is_wp_error($terms) && !empty($terms)) { return $terms[0]->name; }
    $categories = get_the_category($post_id);
    return !empty($categories) ? $categories[0]->name : 'NEWS';
}
