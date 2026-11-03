<?php
/**
 * Blog posts index — card grid.
 *
 * @package ThirteenthPencilBlog
 */

get_header();
?>
<main id="content" class="tpb-main" role="main">
  <?php if (!is_paged()) : ?>
    <section class="tpb-hero panel--ink">
      <div class="tpb-shell">
        <header class="tpb-intro tpb-sec-head">
          <div class="tpb-sec-head__title">
            <p class="tpb-tick"><?php esc_html_e('From the studio', '13thpencil-blog'); ?></p>
            <h1 class="tpb-display"><?php echo wp_kses_post(__('Selected<br>thinking.', '13thpencil-blog')); ?></h1>
          </div>
          <p class="tpb-note">
            <?php esc_html_e('Short notes on category defaults, craft, and the answer that took longer to find — written the way we say it in the room.', '13thpencil-blog'); ?>
          </p>
        </header>
      </div>
    </section>
  <?php endif; ?>

  <div class="tpb-shell tpb-shell--body tpb-shell--listing">
    <?php if (is_paged()) : ?>
      <header class="tpb-archive-head">
        <p class="tpb-tick"><?php esc_html_e('Writing', '13thpencil-blog'); ?></p>
        <h1 class="tpb-display tpb-display--sm"><?php printf(esc_html__('Page %s', '13thpencil-blog'), (string) max(1, (int) get_query_var('paged'))); ?></h1>
      </header>
    <?php endif; ?>

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
        <p class="tpb-tick"><?php esc_html_e('Writing', '13thpencil-blog'); ?></p>
        <h2 class="tpb-h2"><?php echo wp_kses_post(__('Nothing<br>published yet.', '13thpencil-blog')); ?></h2>
        <p class="tpb-note"><?php esc_html_e('New pieces will land here. Meanwhile, send the brief on the main site.', '13thpencil-blog'); ?></p>
        <a class="tpb-read" href="<?php echo esc_url(TPB_MAIN . '/start-a-project'); ?>"><?php esc_html_e('Start a project', '13thpencil-blog'); ?></a>
      </div>
    <?php endif; ?>
  </div>
</main>
<?php
get_footer();
