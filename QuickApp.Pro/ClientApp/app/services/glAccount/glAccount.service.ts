
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { GlAccountEndpointService } from './glAccount-endpoint.service';
import { GlAccount } from '../../models/GlAccount.model';

@Injectable()
export class GlAccountService {

    glAccountEditCollection: any;
    constructor(private glAccountEndpoint: GlAccountEndpointService) {
    }

    getAll() {
        return Observable.forkJoin(
            this.glAccountEndpoint.getAllGlAccounts<GlAccount[]>());
    }

    getById(glAccountId: number) {
        return Observable.forkJoin(
            this.glAccountEndpoint.getGlAccountById<GlAccount>(glAccountId)
        );
    }

    add(glAccount: GlAccount) {
        return this.glAccountEndpoint.addGlAccount<GlAccount>(glAccount);
    }

    update(glAccount: GlAccount) {
        return this.glAccountEndpoint.updateGlAccount<GlAccount>(glAccount);
    }

    remove(glAccountId: number) {
        return this.glAccountEndpoint.removeGlAccountById(glAccountId);
    }
    getMiscdata() {
        return Observable.forkJoin(
            this.glAccountEndpoint.getMiscData<GlAccount[]>());
    }
}