<?php
/**
 * List row — come-in / facts rhythm from the main site.
 *
 * @package ThirteenthPencilBlog
 */
?>
<article <?php post_class('tpb-list-item'); ?>>
  <time class="tpb-list-item__date" datetime="<?php echo esc_attr(get_the_date(DATE_W3C)); ?>">
    <?php echo esc_html(get_the_date('M j')); ?>
  </time>
  <div class="tpb-list-item__main">
    <h2 class="tpb-list-item__title">
      <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
    </h2>
    <?php tpb_excerpt(20); ?>
  </div>
  <a class="tpb-list-item__go" href="<?php the_permalink(); ?>" aria-label="<?php echo esc_attr(sprintf(__('Read %s', '13thpencil-blog'), get_the_title())); ?>">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 L17 7" /><path d="M10 7 H17 V14" /></svg>
  </a>
</article>
