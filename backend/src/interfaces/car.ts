export default interface ICar {
    id: number;
    brand: string;
    model: string;
    accelSec: number;
    topSpeedKmh: number;
    rangeKm: number;
    efficiencyWhKm: number;
    fastChargeKmH: number | null;
    rapidCharge: boolean;
    powerTrain: string;
    plugType: string;
    bodyType: string;
    segment: string;
    seats: number;
    priceEuro: number;
    date: Date;
}