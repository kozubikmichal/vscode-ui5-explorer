'use strict';

import IoCConfig from "./IoCConfig";
import * as vscode from 'vscode';
import { Storage } from './api/Storage';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    console.log("ACTIVATE");
    IoCConfig.configure();


    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);

    let storage = new Storage();

    storage.getApiIndex().then(data => {
        vscode.window.showInformationMessage('OK');
    }).catch(reason => {
        vscode.window.showInformationMessage('FAILED');
        console.log(reason);
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}