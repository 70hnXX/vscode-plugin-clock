"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateView = exports.scheduleDataProvider = void 0;
const vscode = require("vscode");
const scheduleApi_1 = require("../service/scheduleApi");
const date_1 = require("../utils/date");
function scheduleDataProvider(workspaceState) {
    return {
        getChildren: async (element) => {
            const children = await getChildren(workspaceState);
            return children;
        },
        getTreeItem: (element) => {
            const treeItem = getTreeItem(element);
            return treeItem;
        },
    };
}
exports.scheduleDataProvider = scheduleDataProvider;
function updateView() {
    const eventEmitter = new vscode.EventEmitter();
    eventEmitter.fire();
}
exports.updateView = updateView;
// 获取列表
async function getChildren(workspaceState) {
    try {
        const res = await (0, scheduleApi_1.getScheduleList)({
            startAt: (0, date_1.getFirstDayOfMonth)(new Date()),
            endAt: (0, date_1.getLastDayOfMonth)(new Date()),
        }, "123");
        return res;
    }
    catch (e) {
        console.log(e);
    }
    return [];
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
        contextValue: "file",
        tooltip,
        collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
    };
}
//# sourceMappingURL=index.js.map