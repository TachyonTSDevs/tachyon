/**
 * --------------------------------------------------------------------------
 * Bootstrap util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const MILLISECONDS_MULTIPLIER = 1000;
const TRANSITION_END = 'transitionend';

/**
 * Properly escape IDs selectors to handle weird IDs
 * @param {string} selector
 * @returns {string}
 */
export const parseSelector = (selector: string) => {
	if (selector && window.CSS && !!window.CSS.escape) {
		// document.querySelector needs escaping to handle IDs (html5+) containing for instance /
		selector = selector.replace(
			/#([^\s"#']+)/g,
			(_, id) => `#${CSS.escape(id)}`
		);
	}

	return selector;
};

export const getTransitionDurationFromElement = (element: Element | null) => {
	if (!element) {
		return 0;
	}

	// Get transition-duration of the element
	let { transitionDuration, transitionDelay } =
		window.getComputedStyle(element);

	const floatTransitionDuration = Number.parseFloat(transitionDuration);
	const floatTransitionDelay = Number.parseFloat(transitionDelay);

	// Return 0 if element or transition duration is not found
	if (!floatTransitionDuration && !floatTransitionDelay) {
		return 0;
	}

	// If multiple durations are defined, take the first
	transitionDuration = transitionDuration.split(',')[0];
	transitionDelay = transitionDelay.split(',')[0];

	return (
		(Number.parseFloat(transitionDuration) +
			Number.parseFloat(transitionDelay)) *
		MILLISECONDS_MULTIPLIER
	);
};

export const triggerTransitionEnd = (element: EventTarget) => {
	element.dispatchEvent(new Event(TRANSITION_END));
};

export const getElement = (object: any) => {
	if (object instanceof Element) return object;

	if (typeof object === 'string' && object.length > 0) {
		return document.querySelector(parseSelector(object));
	}

	return null;
};

export const isVisible = (element: any) => {
	if (
		!(element instanceof Element) ||
		element.getClientRects().length === 0
	) {
		return false;
	}

	const elementIsVisible =
		getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	// Handle `details` element as its content may falsie appear visible when it is closed
	const closedDetails = element.closest('details:not([open])');

	if (!closedDetails) {
		return elementIsVisible;
	}

	if (closedDetails !== element) {
		const summary = element.closest('summary');
		if (summary && summary.parentNode !== closedDetails) {
			return false;
		}

		if (summary === null) {
			return false;
		}
	}

	return elementIsVisible;
};

export const isDisabled = (element: any) => {
	if (!element || element.nodeType !== Node.ELEMENT_NODE) {
		return true;
	}

	if (element.classList.contains('disabled')) {
		return true;
	}

	if (typeof element.disabled !== 'undefined') {
		return element.disabled;
	}

	return (
		element.hasAttribute('disabled') &&
		element.getAttribute('disabled') !== 'false'
	);
};

export const noop = () => {};

/**
 * Trick to restart an element's animation
 *
 * @param {Element} element
 * @return void
 *
 * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
 */
export const reflow = (element: HTMLElement) => {
	void element.offsetHeight;
};

export const isRTL = () => document.documentElement.dir === 'rtl';

export const execute = (
	possibleCallback: any,
	args = [],
	defaultValue = possibleCallback
) => {
	return typeof possibleCallback === 'function'
		? possibleCallback(...args)
		: defaultValue;
};

export const executeAfterTransition = (
	callback: any,
	transitionElement: Element | null,
	waitForTransition = true
) => {
	if (!waitForTransition) {
		execute(callback);
		return;
	}

	const durationPadding = 5;
	const emulatedDuration =
		getTransitionDurationFromElement(transitionElement) + durationPadding;

	let called = false;

	const handler: EventListener = ({ target }) => {
		if (target !== transitionElement) {
			return;
		}

		called = true;
		transitionElement?.removeEventListener(TRANSITION_END, handler);
		execute(callback);
	};

	transitionElement?.addEventListener(TRANSITION_END, handler);
	setTimeout(() => {
		if (!called) {
			if (transitionElement) {
				triggerTransitionEnd(transitionElement);
			} else {
				called = true;
				execute(callback);
			}
		}
	}, emulatedDuration);
};

/**
 * Return the previous/next element of a list.
 *
 * @param {array} list    The list of elements
 * @param activeElement   The active element
 * @param shouldGetNext   Choose to get next or previous element
 * @param isCycleAllowed
 * @return {Element|elem} The proper element
 */
export const getNextActiveElement = (
	list: HTMLElement[],
	activeElement: any,
	shouldGetNext: boolean,
	isCycleAllowed: boolean
) => {
	const listLength = list.length;
	let index = list.indexOf(activeElement);

	// if the element does not exist in the list return an element
	// depending on the direction and if cycle is allowed
	if (index === -1) {
		return !shouldGetNext && isCycleAllowed
			? list[listLength - 1]
			: list[0];
	}

	index += shouldGetNext ? 1 : -1;

	if (isCycleAllowed) {
		index = (index + listLength) % listLength;
	}

	return list[Math.max(0, Math.min(index, listLength - 1))];
};

export const focusableChildren = (element: Element) => {
	const focusables = [
		'a',
		'button',
		'input',
		'textarea',
		'select',
		'details',
		'[tabindex]',
		'[contenteditable="true"]',
	]
		.map((selector) => `${selector}:not([tabindex^="-"])`)
		.join(',');

	return Array.from(element.querySelectorAll(focusables)).filter(
		(el) => !isDisabled(el) && isVisible(el)
	) as HTMLElement[];
};
