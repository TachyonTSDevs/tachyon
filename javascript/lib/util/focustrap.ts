/**
 * --------------------------------------------------------------------------
 * Bootstrap util/focustrap.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import { focusableChildren } from '.';

/**
 * Constants
 */

const EVENT_FOCUSIN = 'focusin';
const EVENT_KEYDOWN = 'keydown';

const TAB_KEY = 'Tab';
const TAB_NAV_FORWARD = 'forward';
const TAB_NAV_BACKWARD = 'backward';

type Config = {
	autofocus: boolean;
	trapElement: HTMLElement | null;
};

/**
 * Class definition
 */

export class FocusTrap {
	_isActive;
	config: Config = {
		autofocus: true,
		trapElement: null, // The element to trap focus inside of
	};
	_lastTabNavDirection:
		| typeof TAB_NAV_FORWARD
		| typeof TAB_NAV_BACKWARD
		| null;
	private readonly _handleFocusinWrapper: typeof this._handleFocusin;
	private readonly _handleKeydownWrapper: typeof this._handleKeydown;

	constructor(config: Partial<Config>) {
		this.config = { ...this.config, ...config };
		this._isActive = false;
		this._lastTabNavDirection = null;

		this._handleFocusinWrapper = (event) => this._handleFocusin(event);
		this._handleKeydownWrapper = (event) => this._handleKeydown(event);
	}

	// Public
	activate() {
		if (this._isActive) {
			return;
		}

		if (this.config.autofocus) {
			this.config.trapElement?.focus();
		}

		document.addEventListener(EVENT_FOCUSIN, this._handleFocusinWrapper);
		document.addEventListener(EVENT_KEYDOWN, this._handleKeydownWrapper);

		this._isActive = true;
	}

	deactivate() {
		if (!this._isActive) {
			return;
		}

		this._isActive = false;
		document.removeEventListener(EVENT_FOCUSIN, this._handleFocusinWrapper);
		document.removeEventListener(EVENT_KEYDOWN, this._handleKeydownWrapper);
	}

	// Private
	_handleFocusin(event: FocusEvent) {
		const { trapElement } = this.config;

		if (
			!trapElement ||
			event.target === document ||
			event.target === trapElement ||
			(event.target instanceof Node &&
				trapElement?.contains(event.target))
		) {
			return;
		}

		const elements = focusableChildren(trapElement);

		if (elements.length === 0) {
			trapElement.focus();
		} else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
			elements[elements.length - 1].focus();
		} else {
			elements[0].focus();
		}
	}

	_handleKeydown(event: KeyboardEvent) {
		if (event.key !== TAB_KEY) {
			return;
		}

		this._lastTabNavDirection = event.shiftKey
			? TAB_NAV_BACKWARD
			: TAB_NAV_FORWARD;
	}
}
