import { IApiReferenceIndex, IApiReferenceLibrary } from "./IApiReference";
import { Inject } from "typescript-ioc";
import ILoader from "./ILoader";

interface ILibraries {
	[key: string]: IApiReferenceLibrary;
}

class MemoryStorage {
	@Inject private loader!: ILoader;

	private cachedLibraries: ILibraries = {};
	private cachedIndex: IApiReferenceIndex | undefined;

	public async getApiIndex(): Promise<IApiReferenceIndex> {
		if (!this.cachedIndex) {
			this.cachedIndex = await this.loader.fetchApiIndex();
		}

		return this.cachedIndex;
	}

	public async getLibrary(id: string): Promise<IApiReferenceLibrary> {
		if (!this.cachedLibraries[id]) {
			this.cachedLibraries[id] = await this.loader.fetchLibrary(id);
		}

		return this.cachedLibraries[id];
	}
}

export { MemoryStorage };