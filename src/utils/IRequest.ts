/**
 * Request wrapper
 */
export default abstract class IRequest {
	/**
	 * Sends GET request
	 *
	 * @param url url path
	 */
	abstract get(url: string): Promise<any>;
}