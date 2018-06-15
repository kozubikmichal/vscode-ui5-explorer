import * as vscode from "vscode";
import ApiTreeItem from "./ApiTreeItem";
import { Storage } from "../api/Storage";

export default class ApiTreeDataProvider implements vscode.TreeDataProvider<ApiTreeItem> {
	private storage = new Storage();

	onDidChangeTreeData?: vscode.Event<ApiTreeItem | null | undefined> | undefined;

	getTreeItem(element: ApiTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	async getChildren(element?: ApiTreeItem | undefined): Promise<ApiTreeItem[]> {
		if (element) {
			return [];
		}

		let index = await this.storage.getApiIndex();

		return index.symbols.map(item => new ApiTreeItem(
			item.name,
			vscode.TreeItemCollapsibleState.None
		));
	}
}