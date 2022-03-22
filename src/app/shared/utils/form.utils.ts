import { FormGroup } from "@angular/forms";

export class FormUtils {

    public static listErrorsFromFormGroup(group: FormGroup) {
        return Object.keys(group.controls)
        .map(key => group.controls[key].errors)
        .filter(error => !!error)
        .map((error: any) => Object.keys(error)[0])
    }

}