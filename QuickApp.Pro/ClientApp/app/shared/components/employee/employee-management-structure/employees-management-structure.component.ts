import { Component } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../../../services/animations';
import { PageHeaderComponent } from '../../../page-header.component';
import { ActionService } from '../../../../services/action.service';
import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../../../services/alert.service';
import { Action } from '../../../../models/action.model';
import { AuditHistory } from '../../../../models/audithistory.model';
import { AuthService } from '../../../../services/auth.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../../../models/mastercompany.model';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';

import { CheckboxModule } from 'primeng/checkbox';
import { EmployeeService } from '../../../../services/employee.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
import { AppTranslationService } from '../../../../services/app-translation.service';
import { LegalEntityService } from '../../../../services/legalentity.service';



@Component({
    selector: 'app-employees-management-structure',
    templateUrl: './employees-management-structure.component.html',
    styleUrls: ['./employees-management-structure.component.scss'],
    animations: [fadeInOut]
})
/** employees-list component*/
export class EmployeesManagementStructureComponent implements OnInit{
    selectedRoles: any;
    memoText: string;
    employeeRolesList: object[];
    employeeRoleLabel = [];
    allManagemtninfo: any[];
    tagNameCollection: any[] = [];
    dropdownSettings = {
        singleSelection: false,
        idField: 'dashNumberId',
        textField: 'dashNumber',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
    };
    gridData = [];
    // gridData = [
    //     {
    //       "data": {
    //         "managementStructureId": 118,
    //         "code": "BAsit The king",
    //         "name": "BAsit The king",
    //         "description": null,
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2019-08-19T23:22:11.7922005",
    //         "createdDate": "2019-08-19T23:22:11.7921999"
    //       },
    //       "children": [
    //         {
    //           "data": {
    //             "managementStructureId": 119,
    //             "code": "Queen",
    //             "name": "Queen",
    //             "description": null,
    //             "parentId": 118,
    //             "isLastChild": null,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2019-08-19T23:22:47.5715777",
    //             "createdDate": "2019-08-19T23:22:47.5715748"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 115,
    //         "code": "dfwef",
    //         "name": "wwgwg",
    //         "description": null,
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2019-08-19T22:56:31.2382055",
    //         "createdDate": "2019-08-19T22:56:31.2382042"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 108,
    //         "code": "New",
    //         "name": "Nedw",
    //         "description": null,
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2019-08-19T22:24:26.3203929",
    //         "createdDate": "2019-08-19T22:24:26.3203906"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 103,
    //         "code": "ABC Inc",
    //         "name": "ABC Corp, Inc",
    //         "description": "Holding Company",
    //         "parentId": null,
    //         "isLastChild": true,
    //         "tagName": null,
    //         "legalEntityId": 58,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2019-05-22T21:51:19.6176704",
    //         "createdDate": "2019-05-22T21:51:19.6176681"
    //       },
    //       "children": [
    //         {
    //           "data": {
    //             "managementStructureId": 120,
    //             "code": "ABCADMIN",
    //             "name": "Admin",
    //             "description": null,
    //             "parentId": 103,
    //             "isLastChild": null,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2019-08-19T23:24:01.9397393",
    //             "createdDate": "2019-08-19T23:24:01.939738"
    //           },
    //           "children": [
    //             {
    //               "data": {
    //                 "managementStructureId": 122,
    //                 "code": "HR",
    //                 "name": "HR",
    //                 "description": null,
    //                 "parentId": 120,
    //                 "isLastChild": null,
    //                 "tagName": null,
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2019-08-19T23:24:24.5999368",
    //                 "createdDate": "2019-08-19T23:24:24.5999362"
    //               }
    //             },
    //             {
    //               "data": {
    //                 "managementStructureId": 121,
    //                 "code": "IT",
    //                 "name": "IT",
    //                 "description": null,
    //                 "parentId": 120,
    //                 "isLastChild": null,
    //                 "tagName": null,
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2019-08-19T23:24:12.5933845",
    //                 "createdDate": "2019-08-19T23:24:12.5933842"
    //               }
    //             }
    //           ]
    //         },
    //         {
    //           "data": {
    //             "managementStructureId": 116,
    //             "code": "TOTOPS",
    //             "name": "Total Operations",
    //             "description": null,
    //             "parentId": 103,
    //             "isLastChild": null,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2019-08-19T22:57:08.1081206",
    //             "createdDate": "2019-08-19T22:57:08.10812"
    //           }
    //         },
    //         {
    //           "data": {
    //             "managementStructureId": 114,
    //             "code": "ABCMFG",
    //             "name": "Manufacturing",
    //             "description": null,
    //             "parentId": 103,
    //             "isLastChild": null,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2019-08-19T22:54:35.1619698",
    //             "createdDate": "2019-08-19T22:54:35.1619679"
    //           },
    //           "children": [
    //             {
    //               "data": {
    //                 "managementStructureId": 123,
    //                 "code": "child 2",
    //                 "name": "child 2",
    //                 "description": null,
    //                 "parentId": 114,
    //                 "isLastChild": null,
    //                 "tagName": null,
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2019-08-19T23:30:16.0724371",
    //                 "createdDate": "2019-08-19T23:30:16.0724361"
    //               },
    //               "children": [
    //                 {
    //                   "data": {
    //                     "managementStructureId": 126,
    //                     "code": "Child 1a",
    //                     "name": "Child 1a",
    //                     "description": null,
    //                     "parentId": 123,
    //                     "isLastChild": null,
    //                     "tagName": null,
    //                     "legalEntityId": 19,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2019-08-21T00:23:57.3595304",
    //                     "createdDate": "2019-08-21T00:23:57.3595301"
    //                   }
    //                 },
    //                 {
    //                   "data": {
    //                     "managementStructureId": 124,
    //                     "code": "Child 1",
    //                     "name": "Child 1",
    //                     "description": null,
    //                     "parentId": 123,
    //                     "isLastChild": null,
    //                     "tagName": null,
    //                     "legalEntityId": 19,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2019-08-19T23:45:04.57474",
    //                     "createdDate": "2019-08-19T23:45:04.5747384"
    //                   },
    //                   "children": [
    //                     {
    //                       "data": {
    //                         "managementStructureId": 125,
    //                         "code": "dfhdh",
    //                         "name": "dhhah",
    //                         "description": null,
    //                         "parentId": 124,
    //                         "isLastChild": null,
    //                         "tagName": null,
    //                         "legalEntityId": 19,
    //                         "masterCompanyId": 1,
    //                         "isActive": true,
    //                         "isDelete": false,
    //                         "createdBy": "admin",
    //                         "updatedBy": "admin",
    //                         "updatedDate": "2019-08-21T00:19:05.4016445",
    //                         "createdDate": "2019-08-21T00:19:05.4016288"
    //                       },
    //                       "children": [
    //                         {
    //                           "data": {
    //                             "managementStructureId": 128,
    //                             "code": "Donny",
    //                             "name": "Donny",
    //                             "description": null,
    //                             "parentId": 125,
    //                             "isLastChild": null,
    //                             "tagName": null,
    //                             "legalEntityId": 19,
    //                             "masterCompanyId": 1,
    //                             "isActive": true,
    //                             "isDelete": false,
    //                             "createdBy": "admin",
    //                             "updatedBy": "admin",
    //                             "updatedDate": "2019-08-21T10:38:52.988017",
    //                             "createdDate": "2019-08-21T10:38:52.9880157"
    //                           }
    //                         },
    //                         {
    //                           "data": {
    //                             "managementStructureId": 127,
    //                             "code": "Asif",
    //                             "name": "Asif",
    //                             "description": null,
    //                             "parentId": 125,
    //                             "isLastChild": null,
    //                             "tagName": null,
    //                             "legalEntityId": 19,
    //                             "masterCompanyId": 1,
    //                             "isActive": true,
    //                             "isDelete": false,
    //                             "createdBy": "admin",
    //                             "updatedBy": "admin",
    //                             "updatedDate": "2019-08-21T10:38:28.5666322",
    //                             "createdDate": "2019-08-21T10:38:28.5666299"
    //                           }
    //                         }
    //                       ]
    //                     }
    //                   ]
    //                 }
    //               ]
    //             },
    //             {
    //               "data": {
    //                 "managementStructureId": 117,
    //                 "code": "ABCMFGSHOP",
    //                 "name": "Shop",
    //                 "description": null,
    //                 "parentId": 114,
    //                 "isLastChild": null,
    //                 "tagName": null,
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2019-08-19T23:14:20.0810746",
    //                 "createdDate": "2019-08-19T23:14:20.0810739"
    //               }
    //             }
    //           ]
    //         },
    //         {
    //           "data": {
    //             "managementStructureId": 113,
    //             "code": "ABCDIST",
    //             "name": "Distribution",
    //             "description": null,
    //             "parentId": 103,
    //             "isLastChild": null,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2019-08-19T22:54:07.3451257",
    //             "createdDate": "2019-08-19T22:54:07.3451245"
    //           }
    //         },
    //         {
    //           "data": {
    //             "managementStructureId": 112,
    //             "code": "ABCMRO",
    //             "name": "MRO",
    //             "description": null,
    //             "parentId": 103,
    //             "isLastChild": null,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2019-08-19T22:53:45.642831",
    //             "createdDate": "2019-08-19T22:53:45.6428294"
    //           }
    //         },
    //         {
    //           "data": {
    //             "managementStructureId": 109,
    //             "code": "ABCPS",
    //             "name": "Parts Sale",
    //             "description": null,
    //             "parentId": 103,
    //             "isLastChild": null,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2019-08-19T22:51:48.4271685",
    //             "createdDate": "2019-08-19T22:51:48.4271678"
    //           },
    //           "children": [
    //             {
    //               "data": {
    //                 "managementStructureId": 111,
    //                 "code": "ABCMRO",
    //                 "name": "ABC MRO",
    //                 "description": null,
    //                 "parentId": 109,
    //                 "isLastChild": null,
    //                 "tagName": null,
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2019-08-19T22:53:20.1002779",
    //                 "createdDate": "2019-08-19T22:53:20.1002776"
    //               }
    //             },
    //             {
    //               "data": {
    //                 "managementStructureId": 110,
    //                 "code": "ABCDIST",
    //                 "name": "ABC Distribution",
    //                 "description": null,
    //                 "parentId": 109,
    //                 "isLastChild": null,
    //                 "tagName": null,
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2019-08-19T22:52:17.4715022",
    //                 "createdDate": "2019-08-19T22:52:17.4715015"
    //               }
    //             }
    //           ]
    //         },
    //         {
    //           "data": {
    //             "managementStructureId": 105,
    //             "code": "ABC 22",
    //             "name": "ABC 22 Corp",
    //             "description": null,
    //             "parentId": 103,
    //             "isLastChild": null,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2019-05-22T21:52:56.6369417",
    //             "createdDate": "2019-05-22T21:52:56.636941"
    //           },
    //           "children": [
    //             {
    //               "data": {
    //                 "managementStructureId": 107,
    //                 "code": "ABC 222",
    //                 "name": "ABC 222 Corp",
    //                 "description": "ABC 222 Corp",
    //                 "parentId": 105,
    //                 "isLastChild": null,
    //                 "tagName": null,
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2019-05-22T21:55:23.383064",
    //                 "createdDate": "2019-05-22T21:55:23.3830633"
    //               }
    //             },
    //             {
    //               "data": {
    //                 "managementStructureId": 106,
    //                 "code": "ABC 221",
    //                 "name": "ABC Corp 221",
    //                 "description": "dvavsdv",
    //                 "parentId": 105,
    //                 "isLastChild": true,
    //                 "tagName": null,
    //                 "legalEntityId": 57,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2019-05-22T21:53:28.3936213",
    //                 "createdDate": "2019-05-22T21:53:28.393621"
    //               }
    //             }
    //           ]
    //         },
    //         {
    //           "data": {
    //             "managementStructureId": 104,
    //             "code": "ABCMRO",
    //             "name": "ABC MRO Division",
    //             "description": "",
    //             "parentId": 103,
    //             "isLastChild": false,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2019-05-22T21:52:25.5874573",
    //             "createdDate": "2019-05-22T21:52:25.587455"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 94,
    //         "code": "TESTCMPNY",
    //         "name": "NAME",
    //         "description": "DES",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-13T14:50:19.640888",
    //         "createdDate": "2018-12-13T14:50:19.6407736"
    //       },
    //       "children": [
    //         {
    //           "data": {
    //             "managementStructureId": 98,
    //             "code": "sdsd",
    //             "name": "asas",
    //             "description": "asas",
    //             "parentId": 94,
    //             "isLastChild": null,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2018-12-22T20:09:42.9803047",
    //             "createdDate": "2018-12-22T20:09:42.9801989"
    //           },
    //           "children": [
    //             {
    //               "data": {
    //                 "managementStructureId": 99,
    //                 "code": "husdhsd",
    //                 "name": "sbdvsd",
    //                 "description": "sndjsd",
    //                 "parentId": 98,
    //                 "isLastChild": null,
    //                 "tagName": null,
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2018-12-22T20:12:54.7793106",
    //                 "createdDate": "2018-12-22T20:12:54.7793101"
    //               }
    //             }
    //           ]
    //         },
    //         {
    //           "data": {
    //             "managementStructureId": 97,
    //             "code": "asas",
    //             "name": "asas",
    //             "description": "asas",
    //             "parentId": 94,
    //             "isLastChild": null,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2018-12-22T19:40:34.7432179",
    //             "createdDate": "2018-12-22T19:40:34.7431144"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 93,
    //         "code": "Test11",
    //         "name": "name11",
    //         "description": "Main Company",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T17:47:04.93471",
    //         "createdDate": "2018-12-06T17:47:04.93471"
    //       },
    //       "children": [
    //         {
    //           "data": {
    //             "managementStructureId": 102,
    //             "code": "Test 12",
    //             "name": "Test 12",
    //             "description": "Test 12",
    //             "parentId": 93,
    //             "isLastChild": true,
    //             "tagName": "test",
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2019-05-16T21:27:08.6568583",
    //             "createdDate": "2019-05-16T21:27:08.6568576"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 92,
    //         "code": "Code11",
    //         "name": "name11",
    //         "description": "MC",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T17:45:42.3687996",
    //         "createdDate": "2018-12-06T17:45:42.3687996"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 91,
    //         "code": "Code",
    //         "name": "name",
    //         "description": "CMPNY",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T17:41:57.1549451",
    //         "createdDate": "2018-12-06T17:41:57.1549446"
    //       },
    //       "children": [
    //         {
    //           "data": {
    //             "managementStructureId": 95,
    //             "code": "3467",
    //             "name": "GP-1",
    //             "description": "Glass Protectors",
    //             "parentId": 91,
    //             "isLastChild": null,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2018-12-18T14:58:17.0424307",
    //             "createdDate": "2018-12-18T14:58:17.0424259"
    //           },
    //           "children": [
    //             {
    //               "data": {
    //                 "managementStructureId": 101,
    //                 "code": "Sat-Ish",
    //                 "name": "Satish",
    //                 "description": "Satish",
    //                 "parentId": 95,
    //                 "isLastChild": true,
    //                 "tagName": null,
    //                 "legalEntityId": 56,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2019-05-16T21:26:36.774473",
    //                 "createdDate": "2019-05-16T21:26:36.7744704"
    //               }
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 89,
    //         "code": "112",
    //         "name": "12",
    //         "description": "asas",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T17:00:42.5544937",
    //         "createdDate": "2018-12-06T17:00:42.5544937"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 88,
    //         "code": "asasas112",
    //         "name": "asas",
    //         "description": "aasas",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T16:59:35.8595103",
    //         "createdDate": "2018-12-06T16:59:35.8595103"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 87,
    //         "code": "sasasasdsd",
    //         "name": "asas",
    //         "description": "asas",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T16:57:25.4788103",
    //         "createdDate": "2018-12-06T16:57:25.4788103"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 86,
    //         "code": "asas",
    //         "name": "asas",
    //         "description": "asas",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T16:29:13.749444",
    //         "createdDate": "2018-12-06T16:29:13.749444"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 85,
    //         "code": "Code",
    //         "name": "name",
    //         "description": "desc",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T15:53:20.7930915",
    //         "createdDate": "2018-12-06T15:53:20.792984"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 84,
    //         "code": "asa",
    //         "name": "asas",
    //         "description": "asas",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T15:41:40.474748",
    //         "createdDate": "2018-12-06T15:41:40.474748"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 83,
    //         "code": "awewe",
    //         "name": "asas",
    //         "description": "asas",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T15:41:06.2669915",
    //         "createdDate": "2018-12-06T15:41:06.2669909"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 82,
    //         "code": "asaas",
    //         "name": "asas",
    //         "description": "asas",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T15:40:42.3260177",
    //         "createdDate": "2018-12-06T15:40:42.3260177"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 81,
    //         "code": "asas",
    //         "name": "aas",
    //         "description": "asas",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T15:03:17.0733064",
    //         "createdDate": "2018-12-06T15:03:17.0733064"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 80,
    //         "code": "TOP-POSSS",
    //         "name": "Saas",
    //         "description": "asas",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T15:00:51.352016",
    //         "createdDate": "2018-12-06T15:00:51.352016"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 79,
    //         "code": "ess",
    //         "name": "aas",
    //         "description": "asas",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T14:59:44.4832706",
    //         "createdDate": "2018-12-06T14:59:44.4832706"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 78,
    //         "code": "asas",
    //         "name": "asas",
    //         "description": "asas",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T14:54:39.308274",
    //         "createdDate": "2018-12-06T14:54:39.3082735"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 77,
    //         "code": "DSdsd",
    //         "name": "asas",
    //         "description": "asas",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T14:52:05.3247804",
    //         "createdDate": "2018-12-06T14:52:05.3247804"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 76,
    //         "code": "TEST11",
    //         "name": "Name11",
    //         "description": "hasajs",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T14:12:32.6951772",
    //         "createdDate": "2018-12-06T14:12:32.6950737"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 75,
    //         "code": "TEST",
    //         "name": "JSJA",
    //         "description": "aknsjas",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T14:04:52.3697351",
    //         "createdDate": "2018-12-06T14:04:52.3697351"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 74,
    //         "code": "Code11",
    //         "name": "Name",
    //         "description": "desc",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T14:03:24.3977307",
    //         "createdDate": "2018-12-06T14:03:24.3977302"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 73,
    //         "code": "TOP-OPS1",
    //         "name": "Name",
    //         "description": "desc",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T13:22:49.2627863",
    //         "createdDate": "2018-12-06T13:22:49.2626799"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 72,
    //         "code": "TOP-OPS1",
    //         "name": "Name",
    //         "description": "Desc",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-06T13:18:57.5351442",
    //         "createdDate": "2018-12-06T13:18:57.5350219"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 71,
    //         "code": "Code1",
    //         "name": "test_name",
    //         "description": "description",
    //         "parentId": null,
    //         "isLastChild": true,
    //         "tagName": "tagname",
    //         "legalEntityId": 49,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-05T12:44:51.3960616",
    //         "createdDate": "2018-12-05T12:44:51.3959575"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 68,
    //         "code": "Z-The man",
    //         "name": "test_name",
    //         "description": "Z-The man",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-04T16:49:10.0708811",
    //         "createdDate": "2018-12-04T16:49:10.0708801"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 62,
    //         "code": "new root",
    //         "name": "test_name",
    //         "description": "new root",
    //         "parentId": null,
    //         "isLastChild": true,
    //         "tagName": null,
    //         "legalEntityId": 48,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-04T06:50:26.9003804",
    //         "createdDate": "2018-12-04T06:50:26.9003775"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 50,
    //         "code": "TOT-OPS",
    //         "name": "TOTAL OPERATIONS",
    //         "description": "",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 38,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-03T21:41:31.1686515",
    //         "createdDate": "2018-12-03T21:41:31.1686509"
    //       },
    //       "children": [
    //         {
    //           "data": {
    //             "managementStructureId": 52,
    //             "code": "BU 002",
    //             "name": "Component",
    //             "description": "",
    //             "parentId": 50,
    //             "isLastChild": true,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2018-12-03T21:43:12.5341196",
    //             "createdDate": "2018-12-03T21:43:12.5341189"
    //           },
    //           "children": [
    //             {
    //               "data": {
    //                 "managementStructureId": 90,
    //                 "code": "asas121434",
    //                 "name": "asasasas",
    //                 "description": "asas",
    //                 "parentId": 52,
    //                 "isLastChild": null,
    //                 "tagName": null,
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2018-12-06T17:00:57.8878615",
    //                 "createdDate": "2018-12-06T17:00:57.8878615"
    //               }
    //             },
    //             {
    //               "data": {
    //                 "managementStructureId": 70,
    //                 "code": "New 001",
    //                 "name": "New Member",
    //                 "description": "",
    //                 "parentId": 52,
    //                 "isLastChild": true,
    //                 "tagName": "Roger",
    //                 "legalEntityId": 38,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2018-12-04T23:42:32.1082251",
    //                 "createdDate": "2018-12-04T23:42:32.1082232"
    //               }
    //             },
    //             {
    //               "data": {
    //                 "managementStructureId": 65,
    //                 "code": null,
    //                 "name": "test_name",
    //                 "description": null,
    //                 "parentId": 52,
    //                 "isLastChild": true,
    //                 "tagName": null,
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2018-12-04T13:32:56.6674032",
    //                 "createdDate": "2018-12-04T13:32:56.6674025"
    //               }
    //             },
    //             {
    //               "data": {
    //                 "managementStructureId": 53,
    //                 "code": "Div 001",
    //                 "name": "Air Frame Repair Division 001",
    //                 "description": "",
    //                 "parentId": 52,
    //                 "isLastChild": null,
    //                 "tagName": null,
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2018-12-03T21:44:31.5626946",
    //                 "createdDate": "2018-12-03T21:44:31.562694"
    //               },
    //               "children": [
    //                 {
    //                   "data": {
    //                     "managementStructureId": 63,
    //                     "code": "Zee",
    //                     "name": "Zee",
    //                     "description": "",
    //                     "parentId": 53,
    //                     "isLastChild": true,
    //                     "tagName": null,
    //                     "legalEntityId": 38,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-12-04T06:52:18.8131128",
    //                     "createdDate": "2018-12-04T06:52:18.8131118"
    //                   },
    //                   "children": [
    //                     {
    //                       "data": {
    //                         "managementStructureId": 66,
    //                         "code": "Z",
    //                         "name": "ZEE",
    //                         "description": "",
    //                         "parentId": 63,
    //                         "isLastChild": true,
    //                         "tagName": null,
    //                         "legalEntityId": 38,
    //                         "masterCompanyId": 1,
    //                         "isActive": true,
    //                         "isDelete": false,
    //                         "createdBy": "admin",
    //                         "updatedBy": "admin",
    //                         "updatedDate": "2018-12-04T16:46:42.9074103",
    //                         "createdDate": "2018-12-04T16:46:42.9074078"
    //                       },
    //                       "children": [
    //                         {
    //                           "data": {
    //                             "managementStructureId": 69,
    //                             "code": "hjjhj",
    //                             "name": "fadfafd",
    //                             "description": "",
    //                             "parentId": 66,
    //                             "isLastChild": true,
    //                             "tagName": null,
    //                             "legalEntityId": 38,
    //                             "masterCompanyId": 1,
    //                             "isActive": true,
    //                             "isDelete": false,
    //                             "createdBy": "admin",
    //                             "updatedBy": "admin",
    //                             "updatedDate": "2018-12-04T17:57:05.2571433",
    //                             "createdDate": "2018-12-04T17:57:05.2571411"
    //                           }
    //                         }
    //                       ]
    //                     },
    //                     {
    //                       "data": {
    //                         "managementStructureId": 64,
    //                         "code": null,
    //                         "name": "test_name",
    //                         "description": null,
    //                         "parentId": 63,
    //                         "isLastChild": null,
    //                         "tagName": null,
    //                         "legalEntityId": 19,
    //                         "masterCompanyId": 1,
    //                         "isActive": true,
    //                         "isDelete": false,
    //                         "createdBy": "admin",
    //                         "updatedBy": "admin",
    //                         "updatedDate": "2018-12-04T13:32:20.9585638",
    //                         "createdDate": "2018-12-04T13:32:20.9585599"
    //                       }
    //                     }
    //                   ]
    //                 },
    //                 {
    //                   "data": {
    //                     "managementStructureId": 55,
    //                     "code": "2345",
    //                     "name": "Hydraulic Power",
    //                     "description": "",
    //                     "parentId": 53,
    //                     "isLastChild": true,
    //                     "tagName": "Medium, Strong",
    //                     "legalEntityId": 38,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-12-03T21:45:50.7041057",
    //                     "createdDate": "2018-12-03T21:45:50.7041047"
    //                   }
    //                 },
    //                 {
    //                   "data": {
    //                     "managementStructureId": 54,
    //                     "code": "9999",
    //                     "name": "Flight Control",
    //                     "description": "",
    //                     "parentId": 53,
    //                     "isLastChild": true,
    //                     "tagName": "ABC Comp",
    //                     "legalEntityId": 38,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-12-03T21:45:15.120327",
    //                     "createdDate": "2018-12-03T21:45:15.1203257"
    //                   }
    //                 }
    //               ]
    //             }
    //           ]
    //         },
    //         {
    //           "data": {
    //             "managementStructureId": 51,
    //             "code": "BU 001",
    //             "name": "Air Frame Business Unit",
    //             "description": "",
    //             "parentId": 50,
    //             "isLastChild": null,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2018-12-03T21:42:05.6769933",
    //             "createdDate": "2018-12-03T21:42:05.6769927"
    //           },
    //           "children": [
    //             {
    //               "data": {
    //                 "managementStructureId": 59,
    //                 "code": "Div 002",
    //                 "name": "Structure",
    //                 "description": "",
    //                 "parentId": 51,
    //                 "isLastChild": null,
    //                 "tagName": null,
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2018-12-03T22:04:21.0576327",
    //                 "createdDate": "2018-12-03T22:04:21.0576321"
    //               },
    //               "children": [
    //                 {
    //                   "data": {
    //                     "managementStructureId": 61,
    //                     "code": "Dept 1111",
    //                     "name": "Fuselage",
    //                     "description": "",
    //                     "parentId": 59,
    //                     "isLastChild": true,
    //                     "tagName": "Roger",
    //                     "legalEntityId": 38,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-12-03T22:06:06.8146192",
    //                     "createdDate": "2018-12-03T22:06:06.8146185"
    //                   },
    //                   "children": [
    //                     {
    //                       "data": {
    //                         "managementStructureId": 96,
    //                         "code": "sdsd",
    //                         "name": "sdsd",
    //                         "description": "sdsd",
    //                         "parentId": 61,
    //                         "isLastChild": null,
    //                         "tagName": null,
    //                         "legalEntityId": 19,
    //                         "masterCompanyId": 1,
    //                         "isActive": true,
    //                         "isDelete": false,
    //                         "createdBy": "admin",
    //                         "updatedBy": "admin",
    //                         "updatedDate": "2018-12-22T17:38:49.11442",
    //                         "createdDate": "2018-12-22T17:38:49.1141691"
    //                       }
    //                     }
    //                   ]
    //                 },
    //                 {
    //                   "data": {
    //                     "managementStructureId": 60,
    //                     "code": "Dept 9999",
    //                     "name": "Flight Control",
    //                     "description": "",
    //                     "parentId": 59,
    //                     "isLastChild": true,
    //                     "tagName": null,
    //                     "legalEntityId": 38,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-12-03T22:05:15.6730325",
    //                     "createdDate": "2018-12-03T22:05:15.6730319"
    //                   }
    //                 }
    //               ]
    //             },
    //             {
    //               "data": {
    //                 "managementStructureId": 56,
    //                 "code": "Div 002",
    //                 "name": "test_name",
    //                 "description": "Structures",
    //                 "parentId": 51,
    //                 "isLastChild": true,
    //                 "tagName": null,
    //                 "legalEntityId": 38,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2018-12-03T21:51:53.1793713",
    //                 "createdDate": "2018-12-03T21:51:53.1793703"
    //               },
    //               "children": [
    //                 {
    //                   "data": {
    //                     "managementStructureId": 58,
    //                     "code": "Dept 5678",
    //                     "name": "test_name",
    //                     "description": "Parts Sales",
    //                     "parentId": 56,
    //                     "isLastChild": true,
    //                     "tagName": null,
    //                     "legalEntityId": 38,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-12-03T21:55:08.4592283",
    //                     "createdDate": "2018-12-03T21:55:08.4592273"
    //                   }
    //                 },
    //                 {
    //                   "data": {
    //                     "managementStructureId": 57,
    //                     "code": "Dept 1234",
    //                     "name": "test_name",
    //                     "description": "Repair",
    //                     "parentId": 56,
    //                     "isLastChild": true,
    //                     "tagName": null,
    //                     "legalEntityId": 38,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-12-03T21:54:03.6885128",
    //                     "createdDate": "2018-12-03T21:54:03.6885118"
    //                   }
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 49,
    //         "code": "New Ops12",
    //         "name": "test_name",
    //         "description": "New Ops12",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-03T21:40:32.2782064",
    //         "createdDate": "2018-12-03T21:40:32.2782057"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 48,
    //         "code": "New Ops11",
    //         "name": "test_name",
    //         "description": "New OPerations 11",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-03T21:39:53.7332956",
    //         "createdDate": "2018-12-03T21:39:53.733294"
    //       }
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 34,
    //         "code": "DFWAEROENG",
    //         "name": "Dallas Engines",
    //         "description": "",
    //         "parentId": null,
    //         "isLastChild": null,
    //         "tagName": null,
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-12-03T07:17:03.9698882",
    //         "createdDate": "2018-12-03T07:17:03.9698866"
    //       },
    //       "children": [
    //         {
    //           "data": {
    //             "managementStructureId": 37,
    //             "code": "Eng1",
    //             "name": "Engine",
    //             "description": "",
    //             "parentId": 34,
    //             "isLastChild": null,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2018-12-03T21:12:52.5688975",
    //             "createdDate": "2018-12-03T21:12:52.5688953"
    //           },
    //           "children": [
    //             {
    //               "data": {
    //                 "managementStructureId": 40,
    //                 "code": "Eng 12",
    //                 "name": "Engine 12",
    //                 "description": "",
    //                 "parentId": 37,
    //                 "isLastChild": null,
    //                 "tagName": null,
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2018-12-03T21:15:52.2114182",
    //                 "createdDate": "2018-12-03T21:15:52.2114173"
    //               },
    //               "children": [
    //                 {
    //                   "data": {
    //                     "managementStructureId": 41,
    //                     "code": "Eng 12A",
    //                     "name": "Engine 12A",
    //                     "description": "",
    //                     "parentId": 40,
    //                     "isLastChild": null,
    //                     "tagName": null,
    //                     "legalEntityId": 19,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-12-03T21:21:48.9666222",
    //                     "createdDate": "2018-12-03T21:21:48.9666219"
    //                   },
    //                   "children": [
    //                     {
    //                       "data": {
    //                         "managementStructureId": 67,
    //                         "code": "fwefwe",
    //                         "name": "wfwe",
    //                         "description": "",
    //                         "parentId": 41,
    //                         "isLastChild": true,
    //                         "tagName": null,
    //                         "legalEntityId": 39,
    //                         "masterCompanyId": 1,
    //                         "isActive": true,
    //                         "isDelete": false,
    //                         "createdBy": "admin",
    //                         "updatedBy": "admin",
    //                         "updatedDate": "2018-12-04T16:48:02.0021242",
    //                         "createdDate": "2018-12-04T16:48:02.0021236"
    //                       },
    //                       "children": [
    //                         {
    //                           "data": {
    //                             "managementStructureId": 100,
    //                             "code": "Test2",
    //                             "name": "Test2",
    //                             "description": "Test2",
    //                             "parentId": 67,
    //                             "isLastChild": true,
    //                             "tagName": "test",
    //                             "legalEntityId": 39,
    //                             "masterCompanyId": 1,
    //                             "isActive": true,
    //                             "isDelete": false,
    //                             "createdBy": "admin",
    //                             "updatedBy": "admin",
    //                             "updatedDate": "2019-05-16T01:57:26.8620151",
    //                             "createdDate": "2019-05-16T01:57:26.8620129"
    //                           }
    //                         }
    //                       ]
    //                     }
    //                   ]
    //                 }
    //               ]
    //             },
    //             {
    //               "data": {
    //                 "managementStructureId": 39,
    //                 "code": "Eng 11",
    //                 "name": "Engine 11",
    //                 "description": "",
    //                 "parentId": 37,
    //                 "isLastChild": false,
    //                 "tagName": null,
    //                 "legalEntityId": 40,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2018-12-03T21:13:40.3411281",
    //                 "createdDate": "2018-12-03T21:13:40.3411275"
    //               },
    //               "children": [
    //                 {
    //                   "data": {
    //                     "managementStructureId": 47,
    //                     "code": "DFW OPs1",
    //                     "name": "test_name",
    //                     "description": "DFW OPs1",
    //                     "parentId": 39,
    //                     "isLastChild": false,
    //                     "tagName": null,
    //                     "legalEntityId": 38,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-12-03T21:38:38.0145052",
    //                     "createdDate": "2018-12-03T21:38:38.0145042"
    //                   }
    //                 },
    //                 {
    //                   "data": {
    //                     "managementStructureId": 46,
    //                     "code": "DFW OPs",
    //                     "name": "test_name",
    //                     "description": "DFW OPs",
    //                     "parentId": 39,
    //                     "isLastChild": null,
    //                     "tagName": null,
    //                     "legalEntityId": 56,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-12-03T21:37:06.7506527",
    //                     "createdDate": "2018-12-03T21:37:06.750652"
    //                   }
    //                 },
    //                 {
    //                   "data": {
    //                     "managementStructureId": 45,
    //                     "code": "DFW OPs",
    //                     "name": "test_name",
    //                     "description": "DFW OPs",
    //                     "parentId": 39,
    //                     "isLastChild": null,
    //                     "tagName": null,
    //                     "legalEntityId": 19,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-12-03T21:36:32.4006209",
    //                     "createdDate": "2018-12-03T21:36:32.4006196"
    //                   }
    //                 },
    //                 {
    //                   "data": {
    //                     "managementStructureId": 44,
    //                     "code": "New Operations",
    //                     "name": "test_name",
    //                     "description": "New Operations",
    //                     "parentId": 39,
    //                     "isLastChild": null,
    //                     "tagName": null,
    //                     "legalEntityId": 19,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-12-03T21:29:31.8117773",
    //                     "createdDate": "2018-12-03T21:29:31.811776"
    //                   }
    //                 },
    //                 {
    //                   "data": {
    //                     "managementStructureId": 43,
    //                     "code": null,
    //                     "name": "test_name",
    //                     "description": null,
    //                     "parentId": 39,
    //                     "isLastChild": null,
    //                     "tagName": null,
    //                     "legalEntityId": 19,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-12-03T21:23:46.3765849",
    //                     "createdDate": "2018-12-03T21:23:46.3765839"
    //                   }
    //                 },
    //                 {
    //                   "data": {
    //                     "managementStructureId": 42,
    //                     "code": null,
    //                     "name": "test_name",
    //                     "description": null,
    //                     "parentId": 39,
    //                     "isLastChild": true,
    //                     "tagName": null,
    //                     "legalEntityId": 41,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-12-03T21:23:15.2066712",
    //                     "createdDate": "2018-12-03T21:23:15.2066705"
    //                   }
    //                 }
    //               ]
    //             },
    //             {
    //               "data": {
    //                 "managementStructureId": 38,
    //                 "code": "Eng 11",
    //                 "name": "test_name",
    //                 "description": "Engine 11",
    //                 "parentId": 37,
    //                 "isLastChild": null,
    //                 "tagName": null,
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2018-12-03T21:13:12.2292669",
    //                 "createdDate": "2018-12-03T21:13:12.2292666"
    //               }
    //             }
    //           ]
    //         },
    //         {
    //           "data": {
    //             "managementStructureId": 36,
    //             "code": "DFWAEROENGTURB",
    //             "name": "Turbine Project",
    //             "description": "",
    //             "parentId": 34,
    //             "isLastChild": null,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2018-12-03T07:18:41.8523161",
    //             "createdDate": "2018-12-03T07:18:41.8523155"
    //           }
    //         },
    //         {
    //           "data": {
    //             "managementStructureId": 35,
    //             "code": "DFWAEROENGPROP",
    //             "name": "Propeller Project",
    //             "description": "",
    //             "parentId": 34,
    //             "isLastChild": null,
    //             "tagName": null,
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2018-12-03T07:18:07.3969381",
    //             "createdDate": "2018-12-03T07:18:07.3969371"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 20,
    //         "code": "code1update11",
    //         "name": "test_name",
    //         "description": "desc11update11",
    //         "parentId": null,
    //         "isLastChild": true,
    //         "tagName": "tagname11",
    //         "legalEntityId": 55,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-11-22T14:09:58.4011974",
    //         "createdDate": "2018-11-22T14:09:57.5710648"
    //       },
    //       "children": [
    //         {
    //           "data": {
    //             "managementStructureId": 33,
    //             "code": "sdjbd",
    //             "name": "test_name",
    //             "description": "jnds",
    //             "parentId": 20,
    //             "isLastChild": true,
    //             "tagName": "sdsd",
    //             "legalEntityId": 48,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2018-12-03T16:29:56.7677476",
    //             "createdDate": "2018-12-03T16:29:56.767747"
    //           }
    //         },
    //         {
    //           "data": {
    //             "managementStructureId": 31,
    //             "code": "code1child",
    //             "name": "test_name",
    //             "description": "desc1",
    //             "parentId": 20,
    //             "isLastChild": true,
    //             "tagName": "tagname",
    //             "legalEntityId": 54,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2018-12-03T01:42:06.0766461",
    //             "createdDate": "2018-12-03T01:42:06.0766444"
    //           },
    //           "children": [
    //             {
    //               "data": {
    //                 "managementStructureId": 32,
    //                 "code": "code1",
    //                 "name": "test_name",
    //                 "description": "csdsd",
    //                 "parentId": 31,
    //                 "isLastChild": null,
    //                 "tagName": null,
    //                 "legalEntityId": 55,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2018-12-03T01:42:37.0405342",
    //                 "createdDate": "2018-12-03T01:42:37.0405339"
    //               }
    //             }
    //           ]
    //         },
    //         {
    //           "data": {
    //             "managementStructureId": 21,
    //             "code": "asas",
    //             "name": "test_name",
    //             "description": "asas",
    //             "parentId": 20,
    //             "isLastChild": true,
    //             "tagName": "asas",
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2018-11-22T14:16:30.7324217",
    //             "createdDate": "2018-11-22T14:16:30.7323267"
    //           },
    //           "children": [
    //             {
    //               "data": {
    //                 "managementStructureId": 22,
    //                 "code": "asas1up",
    //                 "name": "test_name",
    //                 "description": "desc11up",
    //                 "parentId": 21,
    //                 "isLastChild": true,
    //                 "tagName": "tagnameup",
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2018-11-22T14:39:47.3577258",
    //                 "createdDate": "2018-11-22T14:39:47.3577258"
    //               },
    //               "children": [
    //                 {
    //                   "data": {
    //                     "managementStructureId": 30,
    //                     "code": "child11",
    //                     "name": "test_name",
    //                     "description": "desc11",
    //                     "parentId": 22,
    //                     "isLastChild": true,
    //                     "tagName": "test",
    //                     "legalEntityId": 49,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-11-30T17:54:18.4529909",
    //                     "createdDate": "2018-11-30T17:54:18.4529909"
    //                   }
    //                 },
    //                 {
    //                   "data": {
    //                     "managementStructureId": 28,
    //                     "code": "code",
    //                     "name": "test_name",
    //                     "description": "1212",
    //                     "parentId": 22,
    //                     "isLastChild": true,
    //                     "tagName": "tagname",
    //                     "legalEntityId": 48,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-11-29T21:43:27.708004",
    //                     "createdDate": "2018-11-29T21:43:27.707749"
    //                   },
    //                   "children": [
    //                     {
    //                       "data": {
    //                         "managementStructureId": 29,
    //                         "code": "child1",
    //                         "name": "test_name",
    //                         "description": "desc1",
    //                         "parentId": 28,
    //                         "isLastChild": true,
    //                         "tagName": "tagname",
    //                         "legalEntityId": 49,
    //                         "masterCompanyId": 1,
    //                         "isActive": true,
    //                         "isDelete": false,
    //                         "createdBy": "admin",
    //                         "updatedBy": "admin",
    //                         "updatedDate": "2018-11-30T17:53:40.6597309",
    //                         "createdDate": "2018-11-30T17:53:40.6595249"
    //                       }
    //                     }
    //                   ]
    //                 },
    //                 {
    //                   "data": {
    //                     "managementStructureId": 26,
    //                     "code": "sas",
    //                     "name": "test_name",
    //                     "description": "asas",
    //                     "parentId": 22,
    //                     "isLastChild": null,
    //                     "tagName": null,
    //                     "legalEntityId": 19,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-11-27T16:55:30.9150421",
    //                     "createdDate": "2018-11-27T16:55:30.9149368"
    //                   }
    //                 },
    //                 {
    //                   "data": {
    //                     "managementStructureId": 25,
    //                     "code": "asas212",
    //                     "name": "test_name",
    //                     "description": "asasas121212",
    //                     "parentId": 22,
    //                     "isLastChild": true,
    //                     "tagName": "asas",
    //                     "legalEntityId": 49,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-11-23T18:01:36.9542697",
    //                     "createdDate": "2018-11-23T18:01:36.9541309"
    //                   }
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       "data": {
    //         "managementStructureId": 19,
    //         "code": "cage",
    //         "name": "test_name",
    //         "description": "de",
    //         "parentId": null,
    //         "isLastChild": true,
    //         "tagName": "tagname",
    //         "legalEntityId": 19,
    //         "masterCompanyId": 1,
    //         "isActive": true,
    //         "isDelete": false,
    //         "createdBy": "admin",
    //         "updatedBy": "admin",
    //         "updatedDate": "2018-11-22T14:06:06.6359296",
    //         "createdDate": "2018-11-22T14:06:06.4458085"
    //       },
    //       "children": [
    //         {
    //           "data": {
    //             "managementStructureId": 23,
    //             "code": "cage1",
    //             "name": "test_name",
    //             "description": "desc1",
    //             "parentId": 19,
    //             "isLastChild": true,
    //             "tagName": "tagname",
    //             "legalEntityId": 19,
    //             "masterCompanyId": 1,
    //             "isActive": true,
    //             "isDelete": false,
    //             "createdBy": "admin",
    //             "updatedBy": "admin",
    //             "updatedDate": "2018-11-22T14:42:16.6040598",
    //             "createdDate": "2018-11-22T14:42:16.6040598"
    //           },
    //           "children": [
    //             {
    //               "data": {
    //                 "managementStructureId": 24,
    //                 "code": "cag11",
    //                 "name": "test_name",
    //                 "description": "desc11",
    //                 "parentId": 23,
    //                 "isLastChild": true,
    //                 "tagName": "tagname",
    //                 "legalEntityId": 19,
    //                 "masterCompanyId": 1,
    //                 "isActive": true,
    //                 "isDelete": false,
    //                 "createdBy": "admin",
    //                 "updatedBy": "admin",
    //                 "updatedDate": "2018-11-22T16:03:11.4484381",
    //                 "createdDate": "2018-11-22T16:03:11.4483408"
    //               },
    //               "children": [
    //                 {
    //                   "data": {
    //                     "managementStructureId": 27,
    //                     "code": "test",
    //                     "name": "test_name",
    //                     "description": "asasas",
    //                     "parentId": 24,
    //                     "isLastChild": true,
    //                     "tagName": "asas",
    //                     "legalEntityId": 54,
    //                     "masterCompanyId": 1,
    //                     "isActive": true,
    //                     "isDelete": false,
    //                     "createdBy": "admin",
    //                     "updatedBy": "admin",
    //                     "updatedDate": "2018-11-28T11:48:57.4634385",
    //                     "createdDate": "2018-11-28T11:48:57.463182"
    //                   }
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ];
    constructor(public employeeService: EmployeeService, private legalEntityService: LegalEntityService){

    }

