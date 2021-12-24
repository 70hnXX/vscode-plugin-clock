"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleDataProvider = void 0;
const vscode = require("vscode");
function scheduleDataProvider() {
    return {
        getChildren: (element) => {
            return getChildren();
        },
        getTreeItem: (element) => {
            const treeItem = getTreeItem(element);
            return treeItem;
        },
        // getParent: ({ key }: { key: string }): { key: string } => {
        //   const parentKey = key.substring(0, key.length - 1);
        //   return parentKey ? new Key(parentKey) : new Key("");
        // },
    };
}
exports.scheduleDataProvider = scheduleDataProvider;
const tree = [
    {
        id: "666",
        title: "title1",
        children: [],
    },
];
const nodes = {};
// 获取列表
function getChildren() {
    return tree;
}
// 获取子项目
function getTreeItem(element) {
    console.log("element", element);
    // An example of how to use codicons in a MarkdownString in a tree item tooltip.
    const tooltip = new vscode.MarkdownString(`$(zap) Tooltip for ${1}`, true);
    return {
        label: /**vscode.TreeItemLabel**/ {
            label: element.title,
            highlights: 0,
        },
        tooltip,
        collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
    };
}
//# sourceMappingURL=index.js.map