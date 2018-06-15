import * as vscode from 'vscode';

import ApiTreeDataProvider from './tree/ApiTreeDataProvider';
import Config from "./utils/Config";

export default class ExtensionManager {
	public activate(context: vscode.ExtensionContext) {
		vscode.window.registerTreeDataProvider(Config.UI5ExplorerViewId, new ApiTreeDataProvider());
	}

	public deactivate() {

	}
}