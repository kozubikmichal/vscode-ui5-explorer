export interface IUrlConfig {
	apiIndex: string;
	libraryRoot: string;
	sampleRoot: string;
	documentationRoot: string;
}

type Sources = "OpenUI5" | "SAPUI5";

type UrlConfigs = {
	[key in Sources]: IUrlConfig;
};

export default class Config {
	static readonly Url: UrlConfigs = {
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
}