/**
 * --------------------------------------------------------------------------
 * Bootstrap util/component-functions.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import { isDisabled } from '.';

const enableDismissTrigger = (component: {
	NAME: string;
	getOrCreateInstance: (...args: any) => { hide(): void };
}) => {
	const name = component.NAME;

	const handleDismiss = function (this: HTMLElement, event: MouseEvent) {
		if (['A', 'AREA'].includes(this.tagName)) {
			event.preventDefault();
		}
		if (isDisabled(this)) {
			return;
		}
		const target = this.closest(`.${name}`);
		if (!target) return;

		const instance = component.getOrCreateInstance(target);
		instance.hide();
	};

	document
		.querySelectorAll<HTMLElement>(`[data-dismiss="${name}"]`)
		.forEach((btn) => {
			btn.addEventListener('click', handleDismiss);
		});
};

export { enableDismissTrigger };
