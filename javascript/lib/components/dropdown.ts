/**
 * --------------------------------------------------------------------------
 * Bootstrap dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import {
	getNextActiveElement,
	isDisabled,
	isVisible,
	noop,
	reflow,
} from '@/util';

/**
 * Constants
 */

const ESCAPE_KEY = 'Escape';
const TAB_KEY = 'Tab';
const ARROW_UP_KEY = 'ArrowUp';
const ARROW_DOWN_KEY = 'ArrowDown';
const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

const CLASS_NAME_SHOW = 'sub-menu-expanded';
const CLASS_NAME_APPLY_ANIMATION = 'apply-animation';

const SELECTOR_VISIBLE_ITEMS =
	'.sub-menu > .menu-item > :is(a, button):not(.disabled):not(:disabled)';

const ANIMATION_DURATION = 300;

type Config = {
	autoClose: boolean | 'inside' | 'outside';
};

/**
 * Class definition
 */

export class Dropdown {
	readonly _element;
	readonly _parent;
	readonly _menu;
	config: Config = {
		autoClose: true,
	};
	static readonly _instances: Dropdown[] = [];

	constructor(
		btn: HTMLElement,
		menu: HTMLElement,
		config: Partial<Config> = {}
	) {
		this._element = btn;
		this._parent = this._element.parentElement;
		this._menu = menu;
		this.config = { ...this.config, ...config };

		btn.addEventListener('click', (event) => {
			event.preventDefault();
			this.toggle();
		});

		const keydownHandler = (event: KeyboardEvent) => {
			// If not an UP | DOWN | ESCAPE key => not a dropdown command
			// If input/textarea && if key is other than ESCAPE => not a dropdown command

			const isInput =
				event.target instanceof HTMLElement &&
				/input|textarea/i.test(event.target.tagName);
			const isEscapeEvent = event.key === ESCAPE_KEY;
			const isUpOrDownEvent = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(
				event.key
			);

			if (!isUpOrDownEvent && !isEscapeEvent) {
				return;
			}

			if (isInput && !isEscapeEvent) {
				return;
			}

			event.preventDefault();

			if (isUpOrDownEvent) {
				event.stopPropagation();
				this.show();
				this._selectMenuItem(event);
				return;
			}

			if (this._isShown()) {
				// else is escape and we check if it is shown
				event.stopPropagation();
				this.hide();
				this._element.focus();
			}
		};
		btn.addEventListener('keydown', keydownHandler);
		menu.addEventListener('keydown', keydownHandler);

		Dropdown._instances.push(this);
	}

	// Public
	toggle() {
		return this._isShown() ? this.hide() : this.show();
	}

	show() {
		if (isDisabled(this._element) || this._isShown()) {
			return;
		}

		// If this is a touch-enabled device we add extra
		// empty mouseover listeners to the body's immediate children;
		// only needed because of broken event delegation on iOS
		// https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
		if ('ontouchstart' in document.documentElement) {
			for (const element of Array.from(document.body.children)) {
				element.addEventListener('mouseover', noop);
			}
		}

		this._element.focus();
		this._element.setAttribute('aria-expanded', 'true');

		this._parent?.classList.add(CLASS_NAME_SHOW);

		// Slide Down Animation
		const menu = this._menu;
		const height = menu.offsetHeight;

		menu.classList.add(CLASS_NAME_APPLY_ANIMATION);

		reflow(menu);

		menu.style.transitionProperty = 'height, margin, padding';
		menu.style.transitionDuration = ANIMATION_DURATION + 'ms';
		menu.style.height = height + 'px';
		menu.classList.remove(CLASS_NAME_APPLY_ANIMATION);

		setTimeout(() => {
			menu.style.removeProperty('transition-duration');
			menu.style.removeProperty('transition-property');
			menu.style.removeProperty('height');
		}, ANIMATION_DURATION);
	}

	hide() {
		if (isDisabled(this._element) || !this._isShown()) {
			return;
		}

		this._completeHide();
	}

	// Private
	_completeHide() {
		// If this is a touch-enabled device we remove the extra
		// empty mouseover listeners we added for iOS support
		if ('ontouchstart' in document.documentElement) {
			for (const element of Array.from(document.body.children)) {
				element.removeEventListener('mouseover', noop);
			}
		}

		this._parent?.classList.remove(CLASS_NAME_SHOW);
		this._element.setAttribute('aria-expanded', 'false');

		// Slide Up Animation
		const menu = this._menu;

		menu.style.display = 'block';
		menu.style.height = menu.offsetHeight + 'px';

		reflow(menu);

		menu.style.transitionProperty = 'height, margin, padding';
		menu.style.transitionDuration = ANIMATION_DURATION + 'ms';
		menu.style.removeProperty('height');
		menu.classList.add(CLASS_NAME_APPLY_ANIMATION);

		setTimeout(() => {
			menu.style.removeProperty('display');
			menu.style.removeProperty('transition-duration');
			menu.style.removeProperty('transition-property');
			menu.classList.remove(CLASS_NAME_APPLY_ANIMATION);
		}, ANIMATION_DURATION);
	}

	_isShown() {
		return this._element.getAttribute('aria-expanded') === 'true';
	}

	_selectMenuItem({ key, target }: KeyboardEvent) {
		const items = Array.from(
			this._menu.querySelectorAll(SELECTOR_VISIBLE_ITEMS)
		).filter(
			(element): element is HTMLElement =>
				isVisible(element) && element instanceof HTMLElement
		);

		if (!items.length) {
			return;
		}

		// if target isn't included in items (e.g. when expanding the dropdown)
		// allow cycling to get the last item in case key equals ARROW_UP_KEY
		target instanceof HTMLElement &&
			getNextActiveElement(
				items,
				target,
				key === ARROW_DOWN_KEY,
				!items.includes(target)
			).focus();
	}

	static clearMenus(event: MouseEvent | KeyboardEvent) {
		if (
			('button' in event && event.button === RIGHT_MOUSE_BUTTON) ||
			('key' in event && event.type === 'keyup' && event.key !== TAB_KEY)
		) {
			return;
		}

		for (const context of Dropdown._instances.filter((item) =>
			item._isShown()
		)) {
			if (!context || context.config.autoClose === false) {
				continue;
			}

			const composedPath = event.composedPath();
			const isMenuTarget = composedPath.includes(context._menu);
			if (
				composedPath.includes(context._element) ||
				(context.config.autoClose === 'inside' && !isMenuTarget) ||
				(context.config.autoClose === 'outside' && isMenuTarget)
			) {
				continue;
			}

			// Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
			if (
				event.target instanceof Element &&
				context._menu.contains(event.target) &&
				(('key' in event &&
					event.type === 'keyup' &&
					event.key === TAB_KEY) ||
					/input|select|option|textarea|form/i.test(
						event.target.tagName
					))
			) {
				continue;
			}

			context._completeHide();
		}
	}
}

document.addEventListener('click', Dropdown.clearMenus);
document.addEventListener('keyup', Dropdown.clearMenus);
