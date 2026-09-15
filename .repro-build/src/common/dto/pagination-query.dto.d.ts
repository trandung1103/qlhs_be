export declare class PaginationQueryDto {
    page?: number;
    limit?: number;
}
export interface Paginated<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
