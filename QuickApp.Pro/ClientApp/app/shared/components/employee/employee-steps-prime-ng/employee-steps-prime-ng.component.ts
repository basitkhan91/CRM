import { Component } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { Message } from 'primeng/components/common/message';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { EmployeeService } from "../../../../services/employee.service";

@Component({
    selector: 'app-employee-steps-prime-ng',
    templateUrl: './employee-steps-prime-ng.component.html',
    styleUrls: ['./employee-steps-prime-ng.component.scss']
})
/** employee-steps-primeNg component*/
export class EmployeeStepsPrimeNgComponent {

	ifvalue: boolean;
	generalcollection: any;
	collection: any;
	currentUrl: any;
	items: {}[];

	msgs: Message[] = [];

	activeIndex: number;

	showComponentPTab: boolean;
    isDisabledSteps: boolean = false;
    /** employee-steps-primeNg ctor */
	constructor(private router: ActivatedRoute, private route: Router, private employeeService: EmployeeService) {
		let currentUrl = this.route.url;
		this.employeeService.alertChangeObject$.subscribe(value => {
			this.showComponentPTab = value;

		});
		this.employeeService.indexObjChangeObject$.subscribe(value => {
			this.activeIndex = value;

		});
	}

	ngOnInit() {
		this.showComponentPTab = this.employeeService.ShowPtab;
		this.currentUrl = this.route.url;
		//debugger
		if (this.currentUrl == '/employeesmodule/employeepages/app-employees-list') {
			this.showComponentPTab = false;
			this.activeIndex = 0;

		}
		else if (this.currentUrl == '/employeesmodule/employeepages/app-employee-general-information') {
			this.activeIndex = 0;
            this.isDisabledSteps = true;

		}
		else if (this.currentUrl == '/employeesmodule/employeepages/app-employee-certification') {
			
			this.activeIndex = 1;
		}

		else if (this.currentUrl == '/employeesmodule/employeepages/app-employee-training') {

			this.activeIndex = 2;
		}

		else if (this.currentUrl == '/employeesmodule/employeepages/app-employees-management-structure') {

			this.activeIndex = 3;
		}
		


		this.items = [{
			label: 'General Information',
            step:1,
            index:0,
			command: (event: any) => {
				this.activeIndex = 0;
				this.msgs.length = 0;
				this.msgs.push({ severity: 'info', summary: 'General Information', detail: event.label });
				this.route.navigateByUrl('/employeesmodule/employeepages/app-employee-general-information');

			}
		},
		{
			label: 'Certification',
            step:2,
            index:1,
			command: (event: any) => {
				this.activeIndex = 1;
				this.msgs.length = 0;
				this.msgs.push({ severity: 'info', summary: 'Contacts', detail: event.label });
				this.route.navigateByUrl('/employeesmodule/employeepages/app-employee-certification');
			}
		},
		{
			label: 'Training',
            step:3,
            index:2,
			command: (event: any) => {
				this.activeIndex = 2;
				this.msgs.length = 0;
				this.msgs.push({ severity: 'info', summary: 'Financial Information', detail: event.label });
				this.route.navigateByUrl('/employeesmodule/employeepages/app-employee-training');
			}
		},
		{
			label: 'Management Structure',
            step:4,
            index:3,
			command: (event: any) => {
				this.activeIndex = 3;
				this.msgs.length = 0;
				this.msgs.push({ severity: 'info', summary: 'Management Structure', detail: event.label });
				this.route.navigateByUrl('/employeesmodule/employeepages/app-employees-management-structure');
			}
		}
	];
	}
}