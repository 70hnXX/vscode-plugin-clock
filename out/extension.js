"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const authApi_1 = require("./service/authApi");
const treeview_data_provider_1 = require("./treeview-data-provider");
const scheduleApi_1 = require("./service/scheduleApi");
const date_1 = require("./utils/date");
let myStatusBarItem;
async function activate({ subscriptions, workspaceState, }) {
    // 初始化鉴权信息
    const userInfo = await (0, authApi_1.login)();
    workspaceState.update("token", userInfo.token);
    workspaceState.update("userName", userInfo.userInfo.nickName);
    const dataProvider = new treeview_data_provider_1.DataProvider();
    // 初始化列表
    vscode.window.registerTreeDataProvider("treeview", dataProvider);
    const list = await (0, scheduleApi_1.getScheduleList)({
        startAt: (0, date_1.getFirstDayOfMonth)(new Date()),
        endAt: (0, date_1.getLastDayOfMonth)(new Date()),
    }, userInfo.token);
    dataProvider.init(list.map((item) => {
        return new treeview_data_provider_1.TreeViewItem(item.title);
    }));
    let addItem = vscode.commands.registerCommand("vsClock-schdule.add", async () => {
        const itemId = (await vscode.window.showInputBox({
            placeHolder: "添加一个任务",
        })) || "";
        if (itemId !== "") {
            dataProvider.addItem(new treeview_data_provider_1.TreeViewItem(itemId));
        }
        vscode.window.showInformationMessage("任务已添加!");
    });
    let editItem = vscode.commands.registerCommand("vsClock-schdule.edit", async (item) => {
        const itemName = (await vscode.window.showInputBox({
            placeHolder: "输入新的任务名",
        })) || "";
        if (itemName !== "") {
            dataProvider.editItem(item, itemName);
        }
        vscode.window.showInformationMessage("任务已更新!");
    });
    let deleteItem = vscode.commands.registerCommand("vsClock-schdule.delete", async (item) => {
        const confirm = await vscode.window.showQuickPick(["delete", "canel"], {
            placeHolder: "确定删除任务?",
        });
        if (confirm === "delete") {
            dataProvider.deleteItem(item);
        }
        vscode.window.showInformationMessage("任务已删除!");
    });
    subscriptions.push(addItem, editItem, deleteItem);
    // 初始化状态栏
    myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    const myCommandId = "work-clock.showSelectionCount";
    subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
        vscode.window.showInformationMessage(`Yeah, Keep going!`);
    }));
    myStatusBarItem.command = myCommandId;
    subscriptions.push(myStatusBarItem);
    myStatusBarItem.text = `$(megaphone) 今天还有7个任务未完成`;
    myStatusBarItem.color = "red";
    myStatusBarItem.show();
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map