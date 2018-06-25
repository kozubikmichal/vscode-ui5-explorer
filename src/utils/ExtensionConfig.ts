import * as vscode from 'vscode';

export type UI5Framework = "OpenUI5" | "SAPUI5";

interface IConfigurationEntry<T> {
	key: string;
	default: T;
}

interface IConfigurationEntries {
	Framework: IConfigurationEntry<UI5Framework>;
}

export default class ExtensionConfig {
	static readonly ExtensionId = "ui5explorer";
	static readonly UI5ExplorerViewId = "ui5ApiReference";

	static readonly Commands = {
		Render: "ui5explorer.Render",
		Search: "ui5explorer.Search"
	};

	static readonly ConfigirationEntry: IConfigurationEntries = {
		Framework: {
			key: "framework",
			default: "OpenUI5"
		}
	};

	static getUI5Framework(): UI5Framework {
		return this.getConfiguration(this.ConfigirationEntry.Framework);
	}

	private static getConfiguration<T>(entry: IConfigurationEntry<T>): T {
		return vscode.workspace
			.getConfiguration(this.ExtensionId)
			.get<T>(entry.key)
			|| entry.default as T;
	}
}