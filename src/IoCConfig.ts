import { Container, Scope } from "typescript-ioc";

import Loader from "./api/Loader";
import ILoader from "./api/ILoader";
import IRequest from "./utils/IRequest";
import Request from "./utils/Request";
import IStorage from "./api/IStorage";
import { MemoryStorage } from "./api/MemoryStorage";
import IPanelRenderer from "./view/IPanelRenderer";
import PanelRenderer from "./view/PanelRenderer";

export default class Configuration {
	static configure() {

		// TODO: Replace by ContainerConfig - currently unable to configure with correct path
		// maybe because of vscode env?
		// ContainerConfig.addSource(["**/*", "!*.map"], "out");

		Container.bind(ILoader).to(Loader);
		Container.bind(IRequest).to(Request);
		Container.bind(IStorage).to(MemoryStorage).scope(Scope.Singleton);
		Container.bind(IPanelRenderer).to(PanelRenderer);
	}
}