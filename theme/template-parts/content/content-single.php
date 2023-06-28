<?php
/**
 * Template part for displaying single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Tachyon
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<div class="mx-auto mb-4 max-w-content lg:grid lg:grid-cols-2 lg:bg-slate-200 lg:dark:bg-slate-700">
		<header class="entry-header lg:my-auto lg:p-6 lt-lg:mb-6">
			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

			<?php if ( ! is_page() ) : ?>
				<div class="entry-meta">
					<?php tachyon_entry_meta(); ?>
				</div><!-- .entry-meta -->
			<?php endif; ?>
		</header><!-- .entry-header -->

		<?php tachyon_post_thumbnail(); ?>
	</div>

	<div <?php tachyon_content_class( 'entry-content' ); ?>>
		<?php
		the_content(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers. */
					__( 'Continue reading<span class="sr-only"> "%s"</span>', 'tachyon' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				get_the_title()
			)
		);

		wp_link_pages(
			array(
				'before' => '<div>' . __( 'Pages:', 'tachyon' ),
				'after'  => '</div>',
			)
		);
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer mx-auto my-4 max-w-content">
		<?php tachyon_entry_footer(); ?>
	</footer><!-- .entry-footer -->

</article><!-- #post-${ID} -->
