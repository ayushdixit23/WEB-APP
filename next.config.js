/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
	webpack: (config, { isServer }) => {
		// Ensure .wav files can be imported as modules
		config.module.rules.push({
			test: /\.(wav|mp3|m4a|aac|oga)$/,
			use: {
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
				},
			},
		});

		return config;
	},
};

module.exports = nextConfig;
