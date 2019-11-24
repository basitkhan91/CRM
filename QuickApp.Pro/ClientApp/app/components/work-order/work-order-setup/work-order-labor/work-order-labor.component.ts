import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import {
  WorkOrderLabor,
  AllTasks
} from '../../../../models/work-order-labor.modal';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { CommonService } from '../../../../services/common.service';
import { getObjectByValue, getValueFromObjectByKey } from '../../../../generic/autocomplete';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-work-order-labor',
  templateUrl: './work-order-labor.component.html',
  styleUrls: ['./work-order-labor.component.css']
})
/** WorkOrderMainComponent component*/
export class WorkOrderLaborComponent implements OnInit {
  @Input() savedWorkOrderData;
  @Input() laborForm: WorkOrderLabor;
  @Input() workOrderWorkFlowOriginalData: any;
  @Output() saveworkOrderLabor = new EventEmitter();

  workOrderWorkFlowList: any;
  employeesOriginalData: any;
  employeeList: any;
  dataEnteredByList: any;
  expertiseTypeList: Object;
  id: any;
  taskList: any;
  saveFormdata: any;
  totalWorkHours: any;
  minDateValue: Date = new Date()
  billableList = [
    { label: 'Billable', value: 1 },
    { label: 'Non-Billable', value: 2 }
  ]

  constructor(private workOrderService: WorkOrderService,
    private authService: AuthService,
    private commonService: CommonService) { }

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

