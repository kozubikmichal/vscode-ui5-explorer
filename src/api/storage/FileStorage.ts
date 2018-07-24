import { Inject } from "typescript-ioc";
import ExtensionConfig from "../../utils/ExtensionConfig";

import * as fs from "fs";
import * as path from "path";
import * as mkdirp from "mkdirp";

import IStorageComponent, { IStorageResponse, StorageResponseSource } from "./IStorageComponent";

class FileStorage extends IStorageComponent {
	@Inject private extensionConfig!: ExtensionConfig;
	private static IndexFile = "index";
	private readonly resourcesFolder = "resources";
	private readonly latestFolder = "latest";

	public readonly ResponseSource = StorageResponseSource.File;

	public async tryGetApiIndex(): Promise<IStorageResponse | undefined> {
		let content = await this.tryRead(this.createPath(FileStorage.IndexFile));

		if (content) {
			return {
				source: this.ResponseSource,
				index: content,
				libraries: {}
			};
		}
	}

	public async tryGetLibrary(id: string): Promise<IStorageResponse | undefined> {
		let content = await this.tryRead(this.createPath(id));

		if (content) {
			return {
				source: this.ResponseSource,
				libraries: content ? {
					[id]: content
				} : {}
			};
		}
	}

	public async storeResponse(response: IStorageResponse): Promise<void> {
		if (response.source === this.ResponseSource) {
			return;
		}

		return Promise.all(
			[
				response.index ? this.writeFile(this.createPath(FileStorage.IndexFile), response.index) : Promise.resolve()
			].concat(Object.keys(response.libraries).map(id => {
				return this.writeFile(this.createPath(id), response.libraries[id]);
			}))
		).then(() => Promise.resolve());
	}

	private createPath(id: string): string {
		return path.join(
			this.extensionConfig.ProjectRoot,
			this.resourcesFolder,
			this.extensionConfig.getUI5Framework(),
			this.extensionConfig.getUI5Version() || this.latestFolder,
			`${id}.json`
		);
	}

	private tryRead(filePath: string): Promise<any> {
		return new Promise((resolve) => {
			fs.readFile(filePath, (err, data: any) => {
				resolve(err ? null : JSON.parse(data));
			});
		});
	}

	private writeFile(filePath: string, content: any): Promise<void> {
		return new Promise((resolve, reject) => {
			mkdirp.sync(path.dirname(filePath));

			fs.writeFile(filePath, JSON.stringify(content), (err) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});
	}
}

export { FileStorage };