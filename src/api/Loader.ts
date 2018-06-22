import { IApiReferenceIndex, IApiReferenceLibrary } from "./IApiReference";
import ILoader from "./ILoader";
import { Provides, Inject } from "typescript-ioc";
import IRequest from "../utils/IRequest";
import Config, { IUrlConfig } from "./Config";
import * as vscode from 'vscode';

@Provides(ILoader)
class Loader extends ILoader {
	@Inject private request!: IRequest;

	private get UrlConfig(): IUrlConfig {
		return Config.Url.SAPUI5;
	}

	public fetchApiIndex(): Promise<IApiReferenceIndex> {
		return vscode.window.withProgress({
			cancellable: false,
			location: vscode.ProgressLocation.Notification,
			title: "Loading UI5 Api Reference"
		}, () => {
			return this.request.get(
				this.UrlConfig.apiIndex
			);
		}) as Promise<IApiReferenceIndex>;
	}

	public fetchLibrary(id: string): Promise<IApiReferenceLibrary> {
		return vscode.window.withProgress({
			cancellable: false,
			location: vscode.ProgressLocation.Notification,
			title: `Loading ${id}`
		}, () => {
			return this.request.get(
				this.createLibraryUrl(id)
			);
		}) as Promise<IApiReferenceLibrary>;
	}

	private createLibraryUrl(id: string): string {
		return [
			this.UrlConfig.libraryRoot,
			id.replace(/\./g, "/"),
			"designtime/apiref/api.json"
		].join("/");
	}
}

export default Loader;