<?php $jobs = new WP_Query(['post_type' => 'yamada_job', 'posts_per_page' => -1, 'orderby' => ['menu_order' => 'ASC', 'date' => 'ASC']]); ?>
<section class="section requirements-section"><div class="shell"><header class="section-heading reveal"><p class="section-code">REQUIREMENTS</p><h2>募集要項</h2><p>仕事内容の詳細は面接時にご説明します。ご自身に合うコースをご相談ください。</p></header><div class="job-requirements-list">
<?php while ($jobs->have_posts()) : $jobs->the_post(); ?>
  <article class="job-requirement reveal" id="job-<?php echo esc_attr(get_the_ID()); ?>"><h3><?php the_title(); ?></h3><dl class="profile-table">
    <div><dt>雇用形態</dt><dd><?php echo esc_html(yg_field('job_employment', '正社員 / アルバイト・パート')); ?></dd></div>
    <div><dt>給与</dt><dd><?php echo nl2br(esc_html(yg_field('job_salary', '経験・能力・コース・業務内容によります。'))); ?></dd></div>
    <div><dt>勤務地</dt><dd><?php echo esc_html(yg_field('job_location', '埼玉県春日部市大沼7-50')); ?></dd></div>
    <div><dt>応募資格</dt><dd><?php echo esc_html(yg_field('job_qualification', '中型免許または普通免許')); ?></dd></div>
    <div><dt>休日</dt><dd><?php echo esc_html(yg_field('job_holidays', '月4日〜8日（会社カレンダーによる）')); ?></dd></div>
    <div><dt>勤務時間</dt><dd><?php echo esc_html(yg_field('job_hours', 'コース・運行シフトによる（実働8時間）')); ?></dd></div>
    <div><dt>待遇</dt><dd><?php echo nl2br(esc_html(yg_field('job_benefits', '交通費支給、マイカー通勤可、社会保険完備'))); ?></dd></div>
  </dl></article>
<?php endwhile; wp_reset_postdata(); ?>
</div></div></section>
