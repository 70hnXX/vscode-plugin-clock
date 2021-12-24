import * as vscode from "vscode";

import { scheduleDataProvider } from "./schedule";
import { goalDataProvider } from "./goal";

let myStatusBarItem: vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {
  subscriptions.push(
    vscode.commands.registerCommand("work-clock.refreshEntry", (e) => {
      vscode.window.showInformationMessage("refreshEntry!");
    })
  );
  subscriptions.push(
    vscode.commands.registerCommand("work-clock.addEntry", (e) => {
      vscode.window.showInformationMessage("addEntry!");
    })
  );
  subscriptions.push(
    vscode.commands.registerCommand("work-clock.deleteFolder", (e) => {
      vscode.window.showInformationMessage("deleteFolder!");
    })
  );
  // 初始化日程列表
  vscode.window.createTreeView("package-schedule", {
    treeDataProvider: scheduleDataProvider(),
    showCollapseAll: true,
    canSelectMany: false,
  });
  // 初始化目标列表
  vscode.window.createTreeView("package-goal", {
    treeDataProvider: goalDataProvider(),
    showCollapseAll: true,
    canSelectMany: false,
  });

  // 初始化状态栏
  const myCommandId = "work-clock.showSelectionCount";
  subscriptions.push(
    vscode.commands.registerCommand(myCommandId, () => {
      vscode.window.showInformationMessage(`Yeah, Keep going!`);
    })
  );
  // create a new status bar item that we can now manage
  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  myStatusBarItem.command = myCommandId;
  subscriptions.push(myStatusBarItem);
  myStatusBarItem.text = `$(megaphone) 今天还有7个任务未完成`;
  myStatusBarItem.color = "red";
  myStatusBarItem.show();
}