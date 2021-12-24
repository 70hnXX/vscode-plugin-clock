import * as vscode from "vscode";

export function goalDataProvider(): vscode.TreeDataProvider<{
  key: string;
}> {
  return {
    getChildren: (element: { key: string }): { key: string }[] => {
      return getChildren();
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
const tree = [
  {
    id: "666",
    title: "vscode日程表功能开发",
    children: [],
  },
  {
    id: "666",
    title: "vscode插件开发维护",
    children: [],
  },
];

// 获取列表
function getChildren(): any[] {
  return tree;
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
    tooltip,
    collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
  };
}
