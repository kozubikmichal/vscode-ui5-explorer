export interface IUrlConfig {
	apiIndex: string;
	libraryRoot: string;
}

type Sources = "OpenUI5" | "SAPUI5";

type UrlConfigs = {
	[key in Sources]: IUrlConfig;
};

export default class Config {
	static readonly Url: UrlConfigs = {
		SAPUI5: {
			apiIndex: "https://sapui5.hana.ondemand.com/docs/api/api-index.json",
			libraryRoot: "https://sapui5.hana.ondemand.com/test-resources/"
		},
		OpenUI5: {
			apiIndex: "https://openui5.hana.ondemand.com/docs/api/api-index.json",
			libraryRoot: "https://openui5.hana.ondemand.com/test-resources/"
		}
	};
}