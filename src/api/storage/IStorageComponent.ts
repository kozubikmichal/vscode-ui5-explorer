import { IApiReferenceIndex, IApiReferenceLibrary } from "../IApiReference";

export enum StorageResponseSource {
	Memory = "Memory",
	File = "File",
	Web = "Web"
}

export interface IStorageResponse {
	source: StorageResponseSource;
	index?: IApiReferenceIndex;
	libraries: {
		[key: string]: IApiReferenceLibrary;
	};
}

/**
 * Api modules storage
 */
export default abstract class IStorageComponent {
	abstract tryGetApiIndex(): Promise<IStorageResponse | undefined>;

	abstract tryGetLibrary(id: string): Promise<IStorageResponse | undefined>;

	abstract storeResponse(response: IStorageResponse): Promise<void>;
}