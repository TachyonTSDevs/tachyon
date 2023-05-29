<?php
/**
 * Functions and filters related to the menus.
 *
 * Makes the default WordPress navigation use an HTML structure similar
 * to the Navigation block.
 *
 * @link https://make.wordpress.org/themes/2020/07/06/printing-navigation-block-html-from-a-legacy-menu-in-themes/
 *
 * @package Tachyon
 */

/**
 * Add a button to top-level menu items that has sub-menus.
 * An icon is added using CSS depending on the value of aria-expanded.
 *
 * @param string $output Nav menu item start element.
 * @param object $item   Nav menu item.
 * @param int    $depth  Depth.
 * @param object $args   Nav menu args.
 * @return string Nav menu item start element.
 */
function tachyon_add_sub_menu_toggle( $output, $item, $depth, $args ) {
	if ( 0 === $depth && in_array( 'menu-item-has-children', $item->classes, true ) ) {

		// Add toggle button.
		$output .= '<button class="sub-menu-toggle" aria-expanded="false">';
		$output .= tachyon_get_icon_svg( 'fa-chevron-down' );
		/* translators: Hidden accessibility text. */
		$output .= '<span class="sr-only">' . esc_html__( 'Open menu', 'tachyon' ) . '</span>';
		$output .= '</button>';
	}
	return $output;
}
add_filter( 'walker_nav_menu_start_el', 'tachyon_add_sub_menu_toggle', 10, 4 );
