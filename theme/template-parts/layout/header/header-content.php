<?php
/**
 * Template part for displaying the header content
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Tachyon
 */

?>

<header id="masthead" class="sticky top-[var(--wp-admin--admin-bar--height,_0px)] z-10 border-b bg-slate-50 dark:border-black dark:bg-slate-800">
	<div class="container mx-auto flex flex-wrap items-center gap-2 py-3">

		<?php get_template_part( 'template-parts/layout/header/site-branding' ); ?>

		<div id="nav-menu" class="offcanvas offcanvas-right top-[var(--wp-admin--admin-bar--height,_0px)] flex-grow" aria-labelledby="nav-menu-label" tabindex="-1">
			<div class="flex items-center justify-between border-b p-4 text-xl dark:border-slate-700 lg:hidden">
				<span class="font-bold" id="nav-menu-label"><?php esc_html_e( 'Menu', 'tachyon' ); ?></span>
				<button data-dismiss="offcanvas" aria-label="Close">
					<?php echo tachyon_get_icon_svg( 'bi-x-lg' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				</button>
			</div>

			<div class="lg:flex lg:items-center lt-lg:overflow-y-auto lt-lg:p-4">
				<?php
				wp_nav_menu(
					array(
						'theme_location'       => 'menu-1',
						'container'            => 'nav',
						'container_id'         => 'site-navigation',
						'container_aria_label' => __( 'Main Navigation', 'tachyon' ),
						'menu_class'           => 'flex lt-lg:flex-col',
					)
				);
				?>
				<!-- #site-navigation -->

				<?php get_template_part( 'template-parts/layout/header/theme-switcher' ); ?>
			</div>
		</div>

		<?php get_template_part( 'template-parts/layout/header/search-modal' ); ?>

		<button aria-controls="nav-menu" data-toggle="offcanvas" class="lg:!hidden">
			<?php echo tachyon_get_icon_svg( 'fa-bars' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			<span class="sr-only"><?php esc_html_e( 'Menu', 'tachyon' ); ?></span>
		</button>

	</div>
</header><!-- #masthead -->
