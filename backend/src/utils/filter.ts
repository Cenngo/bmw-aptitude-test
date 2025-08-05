import { IDateFilterOptions, INumberFilterOptions, ITextFilterOptions } from "@/interfaces/filter";
import { Prisma } from "prisma/generated/prisma";

export function intFilter(filter: INumberFilterOptions): Prisma.IntFilter {
    switch (filter.type) {
        case 'equals':
            return { equals: filter.filter };
        case 'notEqual':
            return { not: filter.filter };
        case 'lessThan':
            return { lt: filter.filter };
        case 'lessThanOrEqual':
            return { lte: filter.filter };
        case 'greaterThan':
            return { gt: filter.filter };
        case 'greaterThanOrEqual':
            return { gte: filter.filter };
        default:
            throw new Error(`Unsupported filter type: ${filter.type}`)
    }
}

export function floatFilter(filter: INumberFilterOptions): Prisma.FloatFilter {
    switch (filter.type) {
        case 'equals':
            return { equals: filter.filter };
        case 'notEqual':
            return { not: filter.filter };
        case 'lessThan':
            return { lt: filter.filter };
        case 'lessThanOrEqual':
            return { lte: filter.filter };
        case 'greaterThan':
            return { gt: filter.filter };
        case 'greaterThanOrEqual':
            return { gte: filter.filter };
        default:
            throw new Error(`Unsupported filter type: ${filter.type}`);
    }
}

export function stringFilter(filter: ITextFilterOptions): Prisma.StringFilter {
    switch (filter.type) {
        case 'equals':
            return { equals: filter.filter };
        case 'notEqual':
            return { not: filter.filter };
        case 'contains':
            return { contains: filter.filter };
        case 'startsWith':
            return { startsWith: filter.filter };
        case 'endsWith':
            return { endsWith: filter.filter };
        default:
            throw new Error(`Unsupported filter type: ${filter.type}`);
    }
}

export function dateFilter(filter: IDateFilterOptions): Prisma.DateTimeFilter {
    switch (filter.type) {
        case 'equals':
            return { equals: filter.dateFrom };
        case 'notEqual':
            return { not: filter.dateFrom };
        case 'lessThan':
            return { lt: filter.dateFrom };
        case 'lessThanOrEqual':
            return { lte: filter.dateFrom };
        case 'greaterThan':
            return { gt: filter.dateFrom };
        case 'greaterThanOrEqual':
            return { gte: filter.dateFrom };
        default:
            throw new Error(`Unsupported filter type: ${filter.type}`);
    }
}