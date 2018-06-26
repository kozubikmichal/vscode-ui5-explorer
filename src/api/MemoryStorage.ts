import { IApiReferenceIndex, IApiReferenceLibrary } from "./IApiReference";
import { Inject } from "typescript-ioc";
import ILoader from "./ILoader";
import ExtensionConfig, { UI5Framework } from "../utils/ExtensionConfig";

interface ILibraries {
	[key: string]: IApiReferenceLibrary;
}

interface IInnerCacheEntry {
	libraries: ILibraries;
	index: IApiReferenceIndex | undefined;
}

type InnerCache = {
	[key in UI5Framework]?: IInnerCacheEntry
};

class MemoryStorage {
	@Inject private loader!: ILoader;

	private _cache: InnerCache = {};

	private get Cache(): IInnerCacheEntry {
		let framework = ExtensionConfig.getUI5Framework();
		if (!this._cache[framework]) {
			this._cache[framework] = {
				libraries: {},
				index: undefined
			};
		}

		return this._cache[framework] as IInnerCacheEntry;
	}

	public async getApiIndex(): Promise<IApiReferenceIndex> {
		if (!this.Cache.index) {
			this.Cache.index = await this.loader.fetchApiIndex();
		}

		return this.Cache.index;
	}

	public async getLibrary(id: string): Promise<IApiReferenceLibrary> {
		if (!this.Cache.libraries[id]) {
			this.Cache.libraries[id] = await this.loader.fetchLibrary(id);
		}

		return this.Cache.libraries[id];
	}
}

export { MemoryStorage };