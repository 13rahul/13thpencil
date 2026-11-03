<?php
/**
 * Brand lockup markup (matches main site SVG).
 *
 * @package ThirteenthPencilBlog
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Print the 13th Pencil lockup.
 */
function tpb_lockup() {
  ?>
  <span class="lockup">
    <svg class="mark" viewBox="0 0 100 100" aria-hidden="true">
      <rect class="frame" x="9" y="9" width="82" height="82" />
      <path class="shaft" d="M32 20h17v40l-8.5 15L32 60z" />
      <path class="lead" d="M41 78c14 7 27 2 49-14" />
    </svg>
    <span class="wordmark">
      <span class="wm__num">
        <svg class="wm__one" viewBox="0 0 30 78" aria-hidden="true">
          <path d="M4 0h22v58l-11 20L4 58z" />
        </svg>
        3<span class="wm__th">th</span>
      </span>
      <span>Pencil</span>
    </span>
  </span>
  <?php
}
