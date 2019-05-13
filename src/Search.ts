import * as vscode from 'vscode';

import ExtensionConfig from './utils/ExtensionConfig';
import { Inject } from 'typescript-ioc';
import IStorage from './api/storage/IStorage';
import { IApiReferenceIndexSymbol } from './api/IApiReference';

interface ApiItem extends vscode.QuickPickItem{
	name:string;
}

const expand=(items:IApiReferenceIndexSymbol[],prefix="")=>
	items.reduce((acc: ApiItem[], cur) => {
		const label = (prefix&&cur.name.substr(0,prefix.length)!==prefix
			?`${prefix}.`:
			"")+cur.name;
		if(cur.name!==prefix) {
			acc.push({label,description:cur.lib,name:cur.name});
		}
		if(cur.nodes) {acc.push(...expand(cur.nodes,label));}
		return acc;
	}, []);


export default class Search {
	@Inject private storage!: IStorage;

	public async run(): Promise<void> {
		let items = expand((await this.storage.getApiIndex()).symbols);

		vscode.window.showQuickPick(
			items, {
				canPickMany: false,
				placeHolder: "Start typing..."
			}
		).then(selected => this.searchResultHandler(selected));
	}

	private searchResultHandler(result: ApiItem | undefined) {
		if (result) {
			vscode.commands.executeCommand(ExtensionConfig.Commands.Render, result.name);
		}
	}
}