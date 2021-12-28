import * as vscode from "vscode";
import { scheduleDataProvider } from "./schedule";
import { goalDataProvider } from "./goal";
import { login } from "./service/authApi";

import { DataProvider, TreeViewItem } from "./treeview-data-provider";
import { getScheduleList } from "./service/scheduleApi";
import { getFirstDayOfMonth, getLastDayOfMonth } from "./utils/date";

let myStatusBarItem: vscode.StatusBarItem;

export async function activate({
  subscriptions,
  workspaceState,
}: vscode.ExtensionContext) {
  // 初始化鉴权信息
  const userInfo = await login();
  workspaceState.update("token", userInfo.token);
  workspaceState.update("userName", userInfo.userInfo.nickName);
  const dataProvider = new DataProvider();
  // 初始化列表
  vscode.window.registerTreeDataProvider("treeview", dataProvider);
  const list = await getScheduleList(
    {
      startAt: getFirstDayOfMonth(new Date()),
      endAt: getLastDayOfMonth(new Date()),
    },
    userInfo.token
  );
  dataProvider.init(
    list.map((item: any) => {
      return new TreeViewItem(item.title);
    })
  );
  let addItem = vscode.commands.registerCommand(
    "vsClock-schdule.add",
    async () => {
      const itemId =
        (await vscode.window.showInputBox({
          placeHolder: "添加一个任务",
        })) || "";
      if (itemId !== "") {
        dataProvider.addItem(new TreeViewItem(itemId));
      }
      vscode.window.showInformationMessage("任务已添加!");
    }
  );
  let editItem = vscode.commands.registerCommand(
    "vsClock-schdule.edit",
    async (item: TreeViewItem) => {
      const itemName =
        (await vscode.window.showInputBox({
          placeHolder: "输入新的任务名",
        })) || "";
      if (itemName !== "") {
        dataProvider.editItem(item, itemName);
      }
      vscode.window.showInformationMessage("任务已更新!");
    }
  );
  let deleteItem = vscode.commands.registerCommand(
    "vsClock-schdule.delete",
    async (item: TreeViewItem) => {
      const confirm = await vscode.window.showQuickPick(["delete", "canel"], {
        placeHolder: "确定删除任务?",
      });
      if (confirm === "delete") {
        dataProvider.deleteItem(item);
      }
      vscode.window.showInformationMessage("任务已删除!");
    }
  );
  subscriptions.push(addItem, editItem, deleteItem);
  // 初始化状态栏
  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  const myCommandId = "work-clock.showSelectionCount";
  subscriptions.push(
    vscode.commands.registerCommand(myCommandId, () => {
      vscode.window.showInformationMessage(`Yeah, Keep going!`);
    })
  );
  myStatusBarItem.command = myCommandId;
  subscriptions.push(myStatusBarItem);
  myStatusBarItem.text = `$(megaphone) 今天还有7个任务未完成`;
  myStatusBarItem.color = "red";
  myStatusBarItem.show();
}
export function deactivate() {}
