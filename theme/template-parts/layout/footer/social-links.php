<?php
/**
 * Template part for social links
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Tachyon
 */

?>

<?php if ( has_nav_menu( 'menu-3' ) ) : ?>
	<div class="py-5 text-center lg:text-right">
		<div class="mb-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
			<?php esc_html_e( 'Follow us', 'tachyon' ); ?>
		</div>
		<?php
		wp_nav_menu(
			array(
				'theme_location' => 'menu-3',
				'container_id'   => 'social-links',
				'menu_class'     => 'flex flex-wrap justify-center gap-3 text-4xl lg:justify-end',
				'depth'          => 1,
				'link_before'    => '<span>',
				'link_after'     => '</span>',
			)
		);
		?>
	</div>
<?php endif; ?>
