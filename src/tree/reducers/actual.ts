import IApiTree from "../IApiTree";
import ApiTreeItem from "../ApiTreeItem";

const processNode = (node: ApiTreeItem, tree: IApiTree, parent?: ApiTreeItem) => {
	let name = node.symbol.name;

	tree[name] = node;

	node.wrapperOnly = false;
	node.parent = parent;
	node.children = (node.symbol.nodes || []).map(i => new ApiTreeItem(i));
	node.children.forEach(child => processNode(child, tree, node));
};

const reducer = function (tree: IApiTree, item: ApiTreeItem): IApiTree {
	processNode(item, tree, undefined);
	return tree;
};

export default reducer;