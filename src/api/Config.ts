import ExtensionConfig, { UI5Framework } from "../utils/ExtensionConfig";

export interface IUrlConfig {
	apiIndex: string;
	libraryRoot: string;
	sampleRoot: string;
	documentationRoot: string;
}

type UrlConfigs = {
	[key in UI5Framework]: IUrlConfig;
};

export default class Config {
	private static readonly sources: UrlConfigs = {
		SAPUI5: {
			apiIndex: "https://sapui5.hana.ondemand.com/docs/api/api-index.json",
			libraryRoot: "https://sapui5.hana.ondemand.com/test-resources/",
			sampleRoot: "https://sapui5.hana.ondemand.com/#/entity/",
			documentationRoot: "https://sapui5.hana.ondemand.com/#/topic/"
		},
		OpenUI5: {
			apiIndex: "https://openui5.hana.ondemand.com/docs/api/api-index.json",
			libraryRoot: "https://openui5.hana.ondemand.com/test-resources/",
			sampleRoot: "https://openui5.hana.ondemand.com/#/entity/",
			documentationRoot: "https://openui5.hana.ondemand.com/#/topic/"
		}
	};

	static get Url(): IUrlConfig {
		return this.sources[ExtensionConfig.getUI5Framework()];
	}
}