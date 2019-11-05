import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import {
  WorkOrderLabor,
  AllTasks
} from '../../../../models/work-order-labor.modal';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { CommonService } from '../../../../services/common.service';
@Component({
  selector: 'app-work-order-labor',
  templateUrl: './work-order-labor.component.html',
  styleUrls: ['./work-order-labor.component.css']
})
/** WorkOrderMainComponent component*/
export class WorkOrderLaborComponent implements OnInit {
  @Input() laborForm: WorkOrderLabor;
  workOrderWorkFlowOriginalData: any;
  workOrderWorkFlowList: any;
  employeesOriginalData: any;
  employeeList: any;
  dataEnteredByList: any;
  expertiseTypeList: Object;

  constructor(private workOrderService: WorkOrderService, private commonService : CommonService){}

  // expertiseDropdownMenu = [
  //   { label: 'Technician', value: 'Technician' },
  //   { label: 'Quality', value: 'Quality' },
  //   { label: 'Mechanic', value: 'Mechanic' },
  //   { label: 'Inspector', value: 'Inspector' },
  //   { label: 'Receiver', value: 'Receiver' },
  //   { label: 'Auditor', value: 'Auditor' },
  //   { label: 'Engineer', value: 'Engineer' }
  // ];
  ngOnInit() {

    this.getWorkOrderWorkFlowNos();
    this.getAllEmployees();
    this.getAllExpertiseType();
  }

  getWorkOrderWorkFlowNos(){
    this.workOrderService.getWorkOrderWorkFlowNumbers().subscribe(res => {
      this.workOrderWorkFlowOriginalData = res;
    })
  }

  
  
  filterWorkFlowNumbers(event): void {

    this.workOrderWorkFlowList = this.workOrderWorkFlowOriginalData;

    if (event.query !== undefined && event.query !== null) {
      const workFlowNos = [...this.workOrderWorkFlowOriginalData.filter(x => {
        return x.label.toLowerCase().includes(event.query.toLowerCase())
      })]
      this.workOrderWorkFlowList = workFlowNos;
    }
  }

  getAllEmployees(): void {
    this.commonService.smartDropDownList('Employee', 'EmployeeId', 'FirstName').subscribe(res => {
      this.employeesOriginalData = res;
    })
  }

  filterDataEnteredBy(event): void {

    this.dataEnteredByList = this.employeesOriginalData;

    if (event.query !== undefined && event.query !== null) {
      const dataEnteredBy = [...this.employeesOriginalData.filter(x => {
        return x.label.toLowerCase().includes(event.query.toLowerCase())
      })]
      this.dataEnteredByList = dataEnteredBy;
    }
  }


  filterEmployee(event): void {

    this.employeeList = this.employeesOriginalData;

    if (event.query !== undefined && event.query !== null) {
      const employee = [...this.employeesOriginalData.filter(x => {
        return x.label.toLowerCase().includes(event.query.toLowerCase())
      })]
      this.employeeList = employee;
    }
  }

  getAllExpertiseType(){
    this.commonService.smartDropDownList('ExpertiseType' , 'ExpertiseTypeId',  'Description').subscribe(res => {
      this.expertiseTypeList = res;
    })
  }

  addNewTask(taskName) {
    this.laborForm.tasks[0][taskName].push(new AllTasks());
  }
  startandStop(obj) {
    if (obj.startDateandTime === null) {
      obj.startDateandTime = new Date();
    } else if (obj.endDateandTime === null) {
      obj.endDateandTime = new Date();
    }
  }
  // moment(new Date()).format('DD/MM/YYYY, h:mm:ss a');
  saveLabor() {
    console.log(this.laborForm);
  }
}
