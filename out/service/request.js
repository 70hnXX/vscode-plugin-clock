"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosPost = exports.axiosGet = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const vscode = require("vscode");
const axios = require("axios");
const qs = require("qs");
async function axiosGet(config, token) {
    try {
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
    }
    catch (error) {
        console.log(error);
        vscode.window.showErrorMessage("网络错误");
        throw new Error("网络错误");
    }
}
exports.axiosGet = axiosGet;
async function axiosPost(config) {
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
    }
    catch (error) {
        vscode.window.showErrorMessage("网络错误");
        throw new Error("网络错误");
    }
}
exports.axiosPost = axiosPost;
//# sourceMappingURL=request.js.map