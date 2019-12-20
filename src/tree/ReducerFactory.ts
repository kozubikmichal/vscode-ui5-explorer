import reducerPre163 from "./reducers/pre163";
import reducerActual from "./reducers/actual";

const reducers: {
	[key: string]: any
} = {
	"1.63": reducerPre163,
	"default": reducerActual
};

const KEYS = Object.keys(reducers);

export default class ReducerFactory {
	getReducer(version: string) {
		let breakingChangeVersion: string;

		for (breakingChangeVersion of KEYS) {
			if (version < breakingChangeVersion) {
				return reducers[breakingChangeVersion];
			}
		}
		return reducers.default;
	}
}