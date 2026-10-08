<?php $jobs = new WP_Query(['post_type' => 'yamada_job', 'posts_per_page' => -1, 'orderby' => ['menu_order' => 'ASC', 'date' => 'ASC']]); ?>
<section class="section job-section"><div class="shell"><header class="section-heading reveal"><p class="section-code">OPEN POSITIONS</p><h2>募集職種</h2><p>2t・4tドライバーを中心に、複数の配送コースがあります。</p></header><div class="job-card-grid">
<?php $index = 0; while ($jobs->have_posts()) : $jobs->the_post(); $index++; ?>
  <a class="job-card reveal" href="#job-<?php echo esc_attr(get_the_ID()); ?>"><small><?php echo esc_html(sprintf('%02d', $index)); ?> / <?php echo esc_html(yg_field('job_code', '')); ?></small><h3><?php the_title(); ?></h3><p><?php echo esc_html(yg_field('job_summary', get_the_excerpt())); ?></p></a>
<?php endwhile; wp_reset_postdata(); ?>
</div></div></section>
