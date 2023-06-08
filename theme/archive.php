<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Tachyon
 */

get_header();
?>

	<section id="primary">
		<main id="main">

		<?php if ( have_posts() ) : ?>

			<header class="page-header">
				<?php the_archive_title( '<h1 class="page-title">', '</h1>' ); ?>
			</header><!-- .page-header -->

			<?php
			get_template_part( 'template-parts/content/content', 'list' );

		else :

			// If no content, include the "No posts found" template.
			get_template_part( 'template-parts/content/content', 'none' );

		endif;
		?>
		</main><!-- #main -->
	</section><!-- #primary -->

<?php
get_footer();
