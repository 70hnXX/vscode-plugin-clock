"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const schedule_1 = require("./schedule");
const goal_1 = require("./goal");
let myStatusBarItem;
function activate({ subscriptions }) {
    subscriptions.push(vscode.commands.registerCommand("work-clock.refreshEntry", (e) => {
        vscode.window.showInformationMessage("refreshEntry!");
    }));
    subscriptions.push(vscode.commands.registerCommand("work-clock.addEntry", (e) => {
        vscode.window.showInformationMessage("addEntry!");
    }));
    subscriptions.push(vscode.commands.registerCommand("work-clock.deleteFolder", (e) => {
        vscode.window.showInformationMessage("deleteFolder!");
    }));
    // 初始化日程列表
    vscode.window.createTreeView("package-schedule", {
        treeDataProvider: (0, schedule_1.scheduleDataProvider)(),
        showCollapseAll: true,
        canSelectMany: false,
    });
    // 初始化目标列表
    vscode.window.createTreeView("package-goal", {
        treeDataProvider: (0, goal_1.goalDataProvider)(),
        showCollapseAll: true,
        canSelectMany: false,
    });
    // 初始化状态栏
    const myCommandId = "work-clock.showSelectionCount";
    subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
        vscode.window.showInformationMessage(`Yeah, Keep going!`);
    }));
    // create a new status bar item that we can now manage
    myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    myStatusBarItem.command = myCommandId;
    subscriptions.push(myStatusBarItem);
    myStatusBarItem.text = `$(megaphone) 今天还有7个任务未完成`;
    myStatusBarItem.color = "red";
    myStatusBarItem.show();
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map