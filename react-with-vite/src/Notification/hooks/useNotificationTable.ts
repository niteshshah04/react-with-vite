import { useMemo } from 'react';
import { INotificationData } from '../types';

const parseTimeToMs = (timeStr: string) => {
  // Convert "YYYY-MM-DD HH:mm" to Date object
  const [datePart, timePart] = timeStr?.split(' ') || ['', ''];
  const [year, month, day] = datePart?.split('-') || ['', '', ''];
  const [hours, minutes] = timePart?.split(':') || ['', ''];
  
  // Note: months in Date constructor are 0-based, so we subtract 1 from month
  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes)
  ).getTime();
};

export const useNotificationTable = (
  notificationData: INotificationData[],
  orderBy: string,
  order: 'asc' | 'desc'
) => {
  const sortedData = useMemo(() => {
    if (orderBy !== 'time') return notificationData;

    const comparator = (a: INotificationData, b: INotificationData) => {
      const aValue = parseTimeToMs(a.time);
      const bValue = parseTimeToMs(b.time);

      return order === 'asc' 
        ? (aValue < bValue ? -1 : aValue > bValue ? 1 : 0)
        : (bValue < aValue ? -1 : bValue > aValue ? 1 : 0);
    };

    return [...notificationData].sort(comparator);
  }, [notificationData, orderBy, order]);

  return { sortedData };
}; 