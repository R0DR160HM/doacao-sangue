import { BloodType } from "./BloodType";

export class Donator {

    public id?: number;

    constructor(
        public name: string,
        public type: BloodType,
        public totalDonated: number // ml
    ) {}

}