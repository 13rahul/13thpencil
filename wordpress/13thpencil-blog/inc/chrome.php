<?php
/**
 * Header and footer chrome matching 13thpencil.com.
 *
 * @package ThirteenthPencilBlog
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Desktop + mobile header.
 */
function tpb_render_header() {
  $main = TPB_MAIN;
  $blog = home_url('/');
  ?>
  <noscript><style>#loader{display:none!important}</style></noscript>
  <div class="loader" id="loader" role="progressbar" aria-label="Loading" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
    <div class="loader__strokes" id="loaderStrokes"></div>
    <div class="loader__cap annot">Twelve agree. The thirteenth doesn't.</div>
    <div class="loader__pct annot" id="loaderPct" aria-hidden="true">0%</div>
    <div class="loader__logo" id="loaderLogo"><?php tpb_lockup(); ?></div>
  </div>
  <header class="site-header" id="siteHeader">
    <a class="site-header__logo" href="<?php echo esc_url($main); ?>" aria-label="13th Pencil, home">
      <?php tpb_lockup(); ?>
    </a>
    <div class="site-header__right">
      <nav class="site-header__links" aria-label="Primary">
        <div class="site-header__item" data-tpb-about>
          <a
            class="site-header__about"
            href="<?php echo esc_url($main . '/about/our-story'); ?>"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="tpbAboutDrop"
            data-tpb-about-trigger
          >About</a>
          <div class="site-header__drop" id="tpbAboutDrop" role="menu">
            <div class="site-header__drop-in">
              <a role="menuitem" href="<?php echo esc_url($main . '/about/our-story'); ?>">Our Story</a>
              <a role="menuitem" href="<?php echo esc_url($main . '/about/why-13th-pencil'); ?>">Why 13th Pencil</a>
              <a role="menuitem" href="<?php echo esc_url($main . '/about/our-approach'); ?>">Our Approach</a>
            </div>
          </div>
        </div>
        <a href="<?php echo esc_url($main . '/#principle'); ?>">Principle</a>
        <a href="<?php echo esc_url($main . '/#capabilities'); ?>">Capabilities</a>
        <a href="<?php echo esc_url($main . '/#comein'); ?>">Where we help</a>
        <a href="<?php echo esc_url($main . '/#studio'); ?>">Studio</a>
        <a href="<?php echo esc_url($blog); ?>" aria-current="page">Blog</a>
      </nav>
      <a class="site-header__cta" href="<?php echo esc_url($main . '/start-a-project'); ?>">Start a project</a>
      <button
        class="site-header__burger"
        id="siteBurger"
        type="button"
        aria-expanded="false"
        aria-controls="siteMenu"
        aria-label="Open menu"
      >
        <span></span>
      </button>
    </div>
  </header>

  <div class="site-menu" id="siteMenu">
    <div class="site-menu__about" data-tpb-mobile-about>
      <button
        type="button"
        class="site-menu__about-btn"
        aria-expanded="false"
        aria-controls="tpbMobileAbout"
        data-tpb-mobile-about-btn
      >
        <span>About</span>
        <span class="site-menu__about-caret" aria-hidden="true"></span>
      </button>
      <div class="site-menu__about-list" id="tpbMobileAbout">
        <a class="site-menu__sub" href="<?php echo esc_url($main . '/about/our-story'); ?>">Our Story</a>
        <a class="site-menu__sub" href="<?php echo esc_url($main . '/about/why-13th-pencil'); ?>">Why 13th Pencil</a>
        <a class="site-menu__sub" href="<?php echo esc_url($main . '/about/our-approach'); ?>">Our Approach</a>
      </div>
    </div>
    <a href="<?php echo esc_url($main . '/#principle'); ?>">Principle</a>
    <a href="<?php echo esc_url($main . '/#capabilities'); ?>">Capabilities</a>
    <a href="<?php echo esc_url($main . '/#comein'); ?>">Where we help</a>
    <a href="<?php echo esc_url($main . '/#studio'); ?>">Studio</a>
    <a href="<?php echo esc_url($blog); ?>" aria-current="page">Blog</a>
    <a class="site-menu__cta" href="<?php echo esc_url($main . '/start-a-project'); ?>">Start a project</a>
    <p class="site-menu__meta">
      <a href="mailto:hello@13thpencil.com">hello@13thpencil.com</a>
    </p>
    <p class="site-menu__desc">A creative and innovation company.</p>
  </div>
  <?php
}

/**
 * Contact CTA + legal footer, matching the main site.
 */
function tpb_render_footer() {
  $main = TPB_MAIN;
  $year = gmdate('Y');
  ?>
  <section class="tpb-contact panel--ink" aria-label="<?php esc_attr_e('Start a project', '13thpencil-blog'); ?>">
    <div class="tpb-contact__inner">
      <div class="tpb-cta-row">
        <a class="tpb-btn" href="<?php echo esc_url($main . '/start-a-project'); ?>"><?php esc_html_e('Start a project', '13thpencil-blog'); ?></a>
        <a class="tpb-big-link" href="mailto:hello@13thpencil.com">hello@13thpencil.com</a>
      </div>
      <div class="tpb-contact__cols">
        <p class="tpb-contact__note">
          <?php esc_html_e('New business', '13thpencil-blog'); ?><br>
          <a href="mailto:hello@13thpencil.com">hello@13thpencil.com</a>
        </p>
        <p class="tpb-contact__note">
          <?php esc_html_e('Careers', '13thpencil-blog'); ?><br>
          <a href="mailto:people@13thpencil.com">people@13thpencil.com</a>
        </p>
        <p class="tpb-contact__note"><?php esc_html_e('Send the brief, the deadline, and the answer everyone expects. We will come back with what we would do instead.', '13thpencil-blog'); ?></p>
      </div>
      <div class="site-footer tpb-footer">
        <a href="<?php echo esc_url($main); ?>" aria-label="13th Pencil" class="site-footer__brand">
          <?php tpb_lockup(); ?>
        </a>
        <span class="site-footer__legal">&copy; <?php echo esc_html($year); ?> 13th Pencil — a creative and innovation company. Provisional identity; independent work in progress.</span>
      </div>
    </div>
  </section>
  <?php
}
