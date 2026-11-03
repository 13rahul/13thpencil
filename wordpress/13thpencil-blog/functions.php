<?php
/**
 * 13th Pencil Blog — Astra child theme.
 *
 * @package ThirteenthPencilBlog
 */

if (!defined('ABSPATH')) {
  exit;
}

define('TPB_VERSION', '1.7.0');
define('TPB_MAIN', 'https://13thpencil.com');
define('TPB_BLOG', 'https://blog.13thpencil.com');

require_once get_stylesheet_directory() . '/inc/lockup.php';
require_once get_stylesheet_directory() . '/inc/chrome.php';
require_once get_stylesheet_directory() . '/inc/template-tags.php';
require_once get_stylesheet_directory() . '/inc/login.php';

/**
 * Enqueue brand fonts and child styles after Astra.
 */
function tpb_enqueue_assets() {
  wp_enqueue_style(
    'tpb-fonts',
    'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=Newsreader:ital,wght@0,300;0,400;1,300;1,400&display=swap',
    [],
    null
  );

  wp_enqueue_style(
    'tpb-blog',
    get_stylesheet_directory_uri() . '/assets/css/blog.css',
    ['astra-theme-css', 'tpb-fonts'],
    TPB_VERSION
  );

  wp_enqueue_script(
    'tpb-loader',
    get_stylesheet_directory_uri() . '/assets/js/loader.js',
    [],
    TPB_VERSION,
    true
  );

  wp_enqueue_script(
    'tpb-chrome',
    get_stylesheet_directory_uri() . '/assets/js/chrome.js',
    [],
    TPB_VERSION,
    true
  );

  if (is_singular('post')) {
    wp_enqueue_script(
      'tpb-single',
      get_stylesheet_directory_uri() . '/assets/js/single.js',
      [],
      TPB_VERSION,
      true
    );
  }
}
add_action('wp_enqueue_scripts', 'tpb_enqueue_assets', 20);

function tpb_skip_loader_script() {
  echo '<script>(function(){try{var u=navigator.userAgent;if(/Googlebot|Google-InspectionTool|Chrome-Lighthouse|bingbot|BingPreview|DuckDuckBot|Slurp|facebookexternalhit|Twitterbot|LinkedInBot|Applebot|Yandex|Baiduspider|Pingdom|GTmetrix/i.test(u)||window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("skip-loader")}}catch(e){}})();</script>' . "\n";
}
add_action('wp_head', 'tpb_skip_loader_script', 0);

/**
 * Same font preconnect as the main site.
 */
function tpb_font_resource_hints($urls, $relation_type) {
  if ($relation_type === 'preconnect') {
    $urls[] = [
      'href' => 'https://fonts.googleapis.com',
    ];
    $urls[] = [
      'href' => 'https://fonts.gstatic.com',
      'crossorigin' => 'anonymous',
    ];
  }
  return $urls;
}
add_filter('wp_resource_hints', 'tpb_font_resource_hints', 10, 2);

/**
 * Drop Astra’s default Google Fonts so they cannot override Bricolage / Newsreader.
 */
function tpb_dequeue_astra_fonts() {
  wp_dequeue_style('astra-google-fonts');
  wp_deregister_style('astra-google-fonts');
}
add_action('wp_enqueue_scripts', 'tpb_dequeue_astra_fonts', 40);

/**
 * Card crop for listing thumbnails.
 */
function tpb_setup() {
  add_image_size('tpb-card', 800, 500, true);
}
add_action('after_setup_theme', 'tpb_setup');

/**
 * Three-up card rows on listing views.
 */
function tpb_listing_query($query) {
  if (is_admin() || !$query->is_main_query()) {
    return;
  }
  if ($query->is_home() || $query->is_archive() || $query->is_search()) {
    $query->set('posts_per_page', 9);
  }
}
add_action('pre_get_posts', 'tpb_listing_query');

/**
 * Strip Astra classic + builder chrome, then inject brand header/footer.
 * Must run on `wp` so builder classes are already constructed.
 */
function tpb_replace_chrome() {
  remove_action('astra_header', 'astra_header_markup');
  remove_action('astra_footer', 'astra_footer_markup');

  if (class_exists('Astra_Builder_Header')) {
    $header = Astra_Builder_Header::get_instance();
    remove_action('astra_header', [$header, 'global_astra_header'], 0);
    remove_action('astra_footer', [$header, 'mobile_popup']);
    remove_action('astra_footer', [$header, 'mobile_cart_flyout']);
  }

  if (class_exists('Astra_Builder_Footer')) {
    $footer = Astra_Builder_Footer::get_instance();
    remove_action('astra_footer', [$footer, 'footer_markup'], 10);
  }

  if (class_exists('Astra_Mobile_Header')) {
    $mobile = Astra_Mobile_Header::get_instance();
    remove_action('astra_header', [$mobile, 'mobile_header_markup'], 5);
  }

  add_action('astra_header', 'tpb_render_header', 1);
  add_action('astra_footer', 'tpb_render_footer', 1);
}
add_action('wp', 'tpb_replace_chrome', 20);

/**
 * Body class for blog skin.
 */
function tpb_body_class($classes) {
  $classes[] = 'tpb-blog';
  return $classes;
}
add_filter('body_class', 'tpb_body_class');
