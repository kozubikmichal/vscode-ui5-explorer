import { IApiReferenceIndex, IApiReferenceLibrary } from "./IApiReference";

/**
 * Api modules loader
 */
export default abstract class ILoader {
	abstract fetchApiIndex(): Promise<IApiReferenceIndex>;

	abstract fetchLibrary(id: string): Promise<IApiReferenceLibrary>;
}