import * as vscode from "vscode";

import { IApiReferenceIndexSymbol, IApiReferenceLibrarySymbol } from "../api/IApiReference";
import IStorage from "../api/IStorage";
import { Inject } from "typescript-ioc";

export default class PageRenderer {
	private panels: {
		[key: string]: vscode.WebviewPanel
	} = {};

	@Inject private storage!: IStorage;

	private static readonly DefaultPanelContent = `
		<html>
			<head></head>
			<body>
				loading...
			</body>
		</html>
	`;

	public async show(item: IApiReferenceIndexSymbol) {
		const panel = this.getPanel(item);
		panel.reveal();

		let library = await this.storage.getLibrary(item.lib);

		let symbol = library.symbols.find((i) => i.name === item.name) as IApiReferenceLibrarySymbol;

		panel.webview.html = `
		<html>
			<head></head>
			<body>
				${symbol.description || ""}
			</body>
		</html>
		`;
	}

	private getPanel(item: IApiReferenceIndexSymbol): vscode.WebviewPanel {
		if (!this.panels[item.name]) {
			this.panels[item.name] = this.createPanel(item.name, item.name);
			this.panels[item.name].onDidDispose(() => this.onPanelDispose(item.name));
		}

		return this.panels[item.name];
	}

	private createPanel(id: string, title: string): vscode.WebviewPanel {
		let panel = vscode.window.createWebviewPanel(
			id,
			title,
			vscode.ViewColumn.One,
			{}
		);

		panel.webview.html = PageRenderer.DefaultPanelContent;

		return panel;
	}

	private onPanelDispose(id: string) {
		delete this.panels[id];
	}
}