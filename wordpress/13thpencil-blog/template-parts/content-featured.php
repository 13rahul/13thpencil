<?php
/**
 * Featured post (latest on home).
 *
 * @package ThirteenthPencilBlog
 */
?>
<article <?php post_class('tpb-featured'); ?>>
  <div class="tpb-featured__copy">
    <?php tpb_primary_category(); ?>
    <h2 class="tpb-featured__title">
      <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
    </h2>
    <?php tpb_meta_line(); ?>
    <?php tpb_excerpt(36); ?>
    <a class="tpb-read" href="<?php the_permalink(); ?>"><?php esc_html_e('Keep reading', '13thpencil-blog'); ?></a>
  </div>
  <?php if (has_post_thumbnail()) : ?>
    <a class="tpb-featured__media" href="<?php the_permalink(); ?>" tabindex="-1" aria-hidden="true">
      <?php the_post_thumbnail('large', ['class' => 'tpb-featured__img']); ?>
    </a>
  <?php endif; ?>
</article>
