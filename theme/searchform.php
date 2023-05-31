<?php
/**
 * Custom search form
 *
 * @package Tachyon
 */

?>

<form role="search" method="get" class="flex w-full gap-2" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label class="flex-grow">
		<span class="sr-only">
			<?php esc_html_e( 'Search for:', 'tachyon' ); // translators: Hidden accessibility text. ?>
		</span>

		<input type="search" class="block w-full" placeholder="<?php esc_attr_e( 'Search &hellip;', 'tachyon' ); ?>" value="<?php echo esc_attr( get_search_query() ); ?>" name="s" />
	</label>

	<button type="submit">
		<?php echo tachyon_get_icon_svg( 'fa-magnifying-glass' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		<span class="sr-only"><?php esc_html_e( 'Search', 'tachyon' ); ?></span>
	</button>
</form> 
