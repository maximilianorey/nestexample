const globals = require("globals");
const tseslint = require("typescript-eslint");
const prettier = require("eslint-config-prettier");
const js = require("@eslint/js");
const json = require("eslint-plugin-json");

const { globalIgnores } = require("eslint/config");

module.exports = tseslint.config(
	globalIgnores([
		"dist",
		"node_modules" 
	]),
	prettier,
	{
		files: [ "**/*.js" ],
		extends: [ js.configs.recommended ],
		rules: { 
			"quote-props": [
				"error",
				"as-needed" 
			],
			"array-bracket-newline": "error",
			"array-element-newline": "error",
			"function-call-argument-newline": "error",
			"object-property-newline": [
				"error",
				{ allowAllPropertiesOnSameLine: false } 
			],
			quotes: [
				"error",
				"double" 
			],
			"object-curly-spacing": [
				"error",
				"always" 
			],
			"object-curly-newline":[
				"error",
				{
					consistent: true,
					multiline: true,
					minProperties: 3 
				} 
			],
			"array-bracket-spacing": [
				"error",
				"always" 
			],
			"computed-property-spacing": [
				"error",
				"always" 
			],
			indent: [
				"error",
				"tab" 
			],
			semi: "error"
		},
		languageOptions: {
			globals: globals.node
		}
	},
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended
		],
		files: [ "**/*.ts" ],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.node,
		},
		rules: {
			quotes: [
				"error",
				"double" 
			],
			"object-curly-spacing": [
				"error",
				"always" 
			],
			"array-bracket-spacing": [
				"error",
				"always" 
			],
			"computed-property-spacing": [
				"error",
				"always" 
			],
			indent: [
				"error",
				"tab" 
			],
			semi: "error",
			"@typescript-eslint/no-empty-object-type": "off"
		}
	},
	{
		...json.configs[ "recommended" ],
		files: [ "**/*.json" ]
	},
 
);