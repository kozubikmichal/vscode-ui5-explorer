import * as vscode from 'vscode';

import ApiTreeDataProvider from './tree/ApiTreeDataProvider';
import ExtensionConfig from "./utils/ExtensionConfig";
import PanelsManager from './view/PanelsManager';
import Search from './Search';

export default class ExtensionManager {
	public activate(context: vscode.ExtensionContext) {

		let manager = new PanelsManager();
		let dataProvider = new ApiTreeDataProvider();
		let search = new Search();

		vscode.window.registerTreeDataProvider(ExtensionConfig.UI5ExplorerViewId, dataProvider);

		vscode.commands.registerCommand(ExtensionConfig.Commands.Render, manager.show, manager);
		vscode.commands.registerCommand(ExtensionConfig.Commands.Search, search.run, search);
	}

	public deactivate() {

	}
}