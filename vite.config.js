import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
	resolve: {
		alias: {
			roseview: path.resolve(__dirname, "./index.js")
		}
	}
});
