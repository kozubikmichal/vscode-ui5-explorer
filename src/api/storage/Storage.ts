import IStorage from "./IStorage";
import IStorageComponent, { IStorageResponse } from "./IStorageComponent";
import { MemoryStorage } from "./MemoryStorage";
import { FileStorage } from "./FileStorage";
import WebStorage from "./WebStorage";
import { IApiReferenceIndex, IApiReferenceLibrary } from "../IApiReference";

type ResponseGetter = (component: IStorageComponent) => Promise<IStorageResponse | undefined>;

export default class Storage extends IStorage {
	private components: IStorageComponent[] = [
		new MemoryStorage(),
		new FileStorage(),
		new WebStorage()
	];

	public async getApiIndex(): Promise<IApiReferenceIndex> {
		let response = await this.getResponse((component) => component.tryGetApiIndex());

		if (!response) {
			throw new Error("Cannot fetch UI5 api index");
		}

		return response.index as IApiReferenceIndex;
	}

	public async getLibrary(id: string): Promise<IApiReferenceLibrary> {
		let response = await this.getResponse((component) => component.tryGetLibrary(id));

		if (!response) {
			throw new Error(`Cannot fetch ${id}`);
		}

		return response.libraries[id];
	}

	private async getResponse(getter: ResponseGetter): Promise<IStorageResponse | undefined> {
		let response: IStorageResponse | undefined;
		let i;

		for (i = 0; i < this.components.length; ++i) {
			response = await getter(this.components[i]);
			if (response !== undefined) {
				break;
			}
		}

		if (response) {
			this.propagateResponse(i - 1, response);
		}

		return response;
	}

	private propagateResponse(startIndex: number, response: IStorageResponse): void {
		for (let i = startIndex; i >= 0; --i) {
			this.components[i].storeResponse(response);
		}
	}
}