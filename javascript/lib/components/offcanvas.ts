/**
 * --------------------------------------------------------------------------
 * Bootstrap offcanvas.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import { Backdrop } from '@/util/backdrop';
import { enableDismissTrigger } from '@/util/component-functions';
import { FocusTrap } from '@/util/focustrap';
import {
	executeAfterTransition,
	isDisabled,
	isVisible,
	parseSelector,
	reflow,
} from '@/util';
import { ScrollBarHelper } from '@/util/scrollbar';

/**
 * Constants
 */

const NAME = 'offcanvas';
const DATA_KEY = 'offcanvas';
const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_LOAD = 'load';
const ESCAPE_KEY = 'Escape';

const CLASS_NAME_SHOW = 'show';
const CLASS_NAME_SHOWING = 'showing';
const CLASS_NAME_HIDING = 'hiding';
const OPEN_SELECTOR = '.offcanvas.show';

const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_RESIZE = 'resize';
const EVENT_CLICK = 'click';
const EVENT_KEYDOWN = 'keydown';

const SELECTOR_DATA_TOGGLE = '[data-toggle="offcanvas"]';

type Config = {
	backdrop: boolean | string;
	keyboard: boolean;
	scroll: boolean;
};

/**
 * Class definition
 */

class Offcanvas {
	readonly _element;
	readonly _backdrop;
	readonly _focustrap;
	_isShown;
	config: Config = {
		backdrop: true,
		keyboard: true,
		scroll: false,
	};
	static readonly _instancesMap: Map<Element, Offcanvas> = new Map();

	constructor(element: HTMLElement, config: Partial<Config> = {}) {
		this._element = element;
		this._backdrop = this._initializeBackDrop();
		this._focustrap = this._initializeFocusTrap();
		this._isShown = false;
		this.config = { ...this.config, ...config };
		this._addEventListeners();
		Offcanvas._instancesMap.set(element, this);
	}

	static get NAME() {
		return NAME;
	}

	// Public
	toggle() {
		return this._isShown ? this.hide() : this.show();
	}

	show() {
		if (this._isShown) {
			return;
		}

		this._isShown = true;
		this._backdrop.show();

		if (!this.config.scroll) {
			new ScrollBarHelper().hide();
		}

		this._element.setAttribute('aria-modal', 'true');
		this._element.setAttribute('role', 'dialog');

		// Hacky trick to make the animation work
		this._element.classList.add(CLASS_NAME_HIDING);
		reflow(this._element);
		this._element.classList.remove(CLASS_NAME_HIDING);

		this._element.classList.add(CLASS_NAME_SHOWING);

		const completeCallBack = () => {
			if (!this.config.scroll || this.config.backdrop) {
				this._focustrap.activate();
			}

			this._element.classList.add(CLASS_NAME_SHOW);
			this._element.classList.remove(CLASS_NAME_SHOWING);
		};

		executeAfterTransition(completeCallBack, this._element, true);
	}

	hide() {
		if (!this._isShown) {
			return;
		}

		this._focustrap.deactivate();
		this._element.blur();
		this._isShown = false;
		this._element.classList.add(CLASS_NAME_HIDING);
		this._backdrop.hide();

		const completeCallback = () => {
			this._element.classList.remove(CLASS_NAME_SHOW, CLASS_NAME_HIDING);
			this._element.removeAttribute('aria-modal');
			this._element.removeAttribute('role');

			if (!this.config.scroll) {
				new ScrollBarHelper().reset();
			}

			this._element.dispatchEvent(new Event(EVENT_HIDDEN));
		};

		executeAfterTransition(completeCallback, this._element, true);
	}

	dispose() {
		this._backdrop.dispose();
		this._focustrap.deactivate();
	}

	// Private
	_initializeBackDrop() {
		const clickCallback = () => {
			if (this.config.backdrop === 'static') {
				return;
			}

			this.hide();
		};

		// 'static' option will be translated to true, and booleans will keep their value
		const isVisible = Boolean(this.config.backdrop);

		return new Backdrop({
			isVisible,
			isAnimated: true,
			rootElement: this._element.parentElement,
			clickCallback: isVisible ? clickCallback : null,
		});
	}

	_initializeFocusTrap() {
		return new FocusTrap({
			trapElement: this._element,
		});
	}

	_addEventListeners() {
		this._element.addEventListener(EVENT_KEYDOWN, (event) => {
			if (event.key === ESCAPE_KEY && this.config.keyboard) {
				this.hide();
			}
		});
	}

	// Static
	static getInstance(element: Element) {
		return this._instancesMap.get(element);
	}

	static getOrCreateInstance(
		...[element, ...args]: ConstructorParameters<typeof Offcanvas>
	) {
		return this.getInstance(element) || new this(element, ...args);
	}
}

export const initOffcanvas = () => {
	document
		.querySelectorAll<HTMLElement>(SELECTOR_DATA_TOGGLE)
		.forEach((btn) => {
			const selector = btn.getAttribute('aria-controls');
			const target =
				selector &&
				document.querySelector(`#${parseSelector(selector)}`);
			if (!target) return;

			btn.addEventListener(
				EVENT_CLICK,
				function (this: typeof btn, event) {
					if (['A', 'AREA'].includes(this.tagName)) {
						event.preventDefault();
					}

					if (isDisabled(this)) {
						return;
					}

					const handleHidden = () => {
						// focus on trigger when it is closed
						if (isVisible(this)) {
							this.focus();
						}
						target.removeEventListener(EVENT_HIDDEN, handleHidden);
					};
					target.addEventListener(EVENT_HIDDEN, handleHidden);

					// avoid conflict when clicking a toggler of an offcanvas, while another is open
					const alreadyOpen = document.querySelector(OPEN_SELECTOR);
					if (alreadyOpen && alreadyOpen !== target) {
						Offcanvas.getInstance(alreadyOpen)?.hide();
					}

					const data = Offcanvas.getOrCreateInstance(
						target as HTMLElement
					);
					data.toggle();
				}
			);
		});

	enableDismissTrigger(Offcanvas);
};

window.addEventListener(EVENT_LOAD, () => {
	for (const element of Array.from(
		document.querySelectorAll(OPEN_SELECTOR)
	)) {
		Offcanvas.getOrCreateInstance(element as HTMLElement).show();
	}
});

window.addEventListener(EVENT_RESIZE, () => {
	for (const element of Array.from(
		document.querySelectorAll(
			'[aria-modal][class*=show][class*=offcanvas-]'
		)
	)) {
		if (getComputedStyle(element).position !== 'fixed') {
			Offcanvas.getOrCreateInstance(element as HTMLElement).hide();
		}
	}
});
