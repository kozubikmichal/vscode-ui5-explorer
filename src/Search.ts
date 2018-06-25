import * as vscode from 'vscode';

import ExtensionConfig from './utils/ExtensionConfig';
import { Inject } from 'typescript-ioc';
import IStorage from './api/IStorage';

export default class Search {
	@Inject private storage!: IStorage;

	public async run(): Promise<void> {
		let items = (await this.storage.getApiIndex()).symbols;

		vscode.window.showQuickPick(
			items.map(item => {
				return {
					label: item.name,
					description: item.lib
				};
			}), {
				canPickMany: false,
				placeHolder: "Start typing..."
			}
		).then(selected => this.searchResultHandler(selected));
	}

	private searchResultHandler(result: vscode.QuickPickItem | undefined) {
		if (result) {
			vscode.commands.executeCommand(ExtensionConfig.Commands.Render, result.label);
		}
	}
}