    ngOnInit(){
        this.structureInit();
        this.loadEmployeeRoles();
        this.loadManagementStructure();
    }
    structureInit(){
        var toggler = document.getElementsByClassName("caret");
        var i;

        for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function() {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
        }
    }
    loadEmployeeRoles(){
        this.employeeService.getAllRolesOfEmployee().subscribe(
            results => {
                this.employeeRolesList = results;
                this.employeeRoleLabel = this.employeeRolesList.map((emp)=>{ return emp['name']})
            },
            error => console.log(error)
        );
    }
    loadManagementStructure(){
        this.legalEntityService.getManagemententity().subscribe(
            (results: any)=>{
                this.onManagemtntdataLoad(results[0])
            },
            (error: any)=>{
                console.log(error);
            }
        )
    }

    private onManagemtntdataLoad(getAtaMainList: any[]) {
		// alert('success');
		// this.alertService.stopLoadingMessage();
		// this.loadingIndicator = false;
		// this.dataSource.data = getAtaMainList;
		this.allManagemtninfo = getAtaMainList;
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].tagName != null) {
				this.tagNameCollection.push(this.allManagemtninfo[i]);
			}
		}
		//debugger;
		if (this.allManagemtninfo)
		{
			
            this.gridData = [{
                data: {
                    name: "ABC Inc",
                    isRoot: true
                },
                children: this.makeNestedObj(this.allManagemtninfo, null)}];
            // this.employeeService.structureData = this.gridData;
		}

		
		// console.log(this.gridData);
    }
    makeNestedObj(arr, parent) {
		var out = []
		for (var i in arr) {
			if (arr[i].parentId == parent) {
				var children = this.makeNestedObj(arr, arr[i].managementStructureId)
				arr[i] = { "data": arr[i] };
				if (children.length) {
					arr[i].children = children
				}
				out.push(arr[i])
			}
		}
		return out
	}

}