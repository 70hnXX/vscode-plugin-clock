import * as vscode from "vscode";
import { axiosGet, axiosPost } from "./request";
import { apiUrl } from "./config";

export interface ListQueryInterface {
  startAt: Date;
  endAt: Date;
}

export interface CreateScheduleDto {
  readonly title: string;
  readonly colorType: number;
  readonly startAt: Date;
  readonly endAt: Date;
}

export interface resScheduleDto {
  readonly scheduleId: string;
  readonly authorId: string;
  readonly title: string;
  readonly content: string;
  readonly colorType: number;
  readonly status: number;
  readonly startAt: Date;
  readonly endAt: Date;
  readonly createAt: Date;
  readonly updateAt: Date;
}
/** 获取日程列表 GET /api/schedule' */
export async function getScheduleList(
  params: ListQueryInterface,
  token: string
) {
  return axiosGet(
    {
      url: `${apiUrl}/api/schedule`,
      param: params,
    },
    token
  );
}

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
