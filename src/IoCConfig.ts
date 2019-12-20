import { Container, Scope } from "typescript-ioc";

import IRequest from "./utils/IRequest";
import Request from "./utils/Request";
import IStorage from "./api/storage/IStorage";
import IPanelRenderer from "./view/IPanelRenderer";
import PanelRenderer from "./view/PanelRenderer";

import * as vscode from 'vscode';
import ExtensionConfig from "./utils/ExtensionConfig";
import ApiConfig from "./api/ApiConfig";
import Storage from "./api/storage/Storage";

export default class Configuration {
	static configure() {

		// TODO: Replace by ContainerConfig - currently unable to configure with correct path
		// maybe because of vscode env?
		// ContainerConfig.addSource(["**/*", "!*.map"], "out");

		Container.bind(IRequest).to(Request);
		Container.bind(IPanelRenderer).to(PanelRenderer);
		Container.bind(IStorage).to(Storage).scope(Scope.Singleton);

		Container.bind(ExtensionConfig).provider({
			get: () => {
				return new ExtensionConfig(vscode);
			}
		}).scope(Scope.Singleton);

		Container.bind(ApiConfig).provider({
			get: () => {
				return new ApiConfig();
			}
		}).scope(Scope.Singleton);
	}
}