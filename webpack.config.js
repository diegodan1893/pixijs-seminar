const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const publicPath = path.resolve(__dirname, "public")
const srcPath = path.resolve(__dirname, "src")
const buildPath = path.resolve(__dirname, "dist")

module.exports = {
	entry: path.join(srcPath, "index.ts"),

	output: {
		path: buildPath,
		filename: "[name]-[contenthash].js",
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: { presets: ["@babel/env"] },
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: "ts-loader",
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: "postcss-loader",
					},
				],
			},
			{
				test: /\.(png|jp(e*)g|svg|gif|mp3)$/,
				exclude: /node_modules/,
				loader: "file-loader",
				options: {
					esModule: false,
				},
			},
		],
	},

	resolve: {
		extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(publicPath, "index.html"),
			favicon: path.join(publicPath, "favicon.png"),
			filename: "index.html",
		}),
	],
}
