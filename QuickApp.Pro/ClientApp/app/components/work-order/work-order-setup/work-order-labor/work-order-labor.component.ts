import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import {
  WorkOrderLabor,
  AllTasks
} from '../../../../models/work-order-labor.modal';
@Component({
  selector: 'app-work-order-labor',
  templateUrl: './work-order-labor.component.html',
  styleUrls: ['./work-order-labor.component.css']
})
/** WorkOrderMainComponent component*/
export class WorkOrderLaborComponent implements OnInit {
  @Input() laborForm: WorkOrderLabor;

  expertiseDropdownMenu = [
    { label: 'Technician', value: 'Technician' },
    { label: 'Quality', value: 'Quality' },
    { label: 'Mechanic', value: 'Mechanic' },
    { label: 'Inspector', value: 'Inspector' },
    { label: 'Receiver', value: 'Receiver' },
    { label: 'Auditor', value: 'Auditor' },
    { label: 'Engineer', value: 'Engineer' }
  ];
  ngOnInit() {}
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
