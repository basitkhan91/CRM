import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-order-addresses',
  templateUrl: './work-order-addresses.component.html',
  styleUrls: ['./work-order-addresses.component.css']
})
export class WorkOrderAddressesComponent implements OnInit {
  siteDropdownMenu = [
    { label: 'NewyorkLocation', value: 'NewyorkLocation' },
    { label: 'HyderabadLocation', value: 'HyderabadLocation' },
    { label: 'Chicago Location', value: 'Chicago Location' }
  ];
  ngOnInit(): void {}
}
