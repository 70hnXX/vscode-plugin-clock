import * as vscode from "vscode";

import { scheduleDataProvider } from "./schedule";
import { goalDataProvider } from "./goal";
import { login } from "./service/authApi";

let myStatusBarItem: vscode.StatusBarItem;

export async function activate({
  subscriptions,
  workspaceState,
}: vscode.ExtensionContext) {
  // 初始化鉴权信息
  const userInfo = await login();
  // globalState.update('token',userInfo.token)
  // globalState.update('userName',userInfo.token)
  workspaceState.update("token", userInfo.token);
  workspaceState.update("userName", userInfo.userInfo.nickName);
  console.log("userInfo", userInfo);

  // 初始化日程列表
  vscode.window.createTreeView("package-schedule", {
    treeDataProvider: scheduleDataProvider(workspaceState),
    showCollapseAll: true,
    canSelectMany: false,
  });
  // 初始化目标列表
  vscode.window.createTreeView("package-goal", {
    treeDataProvider: goalDataProvider(),
    showCollapseAll: true,
    canSelectMany: false,
  });
  // 注册命令
  subscriptions.push(
    vscode.commands.registerCommand("work-clock.refreshEntry", (e) => {
      vscode.window.showInformationMessage("refreshEntry!");
      // scheduleDataProvider.refresh()
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
  subscriptions.push(
    vscode.commands.registerCommand("work-clock.edit", (e) => {
      // console.log(e);
      vscode.window.showInformationMessage("edit!");
    })
  );
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
