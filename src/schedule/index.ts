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

    // getParent: ({ key }: { key: string }): { key: string } => {
    //   const parentKey = key.substring(0, key.length - 1);
    //   return parentKey ? new Key(parentKey) : new Key("");
    // },
  };
}

// 获取列表
async function getChildren(workspaceState: vscode.Memento): Promise<any[]> {
  try {
    const res = await getScheduleList(
      {
        startAt: getFirstDayOfMonth(new Date()),
        endAt: getLastDayOfMonth(new Date()),
      },
      workspaceState
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
    contextValue: "folder",
    tooltip,
    collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
  };
}
