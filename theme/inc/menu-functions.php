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

/**
 * Detects the social network from a URL and returns the SVG code for its icon.
 *
 * @param string $url  Social link.
 * @return string
 */
function tachyon_get_social_link_svg( $url ) {
	if ( substr( $url, 0, 7 ) === 'mailto:' ) {
		return tachyon_get_icon_svg( 'fa-envelope' );
	}

	$domains = explode( '.', wp_parse_url( $url, PHP_URL_HOST ) );
	$icon    = end( $domains );
	if ( count( $domains ) > 1 ) {
		$icon = prev( $domains );
	}
	return tachyon_get_icon_svg( 'fa-' . $icon );
}

/**
 * Displays SVG icons in the footer navigation.
 *
 * @param string   $item_output The menu item's starting HTML output.
 * @param WP_Post  $item        Menu item data object.
 * @param int      $depth       Depth of the menu. Used for padding.
 * @param stdClass $args        An object of wp_nav_menu() arguments.
 * @return string The menu item output with social icon.
 */
function tachyon_nav_menu_social_icons( $item_output, $item, $depth, $args ) {
	// Change SVG icon inside social links menu if there is supported URL.
	if ( 'menu-3' === $args->theme_location ) {
		$svg = tachyon_get_social_link_svg( $item->url );
		if ( ! empty( $svg ) ) {
			$item_output = str_replace( $args->link_before, $svg . '<span class="sr-only">', $item_output );
		}
	}

	return $item_output;
}

add_filter( 'walker_nav_menu_start_el', 'tachyon_nav_menu_social_icons', 10, 4 );
