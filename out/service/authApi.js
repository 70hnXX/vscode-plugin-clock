"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const vscode = require("vscode");
const request_1 = require("./request");
const config_1 = require("./config");
const login = async () => {
    const configuration = vscode.workspace.getConfiguration('vsCodeClock');
    const mobile = configuration.userName;
    const password = configuration.password;
    return (0, request_1.axiosPost)({
        url: `${config_1.apiUrl}/api/user/adminLogin`,
        data: { mobile, password },
    });
};
exports.login = login;
//# sourceMappingURL=authApi.js.map