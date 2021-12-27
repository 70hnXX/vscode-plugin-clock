/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from "vscode";
const axios = require("axios");
const qs = require("qs");

export async function axiosGet(
  config: { url: string; param: {} },
  workspaceState: vscode.Memento
) {
  try {
    const token = workspaceState.get("token");
    // console.log('reqBody:',{
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   url: config.url+'?'+qs.stringify(config.param),
    // })
    const responseBody = await axios({
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      url: config.url + "?" + qs.stringify(config.param),
    });
    const { data } = responseBody;
    if (data.code === 200) {
      return data.data;
    }
    console.log(data);
    vscode.window.showErrorMessage(data.msg);
    throw new Error(data.msg);
  } catch (error) {
    console.log(error);
    vscode.window.showErrorMessage("网络错误");
    throw new Error("网络错误");
  }
}

export async function axiosPost(config: { url: string; data: {} }) {
  try {
    const token = vscode.extensions.getExtension("vsCodeClock") || "";
    // console.log('token',token)
    // console.log('reqBody:',{
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   url: config.url,
    //   data: config.data,
    // })
    const responseBody = await axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: config.url,
      data: config.data,
    });
    const { data } = responseBody;
    if (data.code === 200) {
      return data.data;
    }
    console.log(data);
    vscode.window.showErrorMessage(data.msg);
    throw new Error(data.msg);
  } catch (error) {
    vscode.window.showErrorMessage("网络错误");
    throw new Error("网络错误");
  }
}
