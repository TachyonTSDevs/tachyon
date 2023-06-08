<?php
/**
 * Template part for displaying post archives and search results
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Tachyon
 */

?>

<section>

	<div class="flex flex-col gap-5">

		<?php
		// Start the Loop.
		while ( have_posts() ) :
			the_post();
			?>
			<article id="post-<?php the_ID(); ?>" <?php post_class( 'flex overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-800 lt-lg:flex-col' ); ?>>

				<?php tachyon_post_thumbnail(); ?>

				<div class="flex flex-col p-6">
					<header class="entry-header">
						<?php
						if ( is_sticky() && is_home() && ! is_paged() ) {
							printf( '%s', esc_html_x( 'Featured', 'post', 'tachyon' ) );
						}
						the_title( sprintf( '<h2 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h2>' );
						?>

						<div class="mb-4 flex flex-wrap gap-3">

							<?php tachyon_entry_meta(); ?>

						</div><!-- .entry-meta -->
					</header><!-- .entry-header -->

					<div <?php tachyon_content_class( 'entry-summary flex-grow' ); ?>>
						<p><?php echo esc_html( wp_trim_words( get_the_excerpt(), 33 ) ); ?></p>
					</div><!-- .entry-summary -->

					<a href="<?php echo esc_url( get_permalink() ); ?>" class="flex items-center gap-3">
						<?php esc_html_e( 'Read more', 'tachyon' ); ?>
						<?php echo tachyon_get_icon_svg( 'fa-arrow-right' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					</a>
				</div>

			</article><!-- #post-${ID} -->
			<?php
			// End the loop.
		endwhile;
		?>

	</div>

	<?php
	// Previous/next page navigation.
	tachyon_the_posts_navigation();
	?>

</section>
