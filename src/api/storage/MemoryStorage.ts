import { Inject } from "typescript-ioc";
import ExtensionConfig from "../../utils/ExtensionConfig";
import IStorageComponent, { IStorageResponse, StorageResponseSource } from "./IStorageComponent";

class MemoryStorage extends IStorageComponent {
	@Inject private extensionConfig!: ExtensionConfig;
	private static IndexID = "index";
	private cache: Map<string, any> = new Map<string, any>();

	public readonly ResponseSource = StorageResponseSource.Memory;

	public async tryGetApiIndex(): Promise<IStorageResponse | undefined> {
		let data = this.cache.get(this.createKey(MemoryStorage.IndexID));

		if (data) {
			return {
				source: this.ResponseSource,
				index: data,
				libraries: {}
			};
		}
	}

	public async tryGetLibrary(id: string): Promise<IStorageResponse | undefined> {
		let data = this.cache.get(this.createKey(id));

		if (data) {
			return {
				source: this.ResponseSource,
				libraries: data ? {
					[id]: data
				} : {}
			};
		}
	}

	public async storeResponse(response: IStorageResponse): Promise<void> {
		if (response.source === this.ResponseSource) {
			return;
		}

		if (response.index) {
			this.cache.set(this.createKey(MemoryStorage.IndexID), response.index);
		}

		Object.keys(response.libraries).forEach(id => {
			this.cache.set(this.createKey(id), response.libraries.id);
		});
	}

	public async clear(): Promise<any> {
		this.cache.clear();
	}

	private createKey(id: string): string {
		return [
			this.extensionConfig.getUI5Framework(),
			this.extensionConfig.getUI5Version(),
			id
		].join("|");
	}
}

export { MemoryStorage };