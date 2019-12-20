import IApiTree from "../IApiTree";
import ApiTreeItem from "../ApiTreeItem";
import { SymbolKind, SymbolVisibility } from "../../api/IApiReference";

const createWrapperItem = function (label: string): ApiTreeItem {
	let item = new ApiTreeItem({
		name: label,
		kind: SymbolKind.Namespace,
		lib: "",
		visibility: SymbolVisibility.Public
	});

	item.wrapperOnly = true;
	return item;
};

const reducer = function (tree: IApiTree, item: ApiTreeItem): IApiTree {
	let name = item.symbol.name;
	let parent = name.includes(".") ? name.replace(/\.[^.]*$/, "") : null;

	if (item.symbol.kind !== SymbolKind.Namespace && parent) {

		tree[parent] = tree[parent] || createWrapperItem(parent);

		if (tree[parent]) {
			tree[parent].children.push(item);
			item.parent = tree[parent];
		}
	}

	if (!tree[name]) {
		tree[name] = item;
	}

	tree[name].symbol = item.symbol;
	item.wrapperOnly = false;

	return tree;
};

export default reducer;