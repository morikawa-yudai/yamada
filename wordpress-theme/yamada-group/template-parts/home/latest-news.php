<?php
$latest = new WP_Query(['post_type' => ['yamada_news', 'post'], 'posts_per_page' => 1, 'post_status' => 'publish']);
?>
<section class="news-flash" id="news" aria-labelledby="news-title">
  <div class="shell news-flash-inner">
    <div class="news-label"><span>NEWS</span><a href="<?php echo esc_url(yg_page_url('news')); ?>">VIEW ALL</a></div>
    <?php if ($latest->have_posts()) : $latest->the_post(); ?>
      <a class="news-latest" href="<?php the_permalink(); ?>"><time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('Y.m.d')); ?></time><span class="news-category"><?php echo esc_html(yg_news_category_label(get_the_ID())); ?></span><strong id="news-title"><?php the_title(); ?></strong><span class="round-arrow" aria-hidden="true">→</span></a>
    <?php else : ?><p>現在お知らせはありません。</p><?php endif; wp_reset_postdata(); ?>
  </div>
</section>
