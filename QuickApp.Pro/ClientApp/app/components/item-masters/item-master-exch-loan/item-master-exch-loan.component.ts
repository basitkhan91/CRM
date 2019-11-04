import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {CurrencyService} from '../../../services/currency.service';
import { Currency } from '../../../models/currency.model';
import {ItemMasterLoanExchange } from '../../../models/item-master-loan-exchange.model';
import {AuthService} from '../../../services/auth.service';
import { ItemMasterService } from '../../../services/itemMaster.service';
@Component({
    selector: 'app-item-master-exch-loan',
	templateUrl: './item-master-exch-loan.component.html',
	styleUrls: ['./item-master-exch-loan.component.scss']
})

export class ItemMasterExchangeLoanComponent implements OnInit {
    constructor( private currencyService:CurrencyService, private authService:AuthService, 
        private itemMasterService: ItemMasterService) { }
    showExchange:boolean=true;
    showLoan:boolean=true;
    exchangeCurrencies:Currency[];
    loanCurrencies:Currency[];
    currentItem: ItemMasterLoanExchange;
    @Input() partNumber: string;
    @Input() partDescription: string;
    @Input() manufacturer:string;
    @Input() itemMasterId: number;
    @Output() onTabChange = new EventEmitter<string>();

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }


    moveTab(tabName){
        
        this.onTabChange.emit(tabName);
    }
    ngOnInit() { 

        console.log('initialized exch loan');
        if(this.itemMasterId)
        {
            this.itemMasterService.getExchangeLoan(this.itemMasterId).subscribe(c=>{
                this.currentItem=c[0];
            });
        }
        this.currentItem=  {...new ItemMasterLoanExchange(), exchangeCurrencyId:0, 
            loanCurrencyId:0,createdBy:this.userName,isActive:true, isDeleted:false,isExchange:true, isLoan:true};
        this.currentItem.exchangeCurrencyId=0;
        this.currentItem.loanCurrencyId=0;
        this.loadCurrency();
    }

    loadCurrency():void
    {
        this.currencyService.getCurrencyList().subscribe(dat=>{
            this.exchangeCurrencies=[...dat[0]];
            this.loanCurrencies=[...dat[0]];
        });
    }
    saveAndMove():void
    {
        this.currentItem.updatedBy=this.userName;
        this.currentItem.isExchange=this.showExchange;
        this.currentItem.isLoan=this.showLoan;
        console.log( this.currentItem);
       
        //save or update and then move to next tab
        this.itemMasterService.updateExchangeLoan(this.currentItem).subscribe(()=>{
            this.moveTab('ExportInfo');
        })

    }
}