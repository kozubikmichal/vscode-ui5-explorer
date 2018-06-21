import * as vscode from "vscode";
import { IApiReferenceLibrarySymbol } from "../api/IApiReference";

export default abstract class IPanelRenderer {
	abstract renderDefault(panel: vscode.WebviewPanel): void;

	abstract renderSymbol(panel: vscode.WebviewPanel, symbol: IApiReferenceLibrarySymbol): void;
}