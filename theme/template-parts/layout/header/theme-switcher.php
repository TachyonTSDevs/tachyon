<?php
/**
 * Theme switcher controls
 *
 * @package Tachyon
 */

?>

<div class="menu-item-has-children !block lg:ml-auto lt-lg:mt-5">

	<label for="switch-theme" class="mb-1 block text-lg lg:sr-only"><?php esc_html_e( 'Switch theme', 'tachyon' ); ?></label>

	<button id="switch-theme"
		class="sub-menu-toggle not-split !flex w-full items-center gap-2 lt-lg:border lt-lg:bg-slate-100 dark:lt-lg:bg-slate-700"
		aria-expanded="false">
		<?php echo tachyon_get_icon_svg( 'bi-sun-fill' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		<span class="mr-auto lg:sr-only">
			<?php esc_html_e( 'Light', 'tachyon' ); ?>
		</span>
		<span class="lg:sr-only">
			<?php echo tachyon_get_icon_svg( 'fa-chevron-down' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		</span>
	</button>

	<ul class="sub-menu right-0">
		<li class="menu-item">
			<button class="!flex w-full items-center gap-2" data-theme-value="dark">
				<?php echo tachyon_get_icon_svg( 'bi-moon-stars-fill' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<?php esc_html_e( 'Dark', 'tachyon' ); ?>
			</button>
		</li>
		<li class="menu-item">
			<button class="!flex w-full items-center gap-2" data-theme-value="light">
				<?php echo tachyon_get_icon_svg( 'bi-sun-fill' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<?php esc_html_e( 'Light', 'tachyon' ); ?>
			</button>
		</li>
		<li class="menu-item">
			<button class="!flex w-full items-center gap-2" data-theme-value="auto">
				<?php echo tachyon_get_icon_svg( 'bi-circle-half' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<?php esc_html_e( 'System', 'tachyon' ); ?>
			</button>
		</li>
	</ul>

</div>
