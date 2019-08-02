import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-work-order-addresses',
  templateUrl: './work-order-addresses.component.html',
  styleUrls: ['./work-order-addresses.component.css']
})
export class WorkOrderAddressesComponent implements OnInit {
  @Input() addressesForm;

  adressFormFields = {
    SiteName: '',
    Address: '',
    City: '',
    StateorProvince: '',
    Country: '',
    ContactName: ''
  };
  siteDropdownMenu = [
    { label: 'NewyorkLocation', value: 'NewyorkLocation' },
    { label: 'HyderabadLocation', value: 'HyderabadLocation' },
    { label: 'Chicago Location', value: 'Chicago Location' }
  ];

  ngOnInit(): void {
    this.addressesForm = {
      ...this.addressesForm,
      ShipTo: [{ ...this.adressFormFields }],
      BillTo: [{ ...this.adressFormFields }]
    };
    console.log(this.addressesForm);
  }
}
