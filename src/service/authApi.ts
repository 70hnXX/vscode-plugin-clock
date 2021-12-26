import * as vscode from "vscode";
import { axiosGet, axiosPost } from "./request";
import { apiUrl } from "./config";

export const login = async () => {
  const configuration = vscode.workspace.getConfiguration('vsCodeClock');
  const mobile = configuration.userName;
  const password = configuration.password;
  return axiosPost({
    url: `${apiUrl}/api/user/adminLogin`,
    data: {mobile,password},
  });
};
