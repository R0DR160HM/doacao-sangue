import Dexie from "dexie";
import { Donator } from "src/app/shared/models/Donator";

export type DonatorsDatabase = Dexie.Table<Donator, number>

export class Database extends Dexie {
    public donators: DonatorsDatabase;

    constructor() {
        super('furb-doacao-sangue-database');
        this.version(1).stores({
            donators: '++id,name,type,totalDonated'
        })
        this.donators = this.table('donators');
    }
}