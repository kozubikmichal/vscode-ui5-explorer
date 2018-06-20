import * as vscode from 'vscode';

import ApiTreeDataProvider from './tree/ApiTreeDataProvider';
import Config from "./utils/Config";
import PageRenderer from './view/PageRenderer';

export default class ExtensionManager {
	public activate(context: vscode.ExtensionContext) {

		let renderer = new PageRenderer();

		vscode.window.registerTreeDataProvider(Config.UI5ExplorerViewId, new ApiTreeDataProvider());

		vscode.commands.registerCommand(Config.Commands.Render, renderer.show, renderer);
	}

	public deactivate() {

	}
}