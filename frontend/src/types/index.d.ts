interface IPagedData<T> {
    items: T[];
    totalCount: number;
    start: number;
    end: number;
}

interface ICar {
    id: number;
    brand: string;
    model: string;
    accelSec: number;
    topSpeedKmh: number;
    rangeKm: number;
    efficiencyWhKm: number;
    fastChargeKmH: number;
    rapidCharge: boolean;
    powerTrain: string;
    plugType: string;
    bodyType: string;
    segment: string;
    seats: number;
    priceEuro: number;
    date: Date;
}

declare global {
    namespace Models {
        export type Car = ICar;
    }
}