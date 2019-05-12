import * as vscode from "vscode";

import { IApiReferenceIndexSymbol } from "../api/IApiReference";
import ExtensionConfig from "../utils/ExtensionConfig";

export default class ApiTreeItem extends vscode.TreeItem {
	public children: ApiTreeItem[] = [];
	public parent!: ApiTreeItem;
	public symbol!: IApiReferenceIndexSymbol;
	public wrapperOnly: boolean = false;

	private get HasChildren() {
		return this.children.length > 0;
	}

	public get IsRoot() {
		return this.parent === null || this.parent === undefined;
	}

	constructor(symbol?: IApiReferenceIndexSymbol) {
		super(symbol ? symbol.name : "");

		this.symbol = symbol || {} as IApiReferenceIndexSymbol;
		this.update();
	}

	public update(): ApiTreeItem {
		this.id = this.symbol.name;
		if(this.symbol&&this.symbol.nodes){
			this.children = this.symbol.nodes.map(n=>new ApiTreeItem(n));
		}
		this.label = this.IsRoot ? this.symbol.name : this.symbol.name.replace(`${this.parent.symbol.name}.`, "");
		this.collapsibleState = this.HasChildren ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None;

		this.command = this.wrapperOnly ? undefined : {
			command: ExtensionConfig.Commands.Render,
			title: "Show",
			arguments: [this.symbol]
		};

		return this;
	}
}