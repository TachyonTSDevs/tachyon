/**
 * The JavaScript code you place here will be processed by esbuild, and the
 * output file will be created at `../theme/js/script.min.js` and enqueued by
 * default in `../theme/functions.php`.
 *
 * For esbuild documentation, please see:
 * https://esbuild.github.io/
 */

import { initModal } from '@/components/modal';
import { initOffcanvas } from '@/components/offcanvas';
import { initColorModes } from '@/features/color-modes';
import { initHeader } from '@/features/header';

document.addEventListener('DOMContentLoaded', () => {
	initHeader();
	initColorModes();
	initOffcanvas();
	initModal();

	const searchModal = document.getElementById('search-modal');
	const myInput = searchModal?.querySelector<HTMLInputElement>(
		'input[type="search"]'
	);

	searchModal?.addEventListener('shown.modal', () => {
		myInput?.focus();
	});
});
