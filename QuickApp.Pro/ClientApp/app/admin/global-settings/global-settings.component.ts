import { Component, OnInit } from "@angular/core";
import { MultiSelectModule } from 'primeng/multiselect';
import { AccountService } from "../../services/account.service";

@Component({
    selector: "global-settings",
    templateUrl: './global-settings.component.html',
    styleUrls: ['./global-settings.component.scss']
})
export class GlobalSettingsComponent implements OnInit
{
    countriesList: any = [];
    countryItem: any;
    countryData: any = {};
    constructor(private accountService: AccountService){
        
    }

    
    ngOnInit(){
        this.getCountriesList()

    }

    getCountriesList(){
        this.accountService.getCountriesList().subscribe(results => {
            for(let i=0; i<results.length; i++){
                this.countriesList.push({
                    label: results[i].discplayName,
                    value: results[i].cultureName
                })
            }            
        },
        error => {
            console.log(error)
        });

    }

    getCountrySpecificData(event){
        this.accountService.getCountrySpecificData(this.countryItem).subscribe(results => {
            console.log(results);
            this.countryData = results;    
        },
        error => {
            console.log(error)
        });
    }

}