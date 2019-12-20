import { Singleton } from "typescript-ioc";
import * as vscode from 'vscode';
import * as path from "path";

export type UI5Framework = "OpenUI5" | "SAPUI5";

interface IConfigurationEntry<T> {
	key: string;
	default: T;
}

interface IConfigurationEntries {
	Framework: IConfigurationEntry<UI5Framework>;
	Version: IConfigurationEntry<string>;
}

@Singleton
export default class ExtensionConfig {
	private _onChange = new vscode.EventEmitter<void>();
	readonly onChange = this._onChange.event;

	static readonly ExtensionId = "ui5explorer";
	static readonly UI5ExplorerViewId = "ui5ApiReference";

	static readonly Commands = {
		Render: "extension.ui5explorer.render",
		Search: "extension.ui5explorer.search",
		ClearCache: "extension.ui5explorer.clearCache"
	};

	public get ProjectRoot(): string {
		return path.join(__dirname, "../../");
	}

	constructor(
		private code: typeof vscode
	) {
		code.workspace.onDidChangeConfiguration(e => {
			if (e.affectsConfiguration(ExtensionConfig.ExtensionId)) {
				this._onChange.fire();
			}
		});
	}

	static readonly ConfigirationEntry: IConfigurationEntries = {
		Framework: {
			key: "framework",
			default: "OpenUI5"
		},
		Version: {
			key: "version",
			default: ""
		}
	};

	getUI5Framework(): UI5Framework {
		return this.getConfiguration(ExtensionConfig.ConfigirationEntry.Framework);
	}

	getUI5Version(): string {
		return this.getConfiguration(ExtensionConfig.ConfigirationEntry.Version);
	}

	private getConfiguration<T>(entry: IConfigurationEntry<T>): T {
		return this.code.workspace
			.getConfiguration(ExtensionConfig.ExtensionId)
			.get<T>(entry.key)
			|| entry.default as T;
	}
}