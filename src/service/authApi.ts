import * as vscode from "vscode";
import { axiosGet, axiosPost } from "./request";
import { apiUrl } from "./config";

export const login = async () => {
  const configuration = vscode.workspace.getConfiguration("vsCodeClock");
  const mobile = configuration.userName;
  const password = configuration.password;

  if (!mobile || !password) {
    vscode.window.showErrorMessage(
      "请配置「vsCodeClock.userName」和「vsCodeClock.password」以正常使用vsColock的功能"
    );
    return;
  }
  return axiosPost({
    url: `${apiUrl}/api/user/adminLogin`,
    data: { mobile, password },
  });
};
