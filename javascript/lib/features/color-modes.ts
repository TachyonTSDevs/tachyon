/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

type Theme = 'dark' | 'light' | 'auto';

const isValidTheme = (x: string): x is Theme =>
	['dark', 'light', 'auto'].includes(x);

const storedTheme = localStorage.getItem('theme');

const getPreferredTheme = (): Theme => {
	if (storedTheme && isValidTheme(storedTheme)) {
		return storedTheme;
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
};

const setTheme = (theme: Theme) =>
	document.documentElement.classList[
		(theme === 'auto' &&
			window.matchMedia('(prefers-color-scheme: dark)').matches) ||
		theme === 'dark'
			? 'add'
			: 'remove'
	]('dark');

setTheme(getPreferredTheme());

export const initColorModes = () => {
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', () => {
			if (storedTheme !== 'light' && storedTheme !== 'dark') {
				setTheme(getPreferredTheme());
			}
		});

	const themeSwitcher = document.querySelector(
		'button#switch-theme'
	) as HTMLButtonElement | null;

	if (!themeSwitcher) {
		return;
	}

	const showActiveTheme = (theme: Theme, focus = false) => {
		const themeSwitcherText = themeSwitcher.querySelector('span');
		const activeThemeIcon = themeSwitcher.querySelector('svg use');
		const btnToActive = document.querySelector(
			`button[data-theme-value="${theme}"]`
		) as HTMLButtonElement | null;
		const svgOfActiveBtn = (() => {
			const icon = btnToActive?.querySelector('svg use');
			return (
				icon &&
				(icon.getAttribute('href') ?? icon.getAttribute('xlink:href'))
			);
		})();

		document.querySelectorAll('[data-theme-value]').forEach((element) => {
			element.classList.remove('active');
			element.setAttribute('aria-pressed', 'false');
		});

		svgOfActiveBtn && activeThemeIcon?.setAttribute('href', svgOfActiveBtn);
		if (btnToActive) {
			btnToActive.classList.add('active');
			btnToActive.setAttribute('aria-pressed', 'true');
			if (themeSwitcherText) {
				themeSwitcherText.textContent = btnToActive.innerText;
			}
		}

		if (focus) {
			themeSwitcher.focus();
		}
	};

	showActiveTheme(getPreferredTheme());

	document.querySelectorAll('[data-theme-value]').forEach((toggle) => {
		toggle.addEventListener('click', () => {
			const theme = toggle.getAttribute('data-theme-value');

			if (!(theme && isValidTheme(theme))) return;

			localStorage.setItem('theme', theme);
			setTheme(theme);
			showActiveTheme(theme, true);
		});
	});
};
