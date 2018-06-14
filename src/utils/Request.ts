import { Provides } from "typescript-ioc";
import IRequest from "./IRequest";

import axios from "axios";

/**
 * Request wrapper
 */
@Provides(IRequest)
export default class Request extends IRequest {
	/**
	 * Sends GET request
	 *
	 * @param url url path
	 */
	public async get(url: string): Promise<any> {
		let response = await axios.get(url);

		return response.data;
	}
}