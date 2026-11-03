<?php
/**
 * Branded wp-login.php — 13th Pencil ink / paper / lacquer.
 *
 * @package ThirteenthPencilBlog
 */

if (!defined('ABSPATH')) {
  exit;
}

function tpb_login_enqueue() {
  wp_enqueue_style(
    'tpb-login-fonts',
    'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=Newsreader:ital,wght@0,300;0,400;1,300;1,400&display=swap',
    [],
    null
  );
  wp_enqueue_style(
    'tpb-login',
    get_stylesheet_directory_uri() . '/assets/css/login.css',
    ['tpb-login-fonts', 'login'],
    TPB_VERSION
  );
}
add_action('login_enqueue_scripts', 'tpb_login_enqueue');

function tpb_login_body_class($classes) {
  $classes[] = 'tpb-login';
  return $classes;
}
add_filter('login_body_class', 'tpb_login_body_class');

function tpb_login_headerurl() {
  return TPB_MAIN;
}
add_filter('login_headerurl', 'tpb_login_headerurl');

function tpb_login_headertext() {
  return '13th Pencil';
}
add_filter('login_headertext', 'tpb_login_headertext');

function tpb_login_strokes() {
  echo '<div class="tpb-login-strokes" aria-hidden="true">';
  for ($i = 0; $i < 13; $i++) {
    echo $i === 12 ? '<i class="thirteen"></i>' : '<i></i>';
  }
  echo '</div>';
}
add_action('login_header', 'tpb_login_strokes');

function tpb_login_brand($message) {
  ob_start();
  tpb_lockup();
  $lockup = ob_get_clean();
  return '<div class="tpb-login-brand">' . $lockup . '</div>' . $message;
}
add_filter('login_message', 'tpb_login_brand');

function tpb_login_footer() {
  echo '<p class="tpb-login-credit">Developed by Fundaking Media</p>';
}
add_action('login_footer', 'tpb_login_footer');
