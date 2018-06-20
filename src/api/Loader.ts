import { IApiReferenceIndex, IApiReferenceLibrary } from "./IApiReference";
import ILoader from "./ILoader";
import { Provides, Inject } from "typescript-ioc";
import IRequest from "../utils/IRequest";
import Config, { IUrlConfig } from "./Config";

@Provides(ILoader)
class Loader extends ILoader {
	@Inject private request!: IRequest;

	private get UrlConfig(): IUrlConfig {
		return Config.Url.SAPUI5;
	}

	public fetchApiIndex(): Promise<IApiReferenceIndex> {
		return this.request.get(
			this.UrlConfig.apiIndex
		);
	}

	public fetchLibrary(id: string): Promise<IApiReferenceLibrary> {
		return this.request.get(
			this.createLibraryUrl(id)
		);
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