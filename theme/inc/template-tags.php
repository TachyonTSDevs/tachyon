<?php
/**
 * Custom template tags for this theme
 *
 * Eventually, some functionality here could be replaced by core features.
 *
 * @package Tachyon
 */

if ( ! function_exists( 'tachyon_posted_on' ) ) :
	/**
	 * Prints HTML with meta information for the current post-date/time.
	 */
	function tachyon_posted_on() {
		$time_string = '<time datetime="%1$s" class="published">%2$s</time>';
		if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string .= ' - <time datetime="%3$s" class="updated">%4$s</time>';
		}

		$time_string = sprintf(
			$time_string,
			esc_attr( get_the_date( DATE_W3C ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_modified_date( DATE_W3C ) ),
			esc_html( get_the_modified_date() )
		);

		echo '<div>' . $time_string . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
endif;

if ( ! function_exists( 'tachyon_posted_by' ) ) :
	/**
	 * Prints HTML with meta information about theme author.
	 */
	function tachyon_posted_by() {
		printf(
		/* translators: 1: posted by label, only visible to screen readers. 2: author link. 3: post author. */
			'<div><span class="sr-only">%1$s</span><span class="author vcard"><a class="url fn n" href="%2$s">%3$s</a></span></div>',
			esc_html__( 'Posted by', 'tachyon' ),
			esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
			esc_html( get_the_author() )
		);
	}
endif;

if ( ! function_exists( 'tachyon_comment_count' ) ) :
	/**
	 * Prints HTML with the comment count for the current post.
	 */
	function tachyon_comment_count() {
		if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			/* translators: %s: Name of current post. Only visible to screen readers. */
			comments_popup_link( sprintf( __( 'Leave a comment<span class="sr-only"> on %s</span>', 'tachyon' ), get_the_title() ) );
		}
	}
endif;

if ( ! function_exists( 'tachyon_entry_meta' ) ) :
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 * This template tag is used in the entry header.
	 */
	function tachyon_entry_meta() {

		// Hide author, post date, category and tag text for pages.
		if ( 'post' === get_post_type() ) {

			/* translators: used between list items, there is a space after the comma. */
			$categories_list = get_the_category_list( __( ', ', 'tachyon' ) );
			if ( $categories_list ) {
				printf(
				/* translators: 1: posted in label, only visible to screen readers. 2: list of categories. */
					'<div class="font-extrabold"><span class="sr-only">%1$s</span>%2$s</div>',
					esc_html__( 'Posted in', 'tachyon' ),
					$categories_list // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				);
			}

			/* translators: used between list items, there is a space after the comma. */
			$tags_list = get_the_tag_list( '', __( ', ', 'tachyon' ) );
			if ( $tags_list ) {
				printf(
				/* translators: 1: tags label, only visible to screen readers. 2: list of tags. */
					'<div class="font-extrabold"><span class="sr-only">%1$s</span>%2$s</div>',
					esc_html__( 'Tags:', 'tachyon' ),
					$tags_list // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				);
			}

			// Posted by.
			tachyon_posted_by();

			// Posted on.
			tachyon_posted_on();
		}

		// Comment count.

		// Edit post link.
		edit_post_link(
			sprintf(
				wp_kses(
				/* translators: %s: Name of current post. Only visible to screen readers. */
					__( 'Edit <span class="sr-only">%s</span>', 'tachyon' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				get_the_title()
			)
		);
	}
endif;

if ( ! function_exists( 'tachyon_post_thumbnail' ) ) :
	/**
	 * Displays an optional post thumbnail, wrapping the post thumbnail in an
	 * anchor element except when viewing a single post.
	 */
	function tachyon_post_thumbnail() {
		if ( ! tachyon_can_show_post_thumbnail() ) {
			return;
		}

		if ( is_singular() ) :
			?>

			<figure>
				<?php the_post_thumbnail(); ?>
			</figure><!-- .post-thumbnail -->

			<?php
		else :
			?>

			<figure class="flex flex-shrink-0 items-center justify-center list-thumbnail" style="background-image: url(<?php the_post_thumbnail_url( 'tachyon-list-thumbnail' ); ?>);">
				<a href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
					<?php the_post_thumbnail( 'tachyon-list-thumbnail' ); ?>
				</a>
			</figure>

			<?php
		endif; // End is_singular().
	}
endif;

if ( ! function_exists( 'tachyon_comment_avatar' ) ) :
	/**
	 * Returns the HTML markup to generate a user avatar.
	 *
	 * @param mixed $id_or_email The Gravatar to retrieve. Accepts a user_id, gravatar md5 hash,
	 *                           user email, WP_User object, WP_Post object, or WP_Comment object.
	 */
	function tachyon_get_user_avatar_markup( $id_or_email = null ) {

		if ( ! isset( $id_or_email ) ) {
			$id_or_email = get_current_user_id();
		}

		return sprintf( '<div class="vcard">%s</div>', get_avatar( $id_or_email, tachyon_get_avatar_size() ) );
	}
endif;

if ( ! function_exists( 'tachyon_discussion_avatars_list' ) ) :
	/**
	 * Displays a list of avatars involved in a discussion for a given post.
	 *
	 * @param array $comment_authors Comment authors to list as avatars.
	 */
	function tachyon_discussion_avatars_list( $comment_authors ) {
		if ( empty( $comment_authors ) ) {
			return;
		}
		echo '<ol>', "\n";
		foreach ( $comment_authors as $id_or_email ) {
			printf(
				"<li>%s</li>\n",
				tachyon_get_user_avatar_markup( $id_or_email ) // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			);
		}
		echo '</ol>', "\n";
	}
endif;

if ( ! function_exists( 'tachyon_the_posts_navigation' ) ) :
	/**
	 * Wraps `the_posts_pagination` for use throughout the theme.
	 */
	function tachyon_the_posts_navigation() {
		the_posts_pagination(
			array(
				'class'     => 'mt-5',
				'mid_size'  => 2,
				'prev_text' => __( 'Newer posts', 'tachyon' ),
				'next_text' => __( 'Older posts', 'tachyon' ),
			)
		);
	}
endif;

if ( ! function_exists( 'tachyon_content_class' ) ) :
	/**
	 * Displays the class names for the post content wrapper.
	 *
	 * This allows us to add Tailwind Typography’s modifier classes throughout
	 * the theme without repeating them in multiple files. (They can be edited
	 * at the top of the `../functions.php` file via the
	 * TACHYON_TYPOGRAPHY_CLASSES constant.)
	 *
	 * Based on WordPress core’s `body_class` and `get_body_class` functions.
	 *
	 * @param array $class Space-separated string or array of class names to
	 *                     add to the class list.
	 */
	function tachyon_content_class( $class = '' ) {
		$all_classes = array( $class, TACHYON_TYPOGRAPHY_CLASSES );

		foreach ( $all_classes as &$classes ) {
			if ( ! empty( $classes ) ) {
				if ( ! is_array( $classes ) ) {
					$classes = preg_split( '#\s+#', $classes );
				}
			} else {
				// Ensure that we always coerce class to being an array.
				$classes = array();
			}
		}

		$combined_classes = array_merge( $all_classes[0], $all_classes[1] );
		$combined_classes = array_map( 'esc_attr', $combined_classes );

		// Separates class names with a single space, preparing them for the
		// post content wrapper.
		echo 'class="' . esc_attr( implode( ' ', $combined_classes ) ) . '"';
	}
endif;
