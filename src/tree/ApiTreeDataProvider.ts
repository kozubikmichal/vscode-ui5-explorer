import * as vscode from "vscode";
import ApiTreeItem from "./ApiTreeItem";
import { SymbolKind, SymbolVisibility } from "../api/IApiReference";
import { Inject } from "typescript-ioc";
import IStorage from "../api/storage/IStorage";
import ExtensionConfig from "../utils/ExtensionConfig";

interface IApiTree {
	[key: string]: ApiTreeItem;
}

export default class ApiTreeDataProvider implements vscode.TreeDataProvider<ApiTreeItem> {
	private tree!: IApiTree;
	@Inject private extensionConfig!: ExtensionConfig;
	@Inject private storage!: IStorage;

	private _onDidChangeTreeData: vscode.EventEmitter<ApiTreeItem | undefined> = new vscode.EventEmitter<ApiTreeItem | undefined>();
	readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

	constructor() {
		this.extensionConfig.onChange(() => this.refresh());
	}

	async clearCache(): Promise<any> {
		await this.storage.clear();
		this.refresh();
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: ApiTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element.update();
	}

	async getChildren(element?: ApiTreeItem | undefined): Promise<ApiTreeItem[]> {
		let tree = await this.parseTree(element === undefined);

		if (!element) {
			return this.getRoots(tree);
		}

		return this.getChildrenFor(tree, element);
	}

	private async getRoots(tree: IApiTree): Promise<ApiTreeItem[]> {
		return Object.keys(tree)
			.map(key => tree[key])
			.filter(item => item.IsRoot)
			.sort(this.sorter);
	}

	private async getChildrenFor(tree: IApiTree, element: ApiTreeItem): Promise<ApiTreeItem[]> {
		return element.children.sort(this.sorter);
	}

	private async parseTree(force: boolean): Promise<IApiTree> {
		if (this.tree && !force) {
			return this.tree;
		}

		let index = await this.storage.getApiIndex();

		this.tree = index.symbols
			.map(symbol => new ApiTreeItem(symbol))
			.reduce((all, item) => {
				let name = item.symbol.name;
				let parent = name.includes(".") ? name.replace(/\.[^.]*$/, "") : null;

				if (item.symbol.kind !== SymbolKind.Namespace && parent) {

					all[parent] = all[parent] || this.createWrapperItem(parent);

					if (all[parent]) {
						all[parent].children.push(item);
						item.parent = all[parent];
					}
				}

				if (!all[name]) {
					all[name] = item;
				}

				all[name].symbol = item.symbol;
				item.wrapperOnly = false;

				return all;
			}, {} as IApiTree);

		return this.tree;
	}

	private sorter(a: ApiTreeItem, b: ApiTreeItem): number {
		return (a.label || "").toLowerCase() > (b.label || "").toLowerCase() ? 1 : -1;
	}

	private createWrapperItem(label: string): ApiTreeItem {
		let item = new ApiTreeItem({
			name: label,
			kind: SymbolKind.Namespace,
			lib: "",
			visibility: SymbolVisibility.Public,
			displayName:label,
			bIsDeprecated:false,
			nodes:[]
		});

		item.wrapperOnly = true;
		return item;
	}
}