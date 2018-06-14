import { Container } from "typescript-ioc";

import Loader from "./api/Loader";
import ILoader from "./api/ILoader";
import IRequest from "./utils/IRequest";
import Request from "./utils/Request";

export default class Configuration {
	static configure() {

		// TODO: Replace by ContainerConfig - currently unable to configure with correct path
		// maybe because of vscode env?
		// ContainerConfig.addSource(["**/*", "!*.map"], "out");

		Container.bind(ILoader).to(Loader);
		Container.bind(IRequest).to(Request);
	}
}