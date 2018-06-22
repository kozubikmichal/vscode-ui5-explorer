import * as vscode from 'vscode';

import ApiTreeDataProvider from './tree/ApiTreeDataProvider';
import ExtensionConfig from "./utils/Config";
import PanelsManager from './view/PanelsManager';

export default class ExtensionManager {
	public activate(context: vscode.ExtensionContext) {

		let renderer = new PanelsManager();

		vscode.window.registerTreeDataProvider(ExtensionConfig.UI5ExplorerViewId, new ApiTreeDataProvider());

		vscode.commands.registerCommand(ExtensionConfig.Commands.Render, renderer.show, renderer);
	}

	public deactivate() {

	}
}