<?php
if (!defined('ABSPATH')) { exit; }

add_action('after_switch_theme', function (): void {
    $pages = ['home' => 'ホーム', 'company' => '山田運輸について', 'safety' => '取り組み', 'logistics' => '事業内容', 'office' => 'オフィスソリューション', 'group' => 'グループソリューション', 'news' => 'お知らせ', 'recruit' => '採用情報', 'contact' => 'お問い合わせ'];
    $ids = [];
    foreach ($pages as $slug => $title) {
        $existing = get_page_by_path($slug);
        $ids[$slug] = $existing ? $existing->ID : wp_insert_post(['post_type' => 'page', 'post_status' => 'publish', 'post_title' => $title, 'post_name' => $slug]);
    }
    if (!empty($ids['home']) && !is_wp_error($ids['home'])) {
        update_option('show_on_front', 'page');
        update_option('page_on_front', (int) $ids['home']);
    }


    if (!get_posts(['post_type' => 'yamada_job', 'numberposts' => 1, 'post_status' => 'any'])) {
        $jobs = [
            ['夜間ルート配送', '4t', '決まったルートを中心とした夜間配送。0:00〜10:00を基本とするコースです。'],
            ['企業向け集配', '4t', '法人のお客様への集荷・配送。6:00〜16:00を基本とするコースです。'],
            ['アパレル店舗配送', '2t', '1日数件程度の店舗配送。女性ドライバーも活躍しています。'],
            ['センター間配送', '4t', '自社倉庫を起点としたセンター間配送。運行シフトはコースにより異なります。'],
        ];
        foreach ($jobs as [$title, $code, $summary]) {
            $id = wp_insert_post(['post_type' => 'yamada_job', 'post_status' => 'publish', 'post_title' => $title, 'post_excerpt' => $summary]);
            if ($id && !is_wp_error($id)) {
                update_post_meta($id, 'job_code', $code);
                update_post_meta($id, 'job_summary', $summary);
                if (function_exists('update_field')) { update_field('job_code', $code, $id); update_field('job_summary', $summary, $id); }
            }
        }
    }
    flush_rewrite_rules();
});
