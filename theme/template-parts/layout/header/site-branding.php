<?php
/**
 * Displays header site branding
 *
 * @package Tachyon
 */

$tachyon_site_name        = get_bloginfo( 'name' );
$tachyon_site_description = get_bloginfo( 'description', 'display' );

?>

<div>

	<?php if ( has_custom_logo() ) : ?>
		<div class="dark:brightness-0 dark:invert"><?php the_custom_logo(); ?></div>
	<?php endif; ?>

	<?php if ( $tachyon_site_name ) : ?>
		<?php if ( is_front_page() && ! is_paged() ) : ?>
			<h1 class="sr-only"><?php echo esc_html( $tachyon_site_name ); ?></h1>
		<?php else : ?>
			<p class="sr-only"><?php echo esc_html( $tachyon_site_name ); ?></p>
		<?php endif; ?>
	<?php endif; ?>

	<?php if ( $tachyon_site_description ) : ?>
		<p class="sr-only">
			<?php echo $tachyon_site_description; // phpcs:ignore WordPress.Security.EscapeOutput ?>
		</p>
	<?php endif; ?>

</div><!-- .site-branding -->
