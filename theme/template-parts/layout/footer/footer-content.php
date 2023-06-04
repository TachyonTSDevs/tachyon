<?php
/**
 * Template part for displaying the footer content
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Tachyon
 */

?>

<footer id="colophon" class="border-t bg-slate-50 dark:border-black dark:bg-slate-800">
	<div class="container mx-auto flex flex-col gap-3 py-3">

		<div class="flex items-center justify-between lt-lg:flex-col">
			<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
				<aside role="complementary" aria-label="<?php esc_attr_e( 'Footer', 'tachyon' ); ?>">
					<?php dynamic_sidebar( 'sidebar-1' ); ?>
				</aside>
			<?php endif; ?>

			<?php get_template_part( 'template-parts/layout/footer/social-links' ); ?>
		</div>

		<div class="flex items-center justify-between lt-lg:flex-col">
			<span>
				Copyright &copy; <?php echo esc_html( gmdate( 'Y' ) ); ?>
				<?php
				$tachyon_blog_info = get_bloginfo( 'name' );
				if ( ! empty( $tachyon_blog_info ) ) :
					?>
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>.
					<?php
				endif;
				?>
			</span>

			<?php
			if ( has_nav_menu( 'menu-2' ) ) {
				wp_nav_menu(
					array(
						'theme_location'       => 'menu-2',
						'container'            => 'nav',
						'container_id'         => 'footer-menu',
						'container_aria_label' => __( 'Footer Menu', 'tachyon' ),
						'menu_class'           => 'flex flex-wrap gap-3',
						'depth'                => 1,
					)
				);
			}
			?>
		</div>

	</div>
</footer><!-- #colophon -->
