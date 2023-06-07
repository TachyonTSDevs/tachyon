const theme = require('../theme/theme.json');
// Set the Preflight flag based on the build target.
const includePreflight = 'editor' === process.env._TW_TARGET ? false : true;

module.exports = {
	presets: [
		// Manage Tailwind Typography's configuration in a separate file.
		require('./tailwind-typography.config.js'),
	],
	content: [
		// Ensure changes to PHP files and `theme.json` trigger a rebuild.
		'./theme/**/*.php',
		'./theme/theme.json',
		'./javascript/**/*.{js,ts}',
	],
	theme: {
		container: {
			padding: {
				DEFAULT: '1rem',
			},
		},
		// Extend the default Tailwind theme.
		extend: {},
		screens: {
			xs: '480px',
			sm: '600px',
			md: '782px',
			lg: theme.settings.layout.contentSize,
			xl: theme.settings.layout.wideSize,
			'2xl': '1440px',
			'lt-lg': {
				max: `${
					parseFloat(theme.settings.layout.contentSize) - 0.02
				}px`,
			},
		},
	},
	corePlugins: {
		// Disable Preflight base styles in builds targeting the editor.
		preflight: includePreflight,
	},
	plugins: [
		// Extract colors and widths from `theme.json`.
		require('@_tw/themejson')(theme),

		// Add Tailwind Typography.
		require('@tailwindcss/typography'),

		// Uncomment below to add additional first-party Tailwind plugins.
		require('@tailwindcss/forms'),
		// require('@tailwindcss/aspect-ratio'),
		// require('@tailwindcss/container-queries'),
	],
	darkMode: 'class',
};
