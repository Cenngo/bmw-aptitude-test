export type Filter = ITextFilterOptions | INumberFilterOptions | IDateFilterOptions;

export interface ITextFilterOptions {
    filterType: 'text';
    filter: string | null;
    filterTo: string | null;
    type: 'empty' | 'equals' | 'notEqual' | 'lessThan' | 'lessThanOrEqual' | 'greaterThan' | 'greaterThanOrEqual' | 'inRange' | 'contains' | 'notContains' | 'startsWith' | 'endsWith' | 'blank' | 'notblank';
}

export interface INumberFilterOptions {
    filterType: 'number';
    filter: number | null;
    filterTo: number | null;
    type: 'empty' | 'equals' | 'notEqual' | 'lessThan' | 'lessThanOrEqual' | 'greaterThan' | 'greaterThanOrEqual' | 'inRange' | 'contains' | 'notContains' | 'startsWith' | 'endsWith' | 'blank' | 'notblank';
}

export interface IDateFilterOptions {
    filterType: 'date';
    dateFrom: string | null;
    dateTo: string | null;
    type: 'empty' | 'equals' | 'notEqual' | 'lessThan' | 'lessThanOrEqual' | 'greaterThan' | 'greaterThanOrEqual' | 'inRange' | 'contains' | 'notContains' | 'startsWith' | 'endsWith' | 'blank' | 'notblank';
}

export interface ICarFilter {
    brand: ITextFilterOptions;
    model: ITextFilterOptions;
    accelSec: INumberFilterOptions;
    topSpeedKmh: INumberFilterOptions;
    rangeKm: INumberFilterOptions;
    efficiencyWhKm: INumberFilterOptions;
    fastChargeKmH: INumberFilterOptions;
    rapidCharge: ITextFilterOptions;
    powerTrain: ITextFilterOptions;
    plugType: ITextFilterOptions;
    bodyType: ITextFilterOptions;
    segment: ITextFilterOptions;
    seats: INumberFilterOptions;
    priceEuro: INumberFilterOptions;
    date: IDateFilterOptions;
}