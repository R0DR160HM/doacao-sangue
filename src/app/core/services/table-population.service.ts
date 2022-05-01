import { Injectable } from "@angular/core";
import { BloodType } from "src/app/shared/models/BloodType";
import { Donator } from "src/app/shared/models/Donator";
import { DonatorDAO } from "../indexeddb/dao/donator.dao";

@Injectable({ providedIn: 'root' })
export class TablePopulationService {

    constructor(
    ) {}

    public createFakeData(numberOfEntries: number) {
        const data: Donator[] = [];
        for (let i = 0; i < numberOfEntries; i++) {
            data.push({
                name: this.getName(),
                totalDonated: this.getTotalDonated(),
                type: this.getType()
            })
        }
        return data;
    }

    private getType() {
        return Math.round(Math.random() * 7);
    }

    private getTotalDonated() {
        return Math.round(Math.random() * 500);
    }

    private getName() {
        const names = [
            'Maria',
            'José',
            'Antônio',
            'João',
            'Francisco',
            'Ana',
            'Luiz',
            'Paulo',
            'Carlos',
            'Manoel',
            'Pedro',
            'Francisca',
            'Marcos',
            'Raimundo',
            'Sebastião',
            'Antônia',
            'Marcelo',
            'Jorge',
            'Márcia',
            'Geraldo',
            'Adriana',
            'Sandra',
            'Luis',
            'Fernando',
            'Fabio',
            'Roberto',
            'Márcio',
            'Edson',
            'André',
            'Sérgio',
            'Josefa',
            'Patrícia',
            'Daniel',
            'Rodrigo',
            'Rafael',
            'Joaquim',
            'Vera',
            'Ricardo',
            'Eduardo',
            'Terezinha',
            'Sônia',
            'Alexandre',
            'Rita',
            'Luciana',
            'Cláudio',
            'Rosa',
            'Benedito',
            'Leandro',
            'Raimunda',
            'Mário '
        ]
        const index = Math.round(Math.random() * names.length);
        return names[index];
    }

}