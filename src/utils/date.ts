/**
 * 获取当月第一天
 * @param date
 * @returns 当月第一天的日期
 */
export const getFirstDayOfMonth = (date: Date) => {
  // TODO 校验入参
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = 1;
  return new Date(y, m, d);
};
/**
 * 获取当月最后一天
 * @param date
 * @returns 当月最后一天的日期
 */
export const getLastDayOfMonth = (date: Date) => {
  // TODO 校验入参
  let currentMonth = date.getMonth();
  const nextMonth = ++currentMonth;
  const nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
  const oneDay = 1000 * 60 * 60 * 24;
  const date1 = new Date(nextMonthFirstDay.getTime() - oneDay);
  const yy = date1.getFullYear();
  const mm = date1.getMonth();
  const dd = date1.getDate();
  return new Date(yy, mm, dd);
};
/**
 * 获取当天是周几
 * @param date
 * @returns 星期一 - 星期日
 */
export const getWeekend = (date: Date) => {
  // TODO 校验入参
  const week = date.getDay();
  switch (week) {
    case 0:
      return '星期日';
    case 1:
      return '星期一';
    case 2:
      return '星期二';
    case 3:
      return '星期三';
    case 4:
      return '星期四';
    case 5:
      return '星期五';
    case 6:
      return '星期六';
    default:
      return '未知';
  }
};
/**
 * 获取完整的日历
 * @param date
 * @returns 当月完整日历的数组 date[]
 */
export const getFullCalender = (date: Date) => {
  // TODO 校验入参
  // 处理跨年,1月和12月涉及到跨年
  const firstDay = getFirstDayOfMonth(date);
  const lastDay = getLastDayOfMonth(date);
  const startCompleteDays = firstDay.getDay(); // 首日前补全的日期首日如果是周日=0.就不补全，周六就补全周日到周五共6天
  const toMonthDays = lastDay.getDate();
  const endCompleteDays = 7 * 6 - startCompleteDays - toMonthDays;
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const preMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const preMonthDays = [];
  const currentMonthDays = [];
  const nextMonthDays = [];
  for (let i = 0; i < startCompleteDays; i++) {
    const thisYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const lastDayInPreMonth = getLastDayOfMonth(new Date(thisYear, preMonth, 1));
    const day = lastDayInPreMonth.getDate();
    preMonthDays.push(new Date(thisYear, preMonth, day - startCompleteDays + i + 1));
  }
  for (let i = 0; i < toMonthDays; i++) {
    currentMonthDays.push(new Date(currentYear, currentMonth, i + 1));
  }
  for (let i = 0; i < endCompleteDays; i++) {
    nextMonthDays.push(new Date(currentYear, nextMonth, i + 1));
  }
  return preMonthDays.concat(currentMonthDays).concat(nextMonthDays);
};
