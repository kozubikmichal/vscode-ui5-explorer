export enum SymbolKind {
	Namespace = "namespace",
	Class = "class",
	Enum = "enum",
	Interface = "interface",
	Typedef = "typedef"
}

export enum SymbolVisibility {
	Public = "public",
	Protected = "protected",
	Private = "private",
	Hidden = "hidden"
}


/******* Api Index *******/

export interface IApiReferenceIndex {
	version: string;
	library: string;
	symbols: IApiReferenceIndexSymbol[];
}

export interface IApiReferenceIndexSymbol {
	name: string;
	kind: SymbolKind;
	visibility: SymbolVisibility;
	lib: string;
	displayName: string;
	bIsDeprecated: boolean;
	extends?: string;
	nodes?:IApiReferenceIndexSymbol[];
	implements?: string[];
	extendedBy?: string[];
	implementedBy?: string[];
}
/******* Api Library *******/

export interface IApiReferenceLibrary {
	version: string;
	library: string;
	symbols: IApiReferenceLibrarySymbol[];
}

export interface IApiReferenceLibrarySymbol {
	kind: SymbolKind;
	name: string;
	basename: string;
	resource: string;
	module: string;
	export: string;
	static: boolean;
	since: string;
	visibility: SymbolVisibility;
	description?: string;
	component: string;
	hasSample: boolean;
	title: string;
	subTitle: string;
	nodes: IApiReferenceLibrarySymbolNode[];
	extends?: string;
	"ui5-metamodel"?: boolean;
	"ui5-metadata"?: IApiReferenceUI5Metadata;
	constructor: IApiReferenceSymbolConstructor;
	events: IApiReferenceSymbolEvent[];
	methods: IApiReferenceSymbolMethod[];
	properties: IApiReferenceSymbolProperty[];
	docuLink: string;
	docuLinkText: string;
	uxGuidelinesLink: string;
	uxGuidelinesLinkText: string;
}

export interface IApiReferenceLibrarySymbolNode {
	text: string;
	name: string;
	ref: string;
	description: string;
}

export interface IApiReferenceUI5Metadata {
	stereotype: string;
	properties: IApiReferenceUI5MetadataProperty[];
	aggregations: IApiReferenceUI5MetadataAggregation[];
	associations: IApiReferenceUI5MetadataAssociation[];
	defaultAggregation: string;
	designtime: string;
}

export interface IApiReferenceUI5MetadataProperty {
	name: string;
	type: string;
	defaultValue: string;
	group: string;
	visibility: SymbolVisibility;
	description: string;
	methods: string[];
	linkEnabled?: boolean;
}

export interface IApiReferenceUI5MetadataAggregation {
	name: string;
	singularName: string;
	type: string;
	cardinality: string;
	visibility: SymbolVisibility;
	since: string;
	bindable: boolean;
	description: string;
	methods: string[];
	linkEnabled: boolean;
}

export interface IApiReferenceUI5MetadataAssociation {
	name: string;
	singularName: string;
	type: string;
	cardinality: string;
	visibility: SymbolVisibility;
	description: string;
	methods: string[];
	linkEnabled: boolean;
}

export interface IApiReferenceSymbolConstructor {
	visibility: SymbolVisibility;
	parameters?: {
		name: string;
		optional: boolean;
		description: string;
		phoneName: string;
		depth: number;
		types?: {
			name: string;
			linkEnabled: boolean;
		}[];
		defaultValue: string;
	}[];
	description: string;
	references: string[];
	codeExample: string;
}

export interface IApiReferenceSymbolEvent {
	name: string;
	visibility: SymbolVisibility;
	parameters: {
		name: string;
		type: string;
		linkEnabled: boolean;
		description: string;
		depth?: number;
		optional?: boolean;
		phoneName?: string;
	}[];
	description: string;
	deprecated: {
		since: string;
		text: string;
	};
	deprecatedText: string;
	code: string;
}

export interface IApiReferenceSymbolMethod {
	name: string;
	visibility: SymbolVisibility;
	since: string;
	returnValue: {
		type: string;
		description: string;
		types: {
			value: string;
			linkEnabled: boolean
		}[];
	};
	parameters?: {
		name: string;
		optional: boolean;
		description: string;
		types: {
			value: string;
			href?: string;
			linkEnabled?: boolean
		}[];
		defaultValue: string;
	}[];
	description: string;
	code: string;
}

export interface IApiReferenceSymbolProperty {
	name: string;
	visibility: SymbolVisibility;
	description: string;
}