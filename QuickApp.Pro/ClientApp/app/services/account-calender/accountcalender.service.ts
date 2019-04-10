
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { AccountCalenderEndpointService } from './accountcalender-endpoint.service';



@Injectable()
export class AccountCalenderService {

   
    constructor(private glAccountEndpoint: AccountCalenderEndpointService) {
    }

    getAll() {
        return Observable.forkJoin(
            this.glAccountEndpoint.getAllGlAccounts<any[]>());
    }

    getById(glAccountId: number) {
        return Observable.forkJoin(
            this.glAccountEndpoint.getGlAccountById<any>(glAccountId)
        );
    }

    add(glAccount: any) {
        return this.glAccountEndpoint.addGlAccount<any>(glAccount);
    }

    update(glAccount: any) {
        return this.glAccountEndpoint.updateGlAccount<any>(glAccount);
    }

    remove(glAccountId: number) {
        return this.glAccountEndpoint.removeGlAccountById(glAccountId);
    }
    getMiscdata() {
        return Observable.forkJoin(
            this.glAccountEndpoint.getMiscData<any[]>());
    }


    //deleteAssetType(glAccountId: number) {

    //    return this.glAccountEndpoint.removeGlAccountById(glAccountId);

    //}
}