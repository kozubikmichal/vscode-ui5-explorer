import * as vscode from "vscode";
import { IApiReferenceLibrarySymbol, IApiReferenceUI5Metadata, SymbolVisibility } from "../api/IApiReference";
import IPanelRenderer from "./IPanelRenderer";
import Config, { IUrlConfig } from "../api/Config";
import ExtensionConfig from "../utils/Config";

export default class PanelRenderer extends IPanelRenderer {
	private get UrlConfig(): IUrlConfig {
		return Config.Url.SAPUI5;
	}

	public renderDefault(panel: vscode.WebviewPanel) {
		panel.webview.html = `
		<html>
			<head></head>
			<body>
				loading...
			</body>
		</html>
		`;
	}

	public renderSymbol(panel: vscode.WebviewPanel, symbol: IApiReferenceLibrarySymbol) {
		let metadata = this.getUI5Metadata(symbol);

		panel.webview.html = `
		<html>
			<head>

			</head>
			<style>
				.grid-container {
					display: grid;
					grid-template-columns: auto auto auto;
					padding: 10px;
				}
				.grid-item {
					text-align: left;
				}
				th, td {
					border-bottom-style: solid;
					border-bottom-width: 1px;
					padding-left: 5px;
					padding-right: 5px;
				}
				table {
					border-collapse: collapse;
				}
			</style>
			<body>
					${this.buildHeader(symbol)}
					${this.buildOverview(symbol)}
					${this.buildConstructor(symbol)}
					${this.buildProperties(symbol, metadata)}
					${this.buildAggregations(symbol, metadata)}
					${this.buildAssociations(symbol, metadata)}
					${this.buildEvents(symbol, metadata)}
					${this.buildMethods(symbol, metadata)}

			</body>
		</html>
		`;
	}

	private buildHeader(symbol: IApiReferenceLibrarySymbol): string {
		let sampleLink = symbol.hasSample ? `
			<a href="${this.UrlConfig.sampleRoot}${symbol.name}">${symbol.name}</a>
		` : "";

		let docuLink = symbol.docuLink ? `
			<a href="${this.UrlConfig.documentationRoot}${symbol.docuLink}">${symbol.docuLinkText}</a>
		` : "";

		let uxLink = symbol.uxGuidelinesLink ? `
			<a href="${symbol.uxGuidelinesLink}">${symbol.uxGuidelinesLinkText}</a>
		` : "";
		let extendsUri = encodeURI(`command:${ExtensionConfig.Commands.Render}?${JSON.stringify(symbol.extends)}`);
		let extendsLink = symbol.extends ? `
			<a href="${extendsUri}">${symbol.extends}</a>
		`: "";

		return `
			<h1>${symbol.title}</h1>

			<div class="grid-container">
				<div class="grid-item">
					<strong>Control Sample:</strong> ${sampleLink}<br />
					<strong>Documentation:</strong> ${docuLink} <br />
					<strong>UX Guidelines:</strong> ${uxLink} <br />
				</div>
				<div class="grid-item">
					<strong>Extends:</strong> ${extendsLink}<br />
					<strong>Visibility:</strong> ${symbol.visibility || ""}<br />
					<strong>Module:</strong> ${symbol.module || ""}<br />
				</div>
				<div class="grid-item">
					<strong>Available since:</strong> ${symbol.since || ""}<br />
					<strong>Component:</strong> ${symbol.component || ""}<br />
				</div>
			</div>
		`;
	}

	private buildOverview(symbol: IApiReferenceLibrarySymbol): string {
		return symbol.description ? `
			<h2>Overview</h2>
			${symbol.description}
		` : "";
	}

	private buildConstructor(symbol: IApiReferenceLibrarySymbol): string {
		let { constructor } = symbol;
		// if "constructor" is not received from server than the variable is filled by object constructor function
		if (!constructor || typeof constructor === "function") {
			return "";
		}

		return `
			<h2>Constructor</h2>
			${constructor.description}
			<code>${constructor.codeExample}</code>
			<table>
				<tr>
					<th>Param</th>
					<th>Type</th>
					<th>Default Value</th>
					<th>Description</th>
				</tr>
				${constructor.parameters.map(param => `
					<tr>
						<td>${"&nbsp;&nbsp;".repeat(param.depth || 0)}<strong>${param.name}${param.optional && "?"}</strong></td>
						<td>${param.types.map(t => t.name).join(" | ")}</td>
						<td>${param.defaultValue || ""}</td>
						<td>${param.description}</td>
					</td>
				`).join("")}

			</table>
			<br />
		`;
	}

