<?php
$paged = max(1, get_query_var('paged'));
$news = new WP_Query(['post_type' => ['yamada_news', 'post'], 'posts_per_page' => 10, 'post_status' => 'publish', 'paged' => $paged]);
?>
<section class="section news-archive"><div class="shell"><div class="news-list">
  <?php if ($news->have_posts()) : while ($news->have_posts()) : $news->the_post(); ?>
    <a class="news-item reveal" href="<?php the_permalink(); ?>"><time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('Y.m.d')); ?></time><span><?php echo esc_html(yg_news_category_label(get_the_ID())); ?></span><strong><?php the_title(); ?></strong><i>→</i></a>
  <?php endwhile; else : ?><p>現在お知らせはありません。</p><?php endif; ?>
</div><?php echo wp_kses_post(paginate_links(['total' => $news->max_num_pages, 'current' => $paged, 'type' => 'list'])); wp_reset_postdata(); ?></div></section>
