import * as vscode from "vscode";
import { getScheduleList } from "../service/scheduleApi";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../utils/date";

export function scheduleDataProvider(
  workspaceState: vscode.Memento
): vscode.TreeDataProvider<{
  key: string;
}> {
  return {
    getChildren: async (element: {
      key: string;
    }): Promise<{ key: string }[]> => {
      const children = await getChildren(workspaceState);
      return children;
    },
    getTreeItem: (element: any): vscode.TreeItem => {
      const treeItem = getTreeItem(element);
      return treeItem;
    },
  };
}
export function updateView() {
  const eventEmitter = new vscode.EventEmitter<
    vscode.TreeItem | undefined | void
  >();
  eventEmitter.fire();
}

// 获取列表
async function getChildren(workspaceState: vscode.Memento): Promise<any[]> {
  try {
    const res = await getScheduleList(
      {
        startAt: getFirstDayOfMonth(new Date()),
        endAt: getLastDayOfMonth(new Date()),
      },
      "123"
    );
    return res;
  } catch (e) {
    console.log(e);
  }
  return [];
}

// 获取子项目
function getTreeItem(element: any): vscode.TreeItem {
  console.log("element", element);
  // An example of how to use codicons in a MarkdownString in a tree item tooltip.
  const tooltip = new vscode.MarkdownString(`$(zap) Tooltip for ${1}`, true);
  return {
    label: /**vscode.TreeItemLabel**/ <any>{
      label: element.title,
      highlights: 0,
    },
    contextValue: "file",
    tooltip,
    collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
  };
}
