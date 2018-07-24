import { IApiReferenceIndex, IApiReferenceLibrary } from "../IApiReference";
import { Inject } from "typescript-ioc";
import IRequest from "../../utils/IRequest";
import ApiConfig, { IUrlConfig } from "../ApiConfig";

import * as vscode from 'vscode';
import IStorageComponent, { IStorageResponse, StorageResponseSource } from "./IStorageComponent";


export default class WebStorage extends IStorageComponent {
	@Inject private apiConfig!: ApiConfig;
	@Inject private request!: IRequest;

	private get UrlConfig(): IUrlConfig {
		return this.apiConfig.Endpoints;
	}

	public readonly ResponseSource = StorageResponseSource.Web;

	public async tryGetApiIndex(): Promise<IStorageResponse> {
		return vscode.window.withProgress({
			cancellable: false,
			location: vscode.ProgressLocation.Notification,
			title: "Loading UI5 Api Reference"
		}, () => {
			return this.request.get(
				this.UrlConfig.apiIndex
			);
		}).then((index: IApiReferenceIndex) => {
			return {
				source: this.ResponseSource,
				index: index,
				libraries: {}
			} as IStorageResponse;
		});
	}

	public async tryGetLibrary(id: string): Promise<IStorageResponse> {
		return vscode.window.withProgress({
			cancellable: false,
			location: vscode.ProgressLocation.Notification,
			title: `Loading ${id}`
		}, () => {
			return this.request.get(
				this.createLibraryUrl(id)
			);
		}).then((library: IApiReferenceLibrary) => {
			return {
				source: this.ResponseSource,
				libraries: {
					[id]: library
				}
			} as IStorageResponse;
		});
	}

	public async storeResponse(): Promise<void> { }
	public async clear(): Promise<any> { }

	private createLibraryUrl(id: string): string {
		return [
			this.UrlConfig.libraryRoot,
			id.replace(/\./g, "/"),
			"designtime/apiref/api.json"
		].join("/");
	}
}