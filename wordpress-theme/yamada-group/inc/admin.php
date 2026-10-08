<?php
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
