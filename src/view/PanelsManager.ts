import * as vscode from "vscode";

import { IApiReferenceIndexSymbol, IApiReferenceLibrarySymbol } from "../api/IApiReference";
import IStorage from "../api/storage/IStorage";
import { Inject } from "typescript-ioc";
import IPanelRenderer from "./IPanelRenderer";

export default class PanelsManager {
	private panels: {
		[key: string]: vscode.WebviewPanel
	} = {};

	@Inject private apiStorage!: IStorage;
	@Inject private renderer!: IPanelRenderer;

	public async show(item: string | IApiReferenceIndexSymbol) {
		if (typeof item === "string") {
			let index = await this.apiStorage.getApiIndex();

			this.showInternal(index.symbols.find(s => s.name === item) as IApiReferenceIndexSymbol);
		} else {
			this.showInternal(item);
		}
	}

	private async showInternal(item: IApiReferenceIndexSymbol) {
		const panel = this.getPanel(item);
		panel.reveal();

		let library = await this.apiStorage.getLibrary(item.lib);

		let symbol = library.symbols.find((i) => i.name === item.name) as IApiReferenceLibrarySymbol;

		this.renderer.renderSymbol(panel, symbol);
	}

	private getPanel(item: IApiReferenceIndexSymbol): vscode.WebviewPanel {
		if (!this.panels[item.name]) {
			this.panels[item.name] = this.createPanel(item.name, item.name);
			this.panels[item.name].onDidDispose(() => delete this.panels[item.name]);
		}

		return this.panels[item.name];
	}

	private createPanel(id: string, title: string): vscode.WebviewPanel {
		let panel = vscode.window.createWebviewPanel(
			id,
			title,
			vscode.ViewColumn.Two,
			{
				enableCommandUris: true,
				enableScripts: true,
				enableFindWidget: true
			}
		);

		this.renderer.renderDefault(panel);

		return panel;
	}
}