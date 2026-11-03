<?php
/**
 * Shared template helpers for editorial layouts.
 *
 * @package ThirteenthPencilBlog
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Primary category label + link for the current post.
 */
function tpb_primary_category() {
  $cats = get_the_category();
  if (empty($cats) || is_wp_error($cats)) {
    return;
  }
  $cat = $cats[0];
  printf(
    '<a class="tpb-kicker" href="%s">%s</a>',
    esc_url(get_category_link($cat->term_id)),
    esc_html($cat->name)
  );
}

function tpb_read_minutes() {
  $words = str_word_count(wp_strip_all_tags(get_the_content(null, false)));
  return max(1, (int) ceil($words / 200));
}

/**
 * Quiet meta: author · date.
 */
function tpb_meta_line() {
  $author = get_the_author();
  $date = get_the_date();
  echo '<p class="tpb-meta">';
  if ($author) {
    printf(
      '<a class="tpb-meta__author" href="%s">%s</a>',
      esc_url(get_author_posts_url((int) get_the_author_meta('ID'))),
      esc_html($author)
    );
    echo '<span class="tpb-meta__sep" aria-hidden="true"> · </span>';
  }
  printf('<time datetime="%s">%s</time>', esc_attr(get_the_date(DATE_W3C)), esc_html($date));
  echo '</p>';
}

/**
 * Single-post byline: avatar, author, date, category, read time.
 */
function tpb_single_byline() {
  $author_id = (int) get_the_author_meta('ID');
  $cats = get_the_category();
  $mins = tpb_read_minutes();
  ?>
  <div class="tpb-byline">
    <a class="tpb-byline__avatar" href="<?php echo esc_url(get_author_posts_url($author_id)); ?>">
      <?php echo get_avatar($author_id, 88, '', get_the_author(), ['class' => 'tpb-byline__img']); ?>
    </a>
    <div class="tpb-byline__copy">
      <a class="tpb-byline__name" href="<?php echo esc_url(get_author_posts_url($author_id)); ?>"><?php echo esc_html(get_the_author()); ?></a>
      <p class="tpb-byline__meta">
        <time datetime="<?php echo esc_attr(get_the_date(DATE_W3C)); ?>"><?php echo esc_html(get_the_date()); ?></time>
        <?php if (!empty($cats) && !is_wp_error($cats)) : ?>
          <span class="tpb-byline__dot" aria-hidden="true">·</span>
          <a href="<?php echo esc_url(get_category_link($cats[0]->term_id)); ?>"><?php echo esc_html($cats[0]->name); ?></a>
        <?php endif; ?>
        <span class="tpb-byline__dot" aria-hidden="true">·</span>
        <span><?php echo esc_html(sprintf(_n('%s min read', '%s min read', $mins, '13thpencil-blog'), (string) $mins)); ?></span>
      </p>
    </div>
  </div>
  <?php
}

/**
 * Author bio card for the end of a single post.
 */
function tpb_author_bio() {
  $author_id = (int) get_the_author_meta('ID');
  if (!$author_id) {
    return;
  }
  $bio = trim((string) get_the_author_meta('description', $author_id));
  ?>
  <aside class="tpb-author" aria-label="<?php esc_attr_e('About the author', '13thpencil-blog'); ?>">
    <a class="tpb-author__avatar" href="<?php echo esc_url(get_author_posts_url($author_id)); ?>">
      <?php echo get_avatar($author_id, 160, '', get_the_author(), ['class' => 'tpb-author__img']); ?>
    </a>
    <div class="tpb-author__copy">
      <p class="tpb-tick"><?php esc_html_e('Written by', '13thpencil-blog'); ?></p>
      <h2 class="tpb-author__name">
        <a href="<?php echo esc_url(get_author_posts_url($author_id)); ?>"><?php echo esc_html(get_the_author()); ?></a>
      </h2>
      <?php if ($bio !== '') : ?>
        <p class="tpb-author__bio"><?php echo esc_html($bio); ?></p>
      <?php endif; ?>
    </div>
  </aside>
  <?php
}

/**
 * Share URLs and labels for the current post.
 *
 * @return array<int, array{id:string,label:string,href:string}>
 */
function tpb_share_items() {
  $url = rawurlencode((string) get_permalink());
  $title = rawurlencode(wp_strip_all_tags((string) get_the_title()));
  return [
    [
      'id' => 'x',
      'label' => __('Share on X', '13thpencil-blog'),
      'href' => 'https://twitter.com/intent/tweet?url=' . $url . '&text=' . $title,
    ],
    [
      'id' => 'linkedin',
      'label' => __('Share on LinkedIn', '13thpencil-blog'),
      'href' => 'https://www.linkedin.com/sharing/share-offsite/?url=' . $url,
    ],
    [
      'id' => 'facebook',
      'label' => __('Share on Facebook', '13thpencil-blog'),
      'href' => 'https://www.facebook.com/sharer/sharer.php?u=' . $url,
    ],
    [
      'id' => 'copy',
      'label' => __('Copy link', '13thpencil-blog'),
      'href' => (string) get_permalink(),
    ],
  ];
}

