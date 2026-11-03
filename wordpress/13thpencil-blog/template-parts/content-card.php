<?php
/**
 * Blog listing card — image, date, category, read time, title, excerpt.
 *
 * @package ThirteenthPencilBlog
 */

$eager = is_int($GLOBALS['wp_query']->current_post) && (int) $GLOBALS['wp_query']->current_post < 3;
$mins = tpb_read_minutes();
$cats = get_the_category();
$cat_name = (!empty($cats) && !is_wp_error($cats)) ? $cats[0]->name : '';
$excerpt = has_excerpt() ? get_the_excerpt() : wp_strip_all_tags(get_the_content(null, false));
$excerpt = wp_trim_words($excerpt, 18, '…');
?>
<article <?php post_class('tpb-card'); ?>>
  <a class="tpb-card__link" href="<?php the_permalink(); ?>">
    <span class="tpb-card__media">
      <?php if (has_post_thumbnail()) : ?>
        <?php
        the_post_thumbnail('tpb-card', [
          'class' => 'tpb-card__img',
          'loading' => $eager ? 'eager' : 'lazy',
          'decoding' => 'async',
          'sizes' => '(max-width: 640px) 92vw, (max-width: 1080px) 44vw, 420px',
        ] + ($eager ? ['fetchpriority' => 'high'] : []));
        ?>
      <?php else : ?>
        <span class="tpb-card__ph" aria-hidden="true">
          <span class="tpb-card__ph-mark"></span>
        </span>
      <?php endif; ?>
      <?php if ($cat_name !== '') : ?>
        <span class="tpb-card__chip"><?php echo esc_html($cat_name); ?></span>
      <?php endif; ?>
    </span>
    <span class="tpb-card__body">
      <span class="tpb-card__meta">
        <time datetime="<?php echo esc_attr(get_the_date(DATE_W3C)); ?>"><?php echo esc_html(get_the_date('d M Y')); ?></time>
        <span class="tpb-card__mins"><?php echo esc_html(sprintf(_n('%s min', '%s min', $mins, '13thpencil-blog'), (string) $mins)); ?></span>
      </span>
      <h2 class="tpb-card__title"><?php the_title(); ?></h2>
      <?php if ($excerpt !== '') : ?>
        <span class="tpb-card__excerpt"><?php echo esc_html($excerpt); ?></span>
      <?php endif; ?>
      <span class="tpb-card__more">
        <?php esc_html_e('Read', '13thpencil-blog'); ?>
        <span class="tpb-card__arrow" aria-hidden="true"></span>
      </span>
    </span>
  </a>
</article>
