<?php
/**
 * Single post reading layout.
 *
 * @package ThirteenthPencilBlog
 */

$cats = get_the_category();
$primary = (!empty($cats) && !is_wp_error($cats)) ? $cats[0] : null;
?>
<article <?php post_class('tpb-single'); ?>>
  <header class="tpb-single__header">
    <?php if ($primary) : ?>
      <a class="tpb-kicker" href="<?php echo esc_url(get_category_link($primary->term_id)); ?>"><?php echo esc_html($primary->name); ?></a>
    <?php endif; ?>
    <h1 class="tpb-single__title"><?php the_title(); ?></h1>
    <?php if (has_excerpt()) : ?>
      <p class="tpb-single__deck"><?php echo esc_html(get_the_excerpt()); ?></p>
    <?php endif; ?>
    <?php tpb_single_byline(); ?>
  </header>

  <?php if (has_post_thumbnail()) : ?>
    <figure class="tpb-single__media">
      <?php the_post_thumbnail('full', ['class' => 'tpb-single__img']); ?>
      <?php if (get_the_post_thumbnail_caption()) : ?>
        <figcaption><?php echo esc_html(get_the_post_thumbnail_caption()); ?></figcaption>
      <?php endif; ?>
    </figure>
  <?php endif; ?>

  <div class="tpb-single__body entry-content" data-tpb-article>
    <?php
    the_content();
    wp_link_pages([
      'before' => '<div class="tpb-page-links">' . esc_html__('Pages:', '13thpencil-blog'),
      'after' => '</div>',
    ]);
    ?>
  </div>

  <?php tpb_share('inline'); ?>
  <?php tpb_author_bio(); ?>

  <nav class="tpb-pager" aria-label="<?php esc_attr_e('Post navigation', '13thpencil-blog'); ?>">
    <?php
    $prev = get_previous_post();
    $next = get_next_post();
    if ($prev) :
      ?>
      <a class="tpb-pager__a tpb-pager__a--prev" href="<?php echo esc_url(get_permalink($prev)); ?>">
        <span class="tpb-pager__l"><?php esc_html_e('Earlier', '13thpencil-blog'); ?></span>
        <span class="tpb-pager__t"><?php echo esc_html(get_the_title($prev)); ?> <span aria-hidden="true">←</span></span>
      </a>
    <?php else : ?>
      <span></span>
    <?php endif; ?>
    <?php if ($next) : ?>
      <a class="tpb-pager__a tpb-pager__a--next" href="<?php echo esc_url(get_permalink($next)); ?>">
        <span class="tpb-pager__l"><?php esc_html_e('Next', '13thpencil-blog'); ?></span>
        <span class="tpb-pager__t"><?php echo esc_html(get_the_title($next)); ?> <span aria-hidden="true">→</span></span>
      </a>
    <?php endif; ?>
  </nav>
</article>
