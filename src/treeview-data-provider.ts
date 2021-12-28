import * as vscode from "vscode";
import { getScheduleList } from "./service/scheduleApi";
import { getFirstDayOfMonth, getLastDayOfMonth } from "./utils/date";

export class TreeViewItem extends vscode.TreeItem {
  constructor(
    label: string,
    collapsibleState?: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.contextValue = "treeviewitem";
  }
}

export class DataProvider implements vscode.TreeDataProvider<TreeViewItem> {
  private dataStorage: TreeViewItem[] = [];

  private eventEmitter = new vscode.EventEmitter<
    TreeViewItem | undefined | void
  >();

  public get onDidChangeTreeData(): vscode.Event<
    TreeViewItem | undefined | void
  > {
    return this.eventEmitter.event;
  }

  public getTreeItem(
    element: TreeViewItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  public getChildren(
    element?: TreeViewItem
  ): vscode.ProviderResult<TreeViewItem[]> {
    return Promise.resolve(this.dataStorage);
  }

  public init(list: TreeViewItem[]) {
    this.dataStorage = list;
    this.updateView();
  }

  public addItem(newItem: TreeViewItem) {
    this.updateView();
  }

  public editItem(item: TreeViewItem, name: string) {
    this.updateView();
  }

  public deleteItem(item: TreeViewItem) {
    this.updateView();
  }

  private updateView() {
    this.eventEmitter.fire();
  }
}