	private buildProperties(symbol: IApiReferenceLibrarySymbol, metadata?: IApiReferenceUI5Metadata): string {
		if (!metadata) {
			return "";
		}

		let { properties } = metadata;

		return properties ? `
			<h2>Properties</h2>
			<table>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Default Value</th>
					<th>Description</th>
				</tr>

				${properties.map(prop => `
					<tr>
						<td><strong>${prop.name}</strong></td>
						<td>${prop.type || ""}</td>
						<td>${prop.defaultValue || ""}</td>
						<td>${prop.description} Visibility: ${prop.visibility}</td>
					</tr>
				`).join("")}
			<table>
			<br />
		` : "";
	}

	private buildAggregations(symbol: IApiReferenceLibrarySymbol, metadata?: IApiReferenceUI5Metadata): string {
		if (!metadata) {
			return "";
		}

		let { aggregations } = metadata;

		return aggregations ? `
			<h2>Aggregations</h2>
			<table>
				<tr>
					<th>Name</th>
					<th>Cardinality</th>
					<th>Type</th>
					<th>Description</th>
				</tr>

				${aggregations.filter(a => a.visibility !== SymbolVisibility.Hidden).map(aggregation => `
					<tr>
						<td><strong>${aggregation.name}</strong></td>
						<td>${aggregation.cardinality}</td>
						<td>${aggregation.type}</td>
						<td>${aggregation.description}</td>
					</tr>
				`).join("")
			}
			<table>
			<br />
	` : "";
	}

	private buildAssociations(symbol: IApiReferenceLibrarySymbol, metadata?: IApiReferenceUI5Metadata): string {
		if (!metadata) {
			return "";
		}

		let { associations } = metadata;
		return associations ? `
			<h2>Associations</h2>
			<table>
				<tr>
					<th>Name</th>
					<th>Cardinality</th>
					<th>Type</th>
					<th>Description</th>
				</tr>

				${associations.filter(a => a.visibility !== SymbolVisibility.Hidden).map(association => `
					<tr>
						<td><strong>${association.name}</strong></td>
						<td>${association.cardinality}</td>
						<td>${association.type}</td>
						<td>${association.description}</td>
					</tr>
				`).join("")
			}
			<table>
			<br />
	` : "";
	}

	private buildEvents(symbol: IApiReferenceLibrarySymbol, metadata?: IApiReferenceUI5Metadata): string {
		let { events } = symbol;

		// TODO: expandable panel with detailed info

		return events ? `
			<h2>Events</h2>

			${events.filter(e => e.visibility !== SymbolVisibility.Hidden).map(event => `
				<h3>${event.name}</h3>

				${event.description}

				<table>
					<tr>
						<th>Param</th>
						<th>Type</th>
						<th>Description</th>
					</tr>
					${event.parameters.map(param => `
						<tr>
							<td>${"&nbsp;&nbsp;".repeat(param.depth || 0)}<strong>${param.name}${param.optional ? "?" : ""}</strong></td>
							<td>${param.type}</td>
							<td>${param.description}</td>
						</td>
					`).join("")}

				</table>
				<br />
			`).join("")
			}
		` : "";
	}

	private buildMethods(symbol: IApiReferenceLibrarySymbol, metadata?: IApiReferenceUI5Metadata): string {
		let { methods } = symbol;

		// TODO: expandable panel with detailed info

		return methods ? `
			<h2>Methods</h2>

			${methods.filter(m => m.visibility !== SymbolVisibility.Hidden).map(method => `
				<h3>${method.name}</h3>

				${method.description}
				<code>${method.code}</code>

				<table>
					<tr>
						<th>Param</th>
						<th>Type</th>
						<th>Default Value</th>
						<th>Description</th>
					</tr>

					${method.parameters && method.parameters.map(param => `
						<tr>
							<td><strong>${param.name}${param.optional ? "?" : ""}</strong></td>
							<td>${param.types.map(t => t.value).join(" | ")}</td>
							<td>${param.defaultValue}</td>
							<td>${param.description}</td>
						</tr>
					`).join("")
				}
				</table>
				<br />

				${method.returnValue && `
					<table>
						<tr>
							<th>Returns</th>
							<th>Description</th>
						</tr>

						<tr>
							<td>${method.returnValue.type}</td>
							<td>${method.returnValue.description}</td>
						</tr>
					</table>
					<br />
				`}

				`).join("")
			}
		` : "";
	}

	private getUI5Metadata(symbol: IApiReferenceLibrarySymbol): IApiReferenceUI5Metadata | undefined {
		if (symbol["ui5-metamodel"] && symbol["ui5-metadata"]) {
			return symbol["ui5-metadata"] as IApiReferenceUI5Metadata;
		}
	}
}