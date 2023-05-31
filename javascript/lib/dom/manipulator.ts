/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

function normalizeData(value: any) {
	if (value === 'true') {
		return true;
	}

	if (value === 'false') {
		return false;
	}

	if (value === Number(value).toString()) {
		return Number(value);
	}

	if (value === '' || value === 'null') {
		return null;
	}

	if (typeof value !== 'string') {
		return value;
	}

	try {
		return JSON.parse(decodeURIComponent(value));
	} catch {
		return value;
	}
}

function normalizeDataKey(key: string) {
	return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
}

export const Manipulator = {
	setDataAttribute(element: Element, key: string, value: string) {
		element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
	},

	removeDataAttribute(element: Element, key: string) {
		element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
	},

	getDataAttributes(element: HTMLElement) {
		if (!element) {
			return {};
		}

		const attributes: Record<string, any> = {};
		const bsKeys = Object.keys(element.dataset).filter(
			(key) => key.startsWith('bs') && !key.startsWith('bsConfig')
		);

		for (const key of bsKeys) {
			let pureKey = key.replace(/^bs/, '');
			pureKey =
				pureKey.charAt(0).toLowerCase() +
				pureKey.slice(1, pureKey.length);
			attributes[pureKey] = normalizeData(element.dataset[key]);
		}

		return attributes;
	},

	getDataAttribute(element: Element, key: string) {
		return normalizeData(
			element.getAttribute(`data-bs-${normalizeDataKey(key)}`)
		);
	},
};
