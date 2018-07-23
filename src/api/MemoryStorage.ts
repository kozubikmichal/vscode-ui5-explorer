import { IApiReferenceIndex, IApiReferenceLibrary } from "./IApiReference";
import { Inject } from "typescript-ioc";
import ILoader from "./ILoader";
import ExtensionConfig from "../utils/ExtensionConfig";

class MemoryStorage {
	@Inject private loader!: ILoader;
	@Inject private extensionConfig!: ExtensionConfig;

	private static IndexID = "index";

	private cache: Map<string, any> = new Map<string, any>();

	public async getApiIndex(): Promise<IApiReferenceIndex> {
		return this.getWithCache<IApiReferenceIndex>(
			MemoryStorage.IndexID,
			() => this.loader.fetchApiIndex()
		);
	}

	public async getLibrary(id: string): Promise<IApiReferenceLibrary> {
		return this.getWithCache<IApiReferenceLibrary>(
			id,
			() => this.loader.fetchLibrary(id)
		);
	}

	private async getWithCache<T>(id: string, getter: () => Promise<T>): Promise<T> {
		let key = this.createKey(id);

		if (!this.cache.has(key)) {
			this.cache.set(key, await getter());
		}

		return this.cache.get(key) as T;
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