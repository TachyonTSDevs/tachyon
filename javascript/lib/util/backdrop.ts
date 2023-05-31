/**
 * --------------------------------------------------------------------------
 * Bootstrap util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import { execute, executeAfterTransition, getElement, reflow } from './';

/**
 * Constants
 */

const CLASS_NAME_FADE = 'opacity-0';
const CLASS_NAME_SHOW = 'opacity-50';
const EVENT_MOUSEDOWN = 'mousedown';

type Config = {
	className: string;
	clickCallback: (() => void) | null;
	isAnimated: boolean;
	isVisible: boolean;
	rootElement: Element | null;
};

/**
 * Class definition
 */

export class Backdrop {
	config: Config = {
		className:
			'fixed top-0 left-0 z-30 w-screen h-screen bg-black transition-opacity',
		clickCallback: null,
		isAnimated: false,
		isVisible: true, // if false, we use the backdrop helper without adding any element to the dom
		rootElement: null, // give the choice to place backdrop under different elements
	};
	_element: HTMLDivElement | null;
	_isAppended: boolean;
	private readonly _handleMousedown;

	constructor(
		config: Partial<Config & { rootElement: Element | string | null }> = {}
	) {
		this.config = this._configAfterMerge({ ...this.config, ...config });
		this._isAppended = false;
		this._element = null;

		this._handleMousedown = () => {
			execute(this.config.clickCallback);
		};
	}

	// Public
	show(callback?: () => void) {
		if (!this.config.isVisible) {
			execute(callback);
			return;
		}

		this._append();

		const element = this._getElement();
		if (this.config.isAnimated) {
			reflow(element);
		}

		element.classList.add(CLASS_NAME_SHOW);

		this._emulateAnimation(() => {
			execute(callback);
		});
	}

	hide(callback?: () => void) {
		if (!this.config.isVisible) {
			execute(callback);
			return;
		}

		this._getElement().classList.remove(CLASS_NAME_SHOW);

		this._emulateAnimation(() => {
			this.dispose();
			execute(callback);
		});
	}

	dispose() {
		if (!this._isAppended) {
			return;
		}

		this._element?.removeEventListener(
			EVENT_MOUSEDOWN,
			this._handleMousedown
		);

		this._element?.remove();
		this._isAppended = false;
	}

	// Private
	_getElement() {
		if (!this._element) {
			const backdrop = document.createElement('div');
			backdrop.className = this.config.className;
			if (this.config.isAnimated) {
				backdrop.classList.add(CLASS_NAME_FADE);
			}

			this._element = backdrop;
		}

		return this._element;
	}

	_configAfterMerge(
		config: Config & { rootElement: Element | string | null }
	): Config {
		// use getElement() with the default "body" to get a fresh Element on each instantiation
		config.rootElement = getElement(config.rootElement ?? 'body');
		return config;
	}

	_append() {
		if (this._isAppended) {
			return;
		}

		const element = this._getElement();
		this.config.rootElement?.append(element);

		element.addEventListener(EVENT_MOUSEDOWN, this._handleMousedown);

		this._isAppended = true;
	}

	_emulateAnimation(callback: any) {
		executeAfterTransition(
			callback,
			this._getElement(),
			this.config.isAnimated
		);
	}
}
