<?php
/**
 * Single post.
 *
 * @package ThirteenthPencilBlog
 */

get_header();
?>
<main id="content" class="tpb-main tpb-main--single" role="main">
  <?php tpb_share('float'); ?>
  <div class="tpb-shell tpb-shell--narrow">
    <?php
    while (have_posts()) :
      the_post();
      get_template_part('template-parts/content', 'single');
      if (comments_open() || get_comments_number()) :
        echo '<div class="tpb-comments">';
        comments_template();
        echo '</div>';
      endif;
    endwhile;
    ?>
  </div>
</main>
<?php
get_footer();