/**
 * SVG glyph for a share network.
 *
 * @param string $id Network id.
 */
function tpb_share_icon($id) {
  switch ($id) {
    case 'x':
      echo '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.72 10.38 22.1 2h-1.75l-6.42 7.28L8.8 2H2.5l7.73 11.1L2.5 22h1.75l6.76-7.67L15.2 22h6.3l-6.78-11.62Zm-2.39 2.71-.79-1.11-6.23-8.77h2.68l5.04 7.09.78 1.11 6.56 9.23h-2.68l-5.36-7.55Z"/></svg>';
      return;
    case 'linkedin':
      echo '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.54 8.75H3.56V20.5h2.98V8.75ZM5.05 3.5A1.73 1.73 0 1 0 5.04 7a1.73 1.73 0 0 0 .01-3.5ZM20.5 20.5h-2.97v-5.73c0-1.37-.03-3.12-1.9-3.12-1.9 0-2.2 1.49-2.2 3.02V20.5H10.46V8.75h2.85v1.6h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.57V20.5Z"/></svg>';
      return;
    case 'facebook':
      echo '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.5 8.5V6.7c0-.7.5-1 1.1-1h1.9V3h-2.6C11.9 3 11 5.1 11 7.2v1.3H9v2.7h2V21h3.5v-9.8h2.4l.4-2.7h-2.8Z"/></svg>';
      return;
    default:
      echo '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M10 13.5 14 8M8.2 12.2l-2.4 1.4a2 2 0 0 0-.7 2.7l.2.3a2 2 0 0 0 2.7.7l2.4-1.4M15.8 11.8l2.4-1.4a2 2 0 0 0 .7-2.7l-.2-.3a2 2 0 0 0-2.7-.7l-2.4 1.4"/></svg>';
  }
}

/**
 * Share controls. $variant: float (desktop rail) or inline (after content).
 *
 * @param string $variant float|inline
 */
function tpb_share($variant = 'inline') {
  $items = tpb_share_items();
  $mod = $variant === 'float' ? 'tpb-share--float' : 'tpb-share--inline';
  ?>
  <nav class="tpb-share <?php echo esc_attr($mod); ?>" aria-label="<?php esc_attr_e('Share this piece', '13thpencil-blog'); ?>">
    <p class="tpb-share__label"><?php esc_html_e('Share', '13thpencil-blog'); ?></p>
    <ul class="tpb-share__list">
      <?php foreach ($items as $item) : ?>
        <li>
          <?php if ($item['id'] === 'copy') : ?>
            <button type="button" class="tpb-share__btn" data-tpb-copy="<?php echo esc_url($item['href']); ?>" aria-label="<?php echo esc_attr($item['label']); ?>">
              <?php tpb_share_icon($item['id']); ?>
            </button>
          <?php else : ?>
            <a class="tpb-share__btn" href="<?php echo esc_url($item['href']); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr($item['label']); ?>">
              <?php tpb_share_icon($item['id']); ?>
            </a>
          <?php endif; ?>
        </li>
      <?php endforeach; ?>
    </ul>
  </nav>
  <?php
}

/**
 * Short excerpt without [...] noise.
 *
 * @param int $words Word count.
 */
function tpb_excerpt($words = 28) {
  $text = has_excerpt() ? get_the_excerpt() : wp_strip_all_tags(get_the_content(null, false));
  $text = wp_trim_words($text, $words, '…');
  if ($text === '') {
    return;
  }
  echo '<p class="tpb-excerpt">' . esc_html($text) . '</p>';
}

/**
 * Brand pagination.
 */
function tpb_pagination() {
  global $wp_query;
  if ($wp_query->max_num_pages <= 1) {
    return;
  }
  echo '<nav class="tpb-pagination" aria-label="' . esc_attr__('Posts', '13thpencil-blog') . '">';
  the_posts_pagination([
    'mid_size' => 1,
    'prev_text' => __('Previous', '13thpencil-blog'),
    'next_text' => __('Next', '13thpencil-blog'),
  ]);
  echo '</nav>';
}

/**
 * Archive / search heading.
 */
function tpb_archive_heading() {
  if (is_search()) {
    printf(
      '<h1 class="tpb-display tpb-display--sm">%s</h1><p class="tpb-archive__query">“%s”</p>',
      esc_html__('Search', '13thpencil-blog'),
      esc_html(get_search_query())
    );
    return;
  }
  if (is_home() && !is_front_page()) {
    echo '<h1 class="tpb-display">' . esc_html__('Writing.', '13thpencil-blog') . '</h1>';
    return;
  }
  if (is_category() || is_tag() || is_tax()) {
    $title = single_term_title('', false);
    echo '<h1 class="tpb-display tpb-display--sm">' . esc_html($title) . '</h1>';
    return;
  }
  the_archive_title('<h1 class="tpb-display tpb-display--sm">', '</h1>');
}
