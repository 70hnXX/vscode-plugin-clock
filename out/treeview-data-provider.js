"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataProvider = exports.TreeViewItem = void 0;
const vscode = require("vscode");
class TreeViewItem extends vscode.TreeItem {
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
        this.contextValue = "treeviewitem";
    }
}
exports.TreeViewItem = TreeViewItem;
class DataProvider {
    constructor() {
        this.dataStorage = [];
        this.eventEmitter = new vscode.EventEmitter();
    }
    get onDidChangeTreeData() {
        return this.eventEmitter.event;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return Promise.resolve(this.dataStorage);
    }
    init(list) {
        this.dataStorage = list;
        this.updateView();
    }
    addItem(newItem) {
        this.updateView();
    }
    editItem(item, name) {
        this.updateView();
    }
    deleteItem(item) {
        this.updateView();
    }
    updateView() {
        this.eventEmitter.fire();
    }
}
exports.DataProvider = DataProvider;
//# sourceMappingURL=treeview-data-provider.js.map