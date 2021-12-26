"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const request_1 = require("./request");
const config_1 = require("./config");
const login = async () => {
    const mobile = "18581617975";
    const password = "abc123";
    return (0, request_1.axiosPost)({
        url: `${config_1.apiUrl}/api/user/adminLogin`,
        data: { mobile, password },
    });
};
exports.login = login;
//# sourceMappingURL=auth.js.map