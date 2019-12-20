import * as vscode from 'vscode';

import ExtensionConfig from './utils/ExtensionConfig';
import { Inject } from 'typescript-ioc';
import IStorage from './api/storage/IStorage';
import { IApiReferenceIndex } from './api/IApiReference';
import dataProcessing from './utils/dataProcessing';

export default class Search {
	@Inject private storage!: IStorage;

	public async run(): Promise<void> {
		let index = await this.storage.getApiIndex();
		let items = this.buildItems(index);

		vscode.window.showQuickPick(items, {
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

	private buildItems(index: IApiReferenceIndex): vscode.QuickPickItem[] {
		return dataProcessing
			.flattenIndex(index)
			.map(node => {
				return {
					label: node.name,
					description: node.lib
				};
			});
	}
}