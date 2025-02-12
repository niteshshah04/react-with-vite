export interface INotificationData {
    stock: string;
    message: string;
    time: string;
}

export interface NotificationTableProps {
    notificationData: INotificationData[];
    orderBy: string;
    order: "asc" | "desc";
    handleSort: (col: string) => void;
    page: number;
    rowsPerPage: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
} 