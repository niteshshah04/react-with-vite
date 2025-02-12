import { useMemo } from 'react';
import { INotificationData } from '../types';

const parseTimeToMs = (timeStr: string) => {
  const [hours, minutes, secondsMs] = timeStr?.split(':') || ['0', '0', '0'];
  const [seconds, ms] = secondsMs?.split('.') || ['0', '0'];
  
  return (
    parseInt(hours) * 3600000 +
    parseInt(minutes) * 60000 +
    parseInt(seconds) * 1000 +
    parseInt(ms)
  );
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