    // this.getWorkOrderWorkFlowNos();
    console.log(this.savedWorkOrderData);
    this.getAllEmployees();
    this.getAllExpertiseType();
    this.getTaskList()
    this.id = this.savedWorkOrderData.workOrderId;
  }


  get userName(): string {
    return this.authService.currentUser ? this.authService.currentUser.userName : "";
  }


  // getWorkOrderWorkFlowNos(){
  //   this.workOrderService.getWorkOrderWorkFlowNumbers().subscribe(res => {
  //     this.workOrderWorkFlowOriginalData = res;
  //   })
  // }



  getTaskList(){
    this.workOrderService.getAllTasks()
    .subscribe(
      (taskList)=>{
        this.taskList = taskList;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  calculateHoursDifference(obj){
    if(obj.hours != '' && obj.adjustments != ""){
      this.totalWorkHours = 0;

      let hoursArr = obj.hours.split(':');
      if(hoursArr.length == 1){ hoursArr.push(0)}
      let hoursInSeconds = (+hoursArr[0]) * 60 * 60 + (+hoursArr[1]) * 60;
      let adjustmentsHoursArr = obj.adjustments.split(':');
      if(adjustmentsHoursArr.length == 1){ adjustmentsHoursArr.push(0)}
      let adjustmentsInSec = (+obj.adjustments) * 60 * 60 + (+hoursArr[1]) * 60;
      let diff = hoursInSeconds - adjustmentsInSec;
      let h = Math.floor(diff / 3600).toString();
      let m = Math.floor(diff % 3600 / 60).toString();
      let s = Math.floor(diff % 3600 % 60).toString();
      h = 
      obj['adjustedHours'] = `${(h.length ==1)?'0'+h:h}.${(m.length ==1)?'0'+m:m}`;
      var totalSec = 0;
      for(let task in this.laborForm.workOrderLaborList[0]){
        if(this.laborForm.workOrderLaborList[0][task][0]['hours'] != ''){
          for (let taskList of this.laborForm.workOrderLaborList[0][task] ){
            hoursArr = taskList['hours'].split(":");
            if(hoursArr.length == 1){ hoursArr.push(0)}
            hoursInSeconds = (+hoursArr[0]) * 60 * 60 + (+hoursArr[1]) * 60;
            totalSec += hoursInSeconds;
          }
        }
      }
      h = Math.floor(totalSec / 3600).toString();
      m = Math.floor(totalSec % 3600 / 60).toString();
      s = Math.floor(totalSec % 3600 % 60).toString();
      this.totalWorkHours = `${(h.length ==1)?'0'+h:h}:${(m.length ==1)?'0'+m:m}:${(s.length ==1)?'0'+s:s}`;
    }
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

  getAllExpertiseType() {
    this.commonService.smartDropDownList('ExpertiseType', 'ExpertiseTypeId', 'Description').subscribe(res => {
      this.expertiseTypeList = res;
    })
  }

  addNewTask(taskName) {
    this.laborForm.workOrderLaborList[0][taskName].push(new AllTasks());
  }
  startandStop(currentRecord) {
    if (currentRecord.startDate === null) {
      currentRecord.startDate = new Date();
    } else if (currentRecord.endDate === null) {
      currentRecord.endDate = currentRecord.startDate;
    }
    this.calculateWorkingHoursandMins(currentRecord)
  }


  resetEndDateandTime(currentRecord) {
    currentRecord.endDate = null;
  }

  calculateWorkingHoursandMins(currentRecord) {
    console.log(currentRecord)
    if (currentRecord.startDate && currentRecord.endDate) {
      const start = moment(currentRecord.startDate)
      const end = moment(currentRecord.endDate)
      // currentRecord.hours = start.diff(end);
      const ms = moment(end, "DD/MM/YYYY HH:mm:ss").diff(moment(start, "DD/MM/YYYY HH:mm:ss"));
      console.log(ms);
      const days = moment.duration(ms)
      console.log(days);
      currentRecord.hours = Math.floor(days.asHours()) + moment.utc(ms).format(":mm")
      // currentRecord.hours = moment(moment(startTime, "hh:mm").diff(moment(endTime, "hh:mm"))).format("hh:mm");
    }

  }

  isEditTime(currentRecord, field) {
    if (field === 'endDateandTimeIsEdit') {
      currentRecord[field] = currentRecord[field] === true ? false : true;
    } else if (field === 'startDateandTimeIsEdit') {
      currentRecord[field] = currentRecord[field] === true ? false : true;
    }

  }

  // moment(new Date()).format('DD/MM/YYYY, h:mm:ss a');
  saveLabor() {
    console.log(this.laborForm);
    const excessParams = {
      createdBy: this.userName,
      updatedBy: this.userName,
      createdate: new Date(),
      updatdate: new Date(),
      isActive: true,
      IsDeleted: false,
    }
    let hoursorClockorScan;
    if (this.laborForm.hoursorClockorScan === 'labourHours') {
      hoursorClockorScan = 1;
    } else if (this.laborForm.hoursorClockorScan === 'labourClock') {
      hoursorClockorScan = 2;
    } else if (this.laborForm.hoursorClockorScan === 'scan') {
      hoursorClockorScan = 3;
    }

    let tasksData = this.laborForm.workOrderLaborList[0];
    this.saveFormdata = {
      ...this.laborForm,
      hoursorClockorScan: hoursorClockorScan,
      dataEnteredBy: getValueFromObjectByKey('value', this.laborForm.dataEnteredBy),
      employeeId: getValueFromObjectByKey('value', this.laborForm.employeeId),
      masterCompanyId: 1,
      ...excessParams,
      workOrderId: this.id,
      workFlowWorkOrderId: getValueFromObjectByKey('value', this.laborForm.workFlowWorkOrderId),
      workOrderLaborList:
      {
        receive: tasksData['receive'].map(x => {
          return {
            ...x,
            ...excessParams,
            taskId: 1,
            employeeId: getValueFromObjectByKey('value', x.employeeId)
          }
        }),
        inspect: tasksData['inspect'].map(x => {
          return {
            ...x,
            ...excessParams,
            taskId: 2,
            employeeId: getValueFromObjectByKey('value', x.employeeId)
          }
        }),
        evaluate: tasksData['evaluate'].map(x => {
          return {
            ...x,
            ...excessParams,
            taskId: 3,
            employeeId: getValueFromObjectByKey('value', x.employeeId)
          }
        }),
        tearDown: tasksData['tearDown'].map(x => {
          return {
            ...x,
            ...excessParams,
            taskId: 4,
            employeeId: getValueFromObjectByKey('value', x.employeeId)
          }
        }),
        disassemble: tasksData['disassemble'].map(x => {
          return {
            ...x,
            ...excessParams,
            taskId: 5,
            employeeId: getValueFromObjectByKey('value', x.employeeId)
          }
        }),
        assemble: tasksData['assemble'].map(x => {
          return {
            ...x,
            ...excessParams,
            taskId: 6,
            employeeId: getValueFromObjectByKey('value', x.employeeId)
          }
        }),
        testing: tasksData['testing'].map(x => {
          return {
            ...x,
            ...excessParams,
            taskId: 7,
            employeeId: getValueFromObjectByKey('value', x.employeeId)
          }
        }),
        qualityControl: tasksData['qualityControl'].map(x => {
          return {
            ...x,
            ...excessParams,
            taskId: 8,
            employeeId: getValueFromObjectByKey('value', x.employeeId)
          }
        }),
        ship: tasksData['ship'].map(x => {
          return {
            ...x,
            ...excessParams,
            taskId: 9,
            employeeId: getValueFromObjectByKey('value', x.employeeId)
          }
        }),
        clean: tasksData['clean'].map(x => {
          return {
            ...x,
            ...excessParams,
            taskId: 10,
            employeeId: getValueFromObjectByKey('value', x.employeeId)
          }
        })
      }


    }


    // const labFormData =  this.laborForm

    // const keysArray: any = Object.keys(this.laborForm.tasks[0]);
    // console.log(keysArray);
    // for (let i = 0; i < keysArray.length; i++) {
    //   let currentKey = keysArray[i];
    //   console.log(currentKey)
    //   this.saveFormdata  = {
    //     ...this.laborForm,
    //     tasks : [  { 
    //       [currentKey] : this.laborForm.tasks[0][currentKey].map(x => {
    //        return{
    //          ...x,
    //          name:  keysArray[i],
    //          employeeId: getValueFromObjectByKey('value', x.employeeId )
    //        }
    //       }),
    //     workOrderId : this.id }]
    //   };
    // }



    this.saveworkOrderLabor.emit(this.saveFormdata);

  }
  // tasks : this.laborForm.tasks[0][keysArray[i]].map(x => {
  //   return {
  //     ...x,
  //     employeeId: getValueFromObjectByKey('value', x.employeeId )
  //   }
  // }),
}
