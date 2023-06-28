<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Tachyon
 */

get_header();
?>

	<section id="primary">
		<main id="main">

			<?php
			/* Start the Loop */
			while ( have_posts() ) :
				the_post();
				get_template_part( 'template-parts/content/content', 'single' );

				if ( is_singular( 'post' ) ) :
					?>
					<div class="mx-auto my-4 max-w-content">
					<?php
					// Previous/next post navigation.
					the_post_navigation(
						array(
							'next_text' => '<span aria-hidden="true" class="font-semibold">' . __( 'Next Post', 'tachyon' ) . '</span> ' .
								'<span class="sr-only">' . __( 'Next post:', 'tachyon' ) . '</span> ' .
								tachyon_get_icon_svg( 'fa-arrow-right', true ) . // phpcs:ignore WordPress.Security.EscapeOutput
								'<br/>' . '<span class="lt-lg:sr-only">%title</span>',
							'prev_text' => tachyon_get_icon_svg( 'fa-arrow-left', true ) . // phpcs:ignore WordPress.Security.EscapeOutput
								' <span aria-hidden="true" class="font-semibold">' . __( 'Previous Post', 'tachyon' ) . '</span> ' .
								'<span class="sr-only">' . __( 'Previous post:', 'tachyon' ) . '</span> ' .
								'<br/>' . '<span class="lt-lg:sr-only">%title</span>',
						)
					);
					?>
					</div>
					<?php
				endif;

				// If comments are open, or we have at least one comment, load
				// the comment template.
				if ( comments_open() || get_comments_number() ) {
					comments_template();
				}

				// End the loop.
			endwhile;
			?>

		</main><!-- #main -->
	</section><!-- #primary -->

<?php
get_footer();
