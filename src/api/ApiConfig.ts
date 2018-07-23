import { Singleton, Inject } from "typescript-ioc";
import * as vscode from 'vscode';

import ExtensionConfig, { UI5Framework } from "../utils/ExtensionConfig";

export interface IUrlConfig {
	apiIndex: string;
	libraryRoot: string;
	sampleRoot: string;
	documentationRoot: string;
}

type Sources = {
	[key in UI5Framework]: string
};

@Singleton
export default class ApiConfig {
	@Inject private extensionConfig!: ExtensionConfig;

	private static readonly Endpoints: IUrlConfig = {
		apiIndex: "/docs/api/api-index.json",
		libraryRoot: "/test-resources/",
		sampleRoot: "/#/entity/",
		documentationRoot: "/#/topic/"
	};

	private static readonly sources: Sources = {
		OpenUI5: "https://openui5.hana.ondemand.com",
		SAPUI5: "https://sapui5.hana.ondemand.com"
	};

	public Endpoints: IUrlConfig;

	constructor(code: typeof vscode) {
		code.workspace.onDidChangeConfiguration(() => {
			this.Endpoints = this.build();
		});

		this.Endpoints = this.build();
	}

	get Source(): string {
		return ApiConfig.sources[this.extensionConfig.getUI5Framework()];
	}


	private build(): IUrlConfig {
		let prefix = [this.Source, this.extensionConfig.getUI5Version()].filter(Boolean).join("/");
		let endpoints = ApiConfig.Endpoints;

		return {
			apiIndex: `${prefix}/${endpoints.apiIndex}`,
			libraryRoot: `${prefix}/${endpoints.libraryRoot}`,
			sampleRoot: `${prefix}/${endpoints.sampleRoot}`,
			documentationRoot: `${prefix}/${endpoints.documentationRoot}`
		};
	}
}