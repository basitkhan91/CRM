import { Component } from "@angular/core";
import { BreadcrumbModule } from 'primeng/breadcrumb'; //Bread Crumb
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { Message } from 'primeng/components/common/message';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
    selector: 'quickapp-pro-employee',
    templateUrl: './employeepages.component.html'
})
/** Vendorpages component*/
export class EmployeePagesComponent {

	otherurl: any;
	currentUrl: string;

	public items: MenuItem[];
	home: MenuItem;

	constructor(private router: ActivatedRoute, private route: Router, private employeeService: EmployeeService )

	{
		this.employeeService.bredcrumbObjChangeObject$.subscribe(value => {
			//debugger
			this.otherurl = value;
			this.loadmethod(this.otherurl);

		});
	}

	ngOnInit() {
		this.currentUrl = this.route.url;
		this.loadmethod(this.currentUrl)

	}

	loadmethod(url) {

		this.currentUrl = url;
		if (this.currentUrl) {
			if (this.currentUrl == '/employeesmodule/employeepages/app-employees-list') {
				this.items = [
					{ label: 'Employee' },
					{ label: 'Employee-list' }
				];
			}

			else if (this.currentUrl == '/employeesmodule/employeepages/app-employee-general-information') {
				this.items = [
					{ label: 'Employee' },
					{ label: 'Employee-General-Information' }
				];
			}

			else if (this.currentUrl == '/employeesmodule/employeepages/app-employee-certification') {
				this.items = [
					{ label: 'Employee' },
					{ label: 'Employee-Certification' }
				];
			}

			else if (this.currentUrl == '/employeesmodule/employeepages/app-employee-training') {
				this.items = [
					{ label: 'Employee' },
					{ label: 'Employee-Training' }
				];
			}
		}
		if (this.otherurl) {
			if (this.currentUrl == '/employeesmodule/employeepages/app-employees-list') {
				this.items = [
					{ label: 'Employee' },
					{ label: 'Employee-list' }
				];
			}

			else if (this.currentUrl == '/employeesmodule/employeepages/app-employee-general-information') {
				this.items = [
					{ label: 'Employee' },
					{ label: 'Employee-General-Information' }
				];
			}

			else if (this.currentUrl == '/employeesmodule/employeepages/app-employee-certification') {
				this.items = [
					{ label: 'Employee' },
					{ label: 'Employee-Certification' }
				];
			}

			else if (this.currentUrl == '/employeesmodule/employeepages/app-employee-training') {
				this.items = [
					{ label: 'Employee' },
					{ label: 'Employee-Training' }
				];
			}
			}

		}


	}
