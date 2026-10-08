<?php $news = new WP_Query(['post_type' => ['yamada_news', 'post'], 'posts_per_page' => 3, 'post_status' => 'publish']); ?>
<section class="section news-list-section" id="news-list">
  <div class="shell"><div class="list-heading reveal"><div><p class="section-code">NEWS</p><h2>最新情報</h2></div><a class="text-link" href="<?php echo esc_url(yg_page_url('news')); ?>">VIEW ALL <span>→</span></a></div>
    <div class="news-list">
      <?php while ($news->have_posts()) : $news->the_post(); ?>
        <a href="<?php the_permalink(); ?>" class="news-item reveal"><time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('Y.m.d')); ?></time><span><?php echo esc_html(yg_news_category_label(get_the_ID())); ?></span><strong><?php the_title(); ?></strong><i>→</i></a>
      <?php endwhile; wp_reset_postdata(); ?>
    </div>
  </div>
</section>
