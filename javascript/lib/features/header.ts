import { Dropdown } from '@/components/dropdown';

/**
 * Header
 */
export const initHeader = () => {
	const masthead = document.querySelector('#masthead');
	if (!masthead) return;

	const sub_menus = masthead.querySelectorAll('ul.sub-menu');
	for (const menu of sub_menus) {
		if (menu.previousElementSibling?.matches('button.sub-menu-toggle'))
			new Dropdown(
				menu.previousElementSibling as HTMLButtonElement,
				menu as HTMLUListElement
			);
	}
};
