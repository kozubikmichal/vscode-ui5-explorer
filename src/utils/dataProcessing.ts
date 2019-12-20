import { IApiReferenceIndexSymbol, IApiReferenceIndex } from "../api/IApiReference";

const extract = (node: IApiReferenceIndexSymbol, all: IApiReferenceIndexSymbol[]): IApiReferenceIndexSymbol[] => {
	all.push(node);
	(node.nodes || []).forEach(child => extract(child, all));
	return all;
};

export default {
	flattenIndex: function (index: IApiReferenceIndex) {
		return index.symbols.reduce((all: IApiReferenceIndexSymbol[], node: IApiReferenceIndexSymbol) => {
			return extract(node, all);
		}, []);
	}
};