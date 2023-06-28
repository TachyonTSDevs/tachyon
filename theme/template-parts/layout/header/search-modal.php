<?php
/**
 * Template part for search modal
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Tachyon
 */

?>

<div id="search-modal" class="modal fade" tabindex="-1">
	<div class="modal-dialog pointer-events-none relative mx-auto flex min-h-screen w-auto max-w-content flex-col lg:justify-center">
		<div class="pointer-events-auto flex items-center gap-3 rounded-lg border bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
			<button data-dismiss="modal" aria-label="Back">
				<?php echo tachyon_get_icon_svg( 'fa-arrow-left' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</button>

			<?php get_search_form(); ?>
		</div>
	</div>
</div>

<button aria-controls="search-modal" data-toggle="modal" class="lt-lg:ml-auto">
	<?php echo tachyon_get_icon_svg( 'fa-magnifying-glass' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
	<span class="sr-only"><?php esc_html_e( 'Search', 'tachyon' ); ?></span>
</button>
