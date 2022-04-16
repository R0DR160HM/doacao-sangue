import { Injectable } from "@angular/core";
import { forkJoin, from, map, of, switchMap, throwError } from "rxjs";
import { BloodType } from "src/app/shared/models/BloodType";
import { Donator } from "src/app/shared/models/Donator";
import { KeyMap } from "src/app/shared/models/KeyMap";
import { Database, DonatorsDatabase } from "../database/database";

@Injectable({ providedIn: 'root' })
export class DonatorDAO {

    private db: DonatorsDatabase;

    constructor() {
        this.db = new Database().donators;
    }

    public register(donator: Donator) {
        return from(this.db.add((donator)))
        .pipe(map(id => {
            donator.id = id;
            return donator;
        }))
    }

    public getById(id: number) {
        return from(this.db.get(id));
    }

    public getAll() {
        return from(this.db.toArray());
    }

    public getFiltered(filter: KeyMap<Donator>) {
        const internalFilter = filter as any;
        const promise = this.db.filter((donator: any) => {
            for (const key of Object.keys(internalFilter)) {
                if (internalFilter[key].toString() != donator[key]) {
                    return false;
                }
            }
            return true;
        }).toArray();
        return from(promise);
    }

    public delete(id: number) {
        return from(this.db.delete(id));
    }

    public patch(id: number, changes: KeyMap<Donator>) {
        return from(this.db.update(id, changes))
        .pipe(switchMap(id => this.getById(id)));
    }

    public put(donator: Donator) {
        if (!donator.id) {
            return throwError(() => 'Por favor, informe um id válido');
        }
        return from(this.db.put(donator));
    }

    public findAdequateBlood(bloodType: BloodType) {
        return this.getDonations(bloodType)
        .pipe(map(donators => {
            const bloodReserves = [0, 0, 0, 0, 0, 0, 0];
            donators.forEach(don => bloodReserves[don.type] += (+ don.totalDonated));
            return bloodReserves; // as any as { [key in BloodType]: number };
        }));
    }

    public receive(amount: number, type: BloodType) {
        return this.getDonations(type)
        .pipe(switchMap(donations => {

            const receiveDonations$ = donations.map(donation => {
                let totalDonated = +donation.totalDonated;

                if (totalDonated <= amount) {
                    amount -= totalDonated;
                    return this.delete(donation.id as number);
                } else if (totalDonated > amount) {
                    totalDonated -= amount;
                    return this.patch(donation.id as number, { totalDonated });
                } else {
                    return of(undefined);
                }
            });
            return forkJoin(receiveDonations$)

        }))
    }

    private getDonations(bloodType: BloodType) {
        const canReceiveFrom = this.bloodSort(bloodType).map(bt => bt.toString());
        return from(this.db.filter(donator => canReceiveFrom.includes(donator.type.toString())).toArray())
    }

    private bloodSort(type: BloodType) {
        const B = BloodType;
        if (type == B.A_Positive) {
            return [B.A_Positive, B.A_Negative, B.O_Positive, B.O_Negative];
        } else if (type == B.A_Negative) {
            return [B.A_Negative, B.O_Negative]
        } else if (type == B.B_Positive) {
            return [B.B_Positive, B.B_Negative, B.O_Positive, B.O_Negative];
        } else if (type == B.B_Negative) {
            return [B.B_Negative, B.O_Negative]
        } else if (type == B.AB_Positive) {
            return [B.A_Positive, B.A_Negative, B.B_Positive, B.B_Negative, B.AB_Positive, B.AB_Negative, B.O_Positive, B.O_Negative];
        } else if (type == B.AB_Negative) {
            return [B.A_Negative, B.B_Negative, B.O_Negative, B.AB_Negative];
        } else if (type == B.O_Positive) {
            return [B.O_Positive, B.O_Negative];
        } else if (type == B.O_Negative) {
            return [B.O_Negative];
        } else {
            return [];
        }
    }

}