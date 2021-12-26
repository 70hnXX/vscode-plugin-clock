"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScheduleList = void 0;
const request_1 = require("./request");
const config_1 = require("./config");
/** 获取日程列表 GET /api/schedule' */
async function getScheduleList(params, workspaceState) {
    return (0, request_1.axiosGet)({
        url: `${config_1.apiUrl}/api/schedule`,
        param: params,
    }, workspaceState);
}
exports.getScheduleList = getScheduleList;
// /** 创建日程 POST /api/schedule */
// export async function CreateSchedule(data: CreateScheduleDto, options?: { [key: string]: any }) {
//   return request<{
//     data: API.NoteResultData;
//   }>('/api/schedule', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//     },
//     data: {
//       ...data,
//     },
//     ...(options || {}),
//   });
// }
// /** 更新日程 PUT /api/schedule */
// export async function UpdateSchedule(data: resScheduleDto, options?: { [key: string]: any }) {
//   return request<{
//     data: API.NoteResultData;
//   }>(`/api/schedule/${data.scheduleId}`, {
//     method: 'PUT',
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//     },
//     data: {
//       ...data,
//     },
//     ...(options || {}),
//   });
// }
// /** 删除日程 PUT /api/schedule */
// export async function DeleteSchedule(scheduleId: string, options?: { [key: string]: any }) {
//   return request<{
//     data: API.NoteResultData;
//   }>(`/api/schedule/${scheduleId}`, {
//     method: 'DELETE',
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//     },
//     data: {},
//     ...(options || {}),
//   });
// }
//# sourceMappingURL=scheduleApi.js.map