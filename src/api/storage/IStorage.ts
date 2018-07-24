import { IApiReferenceIndex, IApiReferenceLibrary } from "../IApiReference";

/**
 * Api modules storage
 */
export default abstract class IStorage {
	abstract getApiIndex(): Promise<IApiReferenceIndex>;

	abstract getLibrary(id: string): Promise<IApiReferenceLibrary>;

	abstract clear(): Promise<any>;
}