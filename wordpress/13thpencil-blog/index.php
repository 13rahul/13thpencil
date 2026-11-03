<?php
/**
 * Fallback index — card grid.
 *
 * @package ThirteenthPencilBlog
 */

get_header();
?>
<main id="content" class="tpb-main" role="main">
  <div class="tpb-shell tpb-shell--listing">
    <header class="tpb-archive-head tpb-sec-head">
      <div class="tpb-sec-head__title">
        <p class="tpb-tick"><?php esc_html_e('Writing', '13thpencil-blog'); ?></p>
        <?php tpb_archive_heading(); ?>
      </div>
      <?php
      if (is_category() || is_tag()) {
        $desc = get_the_archive_description();
        if ($desc) {
          echo '<div class="tpb-note">' . wp_kses_post($desc) . '</div>';
        } else {
          echo '<p class="tpb-note">' . esc_html__('Pieces filed here, newest first.', '13thpencil-blog') . '</p>';
        }
      } elseif (is_search()) {
        echo '<p class="tpb-note">' . esc_html__('What matched the search, in the order WordPress returned them.', '13thpencil-blog') . '</p>';
      }
      ?>
    </header>

    <?php if (have_posts()) : ?>
      <div class="tpb-card-grid">
        <?php
        while (have_posts()) :
          the_post();
          get_template_part('template-parts/content', 'card');
        endwhile;
        ?>
      </div>
      <?php tpb_pagination(); ?>
    <?php else : ?>
      <div class="tpb-empty">
        <h2 class="tpb-h2"><?php echo wp_kses_post(__('No posts<br>found.', '13thpencil-blog')); ?></h2>
        <p class="tpb-note"><?php esc_html_e('Try another category, or go back to the full index.', '13thpencil-blog'); ?></p>
        <a class="tpb-read" href="<?php echo esc_url(home_url('/')); ?>"><?php esc_html_e('All writing', '13thpencil-blog'); ?></a>
      </div>
    <?php endif; ?>
  </div>
</main>
<?php
get_footer();
