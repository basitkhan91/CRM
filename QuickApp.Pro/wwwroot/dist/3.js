webpackJsonp([3],{

/***/ 1402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkOrderPagesModule", function() { return WorkOrderPagesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__workorderpages_routing_module__ = __webpack_require__(1975);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__workorderpages_component__ = __webpack_require__(1580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_work_order_work_order_setup_work_order_add_work_order_add_component__ = __webpack_require__(1581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_work_order_work_order_setup_labor_manual_entry_labor_hours_manual_entry_labor_hours_component__ = __webpack_require__(1582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_work_order_work_order_setup_labor_system_generated_labor_hours_system_generated_labor_hours_component__ = __webpack_require__(1583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_work_order_work_order_setup_labor_bar_code_scanned_labor_hours_bar_code_scanned_labor_hours_component__ = __webpack_require__(1584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_work_order_work_order_setup_work_order_equipment_work_order_equipment_list_work_order_equipment_list_component__ = __webpack_require__(1585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_work_order_work_order_setup_work_order_equipment_work_order_equipment_check_in_out_work_order_equipment_check_in_out_component__ = __webpack_require__(1586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_work_order_work_order_setup_work_order_complete_material_list_work_order_complete_material_list_component__ = __webpack_require__(1587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_work_order_work_order_setup_work_order_reserve_issue_work_order_reserve_issue_component__ = __webpack_require__(1588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_work_order_work_order_setup_work_order_main_component_work_order_main_component_component__ = __webpack_require__(1589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_work_order_work_order_setup_sub_work_order_sub_work_order_list_sub_work_order_list_component__ = __webpack_require__(1590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_work_order_work_order_setup_sub_work_order_sub_work_order_setup_sub_work_order_setup_component__ = __webpack_require__(1591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_work_order_work_order_setup_work_order_memo_work_order_memo_component__ = __webpack_require__(1592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_work_order_work_order_setup_work_order_documents_work_order_documents_component__ = __webpack_require__(1593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_work_order_work_order_setup_work_order_analysis_work_order_analysis_component__ = __webpack_require__(1594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_work_order_work_order_setup_work_order_billing_work_order_billing_component__ = __webpack_require__(1595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_work_order_work_order_setup_work_order_quote_work_order_quote_component__ = __webpack_require__(1596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_work_order_work_order_setup_work_order_shipping_work_order_shipping_component__ = __webpack_require__(1597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_work_order_work_order_list_work_order_list_component__ = __webpack_require__(1598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_primeng_table__ = __webpack_require__(1411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_primeng_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22_primeng_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_primeng_button__ = __webpack_require__(1414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_primeng_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23_primeng_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_primeng_selectbutton__ = __webpack_require__(1415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_primeng_selectbutton___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_primeng_selectbutton__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_primeng_inputtext__ = __webpack_require__(1417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_primeng_inputtext___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25_primeng_inputtext__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_primeng_multiselect__ = __webpack_require__(1418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_primeng_multiselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26_primeng_multiselect__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

 //<-- This one

























var WorkOrderPagesModule = /** @class */ (function () {
    function WorkOrderPagesModule() {
    }
    WorkOrderPagesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__workorderpages_routing_module__["a" /* WorkOrdersPagesRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_22_primeng_table__["TableModule"],
                __WEBPACK_IMPORTED_MODULE_23_primeng_button__["ButtonModule"],
                __WEBPACK_IMPORTED_MODULE_24_primeng_selectbutton__["SelectButtonModule"],
                __WEBPACK_IMPORTED_MODULE_25_primeng_inputtext__["InputTextModule"],
                __WEBPACK_IMPORTED_MODULE_26_primeng_multiselect__["MultiSelectModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__workorderpages_component__["a" /* WorkOrderPagesComponent */],
                __WEBPACK_IMPORTED_MODULE_4__components_work_order_work_order_setup_work_order_add_work_order_add_component__["a" /* WorkOrderAddComponent */],
                __WEBPACK_IMPORTED_MODULE_5__components_work_order_work_order_setup_labor_manual_entry_labor_hours_manual_entry_labor_hours_component__["a" /* ManualEntryLaborHoursComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_work_order_work_order_setup_labor_system_generated_labor_hours_system_generated_labor_hours_component__["a" /* SystemGeneratedLaborHoursComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_work_order_work_order_setup_labor_bar_code_scanned_labor_hours_bar_code_scanned_labor_hours_component__["a" /* BarCodeScannedLaborHoursComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_work_order_work_order_setup_work_order_equipment_work_order_equipment_list_work_order_equipment_list_component__["a" /* WorkOrderEquipmentListComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_work_order_work_order_setup_work_order_equipment_work_order_equipment_check_in_out_work_order_equipment_check_in_out_component__["a" /* WorkOrderEquipmentCheckInOutComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_work_order_work_order_setup_work_order_equipment_work_order_equipment_check_in_out_work_order_equipment_check_in_out_component__["a" /* WorkOrderEquipmentCheckInOutComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_work_order_work_order_setup_work_order_complete_material_list_work_order_complete_material_list_component__["a" /* WorkOrderCompleteMaterialListComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_work_order_work_order_setup_work_order_reserve_issue_work_order_reserve_issue_component__["a" /* WorkOrderReserveIssueComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_work_order_work_order_setup_work_order_main_component_work_order_main_component_component__["a" /* WorkOrderMainComponentComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_work_order_work_order_setup_sub_work_order_sub_work_order_list_sub_work_order_list_component__["a" /* SubWorkOrderListComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_work_order_work_order_setup_sub_work_order_sub_work_order_setup_sub_work_order_setup_component__["a" /* SubWorkOrderSetupComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_work_order_work_order_setup_work_order_memo_work_order_memo_component__["a" /* WorkOrderMemoComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_work_order_work_order_setup_work_order_documents_work_order_documents_component__["a" /* WorkOrderDocumentsComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_work_order_work_order_setup_work_order_analysis_work_order_analysis_component__["a" /* WorkOrderAnalysisComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_work_order_work_order_setup_work_order_billing_work_order_billing_component__["a" /* WorkOrderBillingComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_work_order_work_order_setup_work_order_quote_work_order_quote_component__["a" /* WorkOrderQuoteComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_work_order_work_order_setup_work_order_shipping_work_order_shipping_component__["a" /* WorkOrderShippingComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_work_order_work_order_list_work_order_list_component__["a" /* WorkOrderListComponent */]
            ],
            entryComponents: []
        })
    ], WorkOrderPagesModule);
    return WorkOrderPagesModule;
}());



/***/ }),

/***/ 1406:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(16);
var core_2 = __webpack_require__(0);
var Header = /** @class */ (function () {
    function Header() {
    }
    Header = __decorate([
        core_2.Component({
            selector: 'p-header',
            template: '<ng-content></ng-content>'
        })
    ], Header);
    return Header;
}());
exports.Header = Header;
var Footer = /** @class */ (function () {
    function Footer() {
    }
    Footer = __decorate([
        core_2.Component({
            selector: 'p-footer',
            template: '<ng-content></ng-content>'
        })
    ], Footer);
    return Footer;
}());
exports.Footer = Footer;
var PrimeTemplate = /** @class */ (function () {
    function PrimeTemplate(template) {
        this.template = template;
    }
    PrimeTemplate.prototype.getType = function () {
        return this.name;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PrimeTemplate.prototype, "type", void 0);
    __decorate([
        core_1.Input('pTemplate'),
        __metadata("design:type", String)
    ], PrimeTemplate.prototype, "name", void 0);
    PrimeTemplate = __decorate([
        core_1.Directive({
            selector: '[pTemplate]',
            host: {}
        }),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], PrimeTemplate);
    return PrimeTemplate;
}());
exports.PrimeTemplate = PrimeTemplate;
/* Deprecated */
var Column = /** @class */ (function () {
    function Column() {
        this.filterType = 'text';
        this.exportable = true;
        this.resizable = true;
        this.sortFunction = new core_1.EventEmitter();
    }
    Column.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'header':
                    _this.headerTemplate = item.template;
                    break;
                case 'body':
                    _this.bodyTemplate = item.template;
                    break;
                case 'footer':
                    _this.footerTemplate = item.template;
                    break;
                case 'filter':
                    _this.filterTemplate = item.template;
                    break;
                case 'editor':
                    _this.editorTemplate = item.template;
                    break;
                default:
                    _this.bodyTemplate = item.template;
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Column.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Column.prototype, "colId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Column.prototype, "sortField", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Column.prototype, "filterField", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Column.prototype, "header", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Column.prototype, "footer", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Column.prototype, "sortable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "editable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "filter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Column.prototype, "filterMatchMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Column.prototype, "filterType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "excludeGlobalFilter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Column.prototype, "rowspan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Column.prototype, "colspan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Column.prototype, "scope", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Column.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Column.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "exportable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Column.prototype, "headerStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Column.prototype, "headerStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Column.prototype, "bodyStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Column.prototype, "bodyStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Column.prototype, "footerStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Column.prototype, "footerStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "hidden", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "expander", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Column.prototype, "selectionMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Column.prototype, "filterPlaceholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Column.prototype, "filterMaxlength", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "frozen", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "resizable", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Column.prototype, "sortFunction", void 0);
    __decorate([
        core_1.ContentChildren(PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], Column.prototype, "templates", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], Column.prototype, "template", void 0);
    Column = __decorate([
        core_2.Component({
            selector: 'p-column',
            template: ''
        })
    ], Column);
    return Column;
}());
exports.Column = Column;
/* Deprecated */
var Row = /** @class */ (function () {
    function Row() {
    }
    __decorate([
        core_1.ContentChildren(Column),
        __metadata("design:type", core_1.QueryList)
    ], Row.prototype, "columns", void 0);
    Row = __decorate([
        core_2.Component({
            selector: 'p-row',
            template: ""
        })
    ], Row);
    return Row;
}());
exports.Row = Row;
/* Deprecated */
var HeaderColumnGroup = /** @class */ (function () {
    function HeaderColumnGroup() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], HeaderColumnGroup.prototype, "frozen", void 0);
    __decorate([
        core_1.ContentChildren(Row),
        __metadata("design:type", core_1.QueryList)
    ], HeaderColumnGroup.prototype, "rows", void 0);
    HeaderColumnGroup = __decorate([
        core_2.Component({
            selector: 'p-headerColumnGroup',
            template: ""
        })
    ], HeaderColumnGroup);
    return HeaderColumnGroup;
}());
exports.HeaderColumnGroup = HeaderColumnGroup;
/* Deprecated */
var FooterColumnGroup = /** @class */ (function () {
    function FooterColumnGroup() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FooterColumnGroup.prototype, "frozen", void 0);
    __decorate([
        core_1.ContentChildren(Row),
        __metadata("design:type", core_1.QueryList)
    ], FooterColumnGroup.prototype, "rows", void 0);
    FooterColumnGroup = __decorate([
        core_2.Component({
            selector: 'p-footerColumnGroup',
            template: ""
        })
    ], FooterColumnGroup);
    return FooterColumnGroup;
}());
exports.FooterColumnGroup = FooterColumnGroup;
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [Header, Footer, Column, PrimeTemplate, Row, HeaderColumnGroup, FooterColumnGroup],
            declarations: [Header, Footer, Column, PrimeTemplate, Row, HeaderColumnGroup, FooterColumnGroup]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.js.map

/***/ }),

/***/ 1407:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ObjectUtils = /** @class */ (function () {
    function ObjectUtils() {
        this.isFunction = function (obj) { return !!(obj && obj.constructor && obj.call && obj.apply); };
    }
    ObjectUtils.prototype.equals = function (obj1, obj2, field) {
        if (field)
            return (this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field));
        else
            return this.equalsByValue(obj1, obj2);
    };
    ObjectUtils.prototype.equalsByValue = function (obj1, obj2, visited) {
        if (obj1 == null && obj2 == null) {
            return true;
        }
        if (obj1 == null || obj2 == null) {
            return false;
        }
        if (obj1 == obj2) {
            return true;
        }
        if (obj1 instanceof Date && obj2 instanceof Date) {
            return obj1.getTime() == obj2.getTime();
        }
        if (typeof obj1 == 'object' && typeof obj2 == 'object') {
            if (visited) {
                if (visited.indexOf(obj1) !== -1)
                    return false;
            }
            else {
                visited = [];
            }
            visited.push(obj1);
            for (var p in obj1) {
                if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
                    return false;
                }
                switch (typeof (obj1[p])) {
                    case 'object':
                        if (!this.equalsByValue(obj1[p], obj2[p], visited))
                            return false;
                        break;
                    case 'function':
                        if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString()))
                            return false;
                        break;
                    default:
                        if (obj1[p] != obj2[p])
                            return false;
                        break;
                }
            }
            for (var p in obj2) {
                if (typeof (obj1[p]) == 'undefined')
                    return false;
            }
            delete obj1._$visited;
            return true;
        }
        return false;
    };
    ObjectUtils.prototype.resolveFieldData = function (data, field) {
        if (data && field) {
            if (this.isFunction(field)) {
                return field(data);
            }
            else if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                var fields = field.split('.');
                var value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    if (value == null) {
                        return null;
                    }
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    };
    ObjectUtils.prototype.filter = function (value, fields, filterValue) {
        var filteredItems = [];
        if (value) {
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var item = value_1[_i];
                for (var _a = 0, fields_1 = fields; _a < fields_1.length; _a++) {
                    var field = fields_1[_a];
                    if (String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
                        filteredItems.push(item);
                        break;
                    }
                }
            }
        }
        return filteredItems;
    };
    ObjectUtils.prototype.reorderArray = function (value, from, to) {
        var target;
        if (value && (from !== to)) {
            if (to >= value.length) {
                target = to - value.length;
                while ((target--) + 1) {
                    value.push(undefined);
                }
            }
            value.splice(to, 0, value.splice(from, 1)[0]);
        }
    };
    ObjectUtils.prototype.generateSelectItems = function (val, field) {
        var selectItems;
        if (val && val.length) {
            selectItems = [];
            for (var _i = 0, val_1 = val; _i < val_1.length; _i++) {
                var item = val_1[_i];
                selectItems.push({ label: this.resolveFieldData(item, field), value: item });
            }
        }
        return selectItems;
    };
    ObjectUtils.prototype.insertIntoOrderedArray = function (item, index, arr, sourceArr) {
        if (arr.length > 0) {
            var injected = false;
            for (var i = 0; i < arr.length; i++) {
                var currentItemIndex = this.findIndexInList(arr[i], sourceArr);
                if (currentItemIndex > index) {
                    arr.splice(i, 0, item);
                    injected = true;
                    break;
                }
            }
            if (!injected) {
                arr.push(item);
            }
        }
        else {
            arr.push(item);
        }
    };
    ObjectUtils.prototype.findIndexInList = function (item, list) {
        var index = -1;
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i] == item) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    ObjectUtils = __decorate([
        core_1.Injectable()
    ], ObjectUtils);
    return ObjectUtils;
}());
exports.ObjectUtils = ObjectUtils;
//# sourceMappingURL=objectutils.js.map

/***/ }),

/***/ 1408:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var domhandler_1 = __webpack_require__(809);
var common_1 = __webpack_require__(16);
var ButtonDirective = /** @class */ (function () {
    function ButtonDirective(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.iconPos = 'left';
        this.cornerStyleClass = 'ui-corner-all';
    }
    ButtonDirective.prototype.ngAfterViewInit = function () {
        this.domHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());
        if (this.icon) {
            var iconElement = document.createElement("span");
            iconElement.setAttribute("aria-hidden", "true");
            var iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right' : 'ui-button-icon-left';
            iconElement.className = iconPosClass + ' ui-clickable ' + this.icon;
            this.el.nativeElement.appendChild(iconElement);
        }
        var labelElement = document.createElement("span");
        labelElement.className = 'ui-button-text ui-clickable';
        labelElement.appendChild(document.createTextNode(this.label || 'ui-btn'));
        this.el.nativeElement.appendChild(labelElement);
        this.initialized = true;
    };
    ButtonDirective.prototype.getStyleClass = function () {
        var styleClass = 'ui-button ui-widget ui-state-default ' + this.cornerStyleClass;
        if (this.icon) {
            if (this.label != null && this.label != undefined) {
                if (this.iconPos == 'left')
                    styleClass = styleClass + ' ui-button-text-icon-left';
                else
                    styleClass = styleClass + ' ui-button-text-icon-right';
            }
            else {
                styleClass = styleClass + ' ui-button-icon-only';
            }
        }
        else {
            if (this.label) {
                styleClass = styleClass + ' ui-button-text-only';
            }
            else {
                styleClass = styleClass + ' ui-button-text-empty';
            }
        }
        return styleClass;
    };
    Object.defineProperty(ButtonDirective.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (val) {
            this._label = val;
            if (this.initialized) {
                this.domHandler.findSingle(this.el.nativeElement, '.ui-button-text').textContent = this._label;
                if (!this.icon) {
                    if (this._label) {
                        this.domHandler.removeClass(this.el.nativeElement, 'ui-button-text-empty');
                        this.domHandler.addClass(this.el.nativeElement, 'ui-button-text-only');
                    }
                    else {
                        this.domHandler.addClass(this.el.nativeElement, 'ui-button-text-empty');
                        this.domHandler.removeClass(this.el.nativeElement, 'ui-button-text-only');
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        set: function (val) {
            this._icon = val;
            if (this.initialized) {
                var iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right' : 'ui-button-icon-left';
                this.domHandler.findSingle(this.el.nativeElement, '.ui-clickable').className =
                    iconPosClass + ' ui-clickable ' + this.icon;
            }
        },
        enumerable: true,
        configurable: true
    });
    ButtonDirective.prototype.ngOnDestroy = function () {
        while (this.el.nativeElement.hasChildNodes()) {
            this.el.nativeElement.removeChild(this.el.nativeElement.lastChild);
        }
        this.initialized = false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ButtonDirective.prototype, "iconPos", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ButtonDirective.prototype, "cornerStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ButtonDirective.prototype, "label", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ButtonDirective.prototype, "icon", null);
    ButtonDirective = __decorate([
        core_1.Directive({
            selector: '[pButton]',
            providers: [domhandler_1.DomHandler]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler])
    ], ButtonDirective);
    return ButtonDirective;
}());
exports.ButtonDirective = ButtonDirective;
var Button = /** @class */ (function () {
    function Button() {
        this.iconPos = 'left';
        this.onClick = new core_1.EventEmitter();
        this.onFocus = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Button.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Button.prototype, "iconPos", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Button.prototype, "icon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Button.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Button.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Button.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Button.prototype, "styleClass", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Button.prototype, "onClick", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Button.prototype, "onFocus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Button.prototype, "onBlur", void 0);
    Button = __decorate([
        core_1.Component({
            selector: 'p-button',
            template: "\n        <button [attr.type]=\"type\" [class]=\"styleClass\" [style]=\"style\" [disabled]=\"disabled\"\n            [ngClass]=\"{'ui-button ui-widget ui-state-default ui-corner-all':true,\n                        'ui-button-icon-only': (icon && !label),\n                        'ui-button-text-icon-left': (icon && label && iconPos === 'left'),\n                        'ui-button-text-icon-right': (icon && label && iconPos === 'right'),\n                        'ui-button-text-only': (!icon && label),\n                        'ui-button-text-empty': (!icon && !label),\n                        'ui-state-disabled': disabled}\"\n                        (click)=\"onClick.emit($event)\" (focus)=\"onFocus.emit($event)\" (blur)=\"onBlur.emit($event)\">\n            <ng-content></ng-content>\n            <span [ngClass]=\"{'ui-clickable': true,\n                        'ui-button-icon-left': (iconPos === 'left'), \n                        'ui-button-icon-right': (iconPos === 'right')}\"\n                        [class]=\"icon\" *ngIf=\"icon\"></span>\n            <span class=\"ui-button-text ui-clickable\">{{label||'ui-btn'}}</span>\n        </button>\n    "
        })
    ], Button);
    return Button;
}());
exports.Button = Button;
var ButtonModule = /** @class */ (function () {
    function ButtonModule() {
    }
    ButtonModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [ButtonDirective, Button],
            declarations: [ButtonDirective, Button]
        })
    ], ButtonModule);
    return ButtonModule;
}());
exports.ButtonModule = ButtonModule;
//# sourceMappingURL=button.js.map

/***/ }),

/***/ 1409:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(34);
var common_1 = __webpack_require__(16);
var InputText = /** @class */ (function () {
    function InputText(el, ngModel) {
        this.el = el;
        this.ngModel = ngModel;
    }
    InputText.prototype.ngDoCheck = function () {
        this.updateFilledState();
    };
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    InputText.prototype.onInput = function (e) {
        this.updateFilledState();
    };
    InputText.prototype.updateFilledState = function () {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) ||
            (this.ngModel && this.ngModel.model);
    };
    __decorate([
        core_1.HostListener('input', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], InputText.prototype, "onInput", null);
    InputText = __decorate([
        core_1.Directive({
            selector: '[pInputText]',
            host: {
                '[class.ui-inputtext]': 'true',
                '[class.ui-corner-all]': 'true',
                '[class.ui-state-default]': 'true',
                '[class.ui-widget]': 'true',
                '[class.ui-state-filled]': 'filled'
            }
        }),
        __param(1, core_1.Optional()),
        __metadata("design:paramtypes", [core_1.ElementRef, forms_1.NgModel])
    ], InputText);
    return InputText;
}());
exports.InputText = InputText;
var InputTextModule = /** @class */ (function () {
    function InputTextModule() {
    }
    InputTextModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [InputText],
            declarations: [InputText]
        })
    ], InputTextModule);
    return InputTextModule;
}());
exports.InputTextModule = InputTextModule;
//# sourceMappingURL=inputtext.js.map

/***/ }),

/***/ 1410:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(16);
var forms_1 = __webpack_require__(34);
var dropdown_1 = __webpack_require__(1413);
var shared_1 = __webpack_require__(1406);
var Paginator = /** @class */ (function () {
    function Paginator() {
        this.pageLinkSize = 5;
        this.onPageChange = new core_1.EventEmitter();
        this.alwaysShow = true;
        this._totalRecords = 0;
        this._first = 0;
        this._rows = 0;
    }
    Paginator.prototype.ngOnInit = function () {
        this.updatePaginatorState();
    };
    Object.defineProperty(Paginator.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            this.updatePageLinks();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paginator.prototype, "first", {
        get: function () {
            return this._first;
        },
        set: function (val) {
            this._first = val;
            this.updatePageLinks();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paginator.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (val) {
            this._rows = val;
            this.updatePageLinks();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paginator.prototype, "rowsPerPageOptions", {
        get: function () {
            return this._rowsPerPageOptions;
        },
        set: function (val) {
            this._rowsPerPageOptions = val;
            if (this._rowsPerPageOptions) {
                this.rowsPerPageItems = [];
                for (var _i = 0, _a = this._rowsPerPageOptions; _i < _a.length; _i++) {
                    var opt = _a[_i];
                    this.rowsPerPageItems.push({ label: String(opt), value: opt });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Paginator.prototype.isFirstPage = function () {
        return this.getPage() === 0;
    };
    Paginator.prototype.isLastPage = function () {
        return this.getPage() === this.getPageCount() - 1;
    };
    Paginator.prototype.getPageCount = function () {
        return Math.ceil(this.totalRecords / this.rows) || 1;
    };
    Paginator.prototype.calculatePageLinkBoundaries = function () {
        var numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
        //calculate range, keep current in middle if necessary
        var start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);
        return [start, end];
    };
    Paginator.prototype.updatePageLinks = function () {
        this.pageLinks = [];
        var boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
        for (var i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
    };
    Paginator.prototype.changePage = function (p) {
        var pc = this.getPageCount();
        if (p >= 0 && p < pc) {
            this.first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();
            this.onPageChange.emit(state);
            this.updatePaginatorState();
        }
    };
    Paginator.prototype.getPage = function () {
        return Math.floor(this.first / this.rows);
    };
    Paginator.prototype.changePageToFirst = function (event) {
        if (!this.isFirstPage()) {
            this.changePage(0);
        }
        event.preventDefault();
    };
    Paginator.prototype.changePageToPrev = function (event) {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    };
    Paginator.prototype.changePageToNext = function (event) {
        this.changePage(this.getPage() + 1);
        event.preventDefault();
    };
    Paginator.prototype.changePageToLast = function (event) {
        if (!this.isLastPage()) {
            this.changePage(this.getPageCount() - 1);
        }
        event.preventDefault();
    };
    Paginator.prototype.onPageLinkClick = function (event, page) {
        this.changePage(page);
        event.preventDefault();
    };
    Paginator.prototype.onRppChange = function (event) {
        this.changePage(this.getPage());
    };
    Paginator.prototype.updatePaginatorState = function () {
        this.paginatorState = {
            page: this.getPage(),
            rows: this.rows,
            first: this.first,
            totalRecords: this.totalRecords
        };
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Paginator.prototype, "pageLinkSize", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Paginator.prototype, "onPageChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Paginator.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Paginator.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Paginator.prototype, "alwaysShow", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.TemplateRef)
    ], Paginator.prototype, "templateLeft", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.TemplateRef)
    ], Paginator.prototype, "templateRight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Paginator.prototype, "dropdownAppendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], Paginator.prototype, "totalRecords", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], Paginator.prototype, "first", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], Paginator.prototype, "rows", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], Paginator.prototype, "rowsPerPageOptions", null);
    Paginator = __decorate([
        core_1.Component({
            selector: 'p-paginator',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'ui-paginator ui-widget ui-widget-header ui-unselectable-text ui-helper-clearfix'\"\n            *ngIf=\"alwaysShow ? true : (pageLinks && pageLinks.length > 1)\">\n            <div class=\"ui-paginator-left-content\" *ngIf=\"templateLeft\">\n                <ng-container *ngTemplateOutlet=\"templateLeft; context: {$implicit: paginatorState}\"></ng-container>\n            </div>\n            <a href=\"#\" class=\"ui-paginator-first ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToFirst($event)\" [ngClass]=\"{'ui-state-disabled':isFirstPage()}\" [tabindex]=\"isFirstPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-step-backward\"></span>\n            </a>\n            <a href=\"#\" class=\"ui-paginator-prev ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToPrev($event)\" [ngClass]=\"{'ui-state-disabled':isFirstPage()}\" [tabindex]=\"isFirstPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-caret-left\"></span>\n            </a>\n            <span class=\"ui-paginator-pages\">\n                <a href=\"#\" *ngFor=\"let pageLink of pageLinks\" class=\"ui-paginator-page ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"onPageLinkClick($event, pageLink - 1)\" [ngClass]=\"{'ui-state-active': (pageLink-1 == getPage())}\">{{pageLink}}</a>\n            </span>\n            <a href=\"#\" class=\"ui-paginator-next ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToNext($event)\" [ngClass]=\"{'ui-state-disabled':isLastPage()}\" [tabindex]=\"isLastPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-caret-right\"></span>\n            </a>\n            <a href=\"#\" class=\"ui-paginator-last ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToLast($event)\" [ngClass]=\"{'ui-state-disabled':isLastPage()}\" [tabindex]=\"isLastPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-step-forward\"></span>\n            </a>\n            <p-dropdown [options]=\"rowsPerPageItems\" [(ngModel)]=\"rows\" *ngIf=\"rowsPerPageOptions\" \n                (onChange)=\"onRppChange($event)\" [autoWidth]=\"false\" [appendTo]=\"dropdownAppendTo\"></p-dropdown>\n            <div class=\"ui-paginator-right-content\" *ngIf=\"templateRight\">\n                <ng-container *ngTemplateOutlet=\"templateRight; context: {$implicit: paginatorState}\"></ng-container>\n            </div>\n        </div>\n    "
        })
    ], Paginator);
    return Paginator;
}());
exports.Paginator = Paginator;
var PaginatorModule = /** @class */ (function () {
    function PaginatorModule() {
    }
    PaginatorModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, dropdown_1.DropdownModule, forms_1.FormsModule, shared_1.SharedModule],
            exports: [Paginator, dropdown_1.DropdownModule, forms_1.FormsModule, shared_1.SharedModule],
            declarations: [Paginator]
        })
    ], PaginatorModule);
    return PaginatorModule;
}());
exports.PaginatorModule = PaginatorModule;
//# sourceMappingURL=paginator.js.map

/***/ }),

/***/ 1411:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Shorthand */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1412));

/***/ }),

/***/ 1412:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(16);
var shared_1 = __webpack_require__(1406);
var paginator_1 = __webpack_require__(1410);
var domhandler_1 = __webpack_require__(809);
var objectutils_1 = __webpack_require__(1407);
var core_2 = __webpack_require__(0);
var rxjs_1 = __webpack_require__(149);
var TableService = /** @class */ (function () {
    function TableService() {
        this.sortSource = new rxjs_1.Subject();
        this.selectionSource = new rxjs_1.Subject();
        this.contextMenuSource = new rxjs_1.Subject();
        this.valueSource = new rxjs_1.Subject();
        this.totalRecordsSource = new rxjs_1.Subject();
        this.columnsSource = new rxjs_1.Subject();
        this.sortSource$ = this.sortSource.asObservable();
        this.selectionSource$ = this.selectionSource.asObservable();
        this.contextMenuSource$ = this.contextMenuSource.asObservable();
        this.valueSource$ = this.valueSource.asObservable();
        this.totalRecordsSource$ = this.totalRecordsSource.asObservable();
        this.columnsSource$ = this.columnsSource.asObservable();
    }
    TableService.prototype.onSort = function (sortMeta) {
        this.sortSource.next(sortMeta);
    };
    TableService.prototype.onSelectionChange = function () {
        this.selectionSource.next();
    };
    TableService.prototype.onContextMenu = function (data) {
        this.contextMenuSource.next(data);
    };
    TableService.prototype.onValueChange = function (value) {
        this.valueSource.next(value);
    };
    TableService.prototype.onTotalRecordsChange = function (value) {
        this.totalRecordsSource.next(value);
    };
    TableService.prototype.onColumnsChange = function (columns) {
        this.columnsSource.next(columns);
    };
    TableService = __decorate([
        core_2.Injectable()
    ], TableService);
    return TableService;
}());
exports.TableService = TableService;
var Table = /** @class */ (function () {
    function Table(el, domHandler, objectUtils, zone, tableService) {
        this.el = el;
        this.domHandler = domHandler;
        this.objectUtils = objectUtils;
        this.zone = zone;
        this.tableService = tableService;
        this.first = 0;
        this.pageLinks = 5;
        this.alwaysShowPaginator = true;
        this.paginatorPosition = 'bottom';
        this.defaultSortOrder = 1;
        this.sortMode = 'single';
        this.resetPageOnSort = true;
        this.selectionChange = new core_1.EventEmitter();
        this.contextMenuSelectionChange = new core_1.EventEmitter();
        this.contextMenuSelectionMode = "separate";
        this.rowTrackBy = function (index, item) { return item; };
        this.lazy = false;
        this.lazyLoadOnInit = true;
        this.compareSelectionBy = 'deepEquals';
        this.csvSeparator = ',';
        this.exportFilename = 'download';
        this.filters = {};
        this.filterDelay = 300;
        this.expandedRowKeys = {};
        this.rowExpandMode = 'multiple';
        this.virtualScrollDelay = 500;
        this.virtualRowHeight = 28;
        this.columnResizeMode = 'fit';
        this.loadingIcon = 'pi pi-spinner';
        this.onRowSelect = new core_1.EventEmitter();
        this.onRowUnselect = new core_1.EventEmitter();
        this.onPage = new core_1.EventEmitter();
        this.onSort = new core_1.EventEmitter();
        this.onFilter = new core_1.EventEmitter();
        this.onLazyLoad = new core_1.EventEmitter();
        this.onRowExpand = new core_1.EventEmitter();
        this.onRowCollapse = new core_1.EventEmitter();
        this.onContextMenuSelect = new core_1.EventEmitter();
        this.onColResize = new core_1.EventEmitter();
        this.onColReorder = new core_1.EventEmitter();
        this.onRowReorder = new core_1.EventEmitter();
        this.onEditInit = new core_1.EventEmitter();
        this.onEditComplete = new core_1.EventEmitter();
        this.onEditCancel = new core_1.EventEmitter();
        this.onHeaderCheckboxToggle = new core_1.EventEmitter();
        this.sortFunction = new core_1.EventEmitter();
        this._value = [];
        this._totalRecords = 0;
        this.selectionKeys = {};
        this._sortOrder = 1;
        this.filterConstraints = {
            startsWith: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                var filterValue = filter.toLowerCase();
                return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
            },
            contains: function (value, filter) {
                if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            },
            endsWith: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                var filterValue = filter.toString().toLowerCase();
                return value.toString().toLowerCase().indexOf(filterValue, value.toString().length - filterValue.length) !== -1;
            },
            equals: function (value, filter) {
                if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                if (value.getTime && filter.getTime)
                    return value.getTime() === filter.getTime();
                else
                    return value.toString().toLowerCase() == filter.toString().toLowerCase();
            },
            notEquals: function (value, filter) {
                if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                    return false;
                }
                if (value === undefined || value === null) {
                    return true;
                }
                if (value.getTime && filter.getTime)
                    return value.getTime() !== filter.getTime();
                else
                    return value.toString().toLowerCase() != filter.toString().toLowerCase();
            },
            in: function (value, filter) {
                if (filter === undefined || filter === null || filter.length === 0) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                for (var i = 0; i < filter.length; i++) {
                    if (filter[i] === value || (value.getTime && filter[i].getTime && value.getTime() === filter[i].getTime())) {
                        return true;
                    }
                }
                return false;
            },
            lt: function (value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                if (value.getTime && filter.getTime)
                    return value.getTime() < filter.getTime();
                else
                    return value < filter;
            },
            lte: function (value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                if (value.getTime && filter.getTime)
                    return value.getTime() <= filter.getTime();
                else
                    return value <= filter;
            },
            gt: function (value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                if (value.getTime && filter.getTime)
                    return value.getTime() > filter.getTime();
                else
                    return value > filter;
            },
            gte: function (value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                if (value.getTime && filter.getTime)
                    return value.getTime() >= filter.getTime();
                else
                    return value >= filter;
            }
        };
    }
    Table.prototype.ngOnInit = function () {
        if (this.lazy && this.lazyLoadOnInit) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.initialized = true;
    };
    Table.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'caption':
                    _this.captionTemplate = item.template;
                    break;
                case 'header':
                    _this.headerTemplate = item.template;
                    break;
                case 'body':
                    _this.bodyTemplate = item.template;
                    break;
                case 'footer':
                    _this.footerTemplate = item.template;
                    break;
                case 'summary':
                    _this.summaryTemplate = item.template;
                    break;
                case 'colgroup':
                    _this.colGroupTemplate = item.template;
                    break;
                case 'rowexpansion':
                    _this.expandedRowTemplate = item.template;
                    break;
                case 'frozenrows':
                    _this.frozenRowsTemplate = item.template;
                    break;
                case 'frozenheader':
                    _this.frozenHeaderTemplate = item.template;
                    break;
                case 'frozenbody':
                    _this.frozenBodyTemplate = item.template;
                    break;
                case 'frozenfooter':
                    _this.frozenFooterTemplate = item.template;
                    break;
                case 'frozencolgroup':
                    _this.frozenColGroupTemplate = item.template;
                    break;
                case 'emptymessage':
                    _this.emptyMessageTemplate = item.template;
                    break;
                case 'paginatorleft':
                    _this.paginatorLeftTemplate = item.template;
                    break;
                case 'paginatorright':
                    _this.paginatorRightTemplate = item.template;
                    break;
            }
        });
    };
    Object.defineProperty(Table.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            if (!this.lazy) {
                this.totalRecords = (this._value ? this._value.length : 0);
                if (this.sortMode == 'single' && this.sortField)
                    this.sortSingle();
                else if (this.sortMode == 'multiple' && this.multiSortMeta)
                    this.sortMultiple();
                else if (this.hasFilter())
                    this._filter();
            }
            if (this.virtualScroll && this.virtualScrollCallback) {
                this.virtualScrollCallback();
            }
            this.tableService.onValueChange(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (cols) {
            this._columns = cols;
            this.tableService.onColumnsChange(cols);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            this.tableService.onTotalRecordsChange(this._totalRecords);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "sortField", {
        get: function () {
            return this._sortField;
        },
        set: function (val) {
            this._sortField = val;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "sortOrder", {
        get: function () {
            return this._sortOrder;
        },
        set: function (val) {
            this._sortOrder = val;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "multiSortMeta", {
        get: function () {
            return this._multiSortMeta;
        },
        set: function (val) {
            this._multiSortMeta = val;
            if (this.sortMode === 'multiple') {
                this.sortMultiple();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "selection", {
        get: function () {
            return this._selection;
        },
        set: function (val) {
            this._selection = val;
            if (!this.preventSelectionSetterPropagation) {
                this.updateSelectionKeys();
                this.tableService.onSelectionChange();
            }
            this.preventSelectionSetterPropagation = false;
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.updateSelectionKeys = function () {
        if (this.dataKey && this._selection) {
            this.selectionKeys = {};
            if (Array.isArray(this._selection)) {
                for (var _i = 0, _a = this._selection; _i < _a.length; _i++) {
                    var data = _a[_i];
                    this.selectionKeys[String(this.objectUtils.resolveFieldData(data, this.dataKey))] = 1;
                }
            }
            else {
                this.selectionKeys[String(this.objectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
            }
        }
    };
    Table.prototype.onPageChange = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
        this.tableService.onValueChange(this.value);
    };
    Table.prototype.sort = function (event) {
        var originalEvent = event.originalEvent;
        if (this.sortMode === 'single') {
            this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = event.field;
            this.sortSingle();
        }
        if (this.sortMode === 'multiple') {
            var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
            var sortMeta = this.getSortMeta(event.field);
            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }];
                }
                else {
                    sortMeta.order = sortMeta.order * -1;
                }
            }
            else {
                if (!metaKey || !this.multiSortMeta) {
                    this._multiSortMeta = [];
                }
                this.multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
            }
            this.sortMultiple();
        }
    };
    Table.prototype.sortSingle = function () {
        var _this = this;
        if (this.sortField && this.sortOrder) {
            if (this.resetPageOnSort) {
                this.first = 0;
            }
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        field: this.sortField,
                        order: this.sortOrder
                    });
                }
                else {
                    this.value.sort(function (data1, data2) {
                        var value1 = _this.objectUtils.resolveFieldData(data1, _this.sortField);
                        var value2 = _this.objectUtils.resolveFieldData(data2, _this.sortField);
                        var result = null;
                        if (value1 == null && value2 != null)
                            result = -1;
                        else if (value1 != null && value2 == null)
                            result = 1;
                        else if (value1 == null && value2 == null)
                            result = 0;
                        else if (typeof value1 === 'string' && typeof value2 === 'string')
                            result = value1.localeCompare(value2);
                        else
                            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                        return (_this.sortOrder * result);
                    });
                }
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            var sortMeta = {
                field: this.sortField,
                order: this.sortOrder
            };
            this.onSort.emit(sortMeta);
            this.tableService.onSort(sortMeta);
        }
    };
    Table.prototype.sortMultiple = function () {
        var _this = this;
        if (this.multiSortMeta) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        multiSortMeta: this.multiSortMeta
                    });
                }
                else {
                    this.value.sort(function (data1, data2) {
                        return _this.multisortField(data1, data2, _this.multiSortMeta, 0);
                    });
                }
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            this.onSort.emit({
                multisortmeta: this.multiSortMeta
            });
            this.tableService.onSort(this.multiSortMeta);
        }
    };
    Table.prototype.multisortField = function (data1, data2, multiSortMeta, index) {
        var value1 = this.objectUtils.resolveFieldData(data1, multiSortMeta[index].field);
        var value2 = this.objectUtils.resolveFieldData(data2, multiSortMeta[index].field);
        var result = null;
        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 != value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2));
            }
        }
        else {
            result = (value1 < value2) ? -1 : 1;
        }
        if (value1 == value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
        }
        return (multiSortMeta[index].order * result);
    };
    Table.prototype.getSortMeta = function (field) {
        if (this.multiSortMeta && this.multiSortMeta.length) {
            for (var i = 0; i < this.multiSortMeta.length; i++) {
                if (this.multiSortMeta[i].field === field) {
                    return this.multiSortMeta[i];
                }
            }
        }
        return null;
    };
    Table.prototype.isSorted = function (field) {
        if (this.sortMode === 'single') {
            return (this.sortField && this.sortField === field);
        }
        else if (this.sortMode === 'multiple') {
            var sorted = false;
            if (this.multiSortMeta) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    };
    Table.prototype.handleRowClick = function (event) {
        var targetNode = event.originalEvent.target.nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || (this.domHandler.hasClass(event.originalEvent.target, 'ui-clickable'))) {
            return;
        }
        if (this.selectionMode) {
            this.preventSelectionSetterPropagation = true;
            if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
                this.domHandler.clearSelection();
                if (this.rangeRowIndex != null) {
                    this.clearSelectionRange(event.originalEvent);
                }
                this.rangeRowIndex = event.rowIndex;
                this.selectRange(event.originalEvent, event.rowIndex);
            }
            else {
                var rowData = event.rowData;
                var selected = this.isSelected(rowData);
                var metaSelection = this.rowTouched ? false : this.metaKeySelection;
                var dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                this.anchorRowIndex = event.rowIndex;
                this.rangeRowIndex = event.rowIndex;
                if (metaSelection) {
                    var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(null);
                        }
                        else {
                            var selectionIndex_1 = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_1; });
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            this._selection = rowData;
                            this.selectionChange.emit(rowData);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        else if (this.isMultipleSelectionMode()) {
                            if (metaKey) {
                                this._selection = this.selection || [];
                            }
                            else {
                                this._selection = [];
                                this.selectionKeys = {};
                            }
                            this._selection = this.selection.concat([rowData]);
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                    }
                }
                else {
                    if (this.selectionMode === 'single') {
                        if (selected) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                        }
                        else {
                            this._selection = rowData;
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                    else if (this.selectionMode === 'multiple') {
                        if (selected) {
                            var selectionIndex_2 = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_2; });
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        else {
                            this._selection = this.selection ? this.selection.concat([rowData]) : [rowData];
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                }
            }
            this.tableService.onSelectionChange();
        }
        this.rowTouched = false;
    };
    Table.prototype.handleRowTouchEnd = function (event) {
        this.rowTouched = true;
    };
    Table.prototype.handleRowRightClick = function (event) {
        if (this.contextMenu) {
            var rowData = event.rowData;
            if (this.contextMenuSelectionMode === 'separate') {
                this.contextMenuSelection = rowData;
                this.contextMenuSelectionChange.emit(rowData);
                this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, data: rowData });
                this.contextMenu.show(event.originalEvent);
                this.tableService.onContextMenu(rowData);
            }
            else if (this.contextMenuSelectionMode === 'joint') {
                this.preventSelectionSetterPropagation = true;
                var selected = this.isSelected(rowData);
                var dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                if (!selected) {
                    if (this.isSingleSelectionMode()) {
                        this.selection = rowData;
                        this.selectionChange.emit(rowData);
                    }
                    else if (this.isMultipleSelectionMode()) {
                        this.selection = [rowData];
                        this.selectionChange.emit(this.selection);
                    }
                    if (dataKeyValue) {
                        this.selectionKeys[dataKeyValue] = 1;
                    }
                }
                this.contextMenu.show(event.originalEvent);
                this.onContextMenuSelect.emit({ originalEvent: event, data: rowData });
            }
        }
    };
    Table.prototype.selectRange = function (event, rowIndex) {
        var rangeStart, rangeEnd;
        if (this.anchorRowIndex > rowIndex) {
            rangeStart = rowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else if (this.anchorRowIndex < rowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = rowIndex;
        }
        else {
            rangeStart = rowIndex;
            rangeEnd = rowIndex;
        }
        for (var i = rangeStart; i <= rangeEnd; i++) {
            var rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
            if (!this.isSelected(rangeRowData)) {
                this._selection = this.selection.concat([rangeRowData]);
                var dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
                this.onRowSelect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
            }
        }
        this.selectionChange.emit(this.selection);
    };
    Table.prototype.clearSelectionRange = function (event) {
        var rangeStart, rangeEnd;
        if (this.rangeRowIndex > this.anchorRowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        else if (this.rangeRowIndex < this.anchorRowIndex) {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        var _loop_1 = function (i) {
            var rangeRowData = this_1.value[i];
            var selectionIndex = this_1.findIndexInSelection(rangeRowData);
            this_1._selection = this_1.selection.filter(function (val, i) { return i != selectionIndex; });
            var dataKeyValue = this_1.dataKey ? String(this_1.objectUtils.resolveFieldData(rangeRowData, this_1.dataKey)) : null;
            if (dataKeyValue) {
                delete this_1.selectionKeys[dataKeyValue];
            }
            this_1.onRowUnselect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
        };
        var this_1 = this;
        for (var i = rangeStart; i <= rangeEnd; i++) {
            _loop_1(i);
        }
    };
    Table.prototype.isSelected = function (rowData) {
        if (rowData && this.selection) {
            if (this.dataKey) {
                return this.selectionKeys[this.objectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
            }
            else {
                if (this.selection instanceof Array)
                    return this.findIndexInSelection(rowData) > -1;
                else
                    return this.equals(rowData, this.selection);
            }
        }
        return false;
    };
    Table.prototype.findIndexInSelection = function (rowData) {
        var index = -1;
        if (this.selection && this.selection.length) {
            for (var i = 0; i < this.selection.length; i++) {
                if (this.equals(rowData, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    Table.prototype.toggleRowWithRadio = function (event, rowData) {
        this.preventSelectionSetterPropagation = true;
        if (this.selection != rowData) {
            this._selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
            if (this.dataKey) {
                this.selectionKeys = {};
                this.selectionKeys[String(this.objectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
            }
        }
        else {
            this._selection = null;
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
        }
        this.tableService.onSelectionChange();
    };
    Table.prototype.toggleRowWithCheckbox = function (event, rowData) {
        this.selection = this.selection || [];
        var selected = this.isSelected(rowData);
        var dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rowData, this.dataKey)) : null;
        this.preventSelectionSetterPropagation = true;
        if (selected) {
            var selectionIndex_3 = this.findIndexInSelection(rowData);
            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_3; });
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        }
        else {
            this._selection = this.selection ? this.selection.concat([rowData]) : [rowData];
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }
        this.tableService.onSelectionChange();
    };
    Table.prototype.toggleRowsWithCheckbox = function (event, check) {
        this._selection = check ? this.filteredValue ? this.filteredValue.slice() : this.value.slice() : [];
        this.preventSelectionSetterPropagation = true;
        this.updateSelectionKeys();
        this.selectionChange.emit(this._selection);
        this.tableService.onSelectionChange();
        this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: check });
    };
    Table.prototype.equals = function (data1, data2) {
        return this.compareSelectionBy === 'equals' ? (data1 === data2) : this.objectUtils.equals(data1, data2, this.dataKey);
    };
    Table.prototype.filter = function (value, field, matchMode) {
        var _this = this;
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        if (!this.isFilterBlank(value)) {
            this.filters[field] = { value: value, matchMode: matchMode };
        }
        else if (this.filters[field]) {
            delete this.filters[field];
        }
        this.filterTimeout = setTimeout(function () {
            _this._filter();
            _this.filterTimeout = null;
        }, this.filterDelay);
    };
    Table.prototype.filterGlobal = function (value, matchMode) {
        this.filter(value, 'global', matchMode);
    };
    Table.prototype.isFilterBlank = function (filter) {
        if (filter !== null && filter !== undefined) {
            if ((typeof filter === 'string' && filter.trim().length == 0) || (filter instanceof Array && filter.length == 0))
                return true;
            else
                return false;
        }
        return true;
    };
    Table.prototype._filter = function () {
        this.first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if (!this.value) {
                return;
            }
            if (!this.hasFilter()) {
                this.filteredValue = null;
                if (this.paginator) {
                    this.totalRecords = this.value ? this.value.length : 0;
                }
            }
            else {
                var globalFilterFieldsArray = void 0;
                if (this.filters['global']) {
                    if (!this.columns && !this.globalFilterFields)
                        throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                    else
                        globalFilterFieldsArray = this.globalFilterFields || this.columns;
                }
                this.filteredValue = [];
                for (var i = 0; i < this.value.length; i++) {
                    var localMatch = true;
                    var globalMatch = false;
                    var localFiltered = false;
                    for (var prop in this.filters) {
                        if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
                            localFiltered = true;
                            var filterMeta = this.filters[prop];
                            var filterField = prop;
                            var filterValue = filterMeta.value;
                            var filterMatchMode = filterMeta.matchMode || 'startsWith';
                            var dataFieldValue = this.objectUtils.resolveFieldData(this.value[i], filterField);
                            var filterConstraint = this.filterConstraints[filterMatchMode];
                            if (!filterConstraint(dataFieldValue, filterValue)) {
                                localMatch = false;
                            }
                            if (!localMatch) {
                                break;
                            }
                        }
                    }
                    if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                        for (var j = 0; j < globalFilterFieldsArray.length; j++) {
                            var globalFilterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
                            globalMatch = this.filterConstraints[this.filters['global'].matchMode](this.objectUtils.resolveFieldData(this.value[i], globalFilterField), this.filters['global'].value);
                            if (globalMatch) {
                                break;
                            }
                        }
                    }
                    var matches = void 0;
                    if (this.filters['global']) {
                        matches = localFiltered ? (localFiltered && localMatch && globalMatch) : globalMatch;
                    }
                    else {
                        matches = localFiltered && localMatch;
                    }
                    if (matches) {
                        this.filteredValue.push(this.value[i]);
                    }
                }
                if (this.filteredValue.length === this.value.length) {
                    this.filteredValue = null;
                }
                if (this.paginator) {
                    this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
                }
            }
        }
        this.onFilter.emit({
            filters: this.filters,
            filteredValue: this.filteredValue || this.value
        });
        this.tableService.onValueChange(this.value);
    };
    Table.prototype.hasFilter = function () {
        var empty = true;
        for (var prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }
        return !empty;
    };
    Table.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.virtualScroll ? this.rows * 2 : this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
            multiSortMeta: this.multiSortMeta
        };
    };
    Table.prototype.reset = function () {
        this._sortField = null;
        this._sortOrder = 1;
        this._multiSortMeta = null;
        this.tableService.onSort(null);
        this.filteredValue = null;
        this.filters = {};
        this.first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.totalRecords = (this._value ? this._value.length : 0);
        }
    };
    Table.prototype.exportCSV = function (options) {
        var _this = this;
        var data = this.filteredValue || this.value;
        var csv = '\ufeff';
        if (options && options.selectionOnly) {
            data = this.selection || [];
        }
        //headers
        for (var i = 0; i < this.columns.length; i++) {
            var column = this.columns[i];
            if (column.exportable !== false && column.field) {
                csv += '"' + (column.header || column.field) + '"';
                if (i < (this.columns.length - 1)) {
                    csv += this.csvSeparator;
                }
            }
        }
        //body
        data.forEach(function (record, i) {
            csv += '\n';
            for (var i_1 = 0; i_1 < _this.columns.length; i_1++) {
                var column = _this.columns[i_1];
                if (column.exportable !== false && column.field) {
                    var cellData = _this.objectUtils.resolveFieldData(record, column.field);
                    if (cellData != null) {
                        if (_this.exportFunction) {
                            cellData = _this.exportFunction({
                                data: cellData,
                                field: column.field
                            });
                        }
                        else
                            cellData = String(cellData).replace(/"/g, '""');
                    }
                    else
                        cellData = '';
                    csv += '"' + cellData + '"';
                    if (i_1 < (_this.columns.length - 1)) {
                        csv += _this.csvSeparator;
                    }
                }
            }
        });
        var blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
        });
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, this.exportFilename + '.csv');
        }
        else {
            var link = document.createElement("a");
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', this.exportFilename + '.csv');
                link.click();
            }
            else {
                csv = 'data:text/csv;charset=utf-8,' + csv;
                window.open(encodeURI(csv));
            }
            document.body.removeChild(link);
        }
    };
    Table.prototype.closeCellEdit = function () {
        this.domHandler.removeClass(this.editingCell, 'ui-editing-cell');
        this.editingCell = null;
    };
    Table.prototype.toggleRow = function (rowData, event) {
        if (!this.dataKey) {
            throw new Error('dataKey must be defined to use row expansion');
        }
        var dataKeyValue = String(this.objectUtils.resolveFieldData(rowData, this.dataKey));
        if (this.expandedRowKeys[dataKeyValue] != null) {
            delete this.expandedRowKeys[dataKeyValue];
            this.onRowCollapse.emit({
                originalEvent: event,
                data: rowData
            });
        }
        else {
            if (this.rowExpandMode === 'single') {
                this.expandedRowKeys = {};
            }
            this.expandedRowKeys[dataKeyValue] = 1;
            this.onRowExpand.emit({
                originalEvent: event,
                data: rowData
            });
        }
        if (event) {
            event.preventDefault();
        }
    };
    Table.prototype.isRowExpanded = function (rowData) {
        return this.expandedRowKeys[String(this.objectUtils.resolveFieldData(rowData, this.dataKey))] === 1;
    };
    Table.prototype.isSingleSelectionMode = function () {
        return this.selectionMode === 'single';
    };
    Table.prototype.isMultipleSelectionMode = function () {
        return this.selectionMode === 'multiple';
    };
    Table.prototype.onColumnResizeBegin = function (event) {
        var containerLeft = this.domHandler.getOffset(this.containerViewChild.nativeElement).left;
        this.lastResizerHelperX = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft);
        event.preventDefault();
    };
    Table.prototype.onColumnResize = function (event) {
        var containerLeft = this.domHandler.getOffset(this.containerViewChild.nativeElement).left;
        this.domHandler.addClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
        this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + 'px';
        this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
        this.resizeHelperViewChild.nativeElement.style.left = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft) + 'px';
        this.resizeHelperViewChild.nativeElement.style.display = 'block';
    };
    Table.prototype.onColumnResizeEnd = function (event, column) {
        var delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
        var columnWidth = column.offsetWidth;
        var minWidth = parseInt(column.style.minWidth || 15);
        if (columnWidth + delta < minWidth) {
            delta = minWidth - columnWidth;
        }
        var newColumnWidth = columnWidth + delta;
        if (newColumnWidth >= minWidth) {
            if (this.columnResizeMode === 'fit') {
                var nextColumn = column.nextElementSibling;
                while (!nextColumn.offsetParent) {
                    nextColumn = nextColumn.nextElementSibling;
                }
                if (nextColumn) {
                    var nextColumnWidth = nextColumn.offsetWidth - delta;
                    var nextColumnMinWidth = nextColumn.style.minWidth || 15;
                    if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
                        if (this.scrollable) {
                            var scrollableView = this.findParentScrollableView(column);
                            var scrollableBodyTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-body-table');
                            var scrollableHeaderTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-header-table');
                            var scrollableFooterTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-footer-table');
                            var resizeColumnIndex = this.domHandler.index(column);
                            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                        }
                        else {
                            column.style.width = newColumnWidth + 'px';
                            if (nextColumn) {
                                nextColumn.style.width = nextColumnWidth + 'px';
                            }
                        }
                    }
                }
            }
            else if (this.columnResizeMode === 'expand') {
                if (this.scrollable) {
                    var scrollableView = this.findParentScrollableView(column);
                    var scrollableBodyTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-body-table');
                    var scrollableHeaderTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-header-table');
                    var scrollableFooterTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-footer-table');
                    scrollableBodyTable.style.width = scrollableBodyTable.offsetWidth + delta + 'px';
                    scrollableHeaderTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                    if (scrollableFooterTable) {
                        scrollableFooterTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                    }
                    var resizeColumnIndex = this.domHandler.index(column);
                    this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
                }
                else {
                    this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.offsetWidth + delta + 'px';
                    column.style.width = newColumnWidth + 'px';
                    var containerWidth = this.tableViewChild.nativeElement.style.width;
                    this.containerViewChild.nativeElement.style.width = containerWidth + 'px';
                }
            }
            this.onColResize.emit({
                element: column,
                delta: delta
            });
        }
        this.resizeHelperViewChild.nativeElement.style.display = 'none';
        this.domHandler.removeClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
    };
    Table.prototype.findParentScrollableView = function (column) {
        if (column) {
            var parent_1 = column.parentElement;
            while (parent_1 && !this.domHandler.hasClass(parent_1, 'ui-table-scrollable-view')) {
                parent_1 = parent_1.parentElement;
            }
            return parent_1;
        }
        else {
            return null;
        }
    };
    Table.prototype.resizeColGroup = function (table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
        if (table) {
            var colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;
            if (colGroup) {
                var col = colGroup.children[resizeColumnIndex];
                var nextCol = col.nextElementSibling;
                col.style.width = newColumnWidth + 'px';
                if (nextCol && nextColumnWidth) {
                    nextCol.style.width = nextColumnWidth + 'px';
                }
            }
            else {
                throw "Scrollable tables require a colgroup to support resizable columns";
            }
        }
    };
    Table.prototype.onColumnDragStart = function (event, columnElement) {
        this.reorderIconWidth = this.domHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild.nativeElement);
        this.reorderIconHeight = this.domHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild.nativeElement);
        this.draggedColumn = columnElement;
        event.dataTransfer.setData('text', 'b'); // For firefox
    };
    Table.prototype.onColumnDragEnter = function (event, dropHeader) {
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            var containerOffset = this.domHandler.getOffset(this.containerViewChild.nativeElement);
            var dropHeaderOffset = this.domHandler.getOffset(dropHeader);
            if (this.draggedColumn != dropHeader) {
                var targetLeft = dropHeaderOffset.left - containerOffset.left;
                var targetTop = containerOffset.top - dropHeaderOffset.top;
                var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
                this.reorderIndicatorUpViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + 'px';
                this.reorderIndicatorDownViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
                if (event.pageX > columnCenter) {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = 1;
                }
                else {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = -1;
                }
                this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
                this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
            }
            else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    };
    Table.prototype.onColumnDragLeave = function (event) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
        }
    };
    Table.prototype.onColumnDrop = function (event, dropColumn) {
        event.preventDefault();
        if (this.draggedColumn) {
            var dragIndex = this.domHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
            var dropIndex = this.domHandler.indexWithinGroup(dropColumn, 'preorderablecolumn');
            var allowDrop = (dragIndex != dropIndex);
            if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }
            if (allowDrop) {
                this.objectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
            }
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    };
    Table.prototype.onRowDragStart = function (event, index) {
        this.rowDragging = true;
        this.draggedRowIndex = index;
        event.dataTransfer.setData('text', 'b'); // For firefox
    };
    Table.prototype.onRowDragOver = function (event, index, rowElement) {
        if (this.rowDragging && this.draggedRowIndex !== index) {
            var rowY = this.domHandler.getOffset(rowElement).top + this.domHandler.getWindowScrollTop();
            var pageY = event.pageY;
            var rowMidY = rowY + this.domHandler.getOuterHeight(rowElement) / 2;
            var prevRowElement = rowElement.previousElementSibling;
            if (pageY < rowMidY) {
                this.domHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');
                this.droppedRowIndex = index;
                if (prevRowElement)
                    this.domHandler.addClass(prevRowElement, 'ui-table-dragpoint-bottom');
                else
                    this.domHandler.addClass(rowElement, 'ui-table-dragpoint-top');
            }
            else {
                if (prevRowElement)
                    this.domHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
                else
                    this.domHandler.addClass(rowElement, 'ui-table-dragpoint-top');
                this.droppedRowIndex = index + 1;
                this.domHandler.addClass(rowElement, 'ui-table-dragpoint-bottom');
            }
        }
    };
    Table.prototype.onRowDragLeave = function (event, rowElement) {
        var prevRowElement = rowElement.previousElementSibling;
        if (prevRowElement) {
            this.domHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
        }
        this.domHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');
        this.domHandler.removeClass(rowElement, 'ui-table-dragpoint-top');
    };
    Table.prototype.onRowDragEnd = function (event) {
        this.rowDragging = false;
        this.draggedRowIndex = null;
        this.droppedRowIndex = null;
    };
    Table.prototype.onRowDrop = function (event, rowElement) {
        if (this.droppedRowIndex != null) {
            var dropIndex = (this.draggedRowIndex > this.droppedRowIndex) ? this.droppedRowIndex : (this.droppedRowIndex === 0) ? 0 : this.droppedRowIndex - 1;
            this.objectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);
            this.onRowReorder.emit({
                dragIndex: this.draggedRowIndex,
                dropIndex: this.droppedRowIndex
            });
        }
        //cleanup
        this.onRowDragLeave(event, rowElement);
        this.onRowDragEnd(event);
    };
    Table.prototype.handleVirtualScroll = function (event) {
        var _this = this;
        this.first = (event.page - 1) * this.rows;
        this.virtualScrollCallback = event.callback;
        this.zone.run(function () {
            if (_this.virtualScrollTimer) {
                clearTimeout(_this.virtualScrollTimer);
            }
            _this.virtualScrollTimer = setTimeout(function () {
                _this.onLazyLoad.emit(_this.createLazyLoadMetadata());
            }, _this.virtualScrollDelay);
        });
    };
    Table.prototype.isEmpty = function () {
        var data = this.filteredValue || this.value;
        return data == null || data.length == 0;
    };
    Table.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Table.prototype.ngOnDestroy = function () {
        this.editingCell = null;
        this.initialized = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Table.prototype, "frozenColumns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Table.prototype, "frozenValue", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "tableStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "tableStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Table.prototype, "rows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Table.prototype, "first", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Table.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Table.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "alwaysShowPaginator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "paginatorPosition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "paginatorDropdownAppendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Table.prototype, "defaultSortOrder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "sortMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "resetPageOnSort", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "selectionMode", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "selectionChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "contextMenuSelection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "contextMenuSelectionChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "contextMenuSelectionMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "dataKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "metaKeySelection", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], Table.prototype, "rowTrackBy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "lazy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "lazyLoadOnInit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "compareSelectionBy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "csvSeparator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "exportFilename", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "filters", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Table.prototype, "globalFilterFields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Table.prototype, "filterDelay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "expandedRowKeys", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "rowExpandMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "scrollable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "virtualScroll", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Table.prototype, "virtualScrollDelay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Table.prototype, "virtualRowHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "frozenWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "contextMenu", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "resizableColumns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "columnResizeMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "reorderableColumns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "loading", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "loadingIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "rowHover", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "customSort", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "autoLayout", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "exportFunction", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onRowSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onRowUnselect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onPage", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onSort", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onFilter", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onLazyLoad", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onRowExpand", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onRowCollapse", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onContextMenuSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onColResize", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onColReorder", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onRowReorder", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onEditInit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onEditComplete", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onEditCancel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onHeaderCheckboxToggle", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "sortFunction", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], Table.prototype, "containerViewChild", void 0);
    __decorate([
        core_1.ViewChild('resizeHelper'),
        __metadata("design:type", core_1.ElementRef)
    ], Table.prototype, "resizeHelperViewChild", void 0);
    __decorate([
        core_1.ViewChild('reorderIndicatorUp'),
        __metadata("design:type", core_1.ElementRef)
    ], Table.prototype, "reorderIndicatorUpViewChild", void 0);
    __decorate([
        core_1.ViewChild('reorderIndicatorDown'),
        __metadata("design:type", core_1.ElementRef)
    ], Table.prototype, "reorderIndicatorDownViewChild", void 0);
    __decorate([
        core_1.ViewChild('table'),
        __metadata("design:type", core_1.ElementRef)
    ], Table.prototype, "tableViewChild", void 0);
    __decorate([
        core_1.ContentChildren(shared_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], Table.prototype, "templates", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], Table.prototype, "value", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], Table.prototype, "columns", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], Table.prototype, "totalRecords", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], Table.prototype, "sortField", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], Table.prototype, "sortOrder", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], Table.prototype, "multiSortMeta", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], Table.prototype, "selection", null);
    Table = __decorate([
        core_1.Component({
            selector: 'p-table',
            template: "\n        <div #container [ngStyle]=\"style\" [class]=\"styleClass\"\n            [ngClass]=\"{'ui-table ui-widget': true, 'ui-table-responsive': responsive, 'ui-table-resizable': resizableColumns,\n                'ui-table-resizable-fit': (resizableColumns && columnResizeMode === 'fit'),\n                'ui-table-hoverable-rows': (rowHover||selectionMode), 'ui-table-auto-layout': autoLayout}\">\n            <div class=\"ui-table-loading ui-widget-overlay\" *ngIf=\"loading\"></div>\n            <div class=\"ui-table-loading-content\" *ngIf=\"loading\">\n                <i [class]=\"'ui-table-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <div *ngIf=\"captionTemplate\" class=\"ui-table-caption ui-widget-header\">\n                <ng-container *ngTemplateOutlet=\"captionTemplate\"></ng-container>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-top\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\"></p-paginator>\n            \n            <div class=\"ui-table-wrapper\" *ngIf=\"!scrollable\">\n                <table #table [ngClass]=\"tableStyleClass\" [ngStyle]=\"tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"ui-table-thead\">\n                        <ng-container *ngTemplateOutlet=\"headerTemplate; context: {$implicit: columns}\"></ng-container>\n                    </thead>\n                    <tfoot class=\"ui-table-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                    <tbody class=\"ui-table-tbody\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"bodyTemplate\"></tbody>\n                </table>\n            </div>\n\n            <div class=\"ui-table-scrollable-wrapper\" *ngIf=\"scrollable\">\n               <div class=\"ui-table-scrollable-view ui-table-frozen-view\" *ngIf=\"frozenColumns||frozenBodyTemplate\" [pScrollableView]=\"frozenColumns\" [frozen]=\"true\" [ngStyle]=\"{width: frozenWidth}\" [scrollHeight]=\"scrollHeight\"></div>\n               <div class=\"ui-table-scrollable-view\" [pScrollableView]=\"columns\" [frozen]=\"false\" [scrollHeight]=\"scrollHeight\"></div>\n            </div>\n            \n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-bottom\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\"></p-paginator>\n            <div *ngIf=\"summaryTemplate\" class=\"ui-table-summary ui-widget-header\">\n                <ng-container *ngTemplateOutlet=\"summaryTemplate\"></ng-container>\n            </div>\n\n            <div #resizeHelper class=\"ui-column-resizer-helper ui-state-highlight\" style=\"display:none\" *ngIf=\"resizableColumns\"></div>\n\n            <span #reorderIndicatorUp class=\"pi pi-arrow-down ui-table-reorder-indicator-up\" style=\"display:none\" *ngIf=\"reorderableColumns\"></span>\n            <span #reorderIndicatorDown class=\"pi pi-arrow-up ui-table-reorder-indicator-down\" style=\"display:none\" *ngIf=\"reorderableColumns\"></span>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler, objectutils_1.ObjectUtils, TableService]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, objectutils_1.ObjectUtils, core_1.NgZone, TableService])
    ], Table);
    return Table;
}());
exports.Table = Table;
var TableBody = /** @class */ (function () {
    function TableBody(dt) {
        this.dt = dt;
    }
    __decorate([
        core_1.Input("pTableBody"),
        __metadata("design:type", Array)
    ], TableBody.prototype, "columns", void 0);
    __decorate([
        core_1.Input("pTableBodyTemplate"),
        __metadata("design:type", core_1.TemplateRef)
    ], TableBody.prototype, "template", void 0);
    TableBody = __decorate([
        core_1.Component({
            selector: '[pTableBody]',
            template: "\n        <ng-container *ngIf=\"!dt.expandedRowTemplate\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}\"></ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.expandedRowTemplate\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData)}\"></ng-container>\n                <ng-container *ngIf=\"dt.isRowExpanded(rowData)\">\n                    <ng-container *ngTemplateOutlet=\"dt.expandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}\"></ng-container>\n                </ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.isEmpty()\">\n            <ng-container *ngTemplateOutlet=\"dt.emptyMessageTemplate; context: {$implicit: columns}\"></ng-container>\n        </ng-container>\n    "
        }),
        __metadata("design:paramtypes", [Table])
    ], TableBody);
    return TableBody;
}());
exports.TableBody = TableBody;
var ScrollableView = /** @class */ (function () {
    function ScrollableView(dt, el, domHandler, zone) {
        var _this = this;
        this.dt = dt;
        this.el = el;
        this.domHandler = domHandler;
        this.zone = zone;
        this.subscription = this.dt.tableService.valueSource$.subscribe(function () {
            _this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.alignScrollBar();
                }, 50);
            });
        });
        if (this.dt.virtualScroll) {
            this.totalRecordsSubscription = this.dt.tableService.totalRecordsSource$.subscribe(function () {
                _this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.setVirtualScrollerHeight();
                    }, 50);
                });
            });
        }
        this.initialized = false;
    }
    Object.defineProperty(ScrollableView.prototype, "scrollHeight", {
        get: function () {
            return this._scrollHeight;
        },
        set: function (val) {
            this._scrollHeight = val;
            this.setScrollHeight();
        },
        enumerable: true,
        configurable: true
    });
    ScrollableView.prototype.ngAfterViewChecked = function () {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.alignScrollBar();
            this.setScrollHeight();
            this.initialized = true;
        }
    };
    ScrollableView.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.frozen) {
            if (this.dt.frozenColumns || this.dt.frozenBodyTemplate) {
                this.domHandler.addClass(this.el.nativeElement, 'ui-table-unfrozen-view');
            }
            if (this.dt.frozenWidth) {
                this.el.nativeElement.style.left = this.dt.frozenWidth;
                this.el.nativeElement.style.width = 'calc(100% - ' + this.dt.frozenWidth + ')';
            }
            var frozenView = this.el.nativeElement.previousElementSibling;
            if (frozenView) {
                this.frozenSiblingBody = this.domHandler.findSingle(frozenView, '.ui-table-scrollable-body');
            }
        }
        else {
            this.scrollBodyViewChild.nativeElement.style.marginBottom = this.domHandler.calculateScrollbarWidth() + 'px';
            var scrollableView = this.el.nativeElement.nextElementSibling;
            if (scrollableView) {
                this.scrollableSiblingBody = this.domHandler.findSingle(scrollableView, '.ui-table-scrollable-body');
            }
        }
        this.bindEvents();
        this.setScrollHeight();
        this.alignScrollBar();
        if (this.frozen) {
            this.columnsSubscription = this.dt.tableService.columnsSource$.subscribe(function () {
                _this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.setScrollHeight();
                    }, 50);
                });
            });
        }
        if (this.dt.virtualScroll) {
            this.setVirtualScrollerHeight();
        }
    };
    ScrollableView.prototype.bindEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            var scrollBarWidth = _this.domHandler.calculateScrollbarWidth();
            if (_this.scrollHeaderViewChild && _this.scrollHeaderViewChild.nativeElement) {
                _this.headerScrollListener = _this.onHeaderScroll.bind(_this);
                _this.scrollHeaderBoxViewChild.nativeElement.addEventListener('scroll', _this.headerScrollListener);
            }
            if (_this.scrollFooterViewChild && _this.scrollFooterViewChild.nativeElement) {
                _this.footerScrollListener = _this.onFooterScroll.bind(_this);
                _this.scrollFooterViewChild.nativeElement.addEventListener('scroll', _this.footerScrollListener);
            }
            if (!_this.frozen) {
                _this.bodyScrollListener = _this.onBodyScroll.bind(_this);
                _this.scrollBodyViewChild.nativeElement.addEventListener('scroll', _this.bodyScrollListener);
            }
        });
    };
    ScrollableView.prototype.unbindEvents = function () {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.removeEventListener('scroll', this.headerScrollListener);
        }
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.removeEventListener('scroll', this.footerScrollListener);
        }
        this.scrollBodyViewChild.nativeElement.addEventListener('scroll', this.bodyScrollListener);
    };
    ScrollableView.prototype.onHeaderScroll = function (event) {
        this.scrollHeaderViewChild.nativeElement.scrollLeft = 0;
    };
    ScrollableView.prototype.onFooterScroll = function (event) {
        this.scrollFooterViewChild.nativeElement.scrollLeft = 0;
    };
    ScrollableView.prototype.onBodyScroll = function (event) {
        var _this = this;
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }
        if (this.frozenSiblingBody) {
            this.frozenSiblingBody.scrollTop = this.scrollBodyViewChild.nativeElement.scrollTop;
        }
        if (this.dt.virtualScroll) {
            var viewport = this.domHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
            var tableHeight = this.domHandler.getOuterHeight(this.scrollTableViewChild.nativeElement);
            var pageHeight_1 = this.dt.virtualRowHeight * this.dt.rows;
            var virtualTableHeight = this.domHandler.getOuterHeight(this.virtualScrollerViewChild.nativeElement);
            var pageCount = (virtualTableHeight / pageHeight_1) || 1;
            var scrollBodyTop = this.scrollTableViewChild.nativeElement.style.top || '0';
            if ((this.scrollBodyViewChild.nativeElement.scrollTop + viewport > parseFloat(scrollBodyTop) + tableHeight) || (this.scrollBodyViewChild.nativeElement.scrollTop < parseFloat(scrollBodyTop))) {
                var page_1 = Math.floor((this.scrollBodyViewChild.nativeElement.scrollTop * pageCount) / (this.scrollBodyViewChild.nativeElement.scrollHeight)) + 1;
                this.dt.handleVirtualScroll({
                    page: page_1,
                    callback: function () {
                        _this.scrollTableViewChild.nativeElement.style.top = ((page_1 - 1) * pageHeight_1) + 'px';
                        if (_this.frozenSiblingBody) {
                            _this.frozenSiblingBody.children[0].style.top = _this.scrollTableViewChild.nativeElement.style.top;
                        }
                    }
                });
            }
        }
    };
    ScrollableView.prototype.setScrollHeight = function () {
        if (this.scrollHeight && this.scrollBodyViewChild && this.scrollBodyViewChild.nativeElement) {
            if (this.scrollHeight.indexOf('%') !== -1) {
                this.scrollBodyViewChild.nativeElement.style.visibility = 'hidden';
                this.scrollBodyViewChild.nativeElement.style.height = '100px'; //temporary height to calculate static height
                var containerHeight = this.domHandler.getOuterHeight(this.dt.el.nativeElement.children[0]);
                var relativeHeight = this.domHandler.getOuterHeight(this.dt.el.nativeElement.parentElement) * parseInt(this.scrollHeight) / 100;
                var staticHeight = containerHeight - 100; //total height of headers, footers, paginators
                var scrollBodyHeight = (relativeHeight - staticHeight);
                if (this.frozen) {
                    scrollBodyHeight -= this.domHandler.calculateScrollbarWidth();
                }
                this.scrollBodyViewChild.nativeElement.style.height = 'auto';
                this.scrollBodyViewChild.nativeElement.style.maxHeight = scrollBodyHeight + 'px';
                this.scrollBodyViewChild.nativeElement.style.visibility = 'visible';
            }
            else {
                if (this.frozen && this.scrollableSiblingBody && this.domHandler.getOuterWidth(this.scrollableSiblingBody) < this.domHandler.getOuterWidth(this.scrollableSiblingBody.children[0]))
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = (parseInt(this.scrollHeight) - this.domHandler.calculateScrollbarWidth()) + 'px';
                else
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = this.scrollHeight;
            }
        }
    };
    ScrollableView.prototype.setVirtualScrollerHeight = function () {
        if (this.virtualScrollerViewChild.nativeElement) {
            this.virtualScrollerViewChild.nativeElement.style.height = this.dt.totalRecords * this.dt.virtualRowHeight + 'px';
        }
    };
    ScrollableView.prototype.hasVerticalOverflow = function () {
        return this.domHandler.getOuterHeight(this.scrollTableViewChild.nativeElement) > this.domHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
    };
    ScrollableView.prototype.alignScrollBar = function () {
        if (!this.frozen) {
            var scrollBarWidth = this.hasVerticalOverflow() ? this.domHandler.calculateScrollbarWidth() : 0;
            this.scrollHeaderBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            if (this.scrollFooterBoxViewChild && this.scrollFooterBoxViewChild.nativeElement) {
                this.scrollFooterBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            }
        }
        this.initialized = false;
    };
    ScrollableView.prototype.ngOnDestroy = function () {
        this.unbindEvents();
        this.frozenSiblingBody = null;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.totalRecordsSubscription) {
            this.totalRecordsSubscription.unsubscribe();
        }
        if (this.columnsSubscription) {
            this.columnsSubscription.unsubscribe();
        }
        this.initialized = false;
    };
    __decorate([
        core_1.Input("pScrollableView"),
        __metadata("design:type", Array)
    ], ScrollableView.prototype, "columns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ScrollableView.prototype, "frozen", void 0);
    __decorate([
        core_1.ViewChild('scrollHeader'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableView.prototype, "scrollHeaderViewChild", void 0);
    __decorate([
        core_1.ViewChild('scrollHeaderBox'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableView.prototype, "scrollHeaderBoxViewChild", void 0);
    __decorate([
        core_1.ViewChild('scrollBody'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableView.prototype, "scrollBodyViewChild", void 0);
    __decorate([
        core_1.ViewChild('scrollTable'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableView.prototype, "scrollTableViewChild", void 0);
    __decorate([
        core_1.ViewChild('scrollFooter'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableView.prototype, "scrollFooterViewChild", void 0);
    __decorate([
        core_1.ViewChild('scrollFooterBox'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableView.prototype, "scrollFooterBoxViewChild", void 0);
    __decorate([
        core_1.ViewChild('virtualScroller'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableView.prototype, "virtualScrollerViewChild", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ScrollableView.prototype, "scrollHeight", null);
    ScrollableView = __decorate([
        core_1.Component({
            selector: '[pScrollableView]',
            template: "\n        <div #scrollHeader class=\"ui-table-scrollable-header ui-widget-header\">\n            <div #scrollHeaderBox class=\"ui-table-scrollable-header-box\">\n                <table class=\"ui-table-scrollable-header-table\" [ngClass]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"ui-table-thead\">\n                        <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenHeaderTemplate||dt.headerTemplate : dt.headerTemplate; context {$implicit: columns}\"></ng-container>\n                    </thead>\n                    <tbody class=\"ui-table-tbody\">\n                        <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"dt.frozenValue\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                            <ng-container *ngTemplateOutlet=\"dt.frozenRowsTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns}\"></ng-container>\n                        </ng-template>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n        <div #scrollBody class=\"ui-table-scrollable-body\">\n            <table #scrollTable [ngClass]=\"{'ui-table-scrollable-body-table': true, 'ui-table-virtual-table': dt.virtualScroll}\" [class]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                <tbody class=\"ui-table-tbody\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"frozen ? dt.frozenBodyTemplate||dt.bodyTemplate : dt.bodyTemplate\"></tbody>\n            </table>\n            <div #virtualScroller class=\"ui-table-virtual-scroller\"></div>\n        </div>\n        <div #scrollFooter *ngIf=\"dt.footerTemplate\" class=\"ui-table-scrollable-footer ui-widget-header\">\n            <div #scrollFooterBox class=\"ui-table-scrollable-footer-box\">\n                <table class=\"ui-table-scrollable-footer-table\" [ngClass]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <tfoot class=\"ui-table-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenFooterTemplate||dt.footerTemplate : dt.footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                </table>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [Table, core_1.ElementRef, domhandler_1.DomHandler, core_1.NgZone])
    ], ScrollableView);
    return ScrollableView;
}());
exports.ScrollableView = ScrollableView;
var SortableColumn = /** @class */ (function () {
    function SortableColumn(dt, domHandler) {
        var _this = this;
        this.dt = dt;
        this.domHandler = domHandler;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.sortSource$.subscribe(function (sortMeta) {
                _this.updateSortState();
            });
        }
    }
    SortableColumn.prototype.ngOnInit = function () {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    };
    SortableColumn.prototype.updateSortState = function () {
        this.sorted = this.dt.isSorted(this.field);
    };
    SortableColumn.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.updateSortState();
            this.dt.sort({
                originalEvent: event,
                field: this.field
            });
            this.domHandler.clearSelection();
        }
    };
    SortableColumn.prototype.isEnabled = function () {
        return this.pSortableColumnDisabled !== true;
    };
    SortableColumn.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input("pSortableColumn"),
        __metadata("design:type", String)
    ], SortableColumn.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SortableColumn.prototype, "pSortableColumnDisabled", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], SortableColumn.prototype, "onClick", null);
    SortableColumn = __decorate([
        core_1.Directive({
            selector: '[pSortableColumn]',
            providers: [domhandler_1.DomHandler],
            host: {
                '[class.ui-sortable-column]': 'isEnabled()',
                '[class.ui-state-highlight]': 'sorted'
            }
        }),
        __metadata("design:paramtypes", [Table, domhandler_1.DomHandler])
    ], SortableColumn);
    return SortableColumn;
}());
exports.SortableColumn = SortableColumn;
var SortIcon = /** @class */ (function () {
    function SortIcon(dt) {
        var _this = this;
        this.dt = dt;
        this.subscription = this.dt.tableService.sortSource$.subscribe(function (sortMeta) {
            _this.updateSortState();
        });
    }
    SortIcon.prototype.ngOnInit = function () {
        this.updateSortState();
    };
    SortIcon.prototype.onClick = function (event) {
        event.preventDefault();
    };
    SortIcon.prototype.updateSortState = function () {
        if (this.dt.sortMode === 'single') {
            this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
        }
        else if (this.dt.sortMode === 'multiple') {
            var sortMeta = this.dt.getSortMeta(this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }
    };
    Object.defineProperty(SortIcon.prototype, "ariaText", {
        get: function () {
            var text;
            switch (this.sortOrder) {
                case 1:
                    text = this.ariaLabelAsc;
                    break;
                case -1:
                    text = this.ariaLabelDesc;
                    break;
                default:
                    text = this.ariaLabel;
                    break;
            }
            return text;
        },
        enumerable: true,
        configurable: true
    });
    SortIcon.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SortIcon.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SortIcon.prototype, "ariaLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SortIcon.prototype, "ariaLabelDesc", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SortIcon.prototype, "ariaLabelAsc", void 0);
    SortIcon = __decorate([
        core_1.Component({
            selector: 'p-sortIcon',
            template: "\n        <a href=\"#\" (click)=\"onClick($event)\" [attr.aria-label]=\"ariaText\" class=\"ui-table-sort-icon\">\n            <i class=\"ui-sortable-column-icon pi pi-fw\" [ngClass]=\"{'pi-sort-up': sortOrder === 1, 'pi-sort-down': sortOrder === -1, 'pi-sort': sortOrder === 0}\"></i>\n        </a>\n    "
        }),
        __metadata("design:paramtypes", [Table])
    ], SortIcon);
    return SortIcon;
}());
exports.SortIcon = SortIcon;
var SelectableRow = /** @class */ (function () {
    function SelectableRow(dt, domHandler, tableService) {
        var _this = this;
        this.dt = dt;
        this.domHandler = domHandler;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                _this.selected = _this.dt.isSelected(_this.data);
            });
        }
    }
    SelectableRow.prototype.ngOnInit = function () {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    };
    SelectableRow.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    };
    SelectableRow.prototype.onTouchEnd = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowTouchEnd(event);
        }
    };
    SelectableRow.prototype.isEnabled = function () {
        return this.pSelectableRowDisabled !== true;
    };
    SelectableRow.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input("pSelectableRow"),
        __metadata("design:type", Object)
    ], SelectableRow.prototype, "data", void 0);
    __decorate([
        core_1.Input("pSelectableRowIndex"),
        __metadata("design:type", Number)
    ], SelectableRow.prototype, "index", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SelectableRow.prototype, "pSelectableRowDisabled", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], SelectableRow.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('touchend', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], SelectableRow.prototype, "onTouchEnd", null);
    SelectableRow = __decorate([
        core_1.Directive({
            selector: '[pSelectableRow]',
            providers: [domhandler_1.DomHandler],
            host: {
                '[class.ui-state-highlight]': 'selected'
            }
        }),
        __metadata("design:paramtypes", [Table, domhandler_1.DomHandler, TableService])
    ], SelectableRow);
    return SelectableRow;
}());
exports.SelectableRow = SelectableRow;
var SelectableRowDblClick = /** @class */ (function () {
    function SelectableRowDblClick(dt, domHandler, tableService) {
        var _this = this;
        this.dt = dt;
        this.domHandler = domHandler;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                _this.selected = _this.dt.isSelected(_this.data);
            });
        }
    }
    SelectableRowDblClick.prototype.ngOnInit = function () {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    };
    SelectableRowDblClick.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    };
    SelectableRowDblClick.prototype.isEnabled = function () {
        return this.pSelectableRowDisabled !== true;
    };
    SelectableRowDblClick.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input("pSelectableRowDblClick"),
        __metadata("design:type", Object)
    ], SelectableRowDblClick.prototype, "data", void 0);
    __decorate([
        core_1.Input("pSelectableRowIndex"),
        __metadata("design:type", Number)
    ], SelectableRowDblClick.prototype, "index", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SelectableRowDblClick.prototype, "pSelectableRowDisabled", void 0);
    __decorate([
        core_1.HostListener('dblclick', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], SelectableRowDblClick.prototype, "onClick", null);
    SelectableRowDblClick = __decorate([
        core_1.Directive({
            selector: '[pSelectableRowDblClick]',
            providers: [domhandler_1.DomHandler],
            host: {
                '[class.ui-state-highlight]': 'selected'
            }
        }),
        __metadata("design:paramtypes", [Table, domhandler_1.DomHandler, TableService])
    ], SelectableRowDblClick);
    return SelectableRowDblClick;
}());
exports.SelectableRowDblClick = SelectableRowDblClick;
var ContextMenuRow = /** @class */ (function () {
    function ContextMenuRow(dt, tableService) {
        var _this = this;
        this.dt = dt;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.contextMenuSource$.subscribe(function (data) {
                _this.selected = _this.dt.equals(_this.data, data);
            });
        }
    }
    ContextMenuRow.prototype.onContextMenu = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowRightClick({
                originalEvent: event,
                rowData: this.data
            });
            event.preventDefault();
        }
    };
    ContextMenuRow.prototype.isEnabled = function () {
        return this.pContextMenuRowDisabled !== true;
    };
    ContextMenuRow.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input("pContextMenuRow"),
        __metadata("design:type", Object)
    ], ContextMenuRow.prototype, "data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ContextMenuRow.prototype, "pContextMenuRowDisabled", void 0);
    __decorate([
        core_1.HostListener('contextmenu', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], ContextMenuRow.prototype, "onContextMenu", null);
    ContextMenuRow = __decorate([
        core_1.Directive({
            selector: '[pContextMenuRow]',
            host: {
                '[class.ui-contextmenu-selected]': 'selected'
            }
        }),
        __metadata("design:paramtypes", [Table, TableService])
    ], ContextMenuRow);
    return ContextMenuRow;
}());
exports.ContextMenuRow = ContextMenuRow;
var RowToggler = /** @class */ (function () {
    function RowToggler(dt) {
        this.dt = dt;
    }
    RowToggler.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.dt.toggleRow(this.data, event);
            event.preventDefault();
        }
    };
    RowToggler.prototype.isEnabled = function () {
        return this.pRowTogglerDisabled !== true;
    };
    __decorate([
        core_1.Input('pRowToggler'),
        __metadata("design:type", Object)
    ], RowToggler.prototype, "data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], RowToggler.prototype, "pRowTogglerDisabled", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], RowToggler.prototype, "onClick", null);
    RowToggler = __decorate([
        core_1.Directive({
            selector: '[pRowToggler]'
        }),
        __metadata("design:paramtypes", [Table])
    ], RowToggler);
    return RowToggler;
}());
exports.RowToggler = RowToggler;
var ResizableColumn = /** @class */ (function () {
    function ResizableColumn(dt, el, domHandler, zone) {
        this.dt = dt;
        this.el = el;
        this.domHandler = domHandler;
        this.zone = zone;
    }
    ResizableColumn.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.isEnabled()) {
            this.domHandler.addClass(this.el.nativeElement, 'ui-resizable-column');
            this.resizer = document.createElement('span');
            this.resizer.className = 'ui-column-resizer ui-clickable';
            this.el.nativeElement.appendChild(this.resizer);
            this.zone.runOutsideAngular(function () {
                _this.resizerMouseDownListener = _this.onMouseDown.bind(_this);
                _this.resizer.addEventListener('mousedown', _this.resizerMouseDownListener);
            });
        }
    };
    ResizableColumn.prototype.bindDocumentEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.documentMouseMoveListener = _this.onDocumentMouseMove.bind(_this);
            document.addEventListener('mousemove', _this.documentMouseMoveListener);
            _this.documentMouseUpListener = _this.onDocumentMouseUp.bind(_this);
            document.addEventListener('mouseup', _this.documentMouseUpListener);
        });
    };
    ResizableColumn.prototype.unbindDocumentEvents = function () {
        if (this.documentMouseMoveListener) {
            document.removeEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseMoveListener = null;
        }
        if (this.documentMouseUpListener) {
            document.removeEventListener('mouseup', this.documentMouseUpListener);
            this.documentMouseUpListener = null;
        }
    };
    ResizableColumn.prototype.onMouseDown = function (event) {
        this.dt.onColumnResizeBegin(event);
        this.bindDocumentEvents();
    };
    ResizableColumn.prototype.onDocumentMouseMove = function (event) {
        this.dt.onColumnResize(event);
    };
    ResizableColumn.prototype.onDocumentMouseUp = function (event) {
        this.dt.onColumnResizeEnd(event, this.el.nativeElement);
        this.unbindDocumentEvents();
    };
    ResizableColumn.prototype.isEnabled = function () {
        return this.pResizableColumnDisabled !== true;
    };
    ResizableColumn.prototype.ngOnDestroy = function () {
        if (this.resizerMouseDownListener) {
            this.resizer.removeEventListener('mousedown', this.resizerMouseDownListener);
        }
        this.unbindDocumentEvents();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ResizableColumn.prototype, "pResizableColumnDisabled", void 0);
    ResizableColumn = __decorate([
        core_1.Directive({
            selector: '[pResizableColumn]'
        }),
        __metadata("design:paramtypes", [Table, core_1.ElementRef, domhandler_1.DomHandler, core_1.NgZone])
    ], ResizableColumn);
    return ResizableColumn;
}());
exports.ResizableColumn = ResizableColumn;
var ReorderableColumn = /** @class */ (function () {
    function ReorderableColumn(dt, el, domHandler, zone) {
        this.dt = dt;
        this.el = el;
        this.domHandler = domHandler;
        this.zone = zone;
    }
    ReorderableColumn.prototype.ngAfterViewInit = function () {
        if (this.isEnabled()) {
            this.bindEvents();
        }
    };
    ReorderableColumn.prototype.bindEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.mouseDownListener = _this.onMouseDown.bind(_this);
            _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
            _this.dragStartListener = _this.onDragStart.bind(_this);
            _this.el.nativeElement.addEventListener('dragstart', _this.dragStartListener);
            _this.dragOverListener = _this.onDragEnter.bind(_this);
            _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
            _this.dragEnterListener = _this.onDragEnter.bind(_this);
            _this.el.nativeElement.addEventListener('dragenter', _this.dragEnterListener);
            _this.dragLeaveListener = _this.onDragLeave.bind(_this);
            _this.el.nativeElement.addEventListener('dragleave', _this.dragLeaveListener);
        });
    };
    ReorderableColumn.prototype.unbindEvents = function () {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }
        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }
        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }
        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }
        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    };
    ReorderableColumn.prototype.onMouseDown = function (event) {
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || this.domHandler.hasClass(event.target, 'ui-column-resizer'))
            this.el.nativeElement.draggable = false;
        else
            this.el.nativeElement.draggable = true;
    };
    ReorderableColumn.prototype.onDragStart = function (event) {
        this.dt.onColumnDragStart(event, this.el.nativeElement);
    };
    ReorderableColumn.prototype.onDragOver = function (event) {
        event.preventDefault();
    };
    ReorderableColumn.prototype.onDragEnter = function (event) {
        this.dt.onColumnDragEnter(event, this.el.nativeElement);
    };
    ReorderableColumn.prototype.onDragLeave = function (event) {
        this.dt.onColumnDragLeave(event);
    };
    ReorderableColumn.prototype.onDrop = function (event) {
        if (this.isEnabled()) {
            this.dt.onColumnDrop(event, this.el.nativeElement);
        }
    };
    ReorderableColumn.prototype.isEnabled = function () {
        return this.pReorderableColumnDisabled !== true;
    };
    ReorderableColumn.prototype.ngOnDestroy = function () {
        this.unbindEvents();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ReorderableColumn.prototype, "pReorderableColumnDisabled", void 0);
    __decorate([
        core_1.HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ReorderableColumn.prototype, "onDrop", null);
    ReorderableColumn = __decorate([
        core_1.Directive({
            selector: '[pReorderableColumn]'
        }),
        __metadata("design:paramtypes", [Table, core_1.ElementRef, domhandler_1.DomHandler, core_1.NgZone])
    ], ReorderableColumn);
    return ReorderableColumn;
}());
exports.ReorderableColumn = ReorderableColumn;
var EditableColumn = /** @class */ (function () {
    function EditableColumn(dt, el, domHandler, zone) {
        this.dt = dt;
        this.el = el;
        this.domHandler = domHandler;
        this.zone = zone;
    }
    EditableColumn.prototype.ngAfterViewInit = function () {
        if (this.isEnabled()) {
            this.domHandler.addClass(this.el.nativeElement, 'ui-editable-column');
        }
    };
    EditableColumn.prototype.isValid = function () {
        return (this.dt.editingCell && this.domHandler.find(this.dt.editingCell, '.ng-invalid.ng-dirty').length === 0);
    };
    EditableColumn.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            if (this.dt.editingCell) {
                if (this.dt.editingCell !== this.el.nativeElement) {
                    if (!this.isValid()) {
                        return;
                    }
                    this.domHandler.removeClass(this.dt.editingCell, 'ui-editing-cell');
                    this.openCell();
                }
            }
            else {
                this.openCell();
            }
        }
    };
    EditableColumn.prototype.openCell = function () {
        var _this = this;
        this.dt.editingCell = this.el.nativeElement;
        this.domHandler.addClass(this.el.nativeElement, 'ui-editing-cell');
        this.dt.onEditInit.emit({ field: this.field, data: this.data });
        this.zone.runOutsideAngular(function () {
            setTimeout(function () {
                var focusable = _this.domHandler.findSingle(_this.el.nativeElement, 'input, textarea');
                if (focusable) {
                    focusable.focus();
                }
            }, 50);
        });
    };
    EditableColumn.prototype.closeEditingCell = function () {
        this.domHandler.removeClass(this.dt.editingCell, 'ui-editing-cell');
        this.dt.editingCell = null;
    };
    EditableColumn.prototype.onKeyDown = function (event) {
        if (this.isEnabled()) {
            //enter
            if (event.keyCode == 13) {
                if (this.isValid()) {
                    this.closeEditingCell();
                    this.dt.onEditComplete.emit({ field: this.field, data: this.data });
                }
                event.preventDefault();
            }
            else if (event.keyCode == 27) {
                if (this.isValid()) {
                    this.closeEditingCell();
                    this.dt.onEditCancel.emit({ field: this.field, data: this.data });
                }
                event.preventDefault();
            }
            else if (event.keyCode == 9) {
                this.dt.onEditComplete.emit({ field: this.field, data: this.data });
                if (event.shiftKey)
                    this.moveToPreviousCell(event);
                else
                    this.moveToNextCell(event);
            }
        }
    };
    EditableColumn.prototype.findCell = function (element) {
        if (element) {
            var cell = element;
            while (cell && !this.domHandler.hasClass(cell, 'ui-editing-cell')) {
                cell = cell.parentElement;
            }
            return cell;
        }
        else {
            return null;
        }
    };
    EditableColumn.prototype.moveToPreviousCell = function (event) {
        var currentCell = this.findCell(event.target);
        var row = currentCell.parentElement;
        var targetCell = this.findPreviousEditableColumn(currentCell);
        if (targetCell) {
            this.domHandler.invokeElementMethod(event.target, 'blur');
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    };
    EditableColumn.prototype.moveToNextCell = function (event) {
        var currentCell = this.findCell(event.target);
        var row = currentCell.parentElement;
        var targetCell = this.findNextEditableColumn(currentCell);
        if (targetCell) {
            this.domHandler.invokeElementMethod(event.target, 'blur');
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    };
    EditableColumn.prototype.findPreviousEditableColumn = function (cell) {
        var prevCell = cell.previousElementSibling;
        if (!prevCell) {
            var previousRow = cell.parentElement.previousElementSibling;
            if (previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }
        if (prevCell) {
            if (this.domHandler.hasClass(prevCell, 'ui-editable-column'))
                return prevCell;
            else
                return this.findPreviousEditableColumn(prevCell);
        }
        else {
            return null;
        }
    };
    EditableColumn.prototype.findNextEditableColumn = function (cell) {
        var nextCell = cell.nextElementSibling;
        if (!nextCell) {
            var nextRow = cell.parentElement.nextElementSibling;
            if (nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }
        if (nextCell) {
            if (this.domHandler.hasClass(nextCell, 'ui-editable-column'))
                return nextCell;
            else
                return this.findNextEditableColumn(nextCell);
        }
        else {
            return null;
        }
    };
    EditableColumn.prototype.isEnabled = function () {
        return this.pEditableColumnDisabled !== true;
    };
    __decorate([
        core_1.Input("pEditableColumn"),
        __metadata("design:type", Object)
    ], EditableColumn.prototype, "data", void 0);
    __decorate([
        core_1.Input("pEditableColumnField"),
        __metadata("design:type", Object)
    ], EditableColumn.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], EditableColumn.prototype, "pEditableColumnDisabled", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], EditableColumn.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], EditableColumn.prototype, "onKeyDown", null);
    EditableColumn = __decorate([
        core_1.Directive({
            selector: '[pEditableColumn]'
        }),
        __metadata("design:paramtypes", [Table, core_1.ElementRef, domhandler_1.DomHandler, core_1.NgZone])
    ], EditableColumn);
    return EditableColumn;
}());
exports.EditableColumn = EditableColumn;
var CellEditor = /** @class */ (function () {
    function CellEditor(dt, editableColumn) {
        this.dt = dt;
        this.editableColumn = editableColumn;
    }
    CellEditor.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'input':
                    _this.inputTemplate = item.template;
                    break;
                case 'output':
                    _this.outputTemplate = item.template;
                    break;
            }
        });
    };
    __decorate([
        core_1.ContentChildren(shared_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], CellEditor.prototype, "templates", void 0);
    CellEditor = __decorate([
        core_1.Component({
            selector: 'p-cellEditor',
            template: "\n        <ng-container *ngIf=\"dt.editingCell === editableColumn.el.nativeElement\">\n            <ng-container *ngTemplateOutlet=\"inputTemplate\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!dt.editingCell || dt.editingCell !== editableColumn.el.nativeElement\">\n            <ng-container *ngTemplateOutlet=\"outputTemplate\"></ng-container>\n        </ng-container>\n    "
        }),
        __metadata("design:paramtypes", [Table, EditableColumn])
    ], CellEditor);
    return CellEditor;
}());
exports.CellEditor = CellEditor;
var TableRadioButton = /** @class */ (function () {
    function TableRadioButton(dt, domHandler, tableService) {
        var _this = this;
        this.dt = dt;
        this.domHandler = domHandler;
        this.tableService = tableService;
        this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
            _this.checked = _this.dt.isSelected(_this.value);
        });
    }
    TableRadioButton.prototype.ngOnInit = function () {
        this.checked = this.dt.isSelected(this.value);
    };
    TableRadioButton.prototype.onClick = function (event) {
        if (!this.disabled) {
            this.dt.toggleRowWithRadio({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
        }
        this.domHandler.clearSelection();
    };
    TableRadioButton.prototype.onFocus = function () {
        this.domHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableRadioButton.prototype.onBlur = function () {
        this.domHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableRadioButton.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TableRadioButton.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TableRadioButton.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TableRadioButton.prototype, "index", void 0);
    __decorate([
        core_1.ViewChild('box'),
        __metadata("design:type", core_1.ElementRef)
    ], TableRadioButton.prototype, "boxViewChild", void 0);
    TableRadioButton = __decorate([
        core_1.Component({
            selector: 'p-tableRadioButton',
            template: "\n        <div class=\"ui-radiobutton ui-widget\" (click)=\"onClick($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"radio\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"disabled\">\n            </div>\n            <div #box [ngClass]=\"{'ui-radiobutton-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled':disabled}\">\n                <span class=\"ui-radiobutton-icon ui-clickable\" [ngClass]=\"{'pi pi-circle-on':checked}\"></span>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [Table, domhandler_1.DomHandler, TableService])
    ], TableRadioButton);
    return TableRadioButton;
}());
exports.TableRadioButton = TableRadioButton;
var TableCheckbox = /** @class */ (function () {
    function TableCheckbox(dt, domHandler, tableService) {
        var _this = this;
        this.dt = dt;
        this.domHandler = domHandler;
        this.tableService = tableService;
        this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
            _this.checked = _this.dt.isSelected(_this.value);
        });
    }
    TableCheckbox.prototype.ngOnInit = function () {
        this.checked = this.dt.isSelected(this.value);
    };
    TableCheckbox.prototype.onClick = function (event) {
        if (!this.disabled) {
            this.dt.toggleRowWithCheckbox({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
        }
        this.domHandler.clearSelection();
    };
    TableCheckbox.prototype.onFocus = function () {
        this.domHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableCheckbox.prototype.onBlur = function () {
        this.domHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableCheckbox.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TableCheckbox.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TableCheckbox.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TableCheckbox.prototype, "index", void 0);
    __decorate([
        core_1.ViewChild('box'),
        __metadata("design:type", core_1.ElementRef)
    ], TableCheckbox.prototype, "boxViewChild", void 0);
    TableCheckbox = __decorate([
        core_1.Component({
            selector: 'p-tableCheckbox',
            template: "\n        <div class=\"ui-chkbox ui-widget\" (click)=\"onClick($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"checkbox\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"disabled\">\n            </div>\n            <div #box [ngClass]=\"{'ui-chkbox-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled':disabled}\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [Table, domhandler_1.DomHandler, TableService])
    ], TableCheckbox);
    return TableCheckbox;
}());
exports.TableCheckbox = TableCheckbox;
var TableHeaderCheckbox = /** @class */ (function () {
    function TableHeaderCheckbox(dt, domHandler, tableService) {
        var _this = this;
        this.dt = dt;
        this.domHandler = domHandler;
        this.tableService = tableService;
        this.valueChangeSubscription = this.dt.tableService.valueSource$.subscribe(function () {
            _this.checked = _this.updateCheckedState();
        });
        this.selectionChangeSubscription = this.dt.tableService.selectionSource$.subscribe(function () {
            _this.checked = _this.updateCheckedState();
        });
    }
    TableHeaderCheckbox.prototype.ngOnInit = function () {
        this.checked = this.updateCheckedState();
    };
    TableHeaderCheckbox.prototype.onClick = function (event, checked) {
        if (!this.disabled) {
            if (this.dt.value && this.dt.value.length > 0) {
                this.dt.toggleRowsWithCheckbox(event, !checked);
            }
        }
        this.domHandler.clearSelection();
    };
    TableHeaderCheckbox.prototype.onFocus = function () {
        this.domHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableHeaderCheckbox.prototype.onBlur = function () {
        this.domHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableHeaderCheckbox.prototype.isDisabled = function () {
        return this.disabled || !this.dt.value || !this.dt.value.length;
    };
    TableHeaderCheckbox.prototype.ngOnDestroy = function () {
        if (this.selectionChangeSubscription) {
            this.selectionChangeSubscription.unsubscribe();
        }
        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
    };
    TableHeaderCheckbox.prototype.updateCheckedState = function () {
        var val = this.dt.filteredValue || this.dt.value;
        return (val && val.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.dt.selection.length === val.length);
    };
    __decorate([
        core_1.ViewChild('box'),
        __metadata("design:type", core_1.ElementRef)
    ], TableHeaderCheckbox.prototype, "boxViewChild", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TableHeaderCheckbox.prototype, "disabled", void 0);
    TableHeaderCheckbox = __decorate([
        core_1.Component({
            selector: 'p-tableHeaderCheckbox',
            template: "\n        <div class=\"ui-chkbox ui-widget\" (click)=\"onClick($event, cb.checked)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #cb type=\"checkbox\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"isDisabled()\">\n            </div>\n            <div #box [ngClass]=\"{'ui-chkbox-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled': isDisabled()}\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [Table, domhandler_1.DomHandler, TableService])
    ], TableHeaderCheckbox);
    return TableHeaderCheckbox;
}());
exports.TableHeaderCheckbox = TableHeaderCheckbox;
var ReorderableRowHandle = /** @class */ (function () {
    function ReorderableRowHandle(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
    }
    ReorderableRowHandle.prototype.ngAfterViewInit = function () {
        this.domHandler.addClass(this.el.nativeElement, 'ui-table-reorderablerow-handle');
    };
    __decorate([
        core_1.Input("pReorderableRowHandle"),
        __metadata("design:type", Number)
    ], ReorderableRowHandle.prototype, "index", void 0);
    ReorderableRowHandle = __decorate([
        core_1.Directive({
            selector: '[pReorderableRowHandle]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler])
    ], ReorderableRowHandle);
    return ReorderableRowHandle;
}());
exports.ReorderableRowHandle = ReorderableRowHandle;
var ReorderableRow = /** @class */ (function () {
    function ReorderableRow(dt, el, domHandler, zone) {
        this.dt = dt;
        this.el = el;
        this.domHandler = domHandler;
        this.zone = zone;
    }
    ReorderableRow.prototype.ngAfterViewInit = function () {
        if (this.isEnabled()) {
            this.el.nativeElement.droppable = true;
            this.bindEvents();
        }
    };
    ReorderableRow.prototype.bindEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.mouseDownListener = _this.onMouseDown.bind(_this);
            _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
            _this.dragStartListener = _this.onDragStart.bind(_this);
            _this.el.nativeElement.addEventListener('dragstart', _this.dragStartListener);
            _this.dragEndListener = _this.onDragEnd.bind(_this);
            _this.el.nativeElement.addEventListener('dragend', _this.dragEndListener);
            _this.dragOverListener = _this.onDragOver.bind(_this);
            _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
            _this.dragLeaveListener = _this.onDragLeave.bind(_this);
            _this.el.nativeElement.addEventListener('dragleave', _this.dragLeaveListener);
        });
    };
    ReorderableRow.prototype.unbindEvents = function () {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }
        if (this.dragStartListener) {
            document.removeEventListener('dragstart', this.dragStartListener);
            this.dragStartListener = null;
        }
        if (this.dragEndListener) {
            document.removeEventListener('dragend', this.dragEndListener);
            this.dragEndListener = null;
        }
        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }
        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    };
    ReorderableRow.prototype.onMouseDown = function (event) {
        if (this.domHandler.hasClass(event.target, 'ui-table-reorderablerow-handle'))
            this.el.nativeElement.draggable = true;
        else
            this.el.nativeElement.draggable = false;
    };
    ReorderableRow.prototype.onDragStart = function (event) {
        this.dt.onRowDragStart(event, this.index);
    };
    ReorderableRow.prototype.onDragEnd = function (event) {
        this.dt.onRowDragEnd(event);
        this.el.nativeElement.draggable = false;
    };
    ReorderableRow.prototype.onDragOver = function (event) {
        this.dt.onRowDragOver(event, this.index, this.el.nativeElement);
        event.preventDefault();
    };
    ReorderableRow.prototype.onDragLeave = function (event) {
        this.dt.onRowDragLeave(event, this.el.nativeElement);
    };
    ReorderableRow.prototype.isEnabled = function () {
        return this.pReorderableRowDisabled !== true;
    };
    ReorderableRow.prototype.onDrop = function (event) {
        if (this.isEnabled() && this.dt.rowDragging) {
            this.dt.onRowDrop(event, this.el.nativeElement);
        }
        event.preventDefault();
    };
    __decorate([
        core_1.Input("pReorderableRow"),
        __metadata("design:type", Number)
    ], ReorderableRow.prototype, "index", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ReorderableRow.prototype, "pReorderableRowDisabled", void 0);
    __decorate([
        core_1.HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ReorderableRow.prototype, "onDrop", null);
    ReorderableRow = __decorate([
        core_1.Directive({
            selector: '[pReorderableRow]'
        }),
        __metadata("design:paramtypes", [Table, core_1.ElementRef, domhandler_1.DomHandler, core_1.NgZone])
    ], ReorderableRow);
    return ReorderableRow;
}());
exports.ReorderableRow = ReorderableRow;
var TableModule = /** @class */ (function () {
    function TableModule() {
    }
    TableModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, paginator_1.PaginatorModule],
            exports: [Table, shared_1.SharedModule, SortableColumn, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick],
            declarations: [Table, SortableColumn, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, TableBody, ScrollableView, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick]
        })
    ], TableModule);
    return TableModule;
}());
exports.TableModule = TableModule;
//# sourceMappingURL=table.js.map

/***/ }),

/***/ 1413:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var animations_1 = __webpack_require__(65);
var common_1 = __webpack_require__(16);
var shared_1 = __webpack_require__(1406);
var domhandler_1 = __webpack_require__(809);
var objectutils_1 = __webpack_require__(1407);
var forms_1 = __webpack_require__(34);
exports.DROPDOWN_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Dropdown; }),
    multi: true
};
var Dropdown = /** @class */ (function () {
    function Dropdown(el, domHandler, renderer, cd, objectUtils, zone) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.cd = cd;
        this.objectUtils = objectUtils;
        this.zone = zone;
        this.scrollHeight = '200px';
        this.autoWidth = true;
        this.filterBy = 'label';
        this.resetFilterOnHide = false;
        this.dropdownIcon = 'pi pi-caret-down';
        this.autoDisplayFirst = true;
        this.emptyFilterMessage = 'No results found';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onChange = new core_1.EventEmitter();
        this.onFocus = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onClick = new core_1.EventEmitter();
        this.onShow = new core_1.EventEmitter();
        this.onHide = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Dropdown.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                case 'selectedItem':
                    _this.selectedItemTemplate = item.template;
                    break;
                case 'group':
                    _this.groupTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    Dropdown.prototype.ngOnInit = function () {
        this.optionsToDisplay = this.options;
        this.updateSelectedOption(null);
    };
    Object.defineProperty(Dropdown.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (val) {
            var opts = this.optionLabel ? this.objectUtils.generateSelectItems(val, this.optionLabel) : val;
            this._options = opts;
            this.optionsToDisplay = this._options;
            this.updateSelectedOption(this.value);
            this.optionsChanged = true;
            if (this.filterValue && this.filterValue.length) {
                this.activateFilter();
            }
        },
        enumerable: true,
        configurable: true
    });
    Dropdown.prototype.ngAfterViewInit = function () {
        if (this.editable) {
            this.updateEditableLabel();
        }
        this.updateDimensions();
    };
    Object.defineProperty(Dropdown.prototype, "label", {
        get: function () {
            return (this.selectedOption ? this.selectedOption.label : null);
        },
        enumerable: true,
        configurable: true
    });
    Dropdown.prototype.updateEditableLabel = function () {
        if (this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
            this.editableInputViewChild.nativeElement.value = (this.selectedOption ? this.selectedOption.label : this.value || '');
        }
    };
    Dropdown.prototype.onItemClick = function (event, option) {
        var _this = this;
        this.itemClick = true;
        if (!option.disabled) {
            this.selectItem(event, option);
            this.focusViewChild.nativeElement.focus();
            this.filled = true;
        }
        setTimeout(function () {
            _this.hide();
        }, 150);
    };
    Dropdown.prototype.selectItem = function (event, option) {
        if (this.selectedOption != option) {
            this.selectedOption = option;
            this.value = option.value;
            this.onModelChange(this.value);
            this.updateEditableLabel();
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Dropdown.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.autoWidth && !this.dimensionsUpdated) {
            this.updateDimensions();
        }
        if (this.optionsChanged && this.overlayVisible) {
            this.optionsChanged = false;
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.updateDimensions();
                    _this.alignOverlay();
                }, 1);
            });
        }
        if (this.selectedOptionUpdated && this.itemsWrapper) {
            this.updateDimensions();
            var selectedItem = this.domHandler.findSingle(this.overlay, 'li.ui-state-highlight');
            if (selectedItem) {
                this.domHandler.scrollInView(this.itemsWrapper, this.domHandler.findSingle(this.overlay, 'li.ui-state-highlight'));
            }
            this.selectedOptionUpdated = false;
        }
    };
    Dropdown.prototype.writeValue = function (value) {
        if (this.filter) {
            this.resetFilter();
        }
        this.value = value;
        this.updateSelectedOption(value);
        this.updateEditableLabel();
        this.updateFilledState();
        this.cd.markForCheck();
    };
    Dropdown.prototype.resetFilter = function () {
        if (this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterValue = null;
            this.filterViewChild.nativeElement.value = '';
        }
        this.optionsToDisplay = this.options;
    };
    Dropdown.prototype.updateSelectedOption = function (val) {
        this.selectedOption = this.findOption(val, this.optionsToDisplay);
        if (this.autoDisplayFirst && !this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
            this.selectedOption = this.optionsToDisplay[0];
        }
        this.selectedOptionUpdated = true;
    };
    Dropdown.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Dropdown.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Dropdown.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Dropdown.prototype.updateDimensions = function () {
        if (this.autoWidth && this.el.nativeElement && this.el.nativeElement.children[0] && this.el.nativeElement.offsetParent) {
            var select = this.domHandler.findSingle(this.el.nativeElement, 'select');
            if (select && !this.style || (this.style && (!this.style['width'] && !this.style['min-width']))) {
                this.el.nativeElement.children[0].style.width = select.offsetWidth + 30 + 'px';
            }
            this.dimensionsUpdated = true;
        }
    };
    Dropdown.prototype.onMouseclick = function (event) {
        var _this = this;
        if (this.disabled || this.readonly) {
            return;
        }
        this.onClick.emit(event);
        this.selfClick = true;
        this.clearClick = this.domHandler.hasClass(event.target, 'ui-dropdown-clear-icon');
        if (!this.itemClick && !this.clearClick) {
            this.focusViewChild.nativeElement.focus();
            if (this.overlayVisible) {
                this.hide();
            }
            else {
                this.show();
                setTimeout(function () {
                    if (_this.filterViewChild != undefined) {
                        _this.filterViewChild.nativeElement.focus();
                    }
                }, 200);
            }
        }
    };
    Dropdown.prototype.onEditableInputClick = function (event) {
        this.itemClick = true;
        this.bindDocumentClickListener();
    };
    Dropdown.prototype.onEditableInputFocus = function (event) {
        this.focused = true;
        this.hide();
        this.onFocus.emit(event);
    };
    Dropdown.prototype.onEditableInputChange = function (event) {
        this.value = event.target.value;
        this.updateSelectedOption(this.value);
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    Dropdown.prototype.show = function () {
        this.overlayVisible = true;
    };
    Dropdown.prototype.onOverlayAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.itemsWrapper = this.domHandler.findSingle(this.overlay, '.ui-dropdown-items-wrapper');
                this.appendOverlay();
                if (this.autoZIndex) {
                    this.overlay.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
                }
                this.alignOverlay();
                this.bindDocumentClickListener();
                if (this.options && this.options.length) {
                    var selectedListItem = this.domHandler.findSingle(this.itemsWrapper, '.ui-dropdown-item.ui-state-highlight');
                    if (selectedListItem) {
                        this.domHandler.scrollInView(this.itemsWrapper, selectedListItem);
                    }
                }
                this.onShow.emit(event);
                break;
            case 'void':
                this.onHide.emit(event);
                this.onOverlayHide();
                break;
        }
    };
    Dropdown.prototype.appendOverlay = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                this.domHandler.appendChild(this.overlay, this.appendTo);
            this.overlay.style.minWidth = this.domHandler.getWidth(this.containerViewChild.nativeElement) + 'px';
        }
    };
    Dropdown.prototype.restoreOverlayAppend = function () {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    };
    Dropdown.prototype.hide = function () {
        this.overlayVisible = false;
        if (this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }
        this.cd.markForCheck();
    };
    Dropdown.prototype.alignOverlay = function () {
        if (this.overlay) {
            if (this.appendTo)
                this.domHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
            else
                this.domHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
        }
    };
    Dropdown.prototype.onInputFocus = function (event) {
        this.focused = true;
        this.onFocus.emit(event);
    };
    Dropdown.prototype.onInputBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    Dropdown.prototype.findPrevEnabledOption = function (index) {
        var prevEnabledOption;
        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (var i = (index - 1); 0 <= i; i--) {
                var option = this.optionsToDisplay[i];
                if (option.disabled) {
                    continue;
                }
                else {
                    prevEnabledOption = option;
                    break;
                }
            }
            if (!prevEnabledOption) {
                for (var i = this.optionsToDisplay.length - 1; i >= index; i--) {
                    var option = this.optionsToDisplay[i];
                    if (option.disabled) {
                        continue;
                    }
                    else {
                        prevEnabledOption = option;
                        break;
                    }
                }
            }
        }
        return prevEnabledOption;
    };
    Dropdown.prototype.findNextEnabledOption = function (index) {
        var nextEnabledOption;
        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (var i = (index + 1); index < (this.optionsToDisplay.length - 1); i++) {
                var option = this.optionsToDisplay[i];
                if (option.disabled) {
                    continue;
                }
                else {
                    nextEnabledOption = option;
                    break;
                }
            }
            if (!nextEnabledOption) {
                for (var i = 0; i < index; i++) {
                    var option = this.optionsToDisplay[i];
                    if (option.disabled) {
                        continue;
                    }
                    else {
                        nextEnabledOption = option;
                        break;
                    }
                }
            }
        }
        return nextEnabledOption;
    };
    Dropdown.prototype.onKeydown = function (event, search) {
        if (this.readonly || !this.optionsToDisplay || this.optionsToDisplay.length === null) {
            return;
        }
        switch (event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                }
                else {
                    if (this.group) {
                        var selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                        if (selectedItemIndex !== -1) {
                            var nextItemIndex = selectedItemIndex.itemIndex + 1;
                            if (nextItemIndex < (this.optionsToDisplay[selectedItemIndex.groupIndex].items.length)) {
                                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[nextItemIndex]);
                                this.selectedOptionUpdated = true;
                            }
                            else if (this.optionsToDisplay[selectedItemIndex.groupIndex + 1]) {
                                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex + 1].items[0]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                        else {
                            this.selectItem(event, this.optionsToDisplay[0].items[0]);
                        }
                    }
                    else {
                        var selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                        var nextEnabledOption = this.findNextEnabledOption(selectedItemIndex);
                        if (nextEnabledOption) {
                            this.selectItem(event, nextEnabledOption);
                            this.selectedOptionUpdated = true;
                        }
                    }
                }
                event.preventDefault();
                break;
            //up
            case 38:
                if (this.group) {
                    var selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                    if (selectedItemIndex !== -1) {
                        var prevItemIndex = selectedItemIndex.itemIndex - 1;
                        if (prevItemIndex >= 0) {
                            this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[prevItemIndex]);
                            this.selectedOptionUpdated = true;
                        }
                        else if (prevItemIndex < 0) {
                            var prevGroup = this.optionsToDisplay[selectedItemIndex.groupIndex - 1];
                            if (prevGroup) {
                                this.selectItem(event, prevGroup.items[prevGroup.items.length - 1]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                    }
                }
                else {
                    var selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                    var prevEnabledOption = this.findPrevEnabledOption(selectedItemIndex);
                    if (prevEnabledOption) {
                        this.selectItem(event, prevEnabledOption);
                        this.selectedOptionUpdated = true;
                    }
                }
                event.preventDefault();
                break;
            //space
            case 32:
            case 32:
                if (!this.overlayVisible) {
                    this.show();
                    event.preventDefault();
                }
                break;
            //enter
            case 13:
                if (!this.filter || (this.optionsToDisplay && this.optionsToDisplay.length > 0)) {
                    this.hide();
                }
                event.preventDefault();
                break;
            //escape and tab
            case 27:
            case 9:
                this.hide();
                break;
            //search item based on keyboard input
            default:
                if (search) {
                    this.search(event);
                }
                break;
        }
    };
    Dropdown.prototype.search = function (event) {
        var _this = this;
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        var char = String.fromCharCode(event.keyCode);
        this.previousSearchChar = this.currentSearchChar;
        this.currentSearchChar = char;
        if (this.previousSearchChar === this.currentSearchChar)
            this.searchValue = this.currentSearchChar;
        else
            this.searchValue = this.searchValue ? this.searchValue + char : char;
        var newOption;
        if (this.group) {
            var searchIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : { groupIndex: 0, itemIndex: 0 };
            newOption = this.searchOptionWithinGroup(searchIndex);
        }
        else {
            var searchIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
            newOption = this.searchOption(++searchIndex);
        }
        if (newOption) {
            this.selectItem(event, newOption);
            this.selectedOptionUpdated = true;
        }
        this.searchTimeout = setTimeout(function () {
            _this.searchValue = null;
        }, 250);
    };
    Dropdown.prototype.searchOption = function (index) {
        var option;
        if (this.searchValue) {
            option = this.searchOptionInRange(index, this.optionsToDisplay.length);
            if (!option) {
                option = this.searchOptionInRange(0, index);
            }
        }
        return option;
    };
    Dropdown.prototype.searchOptionInRange = function (start, end) {
        for (var i = start; i < end; i++) {
            var opt = this.optionsToDisplay[i];
            if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                return opt;
            }
        }
        return null;
    };
    Dropdown.prototype.searchOptionWithinGroup = function (index) {
        var option;
        if (this.searchValue) {
            for (var i = index.groupIndex; i < this.optionsToDisplay.length; i++) {
                for (var j = (index.groupIndex === i) ? (index.itemIndex + 1) : 0; j < this.optionsToDisplay[i].items.length; j++) {
                    var opt = this.optionsToDisplay[i].items[j];
                    if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                        return opt;
                    }
                }
            }
            if (!option) {
                for (var i = 0; i <= index.groupIndex; i++) {
                    for (var j = 0; j < ((index.groupIndex === i) ? index.itemIndex : this.optionsToDisplay[i].items.length); j++) {
                        var opt = this.optionsToDisplay[i].items[j];
                        if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                            return opt;
                        }
                    }
                }
            }
        }
        return null;
    };
    Dropdown.prototype.findOptionIndex = function (val, opts) {
        var index = -1;
        if (opts) {
            for (var i = 0; i < opts.length; i++) {
                if ((val == null && opts[i].value == null) || this.objectUtils.equals(val, opts[i].value, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    Dropdown.prototype.findOptionGroupIndex = function (val, opts) {
        var groupIndex, itemIndex;
        if (opts) {
            for (var i = 0; i < opts.length; i++) {
                groupIndex = i;
                itemIndex = this.findOptionIndex(val, opts[i].items);
                if (itemIndex !== -1) {
                    break;
                }
            }
        }
        if (itemIndex !== -1) {
            return { groupIndex: groupIndex, itemIndex: itemIndex };
        }
        else {
            return -1;
        }
    };
    Dropdown.prototype.findOption = function (val, opts, inGroup) {
        if (this.group && !inGroup) {
            var opt = void 0;
            if (opts && opts.length) {
                for (var _i = 0, opts_1 = opts; _i < opts_1.length; _i++) {
                    var optgroup = opts_1[_i];
                    opt = this.findOption(val, optgroup.items, true);
                    if (opt) {
                        break;
                    }
                }
            }
            return opt;
        }
        else {
            var index = this.findOptionIndex(val, opts);
            return (index != -1) ? opts[index] : null;
        }
    };
    Dropdown.prototype.onFilter = function (event) {
        var inputValue = event.target.value.toLowerCase();
        if (inputValue && inputValue.length) {
            this.filterValue = inputValue;
            this.activateFilter();
        }
        else {
            this.filterValue = null;
            this.optionsToDisplay = this.options;
        }
        this.optionsChanged = true;
    };
    Dropdown.prototype.activateFilter = function () {
        var searchFields = this.filterBy.split(',');
        if (this.options && this.options.length) {
            if (this.group) {
                var filteredGroups = [];
                for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                    var optgroup = _a[_i];
                    var filteredSubOptions = this.objectUtils.filter(optgroup.items, searchFields, this.filterValue);
                    if (filteredSubOptions && filteredSubOptions.length) {
                        filteredGroups.push({
                            label: optgroup.label,
                            value: optgroup.value,
                            items: filteredSubOptions
                        });
                    }
                }
                this.optionsToDisplay = filteredGroups;
            }
            else {
                this.optionsToDisplay = this.objectUtils.filter(this.options, searchFields, this.filterValue);
            }
            this.optionsChanged = true;
        }
    };
    Dropdown.prototype.applyFocus = function () {
        if (this.editable)
            this.domHandler.findSingle(this.el.nativeElement, '.ui-dropdown-label.ui-inputtext').focus();
        else
            this.domHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
    };
    Dropdown.prototype.focus = function () {
        this.applyFocus();
    };
    Dropdown.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.selfClick && !_this.itemClick) {
                    _this.hide();
                    _this.unbindDocumentClickListener();
                }
                _this.clearClickState();
                _this.cd.markForCheck();
            });
        }
    };
    Dropdown.prototype.clearClickState = function () {
        this.selfClick = false;
        this.itemClick = false;
    };
    Dropdown.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    Dropdown.prototype.updateFilledState = function () {
        this.filled = (this.selectedOption != null);
    };
    Dropdown.prototype.clear = function (event) {
        this.clearClick = true;
        this.value = null;
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
        this.updateSelectedOption(this.value);
        this.updateEditableLabel();
        this.updateFilledState();
    };
    Dropdown.prototype.onOverlayHide = function () {
        this.unbindDocumentClickListener();
        this.overlay = null;
        this.itemsWrapper = null;
    };
    Dropdown.prototype.ngOnDestroy = function () {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "filter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Dropdown.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Dropdown.prototype, "panelStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "panelStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "autoWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "editable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Dropdown.prototype, "appendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Dropdown.prototype, "tabindex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "filterPlaceholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "inputId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "selectId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "dataKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "filterBy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "autofocus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "resetFilterOnHide", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "dropdownIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "optionLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "autoDisplayFirst", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "group", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "showClear", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "emptyFilterMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "autoZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Dropdown.prototype, "baseZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "showTransitionOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "hideTransitionOptions", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Dropdown.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Dropdown.prototype, "onFocus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Dropdown.prototype, "onBlur", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Dropdown.prototype, "onClick", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Dropdown.prototype, "onShow", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Dropdown.prototype, "onHide", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], Dropdown.prototype, "containerViewChild", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], Dropdown.prototype, "filterViewChild", void 0);
    __decorate([
        core_1.ViewChild('in'),
        __metadata("design:type", core_1.ElementRef)
    ], Dropdown.prototype, "focusViewChild", void 0);
    __decorate([
        core_1.ViewChild('editableInput'),
        __metadata("design:type", core_1.ElementRef)
    ], Dropdown.prototype, "editableInputViewChild", void 0);
    __decorate([
        core_1.ContentChildren(shared_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], Dropdown.prototype, "templates", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], Dropdown.prototype, "options", null);
    Dropdown = __decorate([
        core_1.Component({
            selector: 'p-dropdown',
            template: "\n         <div #container [ngClass]=\"{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,\n            'ui-state-disabled':disabled, 'ui-dropdown-open':overlayVisible, 'ui-state-focus':focused, 'ui-dropdown-clearable': showClear && !disabled}\"\n            (click)=\"onMouseclick($event)\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\" *ngIf=\"autoWidth\">\n                <select [attr.id]=\"selectId\" [required]=\"required\" [attr.name]=\"name\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" tabindex=\"-1\" aria-hidden=\"true\">\n                    <option *ngIf=\"placeholder\">{{placeholder}}</option>\n                    <ng-container *ngIf=\"group\">\n                        <optgroup *ngFor=\"let option of options\" [attr.label]=\"option.label\">\n                            <option *ngFor=\"let option of option.items\" [value]=\"option.value\" [selected]=\"selectedOption == option\">{{option.label}}</option>\n                        <optgroup>\n                    </ng-container>\n                    <ng-container *ngIf=\"!group\">\n                        <option *ngFor=\"let option of options\" [value]=\"option.value\" [selected]=\"selectedOption == option\">{{option.label}}</option>\n                    </ng-container>\n                </select>\n            </div>\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in [attr.id]=\"inputId\" type=\"text\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" readonly (focus)=\"onInputFocus($event)\" role=\"listbox\"\n                    (blur)=\"onInputBlur($event)\" (keydown)=\"onKeydown($event, true)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\" [attr.autofocus]=\"autofocus\">\n            </div>\n            <label [ngClass]=\"{'ui-dropdown-label ui-inputtext ui-corner-all':true,'ui-dropdown-label-empty':(label == null || label.length === 0)}\" *ngIf=\"!editable && (label != null)\">\n                <ng-container *ngIf=\"!selectedItemTemplate\">{{label||'empty'}}</ng-container>\n                <ng-container *ngTemplateOutlet=\"selectedItemTemplate; context: {$implicit: selectedOption}\"></ng-container>\n            </label>\n            <label [ngClass]=\"{'ui-dropdown-label ui-inputtext ui-corner-all ui-placeholder':true,'ui-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}\" *ngIf=\"!editable && (label == null)\">{{placeholder||'empty'}}</label>\n            <input #editableInput type=\"text\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" class=\"ui-dropdown-label ui-inputtext ui-corner-all\" *ngIf=\"editable\" [disabled]=\"disabled\" [attr.placeholder]=\"placeholder\"\n                        (click)=\"onEditableInputClick($event)\" (input)=\"onEditableInputChange($event)\" (focus)=\"onEditableInputFocus($event)\" (blur)=\"onInputBlur($event)\">\n            <i class=\"ui-dropdown-clear-icon pi pi-times\" (click)=\"clear($event)\" *ngIf=\"value != null && showClear && !disabled\"></i>\n            <div class=\"ui-dropdown-trigger ui-state-default ui-corner-right\">\n                <span class=\"ui-dropdown-trigger-icon ui-clickable\" [ngClass]=\"dropdownIcon\"></span>\n            </div>\n            <div *ngIf=\"overlayVisible\" [ngClass]=\"'ui-dropdown-panel  ui-widget ui-widget-content ui-corner-all ui-shadow'\" [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" [ngStyle]=\"panelStyle\" [class]=\"panelStyleClass\">\n                <div *ngIf=\"filter\" class=\"ui-dropdown-filter-container\" (input)=\"onFilter($event)\" (click)=\"$event.stopPropagation()\">\n                    <input #filter type=\"text\" autocomplete=\"off\" [value]=\"filterValue||''\" class=\"ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all\" [attr.placeholder]=\"filterPlaceholder\"\n                    (keydown.enter)=\"$event.preventDefault()\" (keydown)=\"onKeydown($event, false)\">\n                    <span class=\"ui-dropdown-filter-icon pi pi-search\"></span>\n                </div>\n                <div class=\"ui-dropdown-items-wrapper\" [style.max-height]=\"scrollHeight||'auto'\">\n                    <ul class=\"ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\">\n                        <ng-container *ngIf=\"group\">\n                            <ng-template ngFor let-optgroup [ngForOf]=\"optionsToDisplay\">\n                                <li class=\"ui-dropdown-item-group\">\n                                    <span *ngIf=\"!groupTemplate\">{{optgroup.label||'empty'}}</span>\n                                    <ng-container *ngTemplateOutlet=\"groupTemplate; context: {$implicit: optgroup}\"></ng-container>\n                                </li>\n                                <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: optgroup.items, selectedOption: selectedOption}\"></ng-container>\n                            </ng-template>\n                        </ng-container>\n                        <ng-container *ngIf=\"!group\">\n                            <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: optionsToDisplay, selectedOption: selectedOption}\"></ng-container>\n                        </ng-container>\n                        <ng-template #itemslist let-options let-selectedOption=\"selectedOption\">\n                            <li *ngFor=\"let option of options;let i=index\"  (click)=\"onItemClick($event, option)\"\n                                    [ngClass]=\"{'ui-dropdown-item ui-corner-all':true,\n                                                'ui-state-highlight':(selectedOption == option),\n                                                'ui-state-disabled':(option.disabled),\n                                                'ui-dropdown-item-empty':!option.label||option.label.length === 0}\">\n                                <span *ngIf=\"!itemTemplate\">{{option.label||'empty'}}</span>\n                                <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option}\"></ng-container>\n                            </li>\n                        </ng-template>\n                        <li *ngIf=\"filter && optionsToDisplay && optionsToDisplay.length === 0\">{{emptyFilterMessage}}</li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    ",
            animations: [
                animations_1.trigger('overlayAnimation', [
                    animations_1.state('void', animations_1.style({
                        transform: 'translateY(5%)',
                        opacity: 0
                    })),
                    animations_1.state('visible', animations_1.style({
                        transform: 'translateY(0)',
                        opacity: 1
                    })),
                    animations_1.transition('void => visible', animations_1.animate('{{showTransitionParams}}')),
                    animations_1.transition('visible => void', animations_1.animate('{{hideTransitionParams}}'))
                ])
            ],
            host: {
                '[class.ui-inputwrapper-filled]': 'filled',
                '[class.ui-inputwrapper-focus]': 'focused'
            },
            providers: [domhandler_1.DomHandler, objectutils_1.ObjectUtils, exports.DROPDOWN_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer2, core_1.ChangeDetectorRef,
            objectutils_1.ObjectUtils, core_1.NgZone])
    ], Dropdown);
    return Dropdown;
}());
exports.Dropdown = Dropdown;
var DropdownModule = /** @class */ (function () {
    function DropdownModule() {
    }
    DropdownModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, shared_1.SharedModule],
            exports: [Dropdown, shared_1.SharedModule],
            declarations: [Dropdown]
        })
    ], DropdownModule);
    return DropdownModule;
}());
exports.DropdownModule = DropdownModule;
//# sourceMappingURL=dropdown.js.map

/***/ }),

/***/ 1414:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Shorthand */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1408));

/***/ }),

/***/ 1415:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Shorthand */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1416));

/***/ }),

/***/ 1416:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(16);
var objectutils_1 = __webpack_require__(1407);
var forms_1 = __webpack_require__(34);
exports.SELECTBUTTON_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return SelectButton; }),
    multi: true
};
var SelectButton = /** @class */ (function () {
    function SelectButton(objectUtils, cd) {
        this.objectUtils = objectUtils;
        this.cd = cd;
        this.onOptionClick = new core_1.EventEmitter();
        this.onChange = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Object.defineProperty(SelectButton.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (val) {
            var opts = this.optionLabel || this.itemTemplate ? this.objectUtils.generateSelectItems(val, this.optionLabel) : val;
            this._options = opts;
        },
        enumerable: true,
        configurable: true
    });
    SelectButton.prototype.writeValue = function (value) {
        this.value = value;
        this.cd.markForCheck();
    };
    SelectButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    SelectButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    SelectButton.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    SelectButton.prototype.onItemClick = function (event, option, checkbox, index) {
        if (this.disabled || option.disabled) {
            return;
        }
        checkbox.focus();
        if (this.multiple) {
            var itemIndex_1 = this.findItemIndex(option);
            if (itemIndex_1 != -1)
                this.value = this.value.filter(function (val, i) { return i != itemIndex_1; });
            else
                this.value = (this.value || []).concat([option.value]);
        }
        else {
            this.value = option.value;
        }
        this.onOptionClick.emit({
            originalEvent: event,
            option: option,
            index: index
        });
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    SelectButton.prototype.onFocus = function (event) {
        this.focusedItem = event.target;
    };
    SelectButton.prototype.onBlur = function (event) {
        this.focusedItem = null;
        this.onModelTouched();
    };
    SelectButton.prototype.isSelected = function (option) {
        if (this.multiple)
            return this.findItemIndex(option) != -1;
        else
            return this.objectUtils.equals(option.value, this.value, this.dataKey);
    };
    SelectButton.prototype.findItemIndex = function (option) {
        var index = -1;
        if (this.value) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.value[i] == option.value) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SelectButton.prototype, "tabindex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SelectButton.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SelectButton.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SelectButton.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SelectButton.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SelectButton.prototype, "dataKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SelectButton.prototype, "optionLabel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SelectButton.prototype, "onOptionClick", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SelectButton.prototype, "onChange", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", Object)
    ], SelectButton.prototype, "itemTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], SelectButton.prototype, "options", null);
    SelectButton = __decorate([
        core_1.Component({
            selector: 'p-selectButton',
            template: "\n        <div [ngClass]=\"'ui-selectbutton ui-buttonset ui-widget ui-corner-all ui-buttonset-' + (options ? options.length : 0)\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div *ngFor=\"let option of options; let i = index\" class=\"ui-button ui-widget ui-state-default ui-button-text-only {{option.styleClass}}\"\n                [ngClass]=\"{'ui-state-active':isSelected(option), 'ui-state-disabled': disabled || option.disabled, 'ui-state-focus': cbox == focusedItem, \n                'ui-button-text-icon-left': (option.icon != null), 'ui-button-icon-only': (option.icon && !option.label)}\" (click)=\"onItemClick($event,option,cbox,i)\" [attr.title]=\"option.title\">\n                <ng-container *ngIf=\"!itemTemplate else customcontent\">\n                    <span [ngClass]=\"['ui-clickable', 'ui-button-icon-left']\" [class]=\"option.icon\" *ngIf=\"option.icon\"></span>\n                    <span class=\"ui-button-text ui-clickable\">{{option.label||'ui-btn'}}</span>\n                </ng-container>\n                <ng-template #customcontent>\n                    <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option.value, index: i}\"></ng-container>\n                </ng-template>\n                <div class=\"ui-helper-hidden-accessible\">\n                    <input #cbox type=\"checkbox\" [checked]=\"isSelected(option)\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" [attr.tabindex]=\"tabindex\" [attr.disabled]=\"disabled || option.disabled\">\n                </div>\n            </div>\n        </div>\n    ",
            providers: [objectutils_1.ObjectUtils, exports.SELECTBUTTON_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [objectutils_1.ObjectUtils, core_1.ChangeDetectorRef])
    ], SelectButton);
    return SelectButton;
}());
exports.SelectButton = SelectButton;
var SelectButtonModule = /** @class */ (function () {
    function SelectButtonModule() {
    }
    SelectButtonModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [SelectButton],
            declarations: [SelectButton]
        })
    ], SelectButtonModule);
    return SelectButtonModule;
}());
exports.SelectButtonModule = SelectButtonModule;
//# sourceMappingURL=selectbutton.js.map

/***/ }),

/***/ 1417:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Shorthand */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1409));

/***/ }),

/***/ 1418:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Shorthand */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1419));

/***/ }),

/***/ 1419:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var animations_1 = __webpack_require__(65);
var common_1 = __webpack_require__(16);
var domhandler_1 = __webpack_require__(809);
var objectutils_1 = __webpack_require__(1407);
var shared_1 = __webpack_require__(1406);
var forms_1 = __webpack_require__(34);
exports.MULTISELECT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MultiSelect; }),
    multi: true
};
var MultiSelect = /** @class */ (function () {
    function MultiSelect(el, domHandler, renderer, objectUtils, cd) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.objectUtils = objectUtils;
        this.cd = cd;
        this.scrollHeight = '200px';
        this._defaultLabel = 'Choose';
        this.filter = true;
        this.displaySelectedLabel = true;
        this.maxSelectedLabels = 3;
        this.selectedItemsLabel = '{0} items selected';
        this.showToggleAll = true;
        this.resetFilterOnHide = false;
        this.dropdownIcon = 'pi pi-caret-down';
        this.showHeader = true;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onChange = new core_1.EventEmitter();
        this.onFocus = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onPanelShow = new core_1.EventEmitter();
        this.onPanelHide = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Object.defineProperty(MultiSelect.prototype, "defaultLabel", {
        get: function () {
            return this._defaultLabel;
        },
        set: function (val) {
            this._defaultLabel = val;
            this.updateLabel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelect.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (val) {
            var opts = this.optionLabel ? this.objectUtils.generateSelectItems(val, this.optionLabel) : val;
            this._options = opts;
            this.updateLabel();
        },
        enumerable: true,
        configurable: true
    });
    MultiSelect.prototype.ngOnInit = function () {
        this.updateLabel();
    };
    MultiSelect.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                case 'selectedItems':
                    _this.selectedItemsTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    MultiSelect.prototype.ngAfterViewInit = function () {
        if (this.overlayVisible) {
            this.show();
        }
    };
    MultiSelect.prototype.ngAfterViewChecked = function () {
        if (this.filtered) {
            this.alignOverlay();
            this.filtered = false;
        }
    };
    MultiSelect.prototype.writeValue = function (value) {
        this.value = value;
        this.updateLabel();
        this.updateFilledState();
        this.cd.markForCheck();
    };
    MultiSelect.prototype.updateFilledState = function () {
        this.filled = (this.valuesAsString != null && this.valuesAsString.length > 0);
    };
    MultiSelect.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    MultiSelect.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    MultiSelect.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    MultiSelect.prototype.onItemClick = function (event, option) {
        if (option.disabled) {
            return;
        }
        var value = option.value;
        var selectionIndex = this.findSelectionIndex(value);
        if (selectionIndex != -1) {
            this.value = this.value.filter(function (val, i) { return i != selectionIndex; });
            if (this.selectionLimit) {
                this.maxSelectionLimitReached = false;
            }
        }
        else {
            if (!this.selectionLimit || (this.value.length < this.selectionLimit)) {
                this.value = (this.value || []).concat([value]);
            }
            if (this.selectionLimit && this.value.length === this.selectionLimit) {
                this.maxSelectionLimitReached = true;
            }
        }
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value, itemValue: value });
        this.updateLabel();
        this.updateFilledState();
    };
    MultiSelect.prototype.isSelected = function (value) {
        return this.findSelectionIndex(value) != -1;
    };
    MultiSelect.prototype.findSelectionIndex = function (val) {
        var index = -1;
        if (this.value) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.objectUtils.equals(this.value[i], val, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    MultiSelect.prototype.toggleAll = function (event, checkbox) {
        if (checkbox.checked) {
            this.value = [];
        }
        else {
            var opts = this.getVisibleOptions();
            if (opts) {
                this.value = [];
                for (var i = 0; i < opts.length; i++) {
                    var option = opts[i];
                    if (!option.disabled) {
                        this.value.push(opts[i].value);
                    }
                }
            }
        }
        checkbox.checked = !checkbox.checked;
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
        this.updateLabel();
    };
    MultiSelect.prototype.isAllChecked = function () {
        if (this.filterValue && this.filterValue.trim().length) {
            return this.value && this.visibleOptions && this.visibleOptions.length && (this.value.length == this.visibleOptions.length);
        }
        else {
            var optionCount = this.getEnabledOptionCount();
            return this.value && this.options && (this.value.length > 0 && this.value.length == optionCount);
        }
    };
    MultiSelect.prototype.getEnabledOptionCount = function () {
        if (this.options) {
            var count = 0;
            for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                var opt = _a[_i];
                if (!opt.disabled) {
                    count++;
                }
            }
            return count;
        }
        else {
            return 0;
        }
    };
    MultiSelect.prototype.show = function () {
        if (!this.overlayVisible) {
            this.overlayVisible = true;
        }
        this.bindDocumentClickListener();
    };
    MultiSelect.prototype.onOverlayAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.appendOverlay();
                if (this.autoZIndex) {
                    this.overlay.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
                }
                this.alignOverlay();
                this.bindDocumentClickListener();
                this.onPanelShow.emit();
                break;
            case 'void':
                this.onOverlayHide();
                break;
        }
    };
    MultiSelect.prototype.appendOverlay = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                this.domHandler.appendChild(this.overlay, this.appendTo);
            this.overlay.style.minWidth = this.domHandler.getWidth(this.containerViewChild.nativeElement) + 'px';
        }
    };
    MultiSelect.prototype.restoreOverlayAppend = function () {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    };
    MultiSelect.prototype.alignOverlay = function () {
        if (this.overlay) {
            if (this.appendTo)
                this.domHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
            else
                this.domHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
        }
    };
    MultiSelect.prototype.hide = function () {
        this.overlayVisible = false;
        this.unbindDocumentClickListener();
        if (this.resetFilterOnHide) {
            this.filterValue = null;
            this.filterInputChild.nativeElement.value = null;
        }
        this.onPanelHide.emit();
    };
    MultiSelect.prototype.close = function (event) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    };
    MultiSelect.prototype.onMouseclick = function (event, input) {
        if (this.disabled) {
            return;
        }
        if (!this.panelClick) {
            if (this.overlayVisible) {
                this.hide();
            }
            else {
                input.focus();
                this.show();
            }
        }
        this.selfClick = true;
    };
    MultiSelect.prototype.onInputFocus = function (event) {
        this.focus = true;
        this.onFocus.emit({ originalEvent: event });
    };
    MultiSelect.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.onBlur.emit({ originalEvent: event });
        this.onModelTouched();
    };
    MultiSelect.prototype.onInputKeydown = function (event) {
        switch (event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                }
                event.preventDefault();
                break;
            //escape and tab
            case 27:
            case 9:
                this.hide();
                break;
        }
    };
    MultiSelect.prototype.updateLabel = function () {
        if (this.value && this.options && this.value.length && this.displaySelectedLabel) {
            var label = '';
            for (var i = 0; i < this.value.length; i++) {
                var itemLabel = this.findLabelByValue(this.value[i]);
                if (itemLabel) {
                    if (label.length > 0) {
                        label = label + ', ';
                    }
                    label = label + itemLabel;
                }
            }
            if (this.value.length <= this.maxSelectedLabels) {
                this.valuesAsString = label;
            }
            else {
                var pattern = /{(.*?)}/;
                if (pattern.test(this.selectedItemsLabel)) {
                    this.valuesAsString = this.selectedItemsLabel.replace(this.selectedItemsLabel.match(pattern)[0], this.value.length + '');
                }
            }
        }
        else {
            this.valuesAsString = this.defaultLabel;
        }
    };
    MultiSelect.prototype.findLabelByValue = function (val) {
        var label = null;
        for (var i = 0; i < this.options.length; i++) {
            var option = this.options[i];
            if (val == null && option.value == null || this.objectUtils.equals(val, option.value, this.dataKey)) {
                label = option.label;
                break;
            }
        }
        return label;
    };
    MultiSelect.prototype.onFilter = function (event) {
        this.filterValue = event.target.value.trim().toLowerCase();
        this.visibleOptions = [];
        for (var i = 0; i < this.options.length; i++) {
            var option = this.options[i];
            if (option.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1) {
                this.visibleOptions.push(option);
            }
        }
        this.filtered = true;
    };
    MultiSelect.prototype.isItemVisible = function (option) {
        if (this.filterValue && this.filterValue.trim().length) {
            for (var i = 0; i < this.visibleOptions.length; i++) {
                if (this.visibleOptions[i].value == option.value) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    };
    MultiSelect.prototype.getVisibleOptions = function () {
        if (this.visibleOptions && this.visibleOptions.length) {
            return this.visibleOptions;
        }
        else {
            return this.options;
        }
    };
    MultiSelect.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.selfClick && !_this.panelClick && _this.overlayVisible) {
                    _this.hide();
                }
                _this.selfClick = false;
                _this.panelClick = false;
                _this.cd.markForCheck();
            });
        }
    };
    MultiSelect.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    MultiSelect.prototype.onOverlayHide = function () {
        this.unbindDocumentClickListener();
        this.overlay = null;
    };
    MultiSelect.prototype.ngOnDestroy = function () {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], MultiSelect.prototype, "defaultLabel", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MultiSelect.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MultiSelect.prototype, "panelStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "panelStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "inputId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "filter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "filterPlaceHolder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "overlayVisible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], MultiSelect.prototype, "tabindex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MultiSelect.prototype, "appendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "dataKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "displaySelectedLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], MultiSelect.prototype, "maxSelectedLabels", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], MultiSelect.prototype, "selectionLimit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "selectedItemsLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "showToggleAll", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "resetFilterOnHide", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "dropdownIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "optionLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "showHeader", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "autoZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], MultiSelect.prototype, "baseZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "showTransitionOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "hideTransitionOptions", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], MultiSelect.prototype, "containerViewChild", void 0);
    __decorate([
        core_1.ViewChild('filterInput'),
        __metadata("design:type", core_1.ElementRef)
    ], MultiSelect.prototype, "filterInputChild", void 0);
    __decorate([
        core_1.ContentChild(shared_1.Footer),
        __metadata("design:type", Object)
    ], MultiSelect.prototype, "footerFacet", void 0);
    __decorate([
        core_1.ContentChildren(shared_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], MultiSelect.prototype, "templates", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MultiSelect.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MultiSelect.prototype, "onFocus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MultiSelect.prototype, "onBlur", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MultiSelect.prototype, "onPanelShow", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MultiSelect.prototype, "onPanelHide", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], MultiSelect.prototype, "options", null);
    MultiSelect = __decorate([
        core_1.Component({
            selector: 'p-multiSelect',
            template: "\n        <div #container [ngClass]=\"{'ui-multiselect ui-widget ui-state-default ui-corner-all':true,'ui-multiselect-open':overlayVisible,'ui-state-focus':focus,'ui-state-disabled': disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\"\n            (click)=\"onMouseclick($event,in)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in type=\"text\" readonly=\"readonly\" [attr.id]=\"inputId\" [attr.name]=\"name\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\" (keydown)=\"onInputKeydown($event)\">\n            </div>\n            <div class=\"ui-multiselect-label-container\" [title]=\"valuesAsString\">\n                <label class=\"ui-multiselect-label ui-corner-all\">\n                    <ng-container *ngIf=\"!selectedItemsTemplate\">{{valuesAsString}}</ng-container>\n                    <ng-container *ngTemplateOutlet=\"selectedItemsTemplate; context: {$implicit: value}\"></ng-container>\n                </label>\n            </div>\n            <div [ngClass]=\"{'ui-multiselect-trigger ui-state-default ui-corner-right':true}\">\n                <span class=\"ui-multiselect-trigger-icon ui-clickable\" [ngClass]=\"dropdownIcon\"></span>\n            </div>\n            <div *ngIf=\"overlayVisible\" [ngClass]=\"['ui-multiselect-panel ui-widget ui-widget-content ui-corner-all ui-shadow']\" [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\"\n                [ngStyle]=\"panelStyle\" [class]=\"panelStyleClass\" (click)=\"panelClick=true\">\n                <div class=\"ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix\" [ngClass]=\"{'ui-multiselect-header-no-toggleall': !showToggleAll}\" *ngIf=\"showHeader\">\n                    <div class=\"ui-chkbox ui-widget\" *ngIf=\"showToggleAll && !selectionLimit\">\n                        <div class=\"ui-helper-hidden-accessible\">\n                            <input #cb type=\"checkbox\" readonly=\"readonly\" [checked]=\"isAllChecked()\">\n                        </div>\n                        <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isAllChecked()}\" (click)=\"toggleAll($event,cb)\">\n                            <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':isAllChecked()}\"></span>\n                        </div>\n                    </div>\n                    <div class=\"ui-multiselect-filter-container\" *ngIf=\"filter\">\n                        <input #filterInput type=\"text\" role=\"textbox\" [value]=\"filterValue||''\" (input)=\"onFilter($event)\" class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\" [attr.placeholder]=\"filterPlaceHolder\">\n                        <span class=\"ui-multiselect-filter-icon pi pi-search\"></span>\n                    </div>\n                    <a class=\"ui-multiselect-close ui-corner-all\" href=\"#\" (click)=\"close($event)\">\n                        <span class=\"pi pi-times\"></span>\n                    </a>\n                </div>\n                <div class=\"ui-multiselect-items-wrapper\" [style.max-height]=\"scrollHeight||'auto'\">\n                    <ul class=\"ui-multiselect-items ui-multiselect-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\">\n                        <li *ngFor=\"let option of options; let i = index\" class=\"ui-multiselect-item ui-corner-all\" (click)=\"onItemClick($event,option)\"\n                            [style.display]=\"isItemVisible(option) ? 'block' : 'none'\"\n                            [ngClass]=\"{'ui-state-highlight': isSelected(option.value), 'ui-state-disabled': option.disabled || (maxSelectionLimitReached && !isSelected(option.value))}\">\n                            <div class=\"ui-chkbox ui-widget\">\n                                <div class=\"ui-helper-hidden-accessible\">\n                                    <input #itemcb type=\"checkbox\" readonly=\"readonly\" [checked]=\"isSelected(option.value)\" (focus)=\"focusedItemCheckbox=itemcb\" (blur)=\"focusedItemCheckbox=null\"\n                                        [attr.aria-label]=\"option.label\" [disabled]=\"option.disabled || (maxSelectionLimitReached && !isSelected(option.value))\">\n                                </div>\n                                <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\"\n                                    [ngClass]=\"{'ui-state-active': isSelected(option.value),\n                                                'ui-state-focus': (focusedItemCheckbox === itemcb)}\">\n                                    <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':isSelected(option.value)}\"></span>\n                                </div>\n                            </div>\n                            <label *ngIf=\"!itemTemplate\">{{option.label}}</label>\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: i}\"></ng-container>\n                        </li>\n                    </ul>\n                </div>\n                <div class=\"ui-multiselect-footer ui-widget-content\" *ngIf=\"footerFacet\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                </div>\n            </div>\n        </div>\n    ",
            animations: [
                animations_1.trigger('overlayAnimation', [
                    animations_1.state('void', animations_1.style({
                        transform: 'translateY(5%)',
                        opacity: 0
                    })),
                    animations_1.state('visible', animations_1.style({
                        transform: 'translateY(0)',
                        opacity: 1
                    })),
                    animations_1.transition('void => visible', animations_1.animate('{{showTransitionParams}}')),
                    animations_1.transition('visible => void', animations_1.animate('{{hideTransitionParams}}'))
                ])
            ],
            host: {
                '[class.ui-inputwrapper-filled]': 'filled',
                '[class.ui-inputwrapper-focus]': 'focus'
            },
            providers: [domhandler_1.DomHandler, objectutils_1.ObjectUtils, exports.MULTISELECT_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer2, objectutils_1.ObjectUtils, core_1.ChangeDetectorRef])
    ], MultiSelect);
    return MultiSelect;
}());
exports.MultiSelect = MultiSelect;
var MultiSelectModule = /** @class */ (function () {
    function MultiSelectModule() {
    }
    MultiSelectModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, shared_1.SharedModule],
            exports: [MultiSelect, shared_1.SharedModule],
            declarations: [MultiSelect]
        })
    ], MultiSelectModule);
    return MultiSelectModule;
}());
exports.MultiSelectModule = MultiSelectModule;
//# sourceMappingURL=multiselect.js.map

/***/ }),

/***/ 1580:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderPagesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var WorkOrderPagesComponent = /** @class */ (function () {
    function WorkOrderPagesComponent() {
    }
    WorkOrderPagesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "quickapp-pro-workordrs",
            template: __webpack_require__(1976)
        })
    ], WorkOrderPagesComponent);
    return WorkOrderPagesComponent;
}());



/***/ }),

/***/ 1581:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderAddComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WorkOrderAddComponent = /** @class */ (function () {
    /** WorkOrderAdd ctor */
    function WorkOrderAddComponent() {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(document).ready(function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__('.closeall').click(function () { __WEBPACK_IMPORTED_MODULE_2_jquery__('.panel-collapse.in').collapse('hide'); });
            __WEBPACK_IMPORTED_MODULE_2_jquery__('.openall').click(function () { __WEBPACK_IMPORTED_MODULE_2_jquery__('.panel-collapse:not(".in")').collapse('show'); });
            __WEBPACK_IMPORTED_MODULE_2_jquery__("#checkall").click(function () { __WEBPACK_IMPORTED_MODULE_2_jquery__(".pcheck").prop('checked', __WEBPACK_IMPORTED_MODULE_2_jquery__(this).prop('checked')); });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".deferred-table").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".default-workflow-table").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".deferred-btn").click(function () { __WEBPACK_IMPORTED_MODULE_2_jquery__(".deferred-table").show(); __WEBPACK_IMPORTED_MODULE_2_jquery__(".default-workflow-table").hide(); });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".default-workflow-btn").click(function () { __WEBPACK_IMPORTED_MODULE_2_jquery__(".deferred-table").hide(); __WEBPACK_IMPORTED_MODULE_2_jquery__(".default-workflow-table").show(); });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__('input[type=radio][name=billing-options]').change(function () {
                if (this.value == 'cost') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").show();
                }
                else if (this.value == 'flat') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").show();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").hide();
                }
            });
        });
    }
    WorkOrderAddComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-work-order-add',
            template: __webpack_require__(1977),
            styles: [__webpack_require__(1978)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** WorkOrderAdd component*/
        ,
        __metadata("design:paramtypes", [])
    ], WorkOrderAddComponent);
    return WorkOrderAddComponent;
}());



/***/ }),

/***/ 1582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManualEntryLaborHoursComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ManualEntryLaborHoursComponent = /** @class */ (function () {
    /** ManualEntryLaborHours ctor */
    function ManualEntryLaborHoursComponent() {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(document).ready(function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-inout-hrs-block").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-hrs-scan-block").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__('input[type=radio][name=labor-blocks-input]').change(function () {
                if (this.value == 'labor-block1') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-inout-hrs-block").hide();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-hrs-block").show();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-hrs-scan-block").hide();
                }
                else if (this.value == 'labor-block2') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-inout-hrs-block").show();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-hrs-block").hide();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-hrs-scan-block").hide();
                }
                else if (this.value == 'labor-block3') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-inout-hrs-block").hide();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-hrs-block").hide();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-hrs-scan-block").show();
                }
            });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__('input[type=radio][name=billing-options]').change(function () {
                if (this.value == 'cost') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").show();
                }
                else if (this.value == 'flat') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").show();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").hide();
                }
            });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(function () {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('input.decimals2').on('input', function () {
                    this.value = this.value
                        .replace(/[^\d.]/g, '') // numbers and decimals only
                        .replace(/(^[\d]{2})[\d]/g, '$1') // not more than 4 digits at the beginning
                        .replace(/(\..*)\./g, '$1') // decimal can't exist more than once
                        .replace(/(\.[\d]{2})./g, '$1'); // not more than 2 digits after decimal
                });
                __WEBPACK_IMPORTED_MODULE_2_jquery__('input.time').on('input', function () {
                    this.value = this.value
                        .replace(/[^\d.]/g, '') // numbers and decimals only
                        .replace(/(^[\d]{2})[\d]/g, '$1') // not more than 4 digits at the beginning
                        .replace(/(\..*)\./g, '$1') // decimal can't exist more than once
                        .replace(/(\.[\d]{2})./g, '$1'); // not more than 2 digits after decimal
                });
            });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-inout-hrs-block").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-inout-hrs-btn").click(function () {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-inout-hrs-block").show();
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-hrs-block").hide();
            });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-hrs-btn").click(function () {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-hrs-block").show();
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".labor-inout-hrs-block").hide();
            });
        });
    }
    ManualEntryLaborHoursComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-manual-entry-labor-hours',
            template: __webpack_require__(1980),
            styles: [__webpack_require__(1981)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** ManualEntryLaborHours component*/
        ,
        __metadata("design:paramtypes", [])
    ], ManualEntryLaborHoursComponent);
    return ManualEntryLaborHoursComponent;
}());



/***/ }),

/***/ 1583:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SystemGeneratedLaborHoursComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SystemGeneratedLaborHoursComponent = /** @class */ (function () {
    /** SystemGeneratedLaborHours ctor */
    function SystemGeneratedLaborHoursComponent() {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(document).ready(function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__('input[type=radio][name=billing-options]').change(function () {
                if (this.value == 'cost') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").show();
                }
                else if (this.value == 'flat') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").show();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").hide();
                }
            });
        });
    }
    SystemGeneratedLaborHoursComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-system-generated-labor-hours',
            template: __webpack_require__(1983),
            styles: [__webpack_require__(1984)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** SystemGeneratedLaborHours component*/
        ,
        __metadata("design:paramtypes", [])
    ], SystemGeneratedLaborHoursComponent);
    return SystemGeneratedLaborHoursComponent;
}());



/***/ }),

/***/ 1584:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarCodeScannedLaborHoursComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BarCodeScannedLaborHoursComponent = /** @class */ (function () {
    /** BarCodeScannedLaborHours ctor */
    function BarCodeScannedLaborHoursComponent() {
    }
    BarCodeScannedLaborHoursComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-bar-code-scanned-labor-hours',
            template: __webpack_require__(1986),
            styles: [__webpack_require__(1987)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** BarCodeScannedLaborHours component*/
        ,
        __metadata("design:paramtypes", [])
    ], BarCodeScannedLaborHoursComponent);
    return BarCodeScannedLaborHoursComponent;
}());



/***/ }),

/***/ 1585:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderEquipmentListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WorkOrderEquipmentListComponent = /** @class */ (function () {
    /** WorkOrderEquipmentList ctor */
    function WorkOrderEquipmentListComponent() {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(document).ready(function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__("#checkall").click(function () { __WEBPACK_IMPORTED_MODULE_2_jquery__(".pcheck").prop('checked', __WEBPACK_IMPORTED_MODULE_2_jquery__(this).prop('checked')); });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__('input[type=radio][name=billing-options]').change(function () {
                if (this.value == 'cost') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").show();
                }
                else if (this.value == 'flat') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").show();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").hide();
                }
            });
        });
    }
    WorkOrderEquipmentListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-work-order-equipment-list',
            template: __webpack_require__(1989),
            styles: [__webpack_require__(1990)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** WorkOrderEquipmentList component*/
        ,
        __metadata("design:paramtypes", [])
    ], WorkOrderEquipmentListComponent);
    return WorkOrderEquipmentListComponent;
}());



/***/ }),

/***/ 1586:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderEquipmentCheckInOutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WorkOrderEquipmentCheckInOutComponent = /** @class */ (function () {
    /** WorkOrderEquipmentCheckInOut ctor */
    function WorkOrderEquipmentCheckInOutComponent() {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(document).ready(function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".consultant-setup").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__(function () {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('input[name="emp-consultant"]').on('click', function () {
                    if (__WEBPACK_IMPORTED_MODULE_2_jquery__(this).val() == 'Consultant') {
                        __WEBPACK_IMPORTED_MODULE_2_jquery__(".consultant-setup").show();
                        __WEBPACK_IMPORTED_MODULE_2_jquery__(".employee-setup").hide();
                        __WEBPACK_IMPORTED_MODULE_2_jquery__(".save-btn").show();
                        __WEBPACK_IMPORTED_MODULE_2_jquery__(".nxt-btn").hide();
                        __WEBPACK_IMPORTED_MODULE_2_jquery__(".step3-nav").hide();
                    }
                    else {
                        __WEBPACK_IMPORTED_MODULE_2_jquery__(".employee-setup").show();
                        __WEBPACK_IMPORTED_MODULE_2_jquery__(".consultant-setup").hide();
                        __WEBPACK_IMPORTED_MODULE_2_jquery__(".save-btn").hide();
                        __WEBPACK_IMPORTED_MODULE_2_jquery__(".nxt-btn").show();
                        __WEBPACK_IMPORTED_MODULE_2_jquery__(".step3-nav").show();
                    }
                });
            });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".lhourpay-block").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".certification-block").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__("#lhourpay-checkbox").change(function () { if (this.checked) {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".lhourpay-block").show();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".lhourpay-block").hide();
            } });
            __WEBPACK_IMPORTED_MODULE_2_jquery__("#certification-radio").change(function () { if (this.checked) {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".certification-block").show();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".certification-block").hide();
            } });
            /* Hourly Rate with 2 decimals */
            __WEBPACK_IMPORTED_MODULE_2_jquery__(function () {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('input.amount').on('input', function () {
                    this.value = this.value
                        .replace(/[^\d.]/g, '') // numbers and decimals only
                        .replace(/(^[\d]{4})[\d]/g, '$1') // not more than 4 digits at the beginning
                        .replace(/(\..*)\./g, '$1') // decimal can't exist more than once
                        .replace(/(\.[\d]{2})./g, '$1'); // not more than 2 digits after decimal
                });
            });
            /* End Hourly Rate with 2 decimals */
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".shiftsingle-block").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".shiftmultiple-block").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__('input[name="shift"]').click(function () { if (__WEBPACK_IMPORTED_MODULE_2_jquery__(this).attr('id') == 'shiftsingle') {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('.shiftsingle-block').show();
                __WEBPACK_IMPORTED_MODULE_2_jquery__('.shiftmultiple-block').hide();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('.shiftmultiple-block').show();
                __WEBPACK_IMPORTED_MODULE_2_jquery__('.shiftsingle-block').hide();
            } });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".hourpay-block").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".salarypay-block").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__('input[name="paytype"]').click(function () { if (__WEBPACK_IMPORTED_MODULE_2_jquery__(this).attr('id') == 'hourpay') {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('.hourpay-block').show();
                __WEBPACK_IMPORTED_MODULE_2_jquery__('.salarypay-block').hide();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('.salarypay-block').show();
                __WEBPACK_IMPORTED_MODULE_2_jquery__('.hourpay-block').hide();
            } });
            /*$("#cparent").change(function() {if(this.checked) {$(".cparent-input").show();}else {$(".cparent-input").hide();}});*/
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".cparent-input").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__("#cparent").change(function () { if (this.checked) {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".cparent-input").show();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".cparent-input").hide();
            } });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".rpma-input").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__("#rpma").change(function () { if (this.checked) {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".rpma-input").show();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".rpma-input").hide();
            } });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".vbill-map").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__("#vbill-map-check").change(function () { if (this.checked) {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".vbill-map").show();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".vbill-map").hide();
            } });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".vship-map").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__("#vship-map-check").change(function () { if (this.checked) {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".vship-map").show();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".vship-map").hide();
            } });
            __WEBPACK_IMPORTED_MODULE_2_jquery__('[data-toggle="tooltip"]').tooltip();
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".add").click(function () {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".hide-model").hide();
                __WEBPACK_IMPORTED_MODULE_2_jquery__(".fade .in").hide();
            });
            /* Amount decimals */
            __WEBPACK_IMPORTED_MODULE_2_jquery__(function () {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('input.cost').on('input', function () {
                    this.value = this.value
                        .replace(/(\.[\d]{3})./g, '$1'); // not more than 3 digits after decimal
                });
            });
            /* End Amount decimals */
        });
    }
    WorkOrderEquipmentCheckInOutComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-work-order-equipment-check-in-out',
            template: __webpack_require__(1992),
            styles: [__webpack_require__(1993)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** WorkOrderEquipmentCheckInOut component*/
        ,
        __metadata("design:paramtypes", [])
    ], WorkOrderEquipmentCheckInOutComponent);
    return WorkOrderEquipmentCheckInOutComponent;
}());



/***/ }),

/***/ 1587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderCompleteMaterialListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WorkOrderCompleteMaterialListComponent = /** @class */ (function () {
    /** WorkOrderCompleteMaterialList ctor */
    function WorkOrderCompleteMaterialListComponent() {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(document).ready(function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__("#checkall").click(function () { __WEBPACK_IMPORTED_MODULE_2_jquery__(".pcheck").prop('checked', __WEBPACK_IMPORTED_MODULE_2_jquery__(this).prop('checked')); });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__('input[type=radio][name=billing-options]').change(function () {
                if (this.value == 'cost') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").show();
                }
                else if (this.value == 'flat') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").show();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").hide();
                }
            });
        });
    }
    WorkOrderCompleteMaterialListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-work-order-complete-material-list',
            template: __webpack_require__(1995),
            styles: [__webpack_require__(1996)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** WorkOrderCompleteMaterialList component*/
        ,
        __metadata("design:paramtypes", [])
    ], WorkOrderCompleteMaterialListComponent);
    return WorkOrderCompleteMaterialListComponent;
}());



/***/ }),

/***/ 1588:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderReserveIssueComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WorkOrderReserveIssueComponent = /** @class */ (function () {
    /** WorkOrderReserveIssue ctor */
    function WorkOrderReserveIssueComponent() {
    }
    WorkOrderReserveIssueComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-work-order-reserve-issue',
            template: __webpack_require__(1998),
            styles: [__webpack_require__(1999)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** WorkOrderReserveIssue component*/
        ,
        __metadata("design:paramtypes", [])
    ], WorkOrderReserveIssueComponent);
    return WorkOrderReserveIssueComponent;
}());



/***/ }),

/***/ 1589:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderMainComponentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WorkOrderMainComponentComponent = /** @class */ (function () {
    /** WorkOrderMainComponent ctor */
    function WorkOrderMainComponentComponent() {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(document).ready(function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__("#checkall").click(function () { __WEBPACK_IMPORTED_MODULE_2_jquery__(".pcheck").prop('checked', __WEBPACK_IMPORTED_MODULE_2_jquery__(this).prop('checked')); });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".new-ro").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__('input[type=radio][name=ro-type]').change(function () {
                if (this.value == 'existing-ro') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".new-ro").hide();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".existing-ro").show();
                }
                else if (this.value == 'new-ro') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".new-ro").show();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".existing-ro").hide();
                }
            });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__('input[type=radio][name=billing-options]').change(function () {
                if (this.value == 'cost') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").show();
                }
                else if (this.value == 'flat') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").show();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").hide();
                }
            });
        });
    }
    WorkOrderMainComponentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-work-order-main-component',
            template: __webpack_require__(2001),
            styles: [__webpack_require__(2002)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** WorkOrderMainComponent component*/
        ,
        __metadata("design:paramtypes", [])
    ], WorkOrderMainComponentComponent);
    return WorkOrderMainComponentComponent;
}());



/***/ }),

/***/ 1590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubWorkOrderListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SubWorkOrderListComponent = /** @class */ (function () {
    /** SubWorkOrderList ctor */
    function SubWorkOrderListComponent() {
    }
    SubWorkOrderListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sub-work-order-list',
            template: __webpack_require__(2004),
            styles: [__webpack_require__(2005)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** SubWorkOrderList component*/
        ,
        __metadata("design:paramtypes", [])
    ], SubWorkOrderListComponent);
    return SubWorkOrderListComponent;
}());



/***/ }),

/***/ 1591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubWorkOrderSetupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SubWorkOrderSetupComponent = /** @class */ (function () {
    /** SubWorkOrderSetup ctor */
    function SubWorkOrderSetupComponent() {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(document).ready(function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__('.closeall').click(function () { __WEBPACK_IMPORTED_MODULE_2_jquery__('.panel-collapse.in').collapse('hide'); });
            __WEBPACK_IMPORTED_MODULE_2_jquery__('.openall').click(function () { __WEBPACK_IMPORTED_MODULE_2_jquery__('.panel-collapse:not(".in")').collapse('show'); });
            __WEBPACK_IMPORTED_MODULE_2_jquery__("#checkall").click(function () { __WEBPACK_IMPORTED_MODULE_2_jquery__(".pcheck").prop('checked', __WEBPACK_IMPORTED_MODULE_2_jquery__(this).prop('checked')); });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".deferred-table").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".default-workflow-table").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".deferred-btn").click(function () { __WEBPACK_IMPORTED_MODULE_2_jquery__(".deferred-table").show(); __WEBPACK_IMPORTED_MODULE_2_jquery__(".default-workflow-table").hide(); });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".default-workflow-btn").click(function () { __WEBPACK_IMPORTED_MODULE_2_jquery__(".deferred-table").hide(); __WEBPACK_IMPORTED_MODULE_2_jquery__(".default-workflow-table").show(); });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__('input[type=radio][name=billing-options]').change(function () {
                if (this.value == 'cost') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").show();
                }
                else if (this.value == 'flat') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").show();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").hide();
                }
            });
        });
    }
    SubWorkOrderSetupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sub-work-order-setup',
            template: __webpack_require__(2007),
            styles: [__webpack_require__(2008)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** SubWorkOrderSetup component*/
        ,
        __metadata("design:paramtypes", [])
    ], SubWorkOrderSetupComponent);
    return SubWorkOrderSetupComponent;
}());



/***/ }),

/***/ 1592:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderMemoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WorkOrderMemoComponent = /** @class */ (function () {
    /** WorkOrderMemo ctor */
    function WorkOrderMemoComponent() {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(document).ready(function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__('[data-toggle="tooltip"]').tooltip();
            __WEBPACK_IMPORTED_MODULE_2_jquery__('.status input:checkbox').change(function () {
                if (__WEBPACK_IMPORTED_MODULE_2_jquery__(this).is(":checked")) {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(this).parents("span").attr("data-original-title", "Active").tooltip('show');
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(this).parents("span").attr("data-original-title", "In-Active").tooltip('show');
                }
            });
        });
    }
    WorkOrderMemoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-work-order-memo',
            template: __webpack_require__(2010),
            styles: [__webpack_require__(2011)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** WorkOrderMemo component*/
        ,
        __metadata("design:paramtypes", [])
    ], WorkOrderMemoComponent);
    return WorkOrderMemoComponent;
}());



/***/ }),

/***/ 1593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderDocumentsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WorkOrderDocumentsComponent = /** @class */ (function () {
    /** WorkOrderDocuments ctor */
    function WorkOrderDocumentsComponent() {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(document).ready(function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__("#checkall").click(function () { __WEBPACK_IMPORTED_MODULE_2_jquery__(".pcheck").prop('checked', __WEBPACK_IMPORTED_MODULE_2_jquery__(this).prop('checked')); });
            __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
            __WEBPACK_IMPORTED_MODULE_2_jquery__('input[type=radio][name=billing-options]').change(function () {
                if (this.value == 'cost') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").hide();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").show();
                }
                else if (this.value == 'flat') {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".flat-data").show();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(".cost-data").hide();
                }
            });
        });
    }
    WorkOrderDocumentsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-work-order-documents',
            template: __webpack_require__(2013),
            styles: [__webpack_require__(2014)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** WorkOrderDocuments component*/
        ,
        __metadata("design:paramtypes", [])
    ], WorkOrderDocumentsComponent);
    return WorkOrderDocumentsComponent;
}());



/***/ }),

/***/ 1594:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderAnalysisComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WorkOrderAnalysisComponent = /** @class */ (function () {
    /** WorkOrderAnalysis ctor */
    function WorkOrderAnalysisComponent() {
    }
    WorkOrderAnalysisComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-work-order-analysis',
            template: __webpack_require__(2016),
            styles: [__webpack_require__(2017)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** WorkOrderAnalysis component*/
        ,
        __metadata("design:paramtypes", [])
    ], WorkOrderAnalysisComponent);
    return WorkOrderAnalysisComponent;
}());



/***/ }),

/***/ 1595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderBillingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WorkOrderBillingComponent = /** @class */ (function () {
    /** WorkOrderBilling ctor */
    function WorkOrderBillingComponent() {
    }
    WorkOrderBillingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-work-order-billing',
            template: __webpack_require__(2019),
            styles: [__webpack_require__(2020)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** WorkOrderBilling component*/
        ,
        __metadata("design:paramtypes", [])
    ], WorkOrderBillingComponent);
    return WorkOrderBillingComponent;
}());



/***/ }),

/***/ 1596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderQuoteComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WorkOrderQuoteComponent = /** @class */ (function () {
    /** WorkOrderQuote ctor */
    function WorkOrderQuoteComponent() {
    }
    WorkOrderQuoteComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-work-order-quote',
            template: __webpack_require__(2022),
            styles: [__webpack_require__(2023)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** WorkOrderQuote component*/
        ,
        __metadata("design:paramtypes", [])
    ], WorkOrderQuoteComponent);
    return WorkOrderQuoteComponent;
}());



/***/ }),

/***/ 1597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderShippingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WorkOrderShippingComponent = /** @class */ (function () {
    /** WorkOrderShipping ctor */
    function WorkOrderShippingComponent() {
    }
    WorkOrderShippingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-work-order-shipping',
            template: __webpack_require__(2025),
            styles: [__webpack_require__(2026)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** WorkOrderShipping component*/
        ,
        __metadata("design:paramtypes", [])
    ], WorkOrderShippingComponent);
    return WorkOrderShippingComponent;
}());



/***/ }),

/***/ 1598:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrderListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_animations__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WorkOrderListComponent = /** @class */ (function () {
    /** WorkOrderList ctor */
    function WorkOrderListComponent() {
    }
    WorkOrderListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-work-order-list',
            template: __webpack_require__(2028),
            styles: [__webpack_require__(2029)],
            animations: [__WEBPACK_IMPORTED_MODULE_1__services_animations__["a" /* fadeInOut */]]
        })
        /** WorkOrderList component*/
        ,
        __metadata("design:paramtypes", [])
    ], WorkOrderListComponent);
    return WorkOrderListComponent;
}());



/***/ }),

/***/ 1975:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkOrdersPagesRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__workorderpages_component__ = __webpack_require__(1580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_work_order_work_order_setup_work_order_add_work_order_add_component__ = __webpack_require__(1581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_work_order_work_order_setup_labor_manual_entry_labor_hours_manual_entry_labor_hours_component__ = __webpack_require__(1582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_work_order_work_order_setup_labor_system_generated_labor_hours_system_generated_labor_hours_component__ = __webpack_require__(1583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_work_order_work_order_setup_labor_bar_code_scanned_labor_hours_bar_code_scanned_labor_hours_component__ = __webpack_require__(1584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_work_order_work_order_setup_work_order_equipment_work_order_equipment_list_work_order_equipment_list_component__ = __webpack_require__(1585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_work_order_work_order_setup_work_order_equipment_work_order_equipment_check_in_out_work_order_equipment_check_in_out_component__ = __webpack_require__(1586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_work_order_work_order_setup_work_order_complete_material_list_work_order_complete_material_list_component__ = __webpack_require__(1587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_work_order_work_order_setup_work_order_reserve_issue_work_order_reserve_issue_component__ = __webpack_require__(1588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_work_order_work_order_setup_work_order_main_component_work_order_main_component_component__ = __webpack_require__(1589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_work_order_work_order_setup_sub_work_order_sub_work_order_list_sub_work_order_list_component__ = __webpack_require__(1590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_work_order_work_order_setup_sub_work_order_sub_work_order_setup_sub_work_order_setup_component__ = __webpack_require__(1591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_work_order_work_order_setup_work_order_memo_work_order_memo_component__ = __webpack_require__(1592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_work_order_work_order_setup_work_order_documents_work_order_documents_component__ = __webpack_require__(1593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_work_order_work_order_setup_work_order_analysis_work_order_analysis_component__ = __webpack_require__(1594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_work_order_work_order_setup_work_order_billing_work_order_billing_component__ = __webpack_require__(1595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_work_order_work_order_setup_work_order_quote_work_order_quote_component__ = __webpack_require__(1596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_work_order_work_order_setup_work_order_shipping_work_order_shipping_component__ = __webpack_require__(1597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_work_order_work_order_list_work_order_list_component__ = __webpack_require__(1598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_auth_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_auth_guard_service__ = __webpack_require__(433);
// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var workorderPagesRoutes = [
    {
        path: 'workorderspages',
        component: __WEBPACK_IMPORTED_MODULE_2__workorderpages_component__["a" /* WorkOrderPagesComponent */],
        children: [
            { path: "app-work-order-list", component: __WEBPACK_IMPORTED_MODULE_20__components_work_order_work_order_list_work_order_list_component__["a" /* WorkOrderListComponent */], data: { title: "Work Order's List" } },
            { path: "app-work-order-add", component: __WEBPACK_IMPORTED_MODULE_3__components_work_order_work_order_setup_work_order_add_work_order_add_component__["a" /* WorkOrderAddComponent */], data: { title: "Work Order Setup" } },
            { path: "app-work-order-manual-entry-labor-hours", component: __WEBPACK_IMPORTED_MODULE_4__components_work_order_work_order_setup_labor_manual_entry_labor_hours_manual_entry_labor_hours_component__["a" /* ManualEntryLaborHoursComponent */], data: { title: "Manual Entry Labor Hours" } },
            { path: "app-work-order-system-generated-labor-hours", component: __WEBPACK_IMPORTED_MODULE_5__components_work_order_work_order_setup_labor_system_generated_labor_hours_system_generated_labor_hours_component__["a" /* SystemGeneratedLaborHoursComponent */], data: { title: "System Generated Labor Hours" } },
            { path: "app-work-order-bar-code-scanned-labor-hours", component: __WEBPACK_IMPORTED_MODULE_6__components_work_order_work_order_setup_labor_bar_code_scanned_labor_hours_bar_code_scanned_labor_hours_component__["a" /* BarCodeScannedLaborHoursComponent */], data: { title: "Bar Code Scanned Labour Hours" } },
            { path: "app-work-order-equipment-list", component: __WEBPACK_IMPORTED_MODULE_7__components_work_order_work_order_setup_work_order_equipment_work_order_equipment_list_work_order_equipment_list_component__["a" /* WorkOrderEquipmentListComponent */], data: { title: "Equipment List" } },
            { path: "app-work-order-equipment-check-in-out", component: __WEBPACK_IMPORTED_MODULE_8__components_work_order_work_order_setup_work_order_equipment_work_order_equipment_check_in_out_work_order_equipment_check_in_out_component__["a" /* WorkOrderEquipmentCheckInOutComponent */], data: { title: "Equipment Check In Out" } },
            { path: "app-work-order-complete-material-list", component: __WEBPACK_IMPORTED_MODULE_9__components_work_order_work_order_setup_work_order_complete_material_list_work_order_complete_material_list_component__["a" /* WorkOrderCompleteMaterialListComponent */], data: { title: "Complete Material List" } },
            { path: "app-work-order-reserve-issue", component: __WEBPACK_IMPORTED_MODULE_10__components_work_order_work_order_setup_work_order_reserve_issue_work_order_reserve_issue_component__["a" /* WorkOrderReserveIssueComponent */], data: { title: "Reserve Issue" } },
            { path: "app-work-order-main-component", component: __WEBPACK_IMPORTED_MODULE_11__components_work_order_work_order_setup_work_order_main_component_work_order_main_component_component__["a" /* WorkOrderMainComponentComponent */], data: { title: "Main Component" } },
            { path: "app-work-order-sub-wo-list", component: __WEBPACK_IMPORTED_MODULE_12__components_work_order_work_order_setup_sub_work_order_sub_work_order_list_sub_work_order_list_component__["a" /* SubWorkOrderListComponent */], data: { title: "Sub-WO List" } },
            { path: "app-work-order-sub-wo-add", component: __WEBPACK_IMPORTED_MODULE_13__components_work_order_work_order_setup_sub_work_order_sub_work_order_setup_sub_work_order_setup_component__["a" /* SubWorkOrderSetupComponent */], data: { title: "Sub-WO Setup" } },
            { path: "app-work-order-memo", component: __WEBPACK_IMPORTED_MODULE_14__components_work_order_work_order_setup_work_order_memo_work_order_memo_component__["a" /* WorkOrderMemoComponent */], data: { title: "Memo" } },
            { path: "app-work-order-documents", component: __WEBPACK_IMPORTED_MODULE_15__components_work_order_work_order_setup_work_order_documents_work_order_documents_component__["a" /* WorkOrderDocumentsComponent */], data: { title: "Documents" } },
            { path: "app-work-order-analysis", component: __WEBPACK_IMPORTED_MODULE_16__components_work_order_work_order_setup_work_order_analysis_work_order_analysis_component__["a" /* WorkOrderAnalysisComponent */], data: { title: "Analysis" } },
            { path: "app-work-order-billing", component: __WEBPACK_IMPORTED_MODULE_17__components_work_order_work_order_setup_work_order_billing_work_order_billing_component__["a" /* WorkOrderBillingComponent */], data: { title: "Billing" } },
            { path: "app-work-order-quote", component: __WEBPACK_IMPORTED_MODULE_18__components_work_order_work_order_setup_work_order_quote_work_order_quote_component__["a" /* WorkOrderQuoteComponent */], data: { title: "Quote" } },
            { path: "app-work-order-shipping", component: __WEBPACK_IMPORTED_MODULE_19__components_work_order_work_order_setup_work_order_shipping_work_order_shipping_component__["a" /* WorkOrderShippingComponent */], data: { title: "Shipping" } },
        ]
    }
];
var WorkOrdersPagesRoutingModule = /** @class */ (function () {
    function WorkOrdersPagesRoutingModule() {
    }
    WorkOrdersPagesRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(workorderPagesRoutes)
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_21__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_22__services_auth_guard_service__["a" /* AuthGuard */]
            ]
        })
    ], WorkOrdersPagesRoutingModule);
    return WorkOrdersPagesRoutingModule;
}());



/***/ }),

/***/ 1976:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>";

/***/ }),

/***/ 1977:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"x_panel\" style=\"\">\r\n                <div class=\"x_content\">\r\n                    <nav aria-label=\"breadcrumb\">\r\n                        <ol class=\"breadcrumb\">\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"index.html\">Dashboard</a></li>\r\n                            <li class=\"breadcrumb-item active\" aria-current=\"page\">WO Setup</li>\r\n                        </ol>\r\n                    </nav>\r\n                    <div class=\"pheading\">\r\n                        <h4 class=\"page-heading clr-green\">WO Setup</h4>\r\n                    </div>\r\n                    <div class=\"cdetails-top\">\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Company</label>\r\n                            <span>Silverxis</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>BU</label>\r\n                            <span>Adso</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Division</label>\r\n                            <span>Development</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Dept</label>\r\n                            <span>Java</span>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n                    <form id=\"\" class=\"form-horizontal ro-grid-form mtop10\" name=\"\" action=\"#\" method=\"post\" onsubmit=\"return false;\">\r\n                        <div class=\"col-sm-3\">\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">WO Num</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control numberids\" value=\"WO123\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Name</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control names\" value=\"Shabbir\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Code</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control numberids\" value=\"C123\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Ref</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input type=\"text\" class=\"form-control\" value=\"Ref\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Contact</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input type=\"text\" class=\"form-control\" value=\"Cust Contact\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Phone</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input type=\"text\" class=\"form-control\" value=\"Cust Phone\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Fax</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input type=\"text\" class=\"form-control\" value=\"Cust Fax\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Contract Ref</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input type=\"text\" class=\"form-control\" value=\"Cust Contract Ref\">\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-sm-3\">\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Internal or External</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input type=\"radio\" disabled checked> Internal&nbsp;&nbsp;\r\n                                    <input type=\"radio\" disabled> External\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">WO Qty</label>\r\n                                <input type=\"number\" class=\"form-control \" name=\"\" placeholder=\"WO Qty\" />\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Open Date</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control datepicker\" type=\"text\" placeholder=\"Open Date\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Request Date</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control datepicker\" type=\"text\" placeholder=\"Cust Request Date\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Promise Date</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control datepicker\" type=\"text\" placeholder=\"Promise Date\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Completion Date</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control datepicker\" type=\"text\" placeholder=\"Completion Date\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Work Scope</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control\" type=\"text\" placeholder=\"Work Scope\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Workflow ID</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"input-group\">\r\n                                        <select>\r\n                                            <option value=\"ACC123\" class=\"\">ACC123</option>\r\n                                            <option value=\"ACC124\" class=\"\">ACC124</option>\r\n                                            <option value=\"ACC125\" class=\"\">ACC125</option>\r\n                                            <option value=\"ACC126\" class=\"\">ACC126</option>\r\n                                            <option value=\"ACC127\" class=\"\">ACC127</option>\r\n\r\n                                        </select>\r\n                                    </div>\r\n                                </div>\r\n\r\n\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-sm-3\">\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">PN</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control numberids\" value=\"1223454\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">PN Description</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control\" type=\"text\" value=\"PN Description\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Revised PN</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control numberids\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">SN</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control\" type=\"text\" placeholder=\"\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">PMA</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control\" type=\"text\" placeholder=\"PMA\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">DER</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control\" type=\"text\" placeholder=\"DER\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">CMM/Pub Ref</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control\" type=\"text\" placeholder=\"CMM/Pub Ref\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Priority</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <select>\r\n                                        <option value=\"AOG\">AOG</option>\r\n                                        <option value=\"Critical\">Critical</option>\r\n                                        <option value=\"Routine\" selected=\"\">Routine</option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Gate Code</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <select class=\"form-control\" id=\"\" name=\"\">\r\n                                        <option value=\"\">select</option>\r\n                                        <option value=\"\">Manual Review</option>\r\n                                        <option value=\"\">Preliminary Inspection</option>\r\n                                        <option value=\"\">Teardown Evaluation</option>\r\n                                        <option value=\"\">Quoting</option>\r\n                                        <option value=\"\">Awaiting Approval</option>\r\n                                        <option value=\"\">Long Term Waiting on Approval</option>\r\n                                        <option value=\"\">Approved Pull Parts</option>\r\n                                        <option value=\"\">Parts Ordered</option>\r\n                                        <option value=\"\">Ready to Build</option>\r\n                                        <option value=\"\">In Assembly</option>\r\n                                        <option value=\"\">Final Testing</option>\r\n                                        <option value=\"\">Inspection</option>\r\n                                        <option value=\"\">Invoicing</option>\r\n                                        <option value=\"\">Work Order Closed</option>\r\n                                        <option value=\"\">Awaiting Shipping instructions</option>\r\n                                        <option value=\"\">Awaiting payment</option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-sm-3\">\r\n\r\n\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Reason for Removal</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <select class=\"w150\">\r\n                                        <option>select Reason</option>\r\n                                        <option>Screaming</option>\r\n                                        <option>Whining</option>\r\n                                        <option>Rubbing</option>\r\n                                        <option>Smoking</option>\r\n                                        <option>Time Life</option>\r\n                                    </select>\r\n                                    <a data-toggle=\"modal\" data-target=\"#removalreason\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Findings</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <select class=\"w150\">\r\n                                        <option>select Findings</option>\r\n                                        <option>Damaged Items</option>\r\n                                        <option>Bent Shaft</option>\r\n                                    </select>\r\n                                    <a data-toggle=\"modal\" data-target=\"#findings\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Work Performed</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <select class=\"w150\">\r\n                                        <option>select Work Performed</option>\r\n                                        <option>IAW OEM Requirements for Bench Check</option>\r\n                                    </select>\r\n                                    <a data-toggle=\"modal\" data-target=\"#workperformed\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                </div>\r\n\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Default Message</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <select class=\"w150\">\r\n                                        <option>select Default Message</option>\r\n                                        <option value=\"47\">Material Certification must accompany items.  Items without material certification will be rejected and returned at customs check point.</option>\r\n                                    </select>\r\n                                    <a data-toggle=\"modal\" data-target=\"#defaultmessages\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Memo</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <textarea placeholder=\"Memo\" rows=\"5\" style=\"height:130px;\"></textarea>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"clear\"></div>\r\n                        <div class=\"col-sm-4\">\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">BILLING OPTIONS</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <label class=\"w100\">Cost Plus <input type=\"radio\" name=\"billing-options\" value=\"cost\" checked /></label>\r\n                                    <label class=\"w100\">Flat Rate <input type=\"radio\" name=\"billing-options\" value=\"flat\" /></label>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"cost-data bg-grey\">\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4\">Total Work Order</label>\r\n                                    <div class=\"col-sm-7\">\r\n                                        <select>\r\n                                            <option value=\"0\">0&#37;</option>\r\n                                            <option value=\"1\">1&#37;</option>\r\n                                            <option value=\"2\">2&#37;</option>\r\n                                            <option value=\"3\">3&#37;</option>\r\n                                            <option value=\"4\">4&#37;</option>\r\n                                            <option value=\"5\">5&#37;</option>\r\n                                            <option value=\"6\">6&#37;</option>\r\n                                            <option value=\"7\">7&#37;</option>\r\n                                            <option value=\"8\">8&#37;</option>\r\n                                            <option value=\"9\">9&#37;</option>\r\n                                            <option value=\"10\">10&#37;</option>\r\n                                            <option value=\"11\">11&#37;</option>\r\n                                            <option value=\"12\">12&#37;</option>\r\n                                            <option value=\"13\">13&#37;</option>\r\n                                            <option value=\"14\">14&#37;</option>\r\n                                            <option value=\"15\">15&#37;</option>\r\n                                            <option value=\"16\">16&#37;</option>\r\n                                            <option value=\"17\">17&#37;</option>\r\n                                            <option value=\"18\">18&#37;</option>\r\n                                            <option value=\"19\">19&#37;</option>\r\n                                            <option value=\"20\">20&#37;</option>\r\n                                            <option value=\"21\">21&#37;</option>\r\n                                            <option value=\"22\">22&#37;</option>\r\n                                            <option value=\"23\">23&#37;</option>\r\n                                            <option value=\"24\">24&#37;</option>\r\n                                            <option value=\"25\">25&#37;</option>\r\n                                            <option value=\"26\">26&#37;</option>\r\n                                            <option value=\"27\">27&#37;</option>\r\n                                            <option value=\"28\">28&#37;</option>\r\n                                            <option value=\"29\">29&#37;</option>\r\n                                            <option value=\"30\">30&#37;</option>\r\n                                            <option value=\"31\">31&#37;</option>\r\n                                            <option value=\"32\">32&#37;</option>\r\n                                            <option value=\"33\">33&#37;</option>\r\n                                            <option value=\"34\">34&#37;</option>\r\n                                            <option value=\"35\">35&#37;</option>\r\n                                            <option value=\"36\">36&#37;</option>\r\n                                            <option value=\"37\">37&#37;</option>\r\n                                            <option value=\"38\">38&#37;</option>\r\n                                            <option value=\"39\">39&#37;</option>\r\n                                            <option value=\"40\">40&#37;</option>\r\n                                            <option value=\"41\">41&#37;</option>\r\n                                            <option value=\"42\">42&#37;</option>\r\n                                            <option value=\"43\">43&#37;</option>\r\n                                            <option value=\"44\">44&#37;</option>\r\n                                            <option value=\"45\">45&#37;</option>\r\n                                            <option value=\"46\">46&#37;</option>\r\n                                            <option value=\"47\">47&#37;</option>\r\n                                            <option value=\"48\">47&#37;</option>\r\n                                            <option value=\"49\">49&#37;</option>\r\n                                            <option value=\"50\">50&#37;</option>\r\n                                            <option value=\"51\">51&#37;</option>\r\n                                            <option value=\"52\">52&#37;</option>\r\n                                            <option value=\"53\">53&#37;</option>\r\n                                            <option value=\"54\">54&#37;</option>\r\n                                            <option value=\"55\">55&#37;</option>\r\n                                            <option value=\"56\">56&#37;</option>\r\n                                            <option value=\"57\">57&#37;</option>\r\n                                            <option value=\"58\">58&#37;</option>\r\n                                            <option value=\"59\">59&#37;</option>\r\n                                            <option value=\"60\">60&#37;</option>\r\n                                            <option value=\"61\">61&#37;</option>\r\n                                            <option value=\"62\">62&#37;</option>\r\n                                            <option value=\"63\">63&#37;</option>\r\n                                            <option value=\"64\">64&#37;</option>\r\n                                            <option value=\"65\">65&#37;</option>\r\n                                            <option value=\"66\">66&#37;</option>\r\n                                            <option value=\"67\">67&#37;</option>\r\n                                            <option value=\"68\">68&#37;</option>\r\n                                            <option value=\"69\">69&#37;</option>\r\n                                            <option value=\"70\">70&#37;</option>\r\n                                            <option value=\"71\">71&#37;</option>\r\n                                            <option value=\"72\">72&#37;</option>\r\n                                            <option value=\"73\">73&#37;</option>\r\n                                            <option value=\"74\">74&#37;</option>\r\n                                            <option value=\"75\">75&#37;</option>\r\n                                            <option value=\"76\">76&#37;</option>\r\n                                            <option value=\"77\">77&#37;</option>\r\n                                            <option value=\"78\">78&#37;</option>\r\n                                            <option value=\"79\">79&#37;</option>\r\n                                            <option value=\"80\">80&#37;</option>\r\n                                            <option value=\"81\">81&#37;</option>\r\n                                            <option value=\"82\">82&#37;</option>\r\n                                            <option value=\"83\">83&#37;</option>\r\n                                            <option value=\"84\">84&#37;</option>\r\n                                            <option value=\"85\">85&#37;</option>\r\n                                            <option value=\"86\">86&#37;</option>\r\n                                            <option value=\"87\">87&#37;</option>\r\n                                            <option value=\"88\">88&#37;</option>\r\n                                            <option value=\"89\">89&#37;</option>\r\n                                            <option value=\"90\">90&#37;</option>\r\n                                            <option value=\"91\">91&#37;</option>\r\n                                            <option value=\"92\">92&#37;</option>\r\n                                            <option value=\"93\">93&#37;</option>\r\n                                            <option value=\"94\">94&#37;</option>\r\n                                            <option value=\"95\">95&#37;</option>\r\n                                            <option value=\"96\">96&#37;</option>\r\n                                            <option value=\"97\">97&#37;</option>\r\n                                            <option value=\"98\">98&#37;</option>\r\n                                            <option value=\"99\">99&#37;</option>\r\n                                            <option value=\"100\">100&#37;</option>\r\n                                        </select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4\">Material</label>\r\n                                    <div class=\"col-sm-7\">\r\n                                        <select>\r\n                                            <option value=\"0\">0&#37;</option>\r\n                                            <option value=\"1\">1&#37;</option>\r\n                                            <option value=\"2\">2&#37;</option>\r\n                                            <option value=\"3\">3&#37;</option>\r\n                                            <option value=\"4\">4&#37;</option>\r\n                                            <option value=\"5\">5&#37;</option>\r\n                                            <option value=\"6\">6&#37;</option>\r\n                                            <option value=\"7\">7&#37;</option>\r\n                                            <option value=\"8\">8&#37;</option>\r\n                                            <option value=\"9\">9&#37;</option>\r\n                                            <option value=\"10\">10&#37;</option>\r\n                                            <option value=\"11\">11&#37;</option>\r\n                                            <option value=\"12\">12&#37;</option>\r\n                                            <option value=\"13\">13&#37;</option>\r\n                                            <option value=\"14\">14&#37;</option>\r\n                                            <option value=\"15\">15&#37;</option>\r\n                                            <option value=\"16\">16&#37;</option>\r\n                                            <option value=\"17\">17&#37;</option>\r\n                                            <option value=\"18\">18&#37;</option>\r\n                                            <option value=\"19\">19&#37;</option>\r\n                                            <option value=\"20\">20&#37;</option>\r\n                                            <option value=\"21\">21&#37;</option>\r\n                                            <option value=\"22\">22&#37;</option>\r\n                                            <option value=\"23\">23&#37;</option>\r\n                                            <option value=\"24\">24&#37;</option>\r\n                                            <option value=\"25\">25&#37;</option>\r\n                                            <option value=\"26\">26&#37;</option>\r\n                                            <option value=\"27\">27&#37;</option>\r\n                                            <option value=\"28\">28&#37;</option>\r\n                                            <option value=\"29\">29&#37;</option>\r\n                                            <option value=\"30\">30&#37;</option>\r\n                                            <option value=\"31\">31&#37;</option>\r\n                                            <option value=\"32\">32&#37;</option>\r\n                                            <option value=\"33\">33&#37;</option>\r\n                                            <option value=\"34\">34&#37;</option>\r\n                                            <option value=\"35\">35&#37;</option>\r\n                                            <option value=\"36\">36&#37;</option>\r\n                                            <option value=\"37\">37&#37;</option>\r\n                                            <option value=\"38\">38&#37;</option>\r\n                                            <option value=\"39\">39&#37;</option>\r\n                                            <option value=\"40\">40&#37;</option>\r\n                                            <option value=\"41\">41&#37;</option>\r\n                                            <option value=\"42\">42&#37;</option>\r\n                                            <option value=\"43\">43&#37;</option>\r\n                                            <option value=\"44\">44&#37;</option>\r\n                                            <option value=\"45\">45&#37;</option>\r\n                                            <option value=\"46\">46&#37;</option>\r\n                                            <option value=\"47\">47&#37;</option>\r\n                                            <option value=\"48\">47&#37;</option>\r\n                                            <option value=\"49\">49&#37;</option>\r\n                                            <option value=\"50\">50&#37;</option>\r\n                                            <option value=\"51\">51&#37;</option>\r\n                                            <option value=\"52\">52&#37;</option>\r\n                                            <option value=\"53\">53&#37;</option>\r\n                                            <option value=\"54\">54&#37;</option>\r\n                                            <option value=\"55\">55&#37;</option>\r\n                                            <option value=\"56\">56&#37;</option>\r\n                                            <option value=\"57\">57&#37;</option>\r\n                                            <option value=\"58\">58&#37;</option>\r\n                                            <option value=\"59\">59&#37;</option>\r\n                                            <option value=\"60\">60&#37;</option>\r\n                                            <option value=\"61\">61&#37;</option>\r\n                                            <option value=\"62\">62&#37;</option>\r\n                                            <option value=\"63\">63&#37;</option>\r\n                                            <option value=\"64\">64&#37;</option>\r\n                                            <option value=\"65\">65&#37;</option>\r\n                                            <option value=\"66\">66&#37;</option>\r\n                                            <option value=\"67\">67&#37;</option>\r\n                                            <option value=\"68\">68&#37;</option>\r\n                                            <option value=\"69\">69&#37;</option>\r\n                                            <option value=\"70\">70&#37;</option>\r\n                                            <option value=\"71\">71&#37;</option>\r\n                                            <option value=\"72\">72&#37;</option>\r\n                                            <option value=\"73\">73&#37;</option>\r\n                                            <option value=\"74\">74&#37;</option>\r\n                                            <option value=\"75\">75&#37;</option>\r\n                                            <option value=\"76\">76&#37;</option>\r\n                                            <option value=\"77\">77&#37;</option>\r\n                                            <option value=\"78\">78&#37;</option>\r\n                                            <option value=\"79\">79&#37;</option>\r\n                                            <option value=\"80\">80&#37;</option>\r\n                                            <option value=\"81\">81&#37;</option>\r\n                                            <option value=\"82\">82&#37;</option>\r\n                                            <option value=\"83\">83&#37;</option>\r\n                                            <option value=\"84\">84&#37;</option>\r\n                                            <option value=\"85\">85&#37;</option>\r\n                                            <option value=\"86\">86&#37;</option>\r\n                                            <option value=\"87\">87&#37;</option>\r\n                                            <option value=\"88\">88&#37;</option>\r\n                                            <option value=\"89\">89&#37;</option>\r\n                                            <option value=\"90\">90&#37;</option>\r\n                                            <option value=\"91\">91&#37;</option>\r\n                                            <option value=\"92\">92&#37;</option>\r\n                                            <option value=\"93\">93&#37;</option>\r\n                                            <option value=\"94\">94&#37;</option>\r\n                                            <option value=\"95\">95&#37;</option>\r\n                                            <option value=\"96\">96&#37;</option>\r\n                                            <option value=\"97\">97&#37;</option>\r\n                                            <option value=\"98\">98&#37;</option>\r\n                                            <option value=\"99\">99&#37;</option>\r\n                                            <option value=\"100\">100&#37;</option>\r\n                                        </select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4\">Labor &amp; Overhead</label>\r\n                                    <div class=\"col-sm-7\">\r\n                                        <select>\r\n                                            <option value=\"0\">0&#37;</option>\r\n                                            <option value=\"1\">1&#37;</option>\r\n                                            <option value=\"2\">2&#37;</option>\r\n                                            <option value=\"3\">3&#37;</option>\r\n                                            <option value=\"4\">4&#37;</option>\r\n                                            <option value=\"5\">5&#37;</option>\r\n                                            <option value=\"6\">6&#37;</option>\r\n                                            <option value=\"7\">7&#37;</option>\r\n                                            <option value=\"8\">8&#37;</option>\r\n                                            <option value=\"9\">9&#37;</option>\r\n                                            <option value=\"10\">10&#37;</option>\r\n                                            <option value=\"11\">11&#37;</option>\r\n                                            <option value=\"12\">12&#37;</option>\r\n                                            <option value=\"13\">13&#37;</option>\r\n                                            <option value=\"14\">14&#37;</option>\r\n                                            <option value=\"15\">15&#37;</option>\r\n                                            <option value=\"16\">16&#37;</option>\r\n                                            <option value=\"17\">17&#37;</option>\r\n                                            <option value=\"18\">18&#37;</option>\r\n                                            <option value=\"19\">19&#37;</option>\r\n                                            <option value=\"20\">20&#37;</option>\r\n                                            <option value=\"21\">21&#37;</option>\r\n                                            <option value=\"22\">22&#37;</option>\r\n                                            <option value=\"23\">23&#37;</option>\r\n                                            <option value=\"24\">24&#37;</option>\r\n                                            <option value=\"25\">25&#37;</option>\r\n                                            <option value=\"26\">26&#37;</option>\r\n                                            <option value=\"27\">27&#37;</option>\r\n                                            <option value=\"28\">28&#37;</option>\r\n                                            <option value=\"29\">29&#37;</option>\r\n                                            <option value=\"30\">30&#37;</option>\r\n                                            <option value=\"31\">31&#37;</option>\r\n                                            <option value=\"32\">32&#37;</option>\r\n                                            <option value=\"33\">33&#37;</option>\r\n                                            <option value=\"34\">34&#37;</option>\r\n                                            <option value=\"35\">35&#37;</option>\r\n                                            <option value=\"36\">36&#37;</option>\r\n                                            <option value=\"37\">37&#37;</option>\r\n                                            <option value=\"38\">38&#37;</option>\r\n                                            <option value=\"39\">39&#37;</option>\r\n                                            <option value=\"40\">40&#37;</option>\r\n                                            <option value=\"41\">41&#37;</option>\r\n                                            <option value=\"42\">42&#37;</option>\r\n                                            <option value=\"43\">43&#37;</option>\r\n                                            <option value=\"44\">44&#37;</option>\r\n                                            <option value=\"45\">45&#37;</option>\r\n                                            <option value=\"46\">46&#37;</option>\r\n                                            <option value=\"47\">47&#37;</option>\r\n                                            <option value=\"48\">47&#37;</option>\r\n                                            <option value=\"49\">49&#37;</option>\r\n                                            <option value=\"50\">50&#37;</option>\r\n                                            <option value=\"51\">51&#37;</option>\r\n                                            <option value=\"52\">52&#37;</option>\r\n                                            <option value=\"53\">53&#37;</option>\r\n                                            <option value=\"54\">54&#37;</option>\r\n                                            <option value=\"55\">55&#37;</option>\r\n                                            <option value=\"56\">56&#37;</option>\r\n                                            <option value=\"57\">57&#37;</option>\r\n                                            <option value=\"58\">58&#37;</option>\r\n                                            <option value=\"59\">59&#37;</option>\r\n                                            <option value=\"60\">60&#37;</option>\r\n                                            <option value=\"61\">61&#37;</option>\r\n                                            <option value=\"62\">62&#37;</option>\r\n                                            <option value=\"63\">63&#37;</option>\r\n                                            <option value=\"64\">64&#37;</option>\r\n                                            <option value=\"65\">65&#37;</option>\r\n                                            <option value=\"66\">66&#37;</option>\r\n                                            <option value=\"67\">67&#37;</option>\r\n                                            <option value=\"68\">68&#37;</option>\r\n                                            <option value=\"69\">69&#37;</option>\r\n                                            <option value=\"70\">70&#37;</option>\r\n                                            <option value=\"71\">71&#37;</option>\r\n                                            <option value=\"72\">72&#37;</option>\r\n                                            <option value=\"73\">73&#37;</option>\r\n                                            <option value=\"74\">74&#37;</option>\r\n                                            <option value=\"75\">75&#37;</option>\r\n                                            <option value=\"76\">76&#37;</option>\r\n                                            <option value=\"77\">77&#37;</option>\r\n                                            <option value=\"78\">78&#37;</option>\r\n                                            <option value=\"79\">79&#37;</option>\r\n                                            <option value=\"80\">80&#37;</option>\r\n                                            <option value=\"81\">81&#37;</option>\r\n                                            <option value=\"82\">82&#37;</option>\r\n                                            <option value=\"83\">83&#37;</option>\r\n                                            <option value=\"84\">84&#37;</option>\r\n                                            <option value=\"85\">85&#37;</option>\r\n                                            <option value=\"86\">86&#37;</option>\r\n                                            <option value=\"87\">87&#37;</option>\r\n                                            <option value=\"88\">88&#37;</option>\r\n                                            <option value=\"89\">89&#37;</option>\r\n                                            <option value=\"90\">90&#37;</option>\r\n                                            <option value=\"91\">91&#37;</option>\r\n                                            <option value=\"92\">92&#37;</option>\r\n                                            <option value=\"93\">93&#37;</option>\r\n                                            <option value=\"94\">94&#37;</option>\r\n                                            <option value=\"95\">95&#37;</option>\r\n                                            <option value=\"96\">96&#37;</option>\r\n                                            <option value=\"97\">97&#37;</option>\r\n                                            <option value=\"98\">98&#37;</option>\r\n                                            <option value=\"99\">99&#37;</option>\r\n                                            <option value=\"100\">100&#37;</option>\r\n                                        </select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4\">Misc Charges</label>\r\n                                    <div class=\"col-sm-7\">\r\n                                        <select>\r\n                                            <option value=\"0\">0&#37;</option>\r\n                                            <option value=\"1\">1&#37;</option>\r\n                                            <option value=\"2\">2&#37;</option>\r\n                                            <option value=\"3\">3&#37;</option>\r\n                                            <option value=\"4\">4&#37;</option>\r\n                                            <option value=\"5\">5&#37;</option>\r\n                                            <option value=\"6\">6&#37;</option>\r\n                                            <option value=\"7\">7&#37;</option>\r\n                                            <option value=\"8\">8&#37;</option>\r\n                                            <option value=\"9\">9&#37;</option>\r\n                                            <option value=\"10\">10&#37;</option>\r\n                                            <option value=\"11\">11&#37;</option>\r\n                                            <option value=\"12\">12&#37;</option>\r\n                                            <option value=\"13\">13&#37;</option>\r\n                                            <option value=\"14\">14&#37;</option>\r\n                                            <option value=\"15\">15&#37;</option>\r\n                                            <option value=\"16\">16&#37;</option>\r\n                                            <option value=\"17\">17&#37;</option>\r\n                                            <option value=\"18\">18&#37;</option>\r\n                                            <option value=\"19\">19&#37;</option>\r\n                                            <option value=\"20\">20&#37;</option>\r\n                                            <option value=\"21\">21&#37;</option>\r\n                                            <option value=\"22\">22&#37;</option>\r\n                                            <option value=\"23\">23&#37;</option>\r\n                                            <option value=\"24\">24&#37;</option>\r\n                                            <option value=\"25\">25&#37;</option>\r\n                                            <option value=\"26\">26&#37;</option>\r\n                                            <option value=\"27\">27&#37;</option>\r\n                                            <option value=\"28\">28&#37;</option>\r\n                                            <option value=\"29\">29&#37;</option>\r\n                                            <option value=\"30\">30&#37;</option>\r\n                                            <option value=\"31\">31&#37;</option>\r\n                                            <option value=\"32\">32&#37;</option>\r\n                                            <option value=\"33\">33&#37;</option>\r\n                                            <option value=\"34\">34&#37;</option>\r\n                                            <option value=\"35\">35&#37;</option>\r\n                                            <option value=\"36\">36&#37;</option>\r\n                                            <option value=\"37\">37&#37;</option>\r\n                                            <option value=\"38\">38&#37;</option>\r\n                                            <option value=\"39\">39&#37;</option>\r\n                                            <option value=\"40\">40&#37;</option>\r\n                                            <option value=\"41\">41&#37;</option>\r\n                                            <option value=\"42\">42&#37;</option>\r\n                                            <option value=\"43\">43&#37;</option>\r\n                                            <option value=\"44\">44&#37;</option>\r\n                                            <option value=\"45\">45&#37;</option>\r\n                                            <option value=\"46\">46&#37;</option>\r\n                                            <option value=\"47\">47&#37;</option>\r\n                                            <option value=\"48\">47&#37;</option>\r\n                                            <option value=\"49\">49&#37;</option>\r\n                                            <option value=\"50\">50&#37;</option>\r\n                                            <option value=\"51\">51&#37;</option>\r\n                                            <option value=\"52\">52&#37;</option>\r\n                                            <option value=\"53\">53&#37;</option>\r\n                                            <option value=\"54\">54&#37;</option>\r\n                                            <option value=\"55\">55&#37;</option>\r\n                                            <option value=\"56\">56&#37;</option>\r\n                                            <option value=\"57\">57&#37;</option>\r\n                                            <option value=\"58\">58&#37;</option>\r\n                                            <option value=\"59\">59&#37;</option>\r\n                                            <option value=\"60\">60&#37;</option>\r\n                                            <option value=\"61\">61&#37;</option>\r\n                                            <option value=\"62\">62&#37;</option>\r\n                                            <option value=\"63\">63&#37;</option>\r\n                                            <option value=\"64\">64&#37;</option>\r\n                                            <option value=\"65\">65&#37;</option>\r\n                                            <option value=\"66\">66&#37;</option>\r\n                                            <option value=\"67\">67&#37;</option>\r\n                                            <option value=\"68\">68&#37;</option>\r\n                                            <option value=\"69\">69&#37;</option>\r\n                                            <option value=\"70\">70&#37;</option>\r\n                                            <option value=\"71\">71&#37;</option>\r\n                                            <option value=\"72\">72&#37;</option>\r\n                                            <option value=\"73\">73&#37;</option>\r\n                                            <option value=\"74\">74&#37;</option>\r\n                                            <option value=\"75\">75&#37;</option>\r\n                                            <option value=\"76\">76&#37;</option>\r\n                                            <option value=\"77\">77&#37;</option>\r\n                                            <option value=\"78\">78&#37;</option>\r\n                                            <option value=\"79\">79&#37;</option>\r\n                                            <option value=\"80\">80&#37;</option>\r\n                                            <option value=\"81\">81&#37;</option>\r\n                                            <option value=\"82\">82&#37;</option>\r\n                                            <option value=\"83\">83&#37;</option>\r\n                                            <option value=\"84\">84&#37;</option>\r\n                                            <option value=\"85\">85&#37;</option>\r\n                                            <option value=\"86\">86&#37;</option>\r\n                                            <option value=\"87\">87&#37;</option>\r\n                                            <option value=\"88\">88&#37;</option>\r\n                                            <option value=\"89\">89&#37;</option>\r\n                                            <option value=\"90\">90&#37;</option>\r\n                                            <option value=\"91\">91&#37;</option>\r\n                                            <option value=\"92\">92&#37;</option>\r\n                                            <option value=\"93\">93&#37;</option>\r\n                                            <option value=\"94\">94&#37;</option>\r\n                                            <option value=\"95\">95&#37;</option>\r\n                                            <option value=\"96\">96&#37;</option>\r\n                                            <option value=\"97\">97&#37;</option>\r\n                                            <option value=\"98\">98&#37;</option>\r\n                                            <option value=\"99\">99&#37;</option>\r\n                                            <option value=\"100\">100&#37;</option>\r\n                                        </select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"clear\"></div>\r\n                            </div>\r\n                            <div class=\"flat-data bg-grey\">\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4\">Total Work Order</label>\r\n                                    <div class=\"col-sm-7\">$ <input type=\"text\" class=\"form-control\" /></div>\r\n                                </div>\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4\">Material</label>\r\n                                    <div class=\"col-sm-7\">$ <input type=\"text\" class=\"form-control\" /></div>\r\n                                </div>\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4\">Labor &amp; Overhead</label>\r\n                                    <div class=\"col-sm-7\">$ <input type=\"text\" class=\"form-control\" /></div>\r\n                                </div>\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4\">Misc Charges</label>\r\n                                    <div class=\"col-sm-7\">$ <input type=\"text\" class=\"form-control\" /></div>\r\n                                </div>\r\n                                <div class=\"clear\"></div>\r\n                            </div>\r\n                        </div>\r\n                        <br />\r\n                        <!--<a class=\"btn btn-success pull-right\" data-toggle=\"modal\" data-target=\"#createwo\">Submit</a>-->\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-sm-12 buttons-group\">\r\n            <div class=\"x_panel\">\r\n                <div class=\"x_content\">\r\n                    <a class=\"btn btn-warning\" data-toggle=\"modal\" data-target=\"#wf-options\">Workflow</a>\r\n                    <a routerLink=\"/app-work-order-manual-entry-labor-hours\" class=\"btn btn-info\">Add Labor</a>\r\n                    <a routerLink=\"/app-work-order-equipment-list\" class=\"btn btn-info\">Equipment</a>\r\n                    <a routerLink=\"/app-work-order-quote\" class=\"btn btn-info\">WO Quote</a>\r\n                    <a routerLink=\"/app-work-order-complete-material-list\" class=\"btn btn-info\">Complete Material List</a>\r\n                    <a routerLink=\"/app-work-order-shipping\" class=\"btn btn-info\">Shipping??</a>\r\n                    <a routerLink=\"/app-work-order-billing-invoicing\" class=\"btn btn-info\">Billing/Invoicing</a>\r\n                    <a routerLink=\"/app-work-order-analysis\" class=\"btn btn-info\">Analysis</a>\r\n                    <a routerLink=\"/app-work-order-main-component\" class=\"btn btn-info\">Main Component</a>\r\n                    <a routerLink=\"/app-work-order-sub-wo-list\" class=\"btn btn-info\">Sub-WO</a>\r\n                    <a routerLink=\"/app-work-order-memo\" class=\"btn btn-info\">Memo</a>\r\n                    <a routerLink=\"/app-work-order-documents\" class=\"btn btn-info\">Documents</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-sm-12 col-12 \">\r\n            <div class=\"x_panel\">\r\n                <div class=\"x_content\">\r\n                    <div class=\"tab-content\">\r\n\r\n                        <div class=\"table-responsive\">\r\n                            <div class=\"clear mtop5\"></div>\r\n                            <div class=\"default-workflow-table\">\r\n                                <form id=\"\" class=\"lgrey-bg\" name=\"\" action=\"#\" method=\"post\" onsubmit=\"return false;\">\r\n                                    <hr />\r\n                                    <div class=\"col-sm-6 w300\">\r\n                                        <div class=\"form-group col-sm-12\">\r\n                                            <label class=\"control-label col-sm-4 w50\">Actions</label>\r\n                                            <div class=\"col-sm-7\">\r\n                                                <div class=\"input-group\">\r\n                                                    <select id=\"workflowtype\" name=\"workflowtype\" class=\"\">\r\n                                                        <option value=\"assemble\">Assemble</option>\r\n                                                        <option value=\"clean\">Clean</option>\r\n                                                        <option value=\"disassemble\">Disassemble</option>\r\n                                                        <option value=\"evaluate\">Evaluate</option>\r\n                                                        <option value=\"inspect\">Inspect</option>\r\n                                                        <option value=\"qc\">QC</option>\r\n                                                        <option value=\"receive\">Receive</option>\r\n                                                        <option value=\"ship\">Ship</option>\r\n                                                        <option value=\"teardown\">Teardown</option>\r\n                                                        <option value=\"testing\">Testing</option>\r\n                                                    </select>\r\n                                                    <a data-toggle=\"modal\" data-target=\"#addAction\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-sm-6 w300 \">\r\n                                        <div class=\"form-group col-sm-12\">\r\n                                            <label class=\"control-label col-sm-4 w90\">Action Attributes</label>\r\n                                            <div class=\"col-sm-7\">\r\n                                                <div class=\"input-group\">\r\n                                                    <select class=\"mselect\" id=\"cexpertise receive-attributes\" name=\"catadd\" multiple>\r\n                                                        <option value=\"charges\" class=\"charges\">Charges</option>\r\n                                                        <option value=\"directions\" class=\"directions\">Directions</option>\r\n                                                        <option value=\"equipment\" class=\"equipment\">Equipment</option>\r\n                                                        <option value=\"exclusions\" class=\"exclusions\">Exclusions</option>\r\n                                                        <option value=\"expertise\" class=\"expertise\">Expertise</option>\r\n                                                        <option value=\"materiallist\" class=\"materiallist\">Material List</option>\r\n                                                        <option value=\"publications\" class=\"publications\">Publications/CMM</option>\r\n                                                    </select>\r\n                                                    <a href=\"#\" data-toggle=\"modal\" data-target=\"#AddActionAttribute\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n\r\n                                    <div class=\"col-sm-6 w100 text-right \">\r\n                                        <a href=\"javascript:void(0)\" class=\"btn btn-default black-search-button \">Add</a>\r\n                                    </div>\r\n                                </form>\r\n                                <div class=\"col-md-12 col-sm-12 col-12 content-block workflow-block\">\r\n                                    <div class=\"x_panel\">\r\n                                        <div id=\"adminsearchlocationajax\" class=\"table-responsive default-bg clear\">\r\n                                            <div class=\"col-md-12 col-sm-12 col-12 workflow-attributes-block\">\r\n                                                <ul class=\"nav nav-pills tabs-left\" role=\"tablist\">\r\n                                                    <li class=\"a1\"><a href=\"#step1\" data-toggle=\"tab\" aria-expanded=\"true\" class=\"active\">Receive</a></li>\r\n                                                    <li class=\"a2\"><a href=\"#step2\" data-toggle=\"tab\">Inspect</a></li>\r\n                                                    <li class=\"a3\"><a href=\"#step3\" data-toggle=\"tab\">Evaluate</a></li>\r\n                                                    <li class=\"a4\"><a href=\"#step4\" data-toggle=\"tab\">Teardown</a></li>\r\n                                                    <li class=\"a5\"><a href=\"#step5\" data-toggle=\"tab\">Disassemble</a></li>\r\n                                                    <li class=\"a6\"><a href=\"#step6\" data-toggle=\"tab\">Assemble</a></li>\r\n                                                    <li class=\"a7\"><a href=\"#step7\" data-toggle=\"tab\">Testing</a></li>\r\n                                                    <li class=\"a8\"><a href=\"#step8\" data-toggle=\"tab\">QC</a></li>\r\n                                                    <li class=\"a9\"><a href=\"#step9\" data-toggle=\"tab\">Ship</a></li>\r\n                                                    <li class=\"a10\"><a href=\"#step10\" data-toggle=\"tab\">Clean</a></li>\r\n                                                </ul>\r\n                                                <div class=\"tab-content form-bg\" id=\"workflow-attributes-block\">\r\n                                                    <div class=\"tab-pane step-data active\" id=\"step1\">\r\n                                                        <div class=\"attribute-heading\">Receive</div>\r\n                                                        <div class=\"receive-attributes-block active action-attributes-block\">\r\n                                                            <ul class=\"nav nav-pills attributes-tabs\" role=\"tablist\">\r\n                                                                <li><a data-toggle=\"pill\" href=\"#receive-home\" class=\"active\">Material List</a></li>\r\n                                                                <li><a data-toggle=\"pill\" href=\"#receive-menu1\">Equipment List</a></li>\r\n                                                                <li><a data-toggle=\"pill\" href=\"#receive-menu2\">Expertise</a></li>\r\n                                                                <li><a data-toggle=\"pill\" href=\"#receive-menu3\">Directions</a></li>\r\n                                                                <li><a data-toggle=\"pill\" href=\"#receive-menu4\">Publications/CMM</a></li>\r\n                                                                <li><a data-toggle=\"pill\" href=\"#receive-menu5\">Charges</a></li>\r\n                                                                <li><a data-toggle=\"pill\" href=\"#receive-menu6\">Exclusions</a></li>\r\n                                                            </ul>\r\n                                                            <div class=\"clear\"></div>\r\n                                                            <div id=\"receive-home\" class=\"tab-pane in active form-bg\">\r\n                                                                <P class=\"cat-heading cat1\">Add New Material List <i class=\"fa fa-plus cat1-i\" ng-click=\"addMaterial()\"></i></P>\r\n\r\n                                                                <div class=\"fixed-table-container\">\r\n                                                                    <div class=\"fixed-table-container-inner table-responsive cat1-table\">\r\n\r\n                                                                        <table class=\"table table-bordered table-fixed mltablehfixed\">\r\n                                                                            <thead>\r\n                                                                                <tr>\r\n                                                                                    <th><div class=\"th-inner\">PN</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Description </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Item Classificcation </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Qty </div></th>\r\n                                                                                    <th><div class=\"th-inner\">UOM </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Condition </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Unit Cost </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Ext. Cost </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Provision </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Deferred </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Figure ID </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Actions </div></th>\r\n                                                                                </tr>\r\n                                                                            </thead>\r\n                                                                            <tbody>\r\n\r\n                                                                                <tr ng-repeat=\"material in assets1\">\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <i class=\"fa fa-search\"></i>\r\n                                                                                            <input type=\"text\" class=\"form-control numberids\" name=\"\" placeholder=\"ID\" />\r\n                                                                                        </div>\r\n                                                                                        <a routerLink=\"/app-item-master-stock-setup\" target=\"_blank\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                                    </td>\r\n                                                                                    <td>\r\n                                                                                        <input class=\"w100\" name=\"\" />\r\n                                                                                    </td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <i class=\"fa fa-search\"></i>\r\n                                                                                            <input type=\"text\" class=\"form-control itemclassification\" name=\"\" placeholder=\"ID\" />\r\n                                                                                        </div>\r\n                                                                                        <a routerLink=\"/app-item-classification\" target=\"_blank\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                                    </td>\r\n                                                                                    <td><input class=\"w50\" type=\"number\" name=\"\" value=\"1\" /></td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <select class=\"w70\">\r\n                                                                                                <option value=\"Ctr\">Ctr</option>\r\n                                                                                                <option value=\"Ea\">Ea</option>\r\n                                                                                                <option value=\"Ft\">Ft</option>\r\n                                                                                                <option value=\"g\">g</option>\r\n                                                                                                <option value=\"Gal\">Gal</option>\r\n                                                                                                <option value=\"inch\">inch</option>\r\n                                                                                                <option value=\"kg\">kg</option>\r\n                                                                                                <option value=\"lbs\">lbs</option>\r\n                                                                                                <option value=\"Ltr\">Ltr</option>\r\n                                                                                                <option value=\"Mtr\">Mtr</option>\r\n                                                                                                <option value=\"Oz\">Oz</option>\r\n                                                                                                <option value=\"Yd\">Yd</option>\r\n                                                                                            </select>\r\n                                                                                        </div>\r\n                                                                                        <a data-toggle=\"modal\" data-target=\"#addUom\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                                    </td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <select class=\"w70\">\r\n                                                                                                <option value=\"AR\">AR</option>\r\n                                                                                                <option value=\"AS-IS\">AS-IS</option>\r\n                                                                                                <option value=\"NEW\">NEW</option>\r\n                                                                                                <option value=\"OVH\">OVH</option>\r\n                                                                                                <option value=\"REP\">REP</option>\r\n                                                                                                <option value=\"SRV\">SRV</option>\r\n                                                                                            </select>\r\n                                                                                        </div>\r\n                                                                                        <a data-toggle=\"modal\" data-target=\"#condition\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                                    </td>\r\n\r\n                                                                                    <td><input class=\"w50 materialunitcost amount\" name=\"\" /></td>\r\n                                                                                    <td><input class=\"w50 materialextcost amount attributeextcost\" name=\"\" /></td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <select class=\"w70 ng-pristine ng-valid ng-empty ng-touched\" name=\"provision0\" ng-model=\"material.provision\" ng-enabled=\"!enabledMaterialsavedEdit[0]\">\r\n                                                                                                <option value=\"Exchange\">Exchange</option>\r\n                                                                                                <option value=\"Loan\">Loan</option>\r\n                                                                                                <option value=\"Repair\">Repair</option>\r\n                                                                                                <option value=\"Replace\">Replace</option>\r\n                                                                                                <option value=\"Turn-in\">Turn-in</option>\r\n                                                                                                <option value=\"WO\">WO</option>\r\n                                                                                            </select>\r\n                                                                                        </div>\r\n                                                                                        <a routerLink=\"/app-provision\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                                    </td>\r\n                                                                                    <td>\r\n                                                                                        <select class=\"w50 ng-pristine ng-valid ng-empty ng-touched\" name=\"deferred0\" ng-model=\"material.deferred\" ng-enabled=\"!enabledMaterialsavedEdit[0]\">\r\n                                                                                            <option value=\"No\">No</option>\r\n                                                                                            <option value=\"Yes\">Yes</option>\r\n                                                                                        </select>\r\n                                                                                    </td>\r\n                                                                                    <td><input class=\"w70\" type=\"text\" name=\"\" value=\"\" /></td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"buttons\">\r\n                                                                                            <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                                        </div>\r\n                                                                                    </td>\r\n                                                                                </tr>\r\n\r\n                                                                                <tr class=\"attributes-total\">\r\n                                                                                    <td colspan=\"6\">Total Material Cost:</td>\r\n                                                                                    <td><input class=\"materialunitcosttotal\" type=\"text\" disabled /></td>\r\n                                                                                    <td><input class=\"materialextcosttotal attributeextcosttotal\" type=\"text\" disabled /></td>\r\n                                                                                </tr>\r\n                                                                            </tbody>\r\n                                                                        </table>\r\n                                                                    </div>\r\n                                                                </div>\r\n\r\n                                                            </div>\r\n                                                            <div id=\"receive-menu1\" class=\"tab-pane form-bg\">\r\n                                                                <P class=\"cat-heading cat2\">Add New Equipment List <i class=\"fa fa-plus cat1-i\" ng-click=\"addEquipment()\"></i></P>\r\n\r\n                                                                <div class=\"fixed-table-container\">\r\n                                                                    <div class=\"fixed-table-container-inner table-responsive cat2-table\">\r\n                                                                        <table class=\"table table-bordered table-fixed \">\r\n                                                                            <thead>\r\n                                                                                <tr>\r\n                                                                                    <th><div class=\"th-inner\">Item #</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Item Description</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Item Classification</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Qty</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                                </tr>\r\n                                                                            </thead>\r\n                                                                            <tbody>\r\n\r\n                                                                                <tr ng-repeat=\"equipment in assets2\">\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <i class=\"fa fa-search\"></i>\r\n                                                                                            <input type=\"text\" class=\"form-control numberids\" name=\"\" placeholder=\"ID\" />\r\n                                                                                        </div>\r\n                                                                                        <a routerLink=\"/app-item-master-equipment-setup\" target=\"_blank\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                                    </td>\r\n                                                                                    <td><input name=\"\" /></td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <select class=\"w70 ng-pristine ng-valid ng-empty ng-touched\" name=\"materialType0\" ng-model=\"material.materialType\" ng-enabled=\"!enabledMaterialsavedEdit[0]\">\r\n                                                                                                <option value=\"Consumable\">Consumable</option>\r\n                                                                                                <option value=\"Equipment\">Equipment</option>\r\n                                                                                                <option value=\"Expendable\">Expendable</option>\r\n                                                                                                <option value=\"Kit\">Kit</option>\r\n                                                                                                <option value=\"Rotatable\">Rotatable</option>\r\n                                                                                            </select>\r\n                                                                                        </div>\r\n                                                                                        <a href=\"#\" data-toggle=\"modal\" data-target=\"#addType\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                                    </td>\r\n                                                                                    <td><input class=\"w50\" type=\"number\" name=\"\" value=\"1\" /></td>\r\n\r\n                                                                                    <td>\r\n                                                                                        <div class=\"buttons\">\r\n                                                                                            <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                                        </div>\r\n                                                                                    </td>\r\n                                                                                </tr>\r\n\r\n                                                                            </tbody>\r\n                                                                        </table>\r\n                                                                    </div>\r\n                                                                </div>\r\n\r\n                                                            </div>\r\n                                                            <div id=\"receive-menu2\" class=\"tab-pane form-bg\">\r\n                                                                <P class=\"cat-heading cat3\">Add New Expertise <i class=\"fa fa-plus cat1-i\" ng-click=\"addExpertise()\"></i></P>\r\n\r\n                                                                <div class=\"fixed-table-container\">\r\n                                                                    <div class=\"fixed-table-container-inner table-responsive cat3-table\">\r\n                                                                        <table class=\"table table-bordered table-fixed\">\r\n                                                                            <thead>\r\n                                                                                <tr>\r\n                                                                                    <th><div class=\"th-inner\">Expertise Type</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Estimated Hours</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Standard Rate</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Estimated Cost</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                                </tr>\r\n                                                                            </thead>\r\n                                                                            <tbody>\r\n\r\n                                                                                <tr ng-repeat=\"expertise in assets3\">\r\n                                                                                    <td>\r\n                                                                                        <select>\r\n                                                                                            <option value=\"\"></option>\r\n                                                                                            <option value=\"Auditor\">Auditor</option>\r\n                                                                                            <option value=\"Engineer\">Engineer</option>\r\n                                                                                            <option value=\"Inspector\">Inspector</option>\r\n                                                                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                                                                            <option value=\"Quality\">Quality</option>\r\n                                                                                            <option value=\"Receiver\">Receiver</option>\r\n                                                                                            <option value=\"Technician\">Technician</option>\r\n                                                                                        </select>\r\n                                                                                    </td>\r\n                                                                                    <td><input class=\"hours w50\" name=\"\" /></td>\r\n                                                                                    <td><input name=\"\" class=\"w50 expertisestandardrate amount\" /></td>\r\n                                                                                    <td><input class=\"w100 expertiseestimatedcost attributeextcost amount\" name=\"\" /></td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"buttons\">\r\n                                                                                            <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                                        </div>\r\n                                                                                    </td>\r\n                                                                                </tr>\r\n\r\n                                                                                <tr class=\"attributes-total\">\r\n                                                                                    <td colspan=\"2\">Total Expertise Cost:</td>\r\n                                                                                    <td><input class=\"expertisestandardratetotal\" type=\"text\" disabled /></td>\r\n                                                                                    <td><input class=\"expertiseestimatedcosttotal attributeextcosttotal\" type=\"text\" disabled /></td>\r\n                                                                                </tr>\r\n                                                                            </tbody>\r\n                                                                        </table>\r\n                                                                    </div>\r\n                                                                </div>\r\n\r\n                                                            </div>\r\n                                                            <div id=\"receive-menu3\" class=\"tab-pane form-bg\">\r\n                                                                <P class=\"cat-heading cat3\">Directions</P>\r\n                                                                <div class=\"form-group col-sm-3 mtop10\">\r\n                                                                    <label class=\"control-label col-sm-3\">Action</label>\r\n                                                                    <div class=\"col-sm-8 col-offset-1\">\r\n                                                                        <input class=\"form-control\" type=\"text\" id=\"\" name=\"\" placeholder=\"Action\">\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"form-group col-sm-3 mtop10\">\r\n                                                                    <label class=\"control-label col-sm-4\">Direction Name</label>\r\n                                                                    <div class=\"col-sm-7 col-offset-1\">\r\n                                                                        <input class=\"form-control\" type=\"text\" placeholder=\"Direction Name\">\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"form-group col-sm-2 mtop10\">\r\n                                                                    <label class=\"control-label col-sm-6\">Sequence</label>\r\n                                                                    <div class=\"col-sm-4 col-offset-1\">\r\n                                                                        <input class=\"form-control w50\" type=\"number\" value=\"1\" placeholder=\"Sequence\">\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"form-group col-sm-4 mtop10\">\r\n                                                                    <label class=\"control-label col-sm-2\">Memo</label>\r\n                                                                    <div class=\"col-sm-9 col-offset-1\">\r\n                                                                        <textarea placeholder=\"Memo\" id=\"\" name=\"\" class=\"form-control directon-memo\" rows=\"1\"></textarea>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                            <div id=\"receive-menu4\" class=\"tab-pane fade form-bg\">\r\n                                                                <P class=\"cat-heading cat4\">Publications/CMM</P>\r\n                                                                <div class=\"col-sm-5 mtop10\">\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Entry Date</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control datepicker\" type=\"text\" disabled=\"disabled\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Action</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control\" type=\"text\" placeholder=\"Action Name\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Publication ID  </label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control\" type=\"text\" placeholder=\"Publication ID\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Publication Description</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <textarea id=\"\" name=\"\" placeholder=\"Publication Description\" rows=\"3\" class=\"form-control margin0\"></textarea>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Publication Type</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control\" type=\"text\" placeholder=\"Publication Type\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Author/Source/Directive</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Vendor Name\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Published By</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Published By\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Platform</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Platform\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Model</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Model\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">ATA-Main</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"ATA-Main\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">ATA-Sub Chapter</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"ATA-Sub Chapter\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">ATA-position/Zone</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"ATA-position/Zone\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Location</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Location\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div><!--end-->\r\n                                                                <div class=\"col-sm-4 mtop10\">\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Revision</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control revision-checkbox\" type=\"checkbox\" id=\"\" name=\"\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <!--Hidden Block-->\r\n                                                                    <div class=\"revision-block bg-grey\">\r\n                                                                        <hr>\r\n                                                                        <div class=\"form-group col-sm-12\">\r\n                                                                            <label class=\"control-label col-sm-4\">Revision ID </label>\r\n                                                                            <div class=\"col-sm-7\">\r\n                                                                                <input class=\"form-control\" type=\"text\" placeholder=\"Revision ID\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                        <div class=\"form-group col-sm-12\">\r\n                                                                            <label class=\"control-label col-sm-4\">Revision Date</label>\r\n                                                                            <div class=\"col-sm-7\">\r\n                                                                                <input class=\"form-control datepicker\" type=\"text\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                        <div class=\"form-group col-sm-12\">\r\n                                                                            <label class=\"control-label col-sm-4\">Verified By </label>\r\n                                                                            <div class=\"col-sm-7\">\r\n                                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Employee Name\" autocomplete=\"off\">\r\n                                                                                </div>\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                        <div class=\"form-group col-sm-12\">\r\n                                                                            <label class=\"control-label col-sm-4\">Verified Date</label>\r\n                                                                            <div class=\"col-sm-7\">\r\n                                                                                <input class=\"form-control datepicker\" type=\"text\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                        <div class=\"clear\"></div>\r\n                                                                    </div>\r\n                                                                    <!--end-->\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Verified by</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Verified by\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Next Review Date</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control datepicker\" type=\"text\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Expiration Date</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control datepicker\" type=\"text\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Employee</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Employee\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Revision Date</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control datepicker\" type=\"text\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Image</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"upload\">\r\n                                                                                <input type=\"file\" name=\"upload[]\" id=\"upload\" class=\"inputfile upload-file\" data-multiple-caption=\"{count} files selected\" multiple />\r\n                                                                                <label for=\"upload\">\r\n                                                                                    <figure><i class=\"fa fa-upload\"></i></figure>\r\n                                                                                    <span>Choose a file&hellip;</span>\r\n                                                                                </label>\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Status</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <select>\r\n                                                                                <option value=\"Active\" selected=\"selected\">Active</option>\r\n                                                                                <option value=\"In-Active\">In-Active</option>\r\n                                                                            </select>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Expired</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"\" type=\"checkbox\" id=\"\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div><!--end-->\r\n\r\n                                                                <div class=\"clear\"></div>\r\n                                                            </div>\r\n                                                            <div id=\"receive-menu5\" class=\"tab-pane form-bg\">\r\n                                                                <P class=\"cat-heading cat4\">Add New Charges <i class=\"fa fa-plus cat1-i\" ng-click=\"addCharges()\"></i></P>\r\n                                                                <div class=\"fixed-table-container\">\r\n                                                                    <div class=\"fixed-table-container-inner table-responsive cat4-table\">\r\n                                                                        <table class=\"table table-bordered table-fixed \">\r\n                                                                            <thead>\r\n                                                                                <tr>\r\n                                                                                    <th><div class=\"th-inner\">Type</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Qty</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Unit Cost</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Extended Cost</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                                </tr>\r\n                                                                            </thead>\r\n                                                                            <tbody>\r\n\r\n                                                                                <tr ng-repeat=\"charges in assets4\">\r\n                                                                                    <td>\r\n                                                                                        <select>\r\n                                                                                            <option value=\"\"></option>\r\n                                                                                            <option value=\"AOG Fee\">AOG Fee</option>\r\n                                                                                            <option value=\"Out of Scope\">Out of Scope</option>\r\n                                                                                            <option value=\"Rework\">Rework</option>\r\n                                                                                        </select>\r\n                                                                                    </td>\r\n                                                                                    <td><input type=\"number\" name=\"\" value=\"1\" class=\"w50\" /></td>\r\n                                                                                    <td><input name=\"\" class=\"w100 chargesunitcost amount\"></td>\r\n                                                                                    <td><input name=\"\" class=\"w100 chargesextendedcost attributeextcost amount\"></td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"buttons\">\r\n                                                                                            <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                                        </div>\r\n                                                                                    </td>\r\n                                                                                </tr>\r\n\r\n                                                                                <tr class=\"attributes-total\">\r\n                                                                                    <td colspan=\"2\">Total Charges Cost:</td>\r\n                                                                                    <td><input class=\"chargesunitcosttotal\" type=\"text\" disabled /></td>\r\n                                                                                    <td><input class=\"chargesextendedcosttotal attributeextcosttotal\" type=\"text\" disabled /></td>\r\n                                                                                </tr>\r\n                                                                            </tbody>\r\n                                                                        </table>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                            <div id=\"receive-menu6\" class=\"tab-pane form-bg\">\r\n                                                                <P class=\"cat-heading cat4\">Add New Exclusion <i class=\"fa fa-plus cat1-i\"></i></P>\r\n                                                                <div class=\"fixed-table-container\">\r\n                                                                    <div class=\"fixed-table-container-inner table-responsive cat4-table\">\r\n                                                                        <table class=\"table table-bordered table-fixed \">\r\n                                                                            <thead>\r\n                                                                                <tr>\r\n                                                                                    <th><div class=\"th-inner\">PN</div></th>\r\n                                                                                    <th><div class=\"th-inner\">PN Description</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Notes</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                                </tr>\r\n                                                                            </thead>\r\n                                                                            <tbody>\r\n\r\n                                                                                <tr ng-repeat=\"exclusions in assets5\">\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <i class=\"fa fa-search\"></i>\r\n                                                                                            <input type=\"text\" class=\"form-control numberids\" name=\"\" placeholder=\"ID\" />\r\n                                                                                        </div>\r\n                                                                                    </td>\r\n                                                                                    <td><input class=\"w150\" name=\"\" /></td>\r\n                                                                                    <td><input class=\"w150\" name=\"\" /></td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"buttons\">\r\n                                                                                            <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                                        </div>\r\n                                                                                    </td>\r\n                                                                                </tr>\r\n\r\n                                                                            </tbody>\r\n                                                                        </table>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div>\r\n\r\n\r\n\r\n                                                </div>\r\n                                            </div>\r\n                                            <a routerLink=\"/app-workflow-list\" class=\"btn btn-primary mtop40 black-search-button save-action-btn1 pull-right\">Save Workflow Details</a>\r\n\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"deferred-table\">\r\n                                <h4>Deferred Material List</h4>\r\n                                <table class=\"table table-bordered table-striped po-ro-setup-table\">\r\n                                    <thead>\r\n                                        <tr>\r\n                                            <th>PN</th>\r\n                                            <th>PN Description</th>\r\n                                            <th>Qty Required</th>\r\n                                            <th>Qty Needed</th>\r\n                                            <th>Qty Remaining</th>\r\n                                            <th>Item Classification</th>\r\n                                            <th>Workflow ID</th>\r\n                                            <th>Work Flow Description</th>\r\n                                            <th>Action</th>\r\n                                            <th>Figure ID</th>\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                        <tr>\r\n                                            <td>PN123</td>\r\n                                            <td>Description</td>\r\n                                            <td><input type=\"number\" class=\"form-control\" value=\"3\"></td>\r\n                                            <td><input type=\"number\" class=\"form-control\" value=\"4\"></td>\r\n                                            <td><input type=\"number\" class=\"form-control\" value=\"1\"></td>\r\n                                            <td>\r\n                                                <div class=\"inner-addon right-addon w150 inline-block\">\r\n                                                    <i class=\"fa fa-search\"></i>\r\n                                                    <input type=\"text\" class=\"itemclassification form-control\" id=\"cmname\" name=\"\" placeholder=\"Item Classification\">\r\n                                                </div>\r\n                                            </td>\r\n                                            <td>ACC 123</td>\r\n                                            <td>Workflow Description</td>\r\n                                            <td></td>\r\n                                            <td></td>\r\n                                        </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div id=\"tab1\" class=\"tab-pane fade\">\r\n                            <p class=\"clr-red\">This is Workflow setup funcionality, dynamic functionality is not done in this page.</p>\r\n                            <div class=\"col-sm-6 w300\">\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4 w50\">Actions</label>\r\n                                    <div class=\"col-sm-7\">\r\n                                        <div class=\"input-group\">\r\n                                            <select id=\"workflowtype\" name=\"workflowtype\" class=\"form-control\">\r\n                                                <option value=\"receive\">Receive</option>\r\n                                                <option value=\"inspect\">Inspect</option>\r\n                                                <option value=\"evaluate\">Evaluate</option>\r\n                                                <option value=\"teardown\">Teardown</option>\r\n                                                <option value=\"disassemble\">Disassemble</option>\r\n                                                <option value=\"assemble\">Assemble</option>\r\n                                                <option value=\"testing\">Testing</option>\r\n                                                <option value=\"qc\">QC</option>\r\n                                                <option value=\"ship\">Ship</option>\r\n                                                <option value=\"clean\">Clean</option>\r\n                                            </select>\r\n                                            <a data-toggle=\"modal\" data-target=\"#addAction\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-sm-6 w300 action-attributes-select-block\">\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4 w90\">Action Attributes</label>\r\n                                    <div class=\"col-sm-7\">\r\n                                        <div class=\"input-group\">\r\n                                            <select id=\"cexpertise\" name=\"catadd\" multiple>\r\n                                                <option value=\"materiallist\" class=\"materiallist\">Material List</option>\r\n                                                <option value=\"equipment\" class=\"equipment\">Equipment</option>\r\n                                                <option value=\"expertise\" class=\"expertise\">Expertise</option>\r\n                                                <option value=\"directions\" class=\"directions\">Directions</option>\r\n                                                <option value=\"publications\" class=\"publications\">Publications/CMM</option>\r\n                                                <option value=\"charges\" class=\"charges\">Charges</option>\r\n                                                <option value=\"exclusions\" class=\"exclusions\">Exclusions</option>\r\n                                            </select>\r\n                                            <a data-toggle=\"modal\" data-target=\"#AddActionAttribute\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-sm-6 w100 text-right\">\r\n                                <a href=\"javascript:void(0)\" class=\"btn btn-default black-search-button cat-add-btn cat-add-btn1\">Add</a>\r\n                            </div>\r\n\r\n                            <div id=\"adminsearchlocationajax\" class=\"table-responsive default-bg clear\">\r\n                                <div class=\"col-md-12 col-sm-12 col-12 workflow-attributes-block\">\r\n                                    <ul class=\"nav nav-pills tabs-left\" role=\"tablist\">\r\n                                        <li class=\"a1\"><a href=\"#step1\" data-toggle=\"tab\" aria-expanded=\"true\" class=\"active\">Receive</a></li>\r\n                                        <li class=\"a2\"><a href=\"#step2\" data-toggle=\"tab\">Inspect</a></li>\r\n                                        <li class=\"a3\"><a href=\"#step3\" data-toggle=\"tab\">Evaluate</a></li>\r\n                                        <li class=\"a4\"><a href=\"#step4\" data-toggle=\"tab\">Teardown</a></li>\r\n                                        <li class=\"a5\"><a href=\"#step5\" data-toggle=\"tab\">Disassemble</a></li>\r\n                                        <li class=\"a6\"><a href=\"#step6\" data-toggle=\"tab\">Assemble</a></li>\r\n                                        <li class=\"a7\"><a href=\"#step7\" data-toggle=\"tab\">Testing</a></li>\r\n                                        <li class=\"a8\"><a href=\"#step8\" data-toggle=\"tab\">QC</a></li>\r\n                                        <li class=\"a9\"><a href=\"#step9\" data-toggle=\"tab\">Ship</a></li>\r\n                                        <li class=\"a10\"><a href=\"#step10\" data-toggle=\"tab\">Clean</a></li>\r\n                                    </ul>\r\n                                    <div class=\"tab-content form-bg\" id=\"workflow-attributes-block\">\r\n                                        <div class=\"tab-pane step-data active\" id=\"step1\">\r\n                                            <div class=\"attribute-heading\">Receive</div>\r\n                                            <div class=\"receive-attributes-block active action-attributes-block\">\r\n                                                <ul class=\"nav nav-pills attributes-tabs\" role=\"tablist\">\r\n                                                    <li><a data-toggle=\"pill\" href=\"#receive-home\" class=\"active\">Material List</a></li>\r\n                                                    <li><a data-toggle=\"pill\" href=\"#receive-menu1\">Equipment List</a></li>\r\n                                                    <li><a data-toggle=\"pill\" href=\"#receive-menu2\">Expertise</a></li>\r\n                                                    <li><a data-toggle=\"pill\" href=\"#receive-menu3\">Directions</a></li>\r\n                                                    <li><a data-toggle=\"pill\" href=\"#receive-menu4\">Publications/CMM</a></li>\r\n                                                    <li><a data-toggle=\"pill\" href=\"#receive-menu5\">Charges</a></li>\r\n                                                    <li><a data-toggle=\"pill\" href=\"#receive-menu6\">Exclusions</a></li>\r\n                                                </ul>\r\n                                                <div class=\"clear\"></div>\r\n                                                <div id=\"receive-home\" class=\"tab-pane in active form-bg\">\r\n                                                    <P class=\"cat-heading cat1\">Add New Material List <i class=\"fa fa-plus cat1-i\" ng-click=\"addMaterial()\"></i></P>\r\n\r\n                                                    <div class=\"fixed-table-container\">\r\n                                                        <div class=\"fixed-table-container-inner table-responsive cat1-table\">\r\n\r\n                                                            <table class=\"table table-bordered table-fixed mltablehfixed\">\r\n                                                                <thead>\r\n                                                                    <tr>\r\n                                                                        <th><div class=\"th-inner\">PN</div></th>\r\n                                                                        <th><div class=\"th-inner\">Description </div></th>\r\n                                                                        <th><div class=\"th-inner\">Item Classificcation </div></th>\r\n                                                                        <th><div class=\"th-inner\">Qty </div></th>\r\n                                                                        <th><div class=\"th-inner\">UOM </div></th>\r\n                                                                        <th><div class=\"th-inner\">Condition </div></th>\r\n                                                                        <th><div class=\"th-inner\">Unit Cost </div></th>\r\n                                                                        <th><div class=\"th-inner\">Ext. Cost </div></th>\r\n                                                                        <th><div class=\"th-inner\">Provision </div></th>\r\n                                                                        <th><div class=\"th-inner\">Deferred </div></th>\r\n                                                                        <th><div class=\"th-inner\">Figure ID </div></th>\r\n                                                                        <th><div class=\"th-inner\">Actions </div></th>\r\n                                                                    </tr>\r\n                                                                </thead>\r\n                                                                <tbody>\r\n\r\n                                                                    <tr ng-repeat=\"material in assets1\">\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control numberids\" name=\"\" placeholder=\"ID\" />\r\n                                                                            </div>\r\n                                                                            <a routerLink=\"/app-item-master-stock-setup\" target=\"_blank\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                        </td>\r\n                                                                        <td>\r\n                                                                            <input class=\"w100\" name=\"\" />\r\n                                                                        </td>\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control itemclassification\" name=\"\" placeholder=\"ID\" />\r\n                                                                            </div>\r\n                                                                            <a routerLink=\"/app-item-classification\" target=\"_blank\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                        </td>\r\n                                                                        <td><input class=\"w50\" type=\"number\" name=\"\" value=\"1\" /></td>\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <select class=\"w70\">\r\n                                                                                    <option value=\"Ctr\">Ctr</option>\r\n                                                                                    <option value=\"Ea\">Ea</option>\r\n                                                                                    <option value=\"Ft\">Ft</option>\r\n                                                                                    <option value=\"g\">g</option>\r\n                                                                                    <option value=\"Gal\">Gal</option>\r\n                                                                                    <option value=\"inch\">inch</option>\r\n                                                                                    <option value=\"kg\">kg</option>\r\n                                                                                    <option value=\"lbs\">lbs</option>\r\n                                                                                    <option value=\"Ltr\">Ltr</option>\r\n                                                                                    <option value=\"Mtr\">Mtr</option>\r\n                                                                                    <option value=\"Oz\">Oz</option>\r\n                                                                                    <option value=\"Yd\">Yd</option>\r\n                                                                                </select>\r\n                                                                            </div>\r\n                                                                            <a data-toggle=\"modal\" data-target=\"#addUom\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                        </td>\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <select class=\"w70\">\r\n                                                                                    <option value=\"AR\">AR</option>\r\n                                                                                    <option value=\"AS-IS\">AS-IS</option>\r\n                                                                                    <option value=\"NEW\">NEW</option>\r\n                                                                                    <option value=\"OVH\">OVH</option>\r\n                                                                                    <option value=\"REP\">REP</option>\r\n                                                                                    <option value=\"SRV\">SRV</option>\r\n                                                                                </select>\r\n                                                                            </div>\r\n                                                                            <a data-toggle=\"modal\" data-target=\"#condition\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                        </td>\r\n\r\n                                                                        <td><input class=\"w50 materialunitcost amount\" name=\"\" /></td>\r\n                                                                        <td><input class=\"w50 materialextcost amount attributeextcost\" name=\"\" /></td>\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <select class=\"w70 ng-pristine ng-valid ng-empty ng-touched\" name=\"provision0\" ng-model=\"material.provision\" ng-enabled=\"!enabledMaterialsavedEdit[0]\">\r\n                                                                                    <option value=\"Exchange\">Exchange</option>\r\n                                                                                    <option value=\"Loan\">Loan</option>\r\n                                                                                    <option value=\"Repair\">Repair</option>\r\n                                                                                    <option value=\"Replace\">Replace</option>\r\n                                                                                    <option value=\"Turn-in\">Turn-in</option>\r\n                                                                                    <option value=\"WO\">WO</option>\r\n                                                                                </select>\r\n                                                                            </div>\r\n                                                                            <a routerLink=\"/app-provision\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                        </td>\r\n                                                                        <td>\r\n                                                                            <select class=\"w50 ng-pristine ng-valid ng-empty ng-touched\" name=\"deferred0\" ng-model=\"material.deferred\" ng-enabled=\"!enabledMaterialsavedEdit[0]\">\r\n                                                                                <option value=\"No\">No</option>\r\n                                                                                <option value=\"Yes\">Yes</option>\r\n                                                                            </select>\r\n                                                                        </td>\r\n                                                                        <td><input class=\"w70\" type=\"text\" name=\"\" value=\"\" /></td>\r\n                                                                        <td>\r\n                                                                            <div class=\"buttons\">\r\n                                                                                <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                            </div>\r\n                                                                        </td>\r\n                                                                    </tr>\r\n\r\n                                                                    <tr class=\"attributes-total\">\r\n                                                                        <td colspan=\"6\">Total Material Cost:</td>\r\n                                                                        <td><input class=\"materialunitcosttotal\" type=\"text\" disabled /></td>\r\n                                                                        <td><input class=\"materialextcosttotal attributeextcosttotal\" type=\"text\" disabled /></td>\r\n                                                                    </tr>\r\n                                                                </tbody>\r\n                                                            </table>\r\n                                                        </div>\r\n                                                    </div>\r\n\r\n                                                </div>\r\n                                                <div id=\"receive-menu1\" class=\"tab-pane form-bg\">\r\n                                                    <P class=\"cat-heading cat2\">Add New Equipment List <i class=\"fa fa-plus cat1-i\" ng-click=\"addEquipment()\"></i></P>\r\n\r\n                                                    <div class=\"fixed-table-container\">\r\n                                                        <div class=\"fixed-table-container-inner table-responsive cat2-table\">\r\n                                                            <table class=\"table table-bordered table-fixed \">\r\n                                                                <thead>\r\n                                                                    <tr>\r\n                                                                        <th><div class=\"th-inner\">Item #</div></th>\r\n                                                                        <th><div class=\"th-inner\">Item Description</div></th>\r\n                                                                        <th><div class=\"th-inner\">Item Classification</div></th>\r\n                                                                        <th><div class=\"th-inner\">Qty</div></th>\r\n                                                                        <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                    </tr>\r\n                                                                </thead>\r\n                                                                <tbody>\r\n\r\n                                                                    <tr ng-repeat=\"equipment in assets2\">\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control numberids\" name=\"\" placeholder=\"ID\" />\r\n                                                                            </div>\r\n                                                                            <a routerLink=\"/app-item-master-equipment-setup\" target=\"_blank\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                        </td>\r\n                                                                        <td><input name=\"\" /></td>\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <select class=\"w70 ng-pristine ng-valid ng-empty ng-touched\" name=\"materialType0\" ng-model=\"material.materialType\" ng-enabled=\"!enabledMaterialsavedEdit[0]\">\r\n                                                                                    <option value=\"Consumable\">Consumable</option>\r\n                                                                                    <option value=\"Equipment\">Equipment</option>\r\n                                                                                    <option value=\"Expendable\">Expendable</option>\r\n                                                                                    <option value=\"Kit\">Kit</option>\r\n                                                                                    <option value=\"Rotatable\">Rotatable</option>\r\n                                                                                </select>\r\n                                                                            </div>\r\n                                                                            <a href=\"#\" data-toggle=\"modal\" data-target=\"#addType\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                        </td>\r\n                                                                        <td><input class=\"w50\" type=\"number\" name=\"\" value=\"1\" /></td>\r\n\r\n                                                                        <td>\r\n                                                                            <div class=\"buttons\">\r\n                                                                                <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                            </div>\r\n                                                                        </td>\r\n                                                                    </tr>\r\n\r\n                                                                </tbody>\r\n                                                            </table>\r\n                                                        </div>\r\n                                                    </div>\r\n\r\n                                                </div>\r\n                                                <div id=\"receive-menu2\" class=\"tab-pane form-bg\">\r\n                                                    <P class=\"cat-heading cat3\">Add New Expertise <i class=\"fa fa-plus cat1-i\" ng-click=\"addExpertise()\"></i></P>\r\n\r\n                                                    <div class=\"fixed-table-container\">\r\n                                                        <div class=\"fixed-table-container-inner table-responsive cat3-table\">\r\n                                                            <table class=\"table table-bordered table-fixed\">\r\n                                                                <thead>\r\n                                                                    <tr>\r\n                                                                        <th><div class=\"th-inner\">Expertise Type</div></th>\r\n                                                                        <th><div class=\"th-inner\">Estimated Hours</div></th>\r\n                                                                        <th><div class=\"th-inner\">Standard Rate</div></th>\r\n                                                                        <th><div class=\"th-inner\">Estimated Cost</div></th>\r\n                                                                        <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                    </tr>\r\n                                                                </thead>\r\n                                                                <tbody>\r\n\r\n                                                                    <tr ng-repeat=\"expertise in assets3\">\r\n                                                                        <td>\r\n                                                                            <select>\r\n                                                                                <option value=\"\"></option>\r\n                                                                                <option value=\"Auditor\">Auditor</option>\r\n                                                                                <option value=\"Engineer\">Engineer</option>\r\n                                                                                <option value=\"Inspector\">Inspector</option>\r\n                                                                                <option value=\"Mechanic\">Mechanic</option>\r\n                                                                                <option value=\"Quality\">Quality</option>\r\n                                                                                <option value=\"Receiver\">Receiver</option>\r\n                                                                                <option value=\"Technician\">Technician</option>\r\n                                                                            </select>\r\n                                                                        </td>\r\n                                                                        <td><input class=\"hours w50\" name=\"\" /></td>\r\n                                                                        <td><input name=\"\" class=\"w50 expertisestandardrate amount\" /></td>\r\n                                                                        <td><input class=\"w100 expertiseestimatedcost attributeextcost amount\" name=\"\" /></td>\r\n                                                                        <td>\r\n                                                                            <div class=\"buttons\">\r\n                                                                                <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                            </div>\r\n                                                                        </td>\r\n                                                                    </tr>\r\n\r\n                                                                    <tr class=\"attributes-total\">\r\n                                                                        <td colspan=\"2\">Total Expertise Cost:</td>\r\n                                                                        <td><input class=\"expertisestandardratetotal\" type=\"text\" disabled /></td>\r\n                                                                        <td><input class=\"expertiseestimatedcosttotal attributeextcosttotal\" type=\"text\" disabled /></td>\r\n                                                                    </tr>\r\n                                                                </tbody>\r\n                                                            </table>\r\n                                                        </div>\r\n                                                    </div>\r\n\r\n                                                </div>\r\n                                                <div id=\"receive-menu3\" class=\"tab-pane form-bg\">\r\n                                                    <P class=\"cat-heading cat3\">Directions</P>\r\n                                                    <div class=\"form-group col-sm-3 mtop10\">\r\n                                                        <label class=\"control-label col-sm-3\">Action</label>\r\n                                                        <div class=\"col-sm-8 col-offset-1\">\r\n                                                            <input class=\"form-control\" type=\"text\" id=\"\" name=\"\" placeholder=\"Action\">\r\n                                                        </div>\r\n                                                    </div>\r\n                                                    <div class=\"form-group col-sm-3 mtop10\">\r\n                                                        <label class=\"control-label col-sm-4\">Direction Name</label>\r\n                                                        <div class=\"col-sm-7 col-offset-1\">\r\n                                                            <input class=\"form-control\" type=\"text\" placeholder=\"Direction Name\">\r\n                                                        </div>\r\n                                                    </div>\r\n                                                    <div class=\"form-group col-sm-2 mtop10\">\r\n                                                        <label class=\"control-label col-sm-6\">Sequence</label>\r\n                                                        <div class=\"col-sm-4 col-offset-1\">\r\n                                                            <input class=\"form-control w50\" type=\"number\" value=\"1\" placeholder=\"Sequence\">\r\n                                                        </div>\r\n                                                    </div>\r\n                                                    <div class=\"form-group col-sm-4 mtop10\">\r\n                                                        <label class=\"control-label col-sm-2\">Memo</label>\r\n                                                        <div class=\"col-sm-9 col-offset-1\">\r\n                                                            <textarea placeholder=\"Memo\" id=\"\" name=\"\" class=\"form-control directon-memo\" rows=\"1\"></textarea>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div id=\"receive-menu4\" class=\"tab-pane fade form-bg\">\r\n                                                    <P class=\"cat-heading cat4\">Publications/CMM</P>\r\n                                                    <div class=\"col-sm-5 mtop10\">\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Entry Date</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control datepicker\" type=\"text\" disabled=\"disabled\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Action</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control\" type=\"text\" placeholder=\"Action Name\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Publication ID  </label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control\" type=\"text\" placeholder=\"Publication ID\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Publication Description</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <textarea id=\"\" name=\"\" placeholder=\"Publication Description\" rows=\"3\" class=\"form-control margin0\"></textarea>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Publication Type</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control\" type=\"text\" placeholder=\"Publication Type\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Author/Source/Directive</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Vendor Name\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Published By</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Published By\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Platform</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Platform\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Model</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Model\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">ATA-Main</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"ATA-Main\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">ATA-Sub Chapter</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"ATA-Sub Chapter\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">ATA-position/Zone</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"ATA-position/Zone\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Location</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Location\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div><!--end-->\r\n                                                    <div class=\"col-sm-4 mtop10\">\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Revision</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control revision-checkbox\" type=\"checkbox\" id=\"\" name=\"\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <!--Hidden Block-->\r\n                                                        <div class=\"revision-block bg-grey\">\r\n                                                            <hr>\r\n                                                            <div class=\"form-group col-sm-12\">\r\n                                                                <label class=\"control-label col-sm-4\">Revision ID </label>\r\n                                                                <div class=\"col-sm-7\">\r\n                                                                    <input class=\"form-control\" type=\"text\" placeholder=\"Revision ID\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                            <div class=\"form-group col-sm-12\">\r\n                                                                <label class=\"control-label col-sm-4\">Revision Date</label>\r\n                                                                <div class=\"col-sm-7\">\r\n                                                                    <input class=\"form-control datepicker\" type=\"text\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                            <div class=\"form-group col-sm-12\">\r\n                                                                <label class=\"control-label col-sm-4\">Verified By </label>\r\n                                                                <div class=\"col-sm-7\">\r\n                                                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                                                        <i class=\"fa fa-search\"></i>\r\n                                                                        <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Employee Name\" autocomplete=\"off\">\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                            <div class=\"form-group col-sm-12\">\r\n                                                                <label class=\"control-label col-sm-4\">Verified Date</label>\r\n                                                                <div class=\"col-sm-7\">\r\n                                                                    <input class=\"form-control datepicker\" type=\"text\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                            <div class=\"clear\"></div>\r\n                                                        </div>\r\n                                                        <!--end-->\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Verified by</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Verified by\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Next Review Date</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control datepicker\" type=\"text\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Expiration Date</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control datepicker\" type=\"text\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Employee</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Employee\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Revision Date</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control datepicker\" type=\"text\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Image</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"upload\">\r\n                                                                    <input type=\"file\" name=\"upload[]\" id=\"upload\" class=\"inputfile upload-file\" data-multiple-caption=\"{count} files selected\" multiple />\r\n                                                                    <label for=\"upload\">\r\n                                                                        <figure><i class=\"fa fa-upload\"></i></figure>\r\n                                                                        <span>Choose a file&hellip;</span>\r\n                                                                    </label>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Status</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <select>\r\n                                                                    <option value=\"Active\" selected=\"selected\">Active</option>\r\n                                                                    <option value=\"In-Active\">In-Active</option>\r\n                                                                </select>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Expired</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"\" type=\"checkbox\" id=\"\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div><!--end-->\r\n\r\n                                                    <div class=\"clear\"></div>\r\n                                                </div>\r\n                                                <div id=\"receive-menu5\" class=\"tab-pane form-bg\">\r\n                                                    <P class=\"cat-heading cat4\">Add New Charges <i class=\"fa fa-plus cat1-i\" ng-click=\"addCharges()\"></i></P>\r\n                                                    <div class=\"fixed-table-container\">\r\n                                                        <div class=\"fixed-table-container-inner table-responsive cat4-table\">\r\n                                                            <table class=\"table table-bordered table-fixed \">\r\n                                                                <thead>\r\n                                                                    <tr>\r\n                                                                        <th><div class=\"th-inner\">Type</div></th>\r\n                                                                        <th><div class=\"th-inner\">Qty</div></th>\r\n                                                                        <th><div class=\"th-inner\">Unit Cost</div></th>\r\n                                                                        <th><div class=\"th-inner\">Extended Cost</div></th>\r\n                                                                        <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                    </tr>\r\n                                                                </thead>\r\n                                                                <tbody>\r\n\r\n                                                                    <tr ng-repeat=\"charges in assets4\">\r\n                                                                        <td>\r\n                                                                            <select>\r\n                                                                                <option value=\"\"></option>\r\n                                                                                <option value=\"AOG Fee\">AOG Fee</option>\r\n                                                                                <option value=\"Out of Scope\">Out of Scope</option>\r\n                                                                                <option value=\"Rework\">Rework</option>\r\n                                                                            </select>\r\n                                                                        </td>\r\n                                                                        <td><input type=\"number\" name=\"\" value=\"1\" class=\"w50\" /></td>\r\n                                                                        <td><input name=\"\" class=\"w100 chargesunitcost amount\"></td>\r\n                                                                        <td><input name=\"\" class=\"w100 chargesextendedcost attributeextcost amount\"></td>\r\n                                                                        <td>\r\n                                                                            <div class=\"buttons\">\r\n                                                                                <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                            </div>\r\n                                                                        </td>\r\n                                                                    </tr>\r\n\r\n                                                                    <tr class=\"attributes-total\">\r\n                                                                        <td colspan=\"2\">Total Charges Cost:</td>\r\n                                                                        <td><input class=\"chargesunitcosttotal\" type=\"text\" disabled /></td>\r\n                                                                        <td><input class=\"chargesextendedcosttotal attributeextcosttotal\" type=\"text\" disabled /></td>\r\n                                                                    </tr>\r\n                                                                </tbody>\r\n                                                            </table>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div id=\"receive-menu6\" class=\"tab-pane form-bg\">\r\n                                                    <P class=\"cat-heading cat4\">Add New Exclusion <i class=\"fa fa-plus cat1-i\"></i></P>\r\n                                                    <div class=\"fixed-table-container\">\r\n                                                        <div class=\"fixed-table-container-inner table-responsive cat4-table\">\r\n                                                            <table class=\"table table-bordered table-fixed \">\r\n                                                                <thead>\r\n                                                                    <tr>\r\n                                                                        <th><div class=\"th-inner\">PN</div></th>\r\n                                                                        <th><div class=\"th-inner\">PN Description</div></th>\r\n                                                                        <th><div class=\"th-inner\">Notes</div></th>\r\n                                                                        <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                    </tr>\r\n                                                                </thead>\r\n                                                                <tbody>\r\n\r\n                                                                    <tr ng-repeat=\"exclusions in assets5\">\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control numberids\" name=\"\" placeholder=\"ID\" />\r\n                                                                            </div>\r\n                                                                        </td>\r\n                                                                        <td><input class=\"w150\" name=\"\" /></td>\r\n                                                                        <td><input class=\"w150\" name=\"\" /></td>\r\n                                                                        <td>\r\n                                                                            <div class=\"buttons\">\r\n                                                                                <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                            </div>\r\n                                                                        </td>\r\n                                                                    </tr>\r\n\r\n                                                                </tbody>\r\n                                                            </table>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n\r\n\r\n\r\n                                    </div>\r\n                                </div>\r\n                                <a routerLink=\"/app-workflow-list\" class=\"btn btn-primary mtop40 black-search-button save-action-btn1 pull-right\">Save Workflow Details</a>\r\n\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n                <div class=\"clear\"></div>\r\n                <hr />\r\n                <div class=\"clear\"></div>\r\n                <br />\r\n                <br />\r\n                <br />\r\n                <br />\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal fade\" id=\"wf-options\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" id=\"\" name=\"\">×</button>\r\n                    <h4 class=\"modal-title\">WO - Workflow Options</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n\r\n                    <a data-dismiss=\"modal\" class=\"btn btn-info default-workflow-btn\">Create New Workflow</a>\r\n                    <a routerLink=\"/app-workflow-list\" class=\"btn btn-info\">Edit Existing Workflow</a>\r\n                    <a routerLink=\"/app-workflow-list\" class=\"btn btn-info deferred-btn\">Deferred Material List</a>\r\n                    <a routerLink=\"/app-workflow-list\" class=\"btn btn-info\">Append</a>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"modal fade hide-model\" id=\"removalreason\" role=\"dialog\">\r\n        <div class=\"modal-dialog modal-sm\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    <h4 class=\"modal-title\"> Reason for Removal</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <form method=\"post\" id=\"\" name=\"\">\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Reason ID: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Reason ID\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Reason for Removal: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Reason for Removal\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Memo: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Memo\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-4 col-offset-5\">\r\n                                <button type=\"button\" id=\"\" name=\"\" class=\"btn btn-success add\" data-toggle=\"modal\" data-target=\"#success-popup\"><i data-dismiss=\"modal\">Save</i></button>\r\n                            </span>\r\n                        </p>\r\n                    </form>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Close</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"modal fade hide-model\" id=\"findings\" role=\"dialog\">\r\n        <div class=\"modal-dialog modal-sm\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    <h4 class=\"modal-title\"> Findings</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <form method=\"post\" id=\"\" name=\"\">\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Finding ID: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Finding ID\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Finding Description: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Finding Description\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Memo: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Memo\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-4 col-offset-5\">\r\n                                <button type=\"button\" id=\"\" name=\"\" class=\"btn btn-success add\" data-toggle=\"modal\" data-target=\"#success-popup\"><i data-dismiss=\"modal\">Save</i></button>\r\n                            </span>\r\n                        </p>\r\n                    </form>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Close</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"modal fade hide-model\" id=\"workperformed\" role=\"dialog\">\r\n        <div class=\"modal-dialog modal-sm\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    <h4 class=\"modal-title\"> Work Performed </h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <form method=\"post\" id=\"\" name=\"\">\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Work Performed ID: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Work Performed ID\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Work Performed Description: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Work Performed Description\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Memo: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Memo\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-4 col-offset-5\">\r\n                                <button type=\"button\" id=\"\" name=\"\" class=\"btn btn-success add\" data-toggle=\"modal\" data-target=\"#success-popup\"><i data-dismiss=\"modal\">Save</i></button>\r\n                            </span>\r\n                        </p>\r\n                    </form>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Close</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"modal fade hide-model\" id=\"defaultmessages\" role=\"dialog\">\r\n        <div class=\"modal-dialog modal-sm\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    <h4 class=\"modal-title\"> Default Messages</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <form method=\"post\" id=\"\" name=\"\">\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Default Message ID: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Default Message ID\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Default Message Description: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Default Message Description\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Memo: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Memo\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-4 col-offset-5\">\r\n                                <button type=\"button\" id=\"\" name=\"\" class=\"btn btn-success add\" data-toggle=\"modal\" data-target=\"#success-popup\"><i data-dismiss=\"modal\">Save</i></button>\r\n                            </span>\r\n                        </p>\r\n                    </form>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Close</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"modal fade success-msg\" id=\"success-popup\" role=\"dialog\">\r\n        <div class=\"modal-dialog modal-sm popup-timeout\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\r\n                    <h4> <i class=\"fa fa-check\"></i>&nbsp; You Added Successfully !</h4>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 1978:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1979);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1979:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1980:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"x_panel\" style=\"\">\r\n                <div class=\"x_content\">\r\n                    <nav aria-label=\"breadcrumb\">\r\n                        <ol class=\"breadcrumb\">\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">Dashboard</a></li>\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">WO Setup</a></li>\r\n                            <li class=\"breadcrumb-item active\" aria-current=\"page\">Add Labor</li>\r\n                        </ol>\r\n                    </nav>\r\n                    <div class=\"pheading\">\r\n                        <h4 class=\"page-heading clr-green\">WO Setup - Add Labor</h4>\r\n                    </div>\r\n                    <div class=\"cdetails-top\">\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Company</label>\r\n                            <span>Silverxis</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>BU</label>\r\n                            <span>Adso</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Division</label>\r\n                            <span>Development</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Dept</label>\r\n                            <span>Java</span>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-sm-12 col-12 po-ro-setup\">\r\n            <div class=\"x_panel\">\r\n                <div>\r\n                    &nbsp;\r\n                    <label class=\"wauto\"><input type=\"radio\" class=\"labor-block1\" value=\"labor-block1\" name=\"labor-blocks-input\" checked /> Labor Hours</label>&nbsp;&nbsp;&nbsp;&nbsp;\r\n                    <label class=\"wauto\"><input type=\"radio\" class=\"labor-block2\" value=\"labor-block2\" name=\"labor-blocks-input\" /> Labor Checkin Checkout</label>&nbsp;&nbsp;&nbsp;&nbsp;\r\n                    <label class=\"wauto\"><input type=\"radio\" class=\"labor-block3\" value=\"labor-block3\" name=\"labor-blocks-input\" /> Scan</label>\r\n                </div>\r\n\r\n                <hr />\r\n\r\n                <div class=\"x_content labor-hrs-block\">\r\n                    <form id=\"\" class=\"form-horizontal ro-grid-form mtop10\" name=\"\" action=\"#\" method=\"post\" onsubmit=\"return false;\">\r\n                        <div class=\"col-sm-3\">\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">WO ID</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control numberids\" value=\"123456\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Data Entered By</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Expertise</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <select>\r\n                                        <option value=\"\">Select Expertise</option>\r\n                                        <option value=\"Technician\">Technician</option>\r\n                                        <option value=\"Quality\">Quality</option>\r\n                                        <option value=\"Mechanic\">Mechanic</option>\r\n                                        <option value=\"Inspector\">Inspector</option>\r\n                                        <option value=\"Receiver\">Receiver</option>\r\n                                        <option value=\"Auditor\">Auditor</option>\r\n                                        <option value=\"Engineer\">Engineer</option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Employee</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-sm-3\">\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-10\">Actions completed by ONE Tech/Mech</label>\r\n                                <div class=\"col-sm-1\">\r\n                                    <input type=\"checkbox\" class=\"form-control\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-10\">Use target hours from Workflow</label>\r\n                                <div class=\"col-sm-1\">\r\n                                    <input type=\"checkbox\" class=\"form-control\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-10\">Assign hours by specific Actions</label>\r\n                                <div class=\"col-sm-1\">\r\n                                    <input type=\"checkbox\" class=\"form-control\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-10\">Assign Total Hours to Work Order</label>\r\n                                <div class=\"col-sm-1\">\r\n                                    <input type=\"checkbox\" class=\"form-control\">\r\n                                </div>\r\n                            </div>\r\n\r\n\r\n\r\n                        </div>\r\n                        <div class=\"col-sm-5\">\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-3\">Memo</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <textarea placeholder=\"Memo\" style=\"height:110px; width:100%;\"></textarea>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"clear\"></div>\r\n\r\n\r\n                    </form>\r\n                    <div class=\"table-responsive\">\r\n                        <div class=\"clear mtop5\"></div>\r\n                        <table class=\"table table-bordered table-striped \">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th>Actions</th>\r\n                                    <th>Employee</th>\r\n                                    <th>Hours</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>Total Hours - ALL Actions</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td><input type=\"text\" class=\"form-control w80 time\" /></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Receive</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td><input type=\"text\" class=\"form-control w80 time\" value=\"1.00\" /></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Inspect</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td><input type=\"text\" class=\"form-control w80 time\" value=\"2.50\" /></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Evaluate</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td><input type=\"text\" class=\"form-control w80 time\" value=\"1.50\" /></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Teardown</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td><input type=\"text\" class=\"form-control w80 time\" value=\"4.00\" /></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Disassemble</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td><input type=\"text\" class=\"form-control w80 time\" value=\"2.00\" /></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Assemble</td>\r\n                                    <td></td>\r\n                                    <td><input type=\"text\" class=\"form-control w80 time\" value=\"-\" /></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Testing</td>\r\n                                    <td></td>\r\n                                    <td><input type=\"text\" class=\"form-control w80 time\" value=\"-\" /></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>QC</td>\r\n                                    <td></td>\r\n                                    <td><input type=\"text\" class=\"form-control w80 time\" value=\"-\" /></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Ship</td>\r\n                                    <td></td>\r\n                                    <td><input type=\"text\" class=\"form-control w80 time\" value=\"-\" /></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Clean</td>\r\n                                    <td></td>\r\n                                    <td><input type=\"text\" class=\"form-control w80 time\" value=\"-\" /></td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td><input type=\"text\" class=\"form-control w80 time\" value=\"11.00\" /></td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n\r\n                    <div class=\"clear\"></div>\r\n                </div>\r\n\r\n                <div class=\"clear\"></div>\r\n\r\n                <div class=\"x_content labor-inout-hrs-block\">\r\n                    <form id=\"\" class=\"form-horizontal ro-grid-form mtop10\" name=\"\" action=\"#\" method=\"post\" onsubmit=\"return false;\">\r\n                        <div class=\"col-sm-3\">\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">WO ID</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control numberids\" value=\"123456\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Employee</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n\r\n                        </div>\r\n                        <div class=\"col-sm-3\">\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-10\">Actions completed by ONE Tech/Mech</label>\r\n                                <div class=\"col-sm-1\">\r\n                                    <input type=\"checkbox\" class=\"form-control\">\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-10\">Assign hours by specific Actions</label>\r\n                                <div class=\"col-sm-1\">\r\n                                    <input type=\"checkbox\" class=\"form-control\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-10\">Assign Total Hours to Work Order</label>\r\n                                <div class=\"col-sm-1\">\r\n                                    <input type=\"checkbox\" class=\"form-control\">\r\n                                </div>\r\n                            </div>\r\n\r\n\r\n\r\n                        </div>\r\n                        <div class=\"col-sm-5\">\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-3\">Memo</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <textarea placeholder=\"Memo\" style=\"height:110px; width:100%;\"></textarea>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"clear\"></div>\r\n\r\n\r\n                    </form>\r\n                    <div class=\"table-responsive\">\r\n                        <div class=\"clear mtop5\"></div>\r\n                        <table class=\"table table-bordered table-striped po-ro-setup-table\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th>Actions</th>\r\n                                    <th>Expertise</th>\r\n                                    <th>Employee</th>\r\n                                    <th>Billable /NonBillable</th>\r\n                                    <th>Start</th>\r\n                                    <th>Start Date and Time</th>\r\n                                    <th>Stop</th>\r\n                                    <th>End Date and Time</th>\r\n                                    <th>Hours/Mins</th>\r\n                                    <th>Adjustments</th>\r\n                                    <th>Adjusted Hours</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>Total Hours - ALL Actions</td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names ui-autocomplete-input\" value=\"Roger\" autocomplete=\"off\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n\r\n                                            <option value=\"billable\">Billable</option>\r\n                                            <option value=\"non-billable\">Non Billable</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\"></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\"></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20.30</td>\r\n                                    <td><input type=\"text\" class=\"form-control w50 decimal2\"></td>\r\n                                    <td>20.30</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Receive</td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names ui-autocomplete-input\" value=\"Roger\" autocomplete=\"off\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n\r\n                                            <option value=\"billable\">Billable</option>\r\n                                            <option value=\"non-billable\">Non Billable</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\"></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\"></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20.30</td>\r\n                                    <td><input type=\"text\" class=\"form-control w50 decimal2\"></td>\r\n                                    <td>20.30</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Inspect</td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names ui-autocomplete-input\" value=\"Roger\" autocomplete=\"off\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n\r\n                                            <option value=\"billable\">Billable</option>\r\n                                            <option value=\"non-billable\">Non Billable</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\"></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\"></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20.30</td>\r\n                                    <td><input type=\"text\" class=\"form-control w50 decimal2\"></td>\r\n                                    <td>20.30</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Evaluate</td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names ui-autocomplete-input\" value=\"Roger\" autocomplete=\"off\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n\r\n                                            <option value=\"billable\">Billable</option>\r\n                                            <option value=\"non-billable\">Non Billable</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\"></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\"></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20.30</td>\r\n                                    <td><input type=\"text\" class=\"form-control w50 decimal2\"></td>\r\n                                    <td>20.30</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Teardown</td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names ui-autocomplete-input\" value=\"Roger\" autocomplete=\"off\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n\r\n                                            <option value=\"billable\">Billable</option>\r\n                                            <option value=\"non-billable\">Non Billable</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\"></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\"></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20.30</td>\r\n                                    <td><input type=\"text\" class=\"form-control w50 decimal2\"></td>\r\n                                    <td>20.30</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Disassemble</td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names ui-autocomplete-input\" value=\"Roger\" autocomplete=\"off\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n\r\n                                            <option value=\"billable\">Billable</option>\r\n                                            <option value=\"non-billable\">Non Billable</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\"></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\"></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20.30</td>\r\n                                    <td><input type=\"text\" class=\"form-control w50 decimal2\"></td>\r\n                                    <td>20.30</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Assemble</td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names ui-autocomplete-input\" value=\"Roger\" autocomplete=\"off\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n\r\n                                            <option value=\"billable\">Billable</option>\r\n                                            <option value=\"non-billable\">Non Billable</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\"></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\"></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20.30</td>\r\n                                    <td><input type=\"text\" class=\"form-control w50 decimal2\"></td>\r\n                                    <td>20.30</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Testing</td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names w100 ui-autocomplete-input\" value=\"Roger\" autocomplete=\"off\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n\r\n                                            <option value=\"billable\">Billable</option>\r\n                                            <option value=\"non-billable\">Non Billable</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\"></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\"></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20.30</td>\r\n                                    <td><input type=\"text\" class=\"form-control w50 decimal2\"></td>\r\n                                    <td>20.30</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>QC</td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names ui-autocomplete-input\" value=\"Roger\" autocomplete=\"off\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n\r\n                                            <option value=\"billable\">Billable</option>\r\n                                            <option value=\"non-billable\">Non Billable</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\"></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\"></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20.30</td>\r\n                                    <td><input type=\"text\" class=\"form-control w50 decimal2\"></td>\r\n                                    <td>20.30</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Ship</td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names ui-autocomplete-input\" value=\"Roger\" autocomplete=\"off\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n\r\n                                            <option value=\"billable\">Billable</option>\r\n                                            <option value=\"non-billable\">Non Billable</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\"></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\"></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20.30</td>\r\n                                    <td><input type=\"text\" class=\"form-control w50 decimal2\"></td>\r\n                                    <td>20.30</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Clean</td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names ui-autocomplete-input\" value=\"Roger\" autocomplete=\"off\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n\r\n                                            <option value=\"billable\">Billable</option>\r\n                                            <option value=\"non-billable\">Non Billable</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\"></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\"></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20.30</td>\r\n                                    <td><input type=\"text\" class=\"form-control w50 decimal2\"></td>\r\n                                    <td>20.30</td>\r\n                                </tr>\r\n\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n                </div>\r\n\r\n                <div class=\"clear\"></div>\r\n                <div class=\"x_content labor-hrs-scan-block\">\r\n                    <h4>Content not given</h4>\r\n                    <div class=\"clear\"></div>\r\n                </div>\r\n\r\n                <div class=\"clear\"></div>\r\n                <br />\r\n                <a class=\"btn btn-info\">Submit</a>\r\n                <br />\r\n                <br />\r\n                <br />\r\n                <br />\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 1981:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1982);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1982:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1983:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"x_panel\" style=\"\">\r\n                <div class=\"x_content\">\r\n                    <nav aria-label=\"breadcrumb\">\r\n                        <ol class=\"breadcrumb\">\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">Dashboard</a></li>\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">WO Setup</a></li>\r\n                            <li class=\"breadcrumb-item active\" aria-current=\"page\">Add Labor Hours</li>\r\n                        </ol>\r\n                    </nav>\r\n                    <div class=\"pheading\">\r\n                        <h4 class=\"page-heading clr-green\">WO Setup - Add Labor Hours</h4>\r\n                    </div>\r\n                    <div class=\"cdetails-top\">\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Company</label>\r\n                            <span>Silverxis</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>BU</label>\r\n                            <span>Adso</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Division</label>\r\n                            <span>Development</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Dept</label>\r\n                            <span>Java</span>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-sm-12 col-12 po-ro-setup labor-hrs\">\r\n            <div class=\"x_panel\">\r\n                <div class=\"x_content labor-hrs\">\r\n                    <form id=\"\" class=\"form-horizontal ro-grid-form mtop10\" name=\"\" action=\"#\" method=\"post\" onsubmit=\"return false;\">\r\n                        <div class=\"col-sm-3\">\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">WO ID</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control numberids\" value=\"123456\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Employee</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Expertise</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <select>\r\n                                        <option value=\"\">Select Expertise</option>\r\n                                        <option value=\"Technician\">Technician</option>\r\n                                        <option value=\"Quality\">Quality</option>\r\n                                        <option value=\"Mechanic\">Mechanic</option>\r\n                                        <option value=\"Inspector\">Inspector</option>\r\n                                        <option value=\"Receiver\">Receiver</option>\r\n                                        <option value=\"Auditor\">Auditor</option>\r\n                                        <option value=\"Engineer\">Engineer</option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </div>\r\n                        <div class=\"col-sm-7\">\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Actions completed by ONE Tech/Mech</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input type=\"checkbox\" class=\"form-control\">\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Assign hours by specific Actions</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input type=\"checkbox\" class=\"form-control\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Assign Total Hours to Work Order</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input type=\"checkbox\" class=\"form-control\">\r\n                                </div>\r\n                            </div>\r\n\r\n\r\n\r\n                        </div>\r\n                        <div class=\"clear\"></div>\r\n\r\n\r\n                    </form>\r\n                    <div class=\"table-responsive\">\r\n                        <div class=\"clear mtop5\"></div>\r\n                        <table class=\"table table-bordered table-striped po-ro-setup-table\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th>Actions</th>\r\n                                    <th>Employee</th>\r\n                                    <th>Expertise</th>\r\n                                    <th>Billable /NonBillable</th>\r\n                                    <th>Start</th>\r\n                                    <th>Start Date and Time</th>\r\n                                    <th>Stop</th>\r\n                                    <th>End Date and Time</th>\r\n                                    <th>Hours/Mins</th>\r\n                                    <th>Adjustments</th>\r\n                                    <th>Adjusted Hours</th>\r\n                                    <th>Hours</th>\r\n                                    <th>Select Tech/Mech</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>Total Hours - ALL Actions</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>Bill123</td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\" /></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\" /></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20</td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" /></td>\r\n                                    <td>20</td>\r\n                                    <td> - </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Receive</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>Bill485</td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\" /></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\" /></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20</td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" /></td>\r\n                                    <td>20</td>\r\n                                    <td> - </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Inspect</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>Bill856</td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\" /></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\" /></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20</td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" /></td>\r\n                                    <td>20</td>\r\n                                    <td> - </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Evaluate</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>Bill860</td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\" /></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\" /></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20</td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" /></td>\r\n                                    <td>20</td>\r\n                                    <td> - </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Teardown</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>Bill002</td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\" /></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\" /></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20</td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" /></td>\r\n                                    <td>20</td>\r\n                                    <td> - </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Disassemble</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>Bill112</td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\" /></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\" /></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20</td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" /></td>\r\n                                    <td>20</td>\r\n                                    <td> - </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Assemble</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>Bill325</td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\" /></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\" /></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20</td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" /></td>\r\n                                    <td>20</td>\r\n                                    <td> - </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Testing</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names w100\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>Bill184</td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\" /></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\" /></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20</td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" /></td>\r\n                                    <td>20</td>\r\n                                    <td> - </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>QC</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>Bill788</td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\" /></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\" /></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20</td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" /></td>\r\n                                    <td>20</td>\r\n                                    <td> - </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Ship</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>Bill302</td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\" /></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\" /></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20</td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" /></td>\r\n                                    <td>20</td>\r\n                                    <td> - </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Clean</td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option value=\"\">Select Expertise</option>\r\n                                            <option value=\"Technician\">Technician</option>\r\n                                            <option value=\"Quality\">Quality</option>\r\n                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                            <option value=\"Inspector\">Inspector</option>\r\n                                            <option value=\"Receiver\">Receiver</option>\r\n                                            <option value=\"Auditor\">Auditor</option>\r\n                                            <option value=\"Engineer\">Engineer</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>Bill956</td>\r\n                                    <td><input type=\"checkbox\" class=\"start-date-checkbox\" /></td>\r\n                                    <td><span class=\"start-date\">26/03/2018 10:00</span></td>\r\n                                    <td><input type=\"checkbox\" class=\"end-date-checkbox\" /></td>\r\n                                    <td><span class=\"end-date\">26/03/2018 10:30</span></td>\r\n                                    <td>20</td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" /></td>\r\n                                    <td>20</td>\r\n                                    <td> - </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control names\" value=\"Roger\">\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n                <div class=\"clear\"></div>\r\n                <br />\r\n                <a class=\"btn btn-info\">Submit</a>\r\n\r\n\r\n                <br />\r\n                <br />\r\n                <br />\r\n                <br />\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 1984:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1985);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1985:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1986:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\" style=\"min-height: 410px;\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"x_panel\" style=\"\">\r\n                <div class=\"x_content\">\r\n                    <nav aria-label=\"breadcrumb\">\r\n                        <ol class=\"breadcrumb\">\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">Dashboard</a></li>\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">WO Setup</a></li>\r\n                            <li class=\"breadcrumb-item active\" aria-current=\"page\">Bar Code Scanned</li>\r\n                        </ol>\r\n                    </nav>\r\n                    <div class=\"pheading\">\r\n                        <h4 class=\"page-heading clr-green\">WO Setup - Add Labor</h4>\r\n                    </div>\r\n                    <div class=\"cdetails-top\">\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Company</label>\r\n                            <span>Silverxis</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>BU</label>\r\n                            <span>Adso</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Division</label>\r\n                            <span>Development</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Dept</label>\r\n                            <span>Java</span>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n       \r\n    </div>\r\n</div>";

/***/ }),

/***/ 1987:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1988);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1988:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1989:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"x_panel\" style=\"\">\r\n                <div class=\"x_content\">\r\n                    <nav aria-label=\"breadcrumb\">\r\n                        <ol class=\"breadcrumb\">\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">Dashboard</a></li>\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">WO Setup</a></li>\r\n                            <li class=\"breadcrumb-item active\" aria-current=\"page\">Add Equipment</li>\r\n                        </ol>\r\n                    </nav>\r\n                    <div class=\"pheading\">\r\n                        <h4 class=\"page-heading clr-green\">WO Setup - Equipment</h4>\r\n                        <div class=\"clear mtop10\"></div>\r\n\r\n                    </div>\r\n                    <div class=\"cdetails-top\">\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Company</label>\r\n                            <span>Silverxis</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>BU</label>\r\n                            <span>Adso</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Division</label>\r\n                            <span>Development</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Dept</label>\r\n                            <span>Java</span>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-12 col-sm-12 col-12 po-ro-setup\">\r\n            <div class=\"x_panel\">\r\n                <div class=\"tab-content\">\r\n\r\n                    <div class=\"table-responsive\" id=\"workflow-attributes-block\">\r\n\r\n                        <table class=\"table table-bordered table-striped\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th colspan=\"8\">EQUIPMENT &nbsp; &nbsp;<i class=\"fa fa-plus plus-icon\"></i></th>\r\n                                </tr>\r\n                                <tr>\r\n                                    <th colspan=\"4\"></th>\r\n                                    <th colspan=\"4\">TOLERANCE</th>\r\n                                </tr>\r\n                                <tr>\r\n                                    <th>Equipment #</th>\r\n                                    <th>Equipment Description</th>\r\n                                    <th>Item Classification</th>\r\n                                    <th>Qty</th>\r\n                                    <th>Min</th>\r\n                                    <th>Max</th>\r\n                                    <th>Expected</th>\r\n                                    <th>Findings</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block w100\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control numberids \" id=\"\" name=\"\" value=\"12345\" />\r\n                                        </div>\r\n                                        <a routerLink=\"/app-item-master-equipment-setup\" target=\"_blank\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                            <input type=\"text\" class=\"form-control numberids\" id=\"\" name=\"\" value=\"Description\" />\r\n                                        </div>\r\n                                        <a routerLink=\"/app-item-master-equipment-setup\" target=\"_blank\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select class=\"form-control w100\">\r\n                                            <option value=\"Consumables\">Consumables</option>\r\n                                            <option value=\"CalibratedEquipmemt\">Calibrated Equipmemt</option>\r\n                                            <option value=\"Equipmemt\" selected>Equipmemt</option>\r\n                                            <option value=\"Expendables\">Expendables</option>\r\n                                            <option value=\"Kit\">Kit</option>\r\n                                            <option value=\"Rotables\">Rotables</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" value=\"4\"></td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" value=\"1\"></td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" value=\"10\"></td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" name=\"\" value=\"9\"></td>\r\n                                    <td><textarea placeholder=\"Findings Memo\" class=\"w250\" style=\"height:50px;padding 3px;\"></textarea></td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                    <a routerLink=\"/app-work-order-equipment-check-in-out\" class=\"btn btn-info pull-right\">Equipment Check In-Out</a>\r\n\r\n\r\n                </div>\r\n                <div class=\"clear\"></div>\r\n                <br />\r\n                <br />\r\n                <br />\r\n                <br />\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>";

/***/ }),

/***/ 1990:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1991);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1991:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1992:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"x_panel\" style=\"\">\r\n            <div class=\"x_content\">\r\n                <nav aria-label=\"breadcrumb\">\r\n                    <ol class=\"breadcrumb\">\r\n                        <li class=\"breadcrumb-item\"><a routerLink=\"/\">Dashboard</a></li>\r\n                        <li class=\"breadcrumb-item active\" aria-current=\"page\">Equipment checkin checkout</li>\r\n                    </ol>\r\n                </nav>\r\n                <div class=\"pheading\">\r\n                    <h4 class=\"page-heading clr-green\">Equipment checkin checkout</h4>\r\n                </div>\r\n                <div class=\"cdetails-top\">\r\n                    <div class=\"col-sm-12\">\r\n                        <label>Company</label>\r\n                        <span>Silverxis</span>\r\n                    </div>\r\n                    <div class=\"col-sm-12\">\r\n                        <label>BU</label>\r\n                        <span>Adso</span>\r\n                    </div>\r\n                    <div class=\"col-sm-12\">\r\n                        <label>Division</label>\r\n                        <span>Development</span>\r\n                    </div>\r\n                    <div class=\"col-sm-12\">\r\n                        <label>Dept</label>\r\n                        <span>Java</span>\r\n                    </div>\r\n\r\n                </div>\r\n                <div class=\"clear\"></div><br>\r\n                <form action=\"#\" method=\"post\" id=\"\" name=\"\" class=\"form-horizontal add-custustomer\">\r\n                    <div class=\"employee-setup\">\r\n                        <div class=\"col-md-12 col-sm-12 col-12 employer-block\">\r\n                            <div class=\"col-sm-2 text-center\">\r\n                                <div class=\"form-group col-sm-12\"><label class=\"control-label\">CHECK OUT <input type=\"radio\" id=\"\" name=\"check-in-out\" /></label></div>\r\n                                <div class=\"form-group col-sm-12\"><label class=\"control-label\">CHECK IN <input type=\"radio\" id=\"\" name=\"check-in-out\" /></label></div>\r\n                            </div>\r\n                            <div class=\"col-sm-5\">\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4\">Search Equipment Description </label>\r\n                                    <div class=\"col-sm-7\">\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control\" id=\"\" name=\"\" />\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4\">Equipment ID Number</label>\r\n                                    <div class=\"col-sm-7\">\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control\" id=\"\" name=\"\" />\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-sm-3\">\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4\">Checked Out By</label>\r\n                                    <div class=\"col-sm-7\">\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control\" id=\"\" name=\"\" />\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4\">Checked In By</label>\r\n                                    <div class=\"col-sm-7\">\r\n                                        <div class=\"inner-addon right-addon inline-block\">\r\n                                            <i class=\"fa fa-search\"></i>\r\n                                            <input type=\"text\" class=\"form-control\" id=\"\" name=\"\" />\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4\">Date</label>\r\n                                    <div class=\"col-sm-7\">\r\n                                        <input type=\"text\" class=\"form-control datepicker\" id=\"\" name=\"\" />\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"clear\"></div>\r\n                            <hr class=\"hr-dark\" />\r\n\r\n                            <div class=\"col-2\">\r\n                                <ul class=\"nav nav-pills tabs-left\" role=\"tablist\">\r\n                                    <li><a href=\"#step1\" data-toggle=\"tab\" aria-expanded=\"true\" class=\"active\">General Information</a></li>\r\n                                    <li><a href=\"#step2\" data-toggle=\"tab\" aria-expanded=\"false\">Calibrated Tools</a></li>\r\n                                    <li><a href=\"#step3\" data-toggle=\"tab\">Certification</a></li>\r\n                                    <li><a href=\"#step4\" data-toggle=\"tab\">Inspection</a></li>\r\n                                    <li><a href=\"#step5\" data-toggle=\"tab\">Verified Tools</a></li>\r\n                                </ul>\r\n                            </div>\r\n                            <div class=\"col-10\">\r\n                                <div class=\"tab-content form-bg\" id=\"employee-block\">\r\n                                    <div class=\"tab-pane step-data active\" id=\"step1\">\r\n                                        <div class=\"col-sm-4\">\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Equipment Number</label>\r\n                                                <div class=\"col-sm-7\">13</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Equipment Description</label>\r\n                                                <div class=\"col-sm-7\">Description</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Equipment Type</label>\r\n                                                <div class=\"col-sm-7\">Measurement</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-sm-4\">\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Serial Number</label>\r\n                                                <div class=\"col-sm-7\">13</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Date place in Service</label>\r\n                                                <div class=\"col-sm-7\">03/27/2018</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Location</label>\r\n                                                <div class=\"col-sm-7\">Hyderabad</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-sm-4\">\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Last Checked-In by</label>\r\n                                                <div class=\"col-sm-7\">Shabbir</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Date Last checked-In</label>\r\n                                                <div class=\"col-sm-7\">03/27/2018</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Last Check in Notes</label>\r\n                                                <div class=\"col-sm-7\">Notes</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"clear\"></div>\r\n                                    </div>\r\n                                    <div class=\"tab-pane step-data\" id=\"step2\">\r\n                                        <div class=\"col-sm-4\">\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Calibration Required</label>\r\n                                                <div class=\"col-sm-7\">Yes</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Date last Calibrated</label>\r\n                                                <div class=\"col-sm-7\">03/27/2018</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Number of Days to Next Calibration</label>\r\n                                                <div class=\"col-sm-7\">90</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-sm-4\">\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Next Calibration Due Date </label>\r\n                                                <div class=\"col-sm-7\">03/27/2018</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Todays Date</label>\r\n                                                <div class=\"col-sm-7\">03/27/2018</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Days to Next Calibration</label>\r\n                                                <div class=\"col-sm-7\">-113</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-sm-4\">\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Calibrated By</label>\r\n                                                <div class=\"col-sm-7\">Shabbir</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Calibration Results</label>\r\n                                                <div class=\"col-sm-7\">03/27/2018</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Check Out Ready?</label>\r\n                                                <div class=\"col-sm-7\">Yes</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Calibration Notes</label>\r\n                                                <div class=\"col-sm-7\">Calibration Notes</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"clear\"></div>\r\n                                    </div>\r\n                                    <div class=\"tab-pane step-data\" id=\"step3\">\r\n                                        <div class=\"col-sm-4\">\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Date last Certified</label>\r\n                                                <div class=\"col-sm-7\">9/1/2017</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Number of Days to Next Certification</label>\r\n                                                <div class=\"col-sm-7\">90</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Next Certification Due Date </label>\r\n                                                <div class=\"col-sm-7\">11/30/2017</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-sm-4\">\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Todays Date</label>\r\n                                                <div class=\"col-sm-7\">3/27/2018</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Days to Next Certification</label>\r\n                                                <div class=\"col-sm-7\">-117</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Certified By</label>\r\n                                                <div class=\"col-sm-7\">Shabbir</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-sm-4\">\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Certification Results</label>\r\n                                                <div class=\"col-sm-7\">Certification Results</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Check Out Ready?</label>\r\n                                                <div class=\"col-sm-7\">Yes</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Certification Notes</label>\r\n                                                <div class=\"col-sm-7\">Notes</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"clear\"></div>\r\n                                    </div>\r\n                                    <div class=\"tab-pane step-data\" id=\"step4\">\r\n                                        <div class=\"col-sm-4\">\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Inspection Required</label>\r\n                                                <div class=\"col-sm-7\">Yes</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Date last Inspected</label>\r\n                                                <div class=\"col-sm-7\">9/5/2017</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Number of Days to Next Inspection</label>\r\n                                                <div class=\"col-sm-7\">90</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-sm-4\">\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Next Inspection Due Date </label>\r\n                                                <div class=\"col-sm-7\">12/4/2017</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Todays Date</label>\r\n                                                <div class=\"col-sm-7\">3/27/2018</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Days to Next Inspection</label>\r\n                                                <div class=\"col-sm-7\">-113</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-sm-4\">\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Inspected By</label>\r\n                                                <div class=\"col-sm-7\">Shabbir</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Inspection Results</label>\r\n                                                <div class=\"col-sm-7\">Inspection Results</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Check Out Ready?</label>\r\n                                                <div class=\"col-sm-7\">Yes</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Inspection Notes</label>\r\n                                                <div class=\"col-sm-7\">Inspection Notes</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"clear\"></div>\r\n                                    </div>\r\n                                    <div class=\"tab-pane step-data\" id=\"step5\">\r\n                                        <div class=\"col-sm-4\">\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Verification Required</label>\r\n                                                <div class=\"col-sm-7\">Yes</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Date last verified</label>\r\n                                                <div class=\"col-sm-7\">9/5/2017</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Number of Days to Next Verification</label>\r\n                                                <div class=\"col-sm-7\">90</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-sm-4\">\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Next Verification Due Date </label>\r\n                                                <div class=\"col-sm-7\">12/4/2017</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Todays Date</label>\r\n                                                <div class=\"col-sm-7\">3/27/2018</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Days to Next Verification</label>\r\n                                                <div class=\"col-sm-7\">-113</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-sm-4\">\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Verified By</label>\r\n                                                <div class=\"col-sm-7\">Shabbir</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Verification Results</label>\r\n                                                <div class=\"col-sm-7\">Verification Results</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Check Out Ready?</label>\r\n                                                <div class=\"col-sm-7\">Yes</div>\r\n                                            </div>\r\n                                            <div class=\"form-group col-sm-12\">\r\n                                                <label class=\"control-label col-sm-4\">Verification Notes</label>\r\n                                                <div class=\"col-sm-7\">Verification Notes</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"clear\"></div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n\r\n                        <div class=\"clear\"></div>\r\n                        <hr class=\"hr-light-grey\" />\r\n                        <button type=\"button\" class=\"btn btn-success pull-right\">Submit</button>\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n                </form>\r\n                <br /><br />\r\n                <div class=\"pull-right\"> &copy; 2018 <a routerLink=\"/\">PAS</a> </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal fade hide-model\" id=\"addJobTitle\" role=\"dialog\">\r\n        <div class=\"modal-dialog modal-sm\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    <h4 class=\"modal-title\"> Add Job Title</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <form method=\"post\" id=\"\" name=\"\">\r\n                        <p>\r\n                            <span class=\"col-sm-4\"><b>Job Title: </b></span>\r\n                            <span class=\"col-sm-5 inner-addon right-addon inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"actionattribute\" name=\"\" placeholder=\"Job Title Name\" autocomplete=\"off\">\r\n                            </span>\r\n                            <span class=\"col-sm-1\"><button type=\"button\" id=\"\" name=\"\" class=\"btn btn-success add\" data-toggle=\"modal\" data-target=\"#success-popup\"><i data-dismiss=\"modal\">Save</i></button></span>\r\n                        </p>\r\n                    </form>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Close</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!--Add Job Title Modal End-->\r\n    <!-- Add Employee Expertise Modal -->\r\n    <div class=\"modal fade hide-model\" id=\"addEmpExprt\" role=\"dialog\">\r\n        <div class=\"modal-dialog modal-sm\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    <h4 class=\"modal-title\"> Add Employee Expertise</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <form method=\"post\" id=\"\" name=\"\">\r\n                        <p>\r\n                            <span class=\"col-sm-4\"><b>Emp Expertise: </b></span>\r\n                            <span class=\"col-sm-5 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"actionattribute\" name=\"\" placeholder=\"Employee Expertise\" autocomplete=\"off\">\r\n                            </span>\r\n                            <span class=\"col-sm-1\"><button type=\"button\" id=\"\" name=\"\" class=\"btn btn-success add\" data-toggle=\"modal\" data-target=\"#success-popup\"><i data-dismiss=\"modal\">Save</i></button></span>\r\n                        </p>\r\n                    </form>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Close</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!--Add Employee Expertise Modal End-->\r\n    <!---Successs Message Modal -->\r\n    <div class=\"modal fade success-msg\" id=\"success-popup\" role=\"dialog\">\r\n        <div class=\"modal-dialog modal-sm\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\r\n                    <h4> <i class=\"fa fa-check\"></i>&nbsp; You Added Successfully !</h4>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 1993:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1994);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1994:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1995:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"x_panel\" style=\"\">\r\n                <div class=\"x_content\">\r\n                    <nav aria-label=\"breadcrumb\">\r\n                        <ol class=\"breadcrumb\">\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">Dashboard</a></li>\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">WO Setup</a></li>\r\n                            <li class=\"breadcrumb-item active\" aria-current=\"page\">WO Complete Material List</li>\r\n                        </ol>\r\n                    </nav>\r\n                    <div class=\"pheading\">\r\n                        <h4 class=\"page-heading clr-green\">WO Setup - Complete Material List</h4>\r\n                    </div>\r\n                    <div class=\"cdetails-top\">\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Company</label>\r\n                            <span>Silverxis</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>BU</label>\r\n                            <span>Adso</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Division</label>\r\n                            <span>Development</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Dept</label>\r\n                            <span>Java</span>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-sm-12 col-12 po-ro-setup\">\r\n            <div class=\"x_panel\">\r\n                <div class=\"tab-content\">\r\n\r\n                    <div class=\"table-responsive default-bg clear ro-grid-table\">\r\n\r\n                        <table class=\"table table-bordered table-striped\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th>Line #</th>\r\n                                    <th>Stock Line</th>\r\n                                    <th>PN</th>\r\n                                    <th>PN Des.</th>\r\n                                    <th>Alternate</th>\r\n                                    <th>SN</th>\r\n                                    <th>OEM/PMA/DER</th>\r\n                                    <th>Control #</th>\r\n                                    <th>Control ID</th>\r\n                                    <th>Cond</th>\r\n                                    <th>Item Type</th>\r\n                                    <th>Qty Required</th>\r\n                                    <th>QTY Reserved</th>\r\n                                    <th>Qty Turn In</th>\r\n                                    <th>Qty Issued</th>\r\n                                    <th>Unit Cost</th>\r\n                                    <th>Extended Cost</th>\r\n                                    <th>Cur</th>\r\n                                    <th>RO #</th>\r\n                                    <th>PO #</th>\r\n                                    <th>Receiver #</th>\r\n                                    <th>WO #</th>\r\n                                    <th>Sub-WO #</th>\r\n                                    <th>Memo</th>\r\n                                    <th>Employee</th>\r\n                                    <th>Time Life</th>\r\n                                    <th>Warehouse</th>\r\n                                    <th colspan=\"2\">Location</th>\r\n                                    <th class=\"w150\"></th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr class=\"parent-data\">\r\n                                    <td>MC</td>\r\n                                    <td>SL-12378</td>\r\n                                    <td>123455</td>\r\n                                    <td>Actuator</td>\r\n                                    <td>S-1002456</td>\r\n                                    <td>4978</td>\r\n                                    <td>OEM</td>\r\n                                    <td>4537</td>\r\n                                    <td>12</td>\r\n                                    <td>AR</td>\r\n                                    <td>CS</td>\r\n                                    <td></td>\r\n                                    <td>1</td>\r\n                                    <td></td>\r\n                                    <td> - </td>\r\n                                    <td> $12.00 </td>\r\n                                    <td> $12.00 </td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td colspan=\"2\"></td>\r\n                                    <td>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-info boxed-float-btn nobg\" data-toggle=\"tooltip\" title=\"View\"><i class=\"fa fa-eye\"></i></a>\r\n                                        </span>\r\n                                        <a data-toggle=\"tooltip\" title=\"Edit\" class=\"btn btn-primary boxed-float-btn nobg\"><i class=\"fa fa-edit\"></i></a>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"History\"><i class=\"fa fa-history\"></i></a>\r\n                                        </span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"Reserve\"><i class=\"fa fa-check\"></i></a>\r\n                                        </span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"Issued\"><i class=\"fa fa-check\"></i></a>\r\n                                        </span>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr class=\"parent2-data\">\r\n                                    <td>1</td>\r\n                                    <td></td>\r\n                                    <td>34455</td>\r\n                                    <td>Bushings</td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td>5</td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td colspan=\"2\"></td>\r\n                                    <td>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-info boxed-float-btn nobg\" data-toggle=\"tooltip\" title=\"View\"><i class=\"fa fa-eye\"></i></a>\r\n                                        </span>\r\n                                        <a data-toggle=\"tooltip\" title=\"Edit\" class=\"btn btn-primary boxed-float-btn nobg\"><i class=\"fa fa-edit\"></i></a>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"History\"><i class=\"fa fa-history\"></i></a>\r\n                                        </span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"Reserve\"><i class=\"fa fa-check\"></i></a>\r\n                                        </span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"Issued\"><i class=\"fa fa-check\"></i></a>\r\n                                        </span>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr class=\"child-header\">\r\n                                    <th></th>\r\n                                    <th>Stock Line</th>\r\n                                    <th>PN</th>\r\n                                    <th>PN Des.</th>\r\n                                    <th>Alternate</th>\r\n                                    <th>Provision</th>\r\n                                    <th>OEM/PMA/DER</th>\r\n                                    <th>SN</th>\r\n                                    <th>Control #</th>\r\n                                    <th>Control ID</th>\r\n                                    <th>Cond</th>\r\n                                    <th>Item Type</th>\r\n                                    <th>Qty Required</th>\r\n                                    <th>Qty Reserved</th>\r\n                                    <th>Qty Turn In</th>\r\n                                    <th>Qty Issued</th>\r\n                                    <th>QTY Back Order</th>\r\n                                    <th>Unit Cost</th>\r\n                                    <th>Extended Cost</th>\r\n                                    <th> Cur</th>\r\n                                    <th>PO #</th>\r\n                                    <th>RO #</th>\r\n                                    <th>Receiver #</th>\r\n                                    <th>WO #</th>\r\n                                    <th>Sub-WO #</th>\r\n                                    <th>SO #</th>\r\n                                    <th>Time Life</th>\r\n                                    <th>Warehouse</th>\r\n                                    <th>Location</th>\r\n                                    <th></th>\r\n                                </tr>\r\n                                <tr class=\"child-data\">\r\n                                    <td>2</td>\r\n                                    <td>SL-12378</td>\r\n                                    <td>123455</td>\r\n                                    <td>Bearing</td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td>OEM</td>\r\n                                    <td></td>\r\n                                    <td>4537</td>\r\n                                    <td>12</td>\r\n                                    <td>New</td>\r\n                                    <td>S</td>\r\n                                    <td>5</td>\r\n                                    <td>4</td>\r\n                                    <td></td>\r\n                                    <td>4</td>\r\n                                    <td>1</td>\r\n                                    <td> $25.00 </td>\r\n                                    <td> $100.00 </td>\r\n                                    <td></td>\r\n                                    <td>2345</td>\r\n                                    <td></td>\r\n                                    <td>345676</td>\r\n                                    <td></td>\r\n                                    <td>724-1</td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-info boxed-float-btn nobg\" data-toggle=\"tooltip\" title=\"View\"><i class=\"fa fa-eye\"></i></a>\r\n                                        </span>\r\n                                        <a data-toggle=\"tooltip\" title=\"Edit\" class=\"btn btn-primary boxed-float-btn nobg\"><i class=\"fa fa-edit\"></i></a>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"History\"><i class=\"fa fa-history\"></i></a>\r\n                                        </span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"Reserve\"><i class=\"fa fa-check\"></i></a>\r\n                                        </span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"Issued\"><i class=\"fa fa-check\"></i></a>\r\n                                        </span>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr class=\"child-data\">\r\n                                    <td>3</td>\r\n                                    <td></td>\r\n                                    <td>9486547</td>\r\n                                    <td>Link</td>\r\n                                    <td>PMA1260</td>\r\n                                    <td></td>\r\n                                    <td>PMA</td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td>3</td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-info boxed-float-btn nobg\" data-toggle=\"tooltip\" title=\"View\"><i class=\"fa fa-eye\"></i></a>\r\n                                        </span>\r\n                                        <a data-toggle=\"tooltip\" title=\"Edit\" class=\"btn btn-primary boxed-float-btn nobg\"><i class=\"fa fa-edit\"></i></a>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"History\"><i class=\"fa fa-history\"></i></a>\r\n                                        </span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"Reserve\"><i class=\"fa fa-check\"></i></a>\r\n                                        </span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"Issued\"><i class=\"fa fa-check\"></i></a>\r\n                                        </span>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr class=\"child-data\">\r\n                                    <td>4</td>\r\n                                    <td></td>\r\n                                    <td>65657</td>\r\n                                    <td>Oring</td>\r\n                                    <td>Able-65657</td>\r\n                                    <td></td>\r\n                                    <td>PMA</td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td>5</td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-info boxed-float-btn nobg\" data-toggle=\"tooltip\" title=\"View\"><i class=\"fa fa-eye\"></i></a>\r\n                                        </span>\r\n                                        <a data-toggle=\"tooltip\" title=\"Edit\" class=\"btn btn-primary boxed-float-btn nobg\"><i class=\"fa fa-edit\"></i></a>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"History\"><i class=\"fa fa-history\"></i></a>\r\n                                        </span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"Reserve\"><i class=\"fa fa-check\"></i></a>\r\n                                        </span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"Issued\"><i class=\"fa fa-check\"></i></a>\r\n                                        </span>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr class=\"child-data\">\r\n                                    <td>5</td>\r\n                                    <td></td>\r\n                                    <td>76986</td>\r\n                                    <td>Shaft</td>\r\n                                    <td>76986-5</td>\r\n                                    <td></td>\r\n                                    <td>DER</td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td>7</td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td></td>\r\n                                    <td>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-info boxed-float-btn nobg\" data-toggle=\"tooltip\" title=\"View\"><i class=\"fa fa-eye\"></i></a>\r\n                                        </span>\r\n                                        <a data-toggle=\"tooltip\" title=\"Edit\" class=\"btn btn-primary boxed-float-btn nobg\"><i class=\"fa fa-edit\"></i></a>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"History\"><i class=\"fa fa-history\"></i></a>\r\n                                        </span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"Reserve\"><i class=\"fa fa-check\"></i></a>\r\n                                        </span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"Issued\"><i class=\"fa fa-check\"></i></a>\r\n                                        </span>\r\n                                    </td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                    <br />\r\n                    <a routerLink=\"/app-work-order-reserve-issue\" class=\"btn btn-info pull-right\">Reserve PN's</a>\r\n                </div>\r\n                <div class=\"clear\"></div>\r\n                <br />\r\n                <br />\r\n                <br />\r\n                <br />\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>";

/***/ }),

/***/ 1996:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1997);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1997:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1998:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"x_panel\" style=\"\">\r\n                <div class=\"x_content\">\r\n                    <nav aria-label=\"breadcrumb\">\r\n                        <ol class=\"breadcrumb\">\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">Dashboard</a></li>\r\n                            <li class=\"breadcrumb-item active\" aria-current=\"page\">WO Reserve</li>\r\n                        </ol>\r\n                    </nav>\r\n                    <div class=\"pheading\">\r\n                        <h4 class=\"page-heading clr-green\">WO Reserve</h4>\r\n                    </div>\r\n                    <div class=\"cdetails-top\">\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Company</label>\r\n                            <span>Silverxis</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>BU</label>\r\n                            <span>Adso</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Division</label>\r\n                            <span>Development</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Dept</label>\r\n                            <span>Java</span>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-12 col-sm-12 col-xs-12 po-ro-setup\">\r\n            <div class=\"x_panel\">\r\n                <div class=\"tab-content\">\r\n                    <div class=\"table-responsive default-bg clear ro-grid-table\">\r\n\r\n                        <table class=\"table table-bordered table-striped\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th><input type=\"checkbox\" class=\"form-control wauto\" id=\"checkall\" /></th>\r\n                                    <th>PN</th>\r\n                                    <th>Description</th>\r\n                                    <th>Qty Required</th>\r\n                                    <th>Qty Reserved</th>\r\n                                    <th>Qty Turn In</th>\r\n                                    <th>Qty Issued</th>\r\n                                    <th>Cond</th>\r\n                                    <th></th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td><input type=\"checkbox\" class=\"form-control wauto check-single\" /></td>\r\n                                    <td><input type=\"text\" class=\"form-control w200\" placeholder=\"PN12345\" /></td>\r\n                                    <td><input type=\"text\" class=\"form-control w200\" placeholder=\"Part Number\" /></td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" value=\"5\" /></td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" value=\"4\" /></td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" value=\"\" /></td>\r\n                                    <td><input type=\"number\" class=\"form-control w50\" value=\"4\" /></td>\r\n                                    <td>New</td>\r\n                                    <td>\r\n                                        <span data-toggle=\"tooltip\" class=\"status\" title=\"Active\" data-placement=\"right\"><input type=\"checkbox\" checked data-toggle=\"toggle\" data-width=\"30\" id=\"toggle-one\" data-on=\"<i class='fa fa-check'></i>\" data-off=\"<i class='fa fa-times'></i>\" data-onstyle=\"success\" data-offstyle=\"danger\"></span>\r\n                                        <a data-toggle=\"tooltip\" title=\"Edit\" class=\"btn btn-primary boxed-float-btn nobg\"><i class=\"fa fa-edit\"></i></a>\r\n                                        <span data-toggle=\"modal\" data-target=\"#\">\r\n                                            <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"Document History\"><i class=\"fa fa-history\"></i></a>\r\n                                        </span>\r\n                                        <a data-toggle=\"tooltip\" title=\"Delete\" class=\"btn btn-success boxed-float-btn nobg\"><i class=\"fa fa-trash\"></i></a>\r\n                                    </td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                        <br />\r\n                        <a routerLink=\"/app-work-order-complete-material-list\" class=\"btn btn-info\">Submit</a>\r\n                    </div>\r\n                </div>\r\n                <div class=\"clear\"></div>\r\n                <br />\r\n                <br />\r\n                <br />\r\n                <br />\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 1999:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2000);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2000:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 2001:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"x_panel\" style=\"\">\r\n                <div class=\"x_content\">\r\n                    <nav aria-label=\"breadcrumb\">\r\n                        <ol class=\"breadcrumb\">\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">Dashboard</a></li>\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">WO Setup</a></li>\r\n                            <li class=\"breadcrumb-item active\" aria-current=\"page\">Main Component</li>\r\n                        </ol>\r\n                    </nav>\r\n                    <div class=\"pheading\">\r\n                        <h4 class=\"page-heading clr-green\">WO Setup - Main Component</h4>\r\n                    </div>\r\n                    <div class=\"cdetails-top\">\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Company</label>\r\n                            <span>Silverxis</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>BU</label>\r\n                            <span>Adso</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Division</label>\r\n                            <span>Development</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Dept</label>\r\n                            <span>Java</span>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-sm-12 col-12 po-ro-setup\">\r\n            <div class=\"x_panel\">\r\n                <div class=\"x_content\">\r\n                    <div class=\"employee-setup\">\r\n                        <div class=\"col-md-12 col-sm-12 col-12 employer-block\">\r\n                            <div class=\"col-2\">\r\n                                <ul class=\"nav nav-pills tabs-left\">\r\n                                    <li class=\"active\"><a href=\"#step1\" data-toggle=\"tab\" aria-expanded=\"true\">Repair</a></li>\r\n                                    <li><a href=\"#step2\" data-toggle=\"tab\" aria-expanded=\"false\">RO for Main Component</a></li>\r\n                                    <li><a href=\"#step3\" data-toggle=\"tab\">Change from an Internal to External (or vice Versa)</a></li>\r\n                                    <li><a href=\"#step4\" data-toggle=\"tab\">Return Main Component to Customer (No Work Performed - no capes)</a></li>\r\n                                </ul>\r\n                            </div>\r\n                            <div class=\"col-10\">\r\n                                <div class=\"tab-content form-bg\" id=\"employee-block\">\r\n                                    <div class=\"tab-pane step-data active\" id=\"step1\">\r\n                                        <div class=\"col-sm-4\">\r\n                                            <label class=\"wauto\"><input type=\"radio\" name=\"ro-type\" id=\"existing-ro\" value=\"existing-ro\" checked /> Add to An Existing RO</label>\r\n                                            <label class=\"wauto\"><input type=\"radio\" name=\"ro-type\" id=\"new-ro\" value=\"new-ro\" /> Create A New RO</label>\r\n                                            <div class=\"clear\"></div>\r\n                                            <hr />\r\n\r\n                                        </div>\r\n                                        <div class=\"tab-content\">\r\n                                            <div class=\"table-responsive default-bg clear ro-grid-table\">\r\n                                                <div class=\"existing-ro\">\r\n                                                    <p>Add to An Existing RO</p>\r\n                                                \r\n                                                    <table class=\"table table-bordered table-striped\">\r\n                                                        <thead>\r\n                                                            <tr>\r\n                                                                <th>WO Num</th>\r\n                                                                <th>RO Num</th>\r\n                                                                <th># of Items</th>\r\n                                                                <th>Unit Cost</th>\r\n                                                                <th>Extended Cost</th>\r\n                                                                <th>Currency</th>\r\n                                                                <th>Vendor</th>\r\n                                                                <th>Opened Date</th>\r\n                                                                <th>Need By Date</th>\r\n                                                                <th></th>\r\n                                                            </tr>\r\n                                                        </thead>\r\n                                                        <tbody>\r\n                                                            <tr class=\"parent-data\">\r\n                                                                <td></td>\r\n                                                                <td>12967</td>\r\n                                                                <td>2</td>\r\n                                                                <td> 3,455.00 </td>\r\n                                                                <td> 6,910.00 </td>\r\n                                                                <td>USD</td>\r\n                                                                <td>ABC Aero</td>\r\n                                                                <td>2/23/2018</td>\r\n                                                                <td>3/25/2018</td>\r\n                                                                <td>\r\n                                                                    <span data-toggle=\"modal\" data-target=\"#\">\r\n                                                                        <a class=\"btn btn-info boxed-float-btn nobg\" data-toggle=\"tooltip\" title=\"View\"><i class=\"fa fa-eye\"></i></a>\r\n                                                                    </span>\r\n                                                                    <a data-toggle=\"tooltip\" title=\"Edit\" class=\"btn btn-primary boxed-float-btn nobg\"><i class=\"fa fa-edit\"></i></a>\r\n                                                                    <span data-toggle=\"modal\" data-target=\"#\">\r\n                                                                        <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"History\"><i class=\"fa fa-history\"></i></a>\r\n                                                                    </span>\r\n                                                                </td>\r\n                                                            </tr>\r\n                                                            <tr class=\"parent-data\">\r\n                                                                <td></td>\r\n                                                                <td>324566</td>\r\n                                                                <td>3</td>\r\n                                                                <td> 3,455.00 </td>\r\n                                                                <td> 10,365.00 </td>\r\n                                                                <td>USD</td>\r\n                                                                <td>ABC Aero</td>\r\n                                                                <td>2/20/2018</td>\r\n                                                                <td>3/18/2018</td>\r\n                                                                <td>\r\n                                                                    <span data-toggle=\"modal\" data-target=\"#\">\r\n                                                                        <a class=\"btn btn-info boxed-float-btn nobg\" data-toggle=\"tooltip\" title=\"View\"><i class=\"fa fa-eye\"></i></a>\r\n                                                                    </span>\r\n                                                                    <a data-toggle=\"tooltip\" title=\"Edit\" class=\"btn btn-primary boxed-float-btn nobg\"><i class=\"fa fa-edit\"></i></a>\r\n                                                                    <span data-toggle=\"modal\" data-target=\"#\">\r\n                                                                        <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"History\"><i class=\"fa fa-history\"></i></a>\r\n                                                                    </span>\r\n                                                                </td>\r\n                                                            </tr>\r\n\r\n\r\n                                                        </tbody>\r\n                                                    </table>\r\n                                                </div>\r\n                                                <div class=\"new-ro\">\r\n                                                    <p>Create A New RO</p>\r\n                                                    \r\n                                                    <table class=\"table table-bordered table-striped\">\r\n                                                        <thead>\r\n                                                            <tr>\r\n                                                                <th>WO #</th>\r\n                                                                <th>PN</th>\r\n                                                                <th>Description</th>\r\n                                                                <th>Stock Line</th>\r\n                                                                <th>SN</th>\r\n                                                                <th>Qty to Repair</th>\r\n                                                                <th>Qty Reserved</th>\r\n                                                                <th colspan=\"3\"></th>\r\n                                                            </tr>\r\n                                                        </thead>\r\n                                                        <tbody>\r\n                                                            <tr class=\"child-data\">\r\n                                                                <td>9675</td>\r\n                                                                <td>28B141</td>\r\n                                                                <td>Housing</td>\r\n                                                                <td>10</td>\r\n                                                                <td>67855</td>\r\n                                                                <td>1</td>\r\n                                                                <td>1</td>\r\n                                                                <td colspan=\"3\">\r\n                                                                    <span data-toggle=\"modal\" data-target=\"#\">\r\n                                                                        <a class=\"btn btn-info boxed-float-btn nobg\" data-toggle=\"tooltip\" title=\"View\"><i class=\"fa fa-eye\"></i></a>\r\n                                                                    </span>\r\n                                                                    <a data-toggle=\"tooltip\" title=\"Edit\" class=\"btn btn-primary boxed-float-btn nobg\"><i class=\"fa fa-edit\"></i></a>\r\n                                                                    <span data-toggle=\"modal\" data-target=\"#\">\r\n                                                                        <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"History\"><i class=\"fa fa-history\"></i></a>\r\n                                                                    </span>\r\n                                                                    <span data-toggle=\"modal\" data-target=\"#\">\r\n                                                                        <a routerLink=\"/app-receiving-po-ro-setup\" class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"Create RO\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                    </span>\r\n                                                                </td>\r\n                                                            </tr>\r\n                                                        </tbody>\r\n                                                    </table>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"tab-pane step-data\" id=\"step2\">\r\n                                        <div class=\"tab-content\">\r\n                                            <div class=\"table-responsive default-bg clear ro-grid-table\">\r\n\r\n                                                <table class=\"table table-bordered table-striped\">\r\n                                                    <thead>\r\n                                                        <tr>\r\n                                                            <th>RO Num</th>\r\n                                                            <th># of Items</th>\r\n                                                            <th>Cost</th>\r\n                                                            <th>Extended Cost</th>\r\n                                                            <th>Currency</th>\r\n                                                            <th>Vendor</th>\r\n                                                            <th>Opened Date</th>\r\n                                                            <th>Need By Date</th>\r\n                                                            <th>Status</th>\r\n                                                            <th></th>\r\n                                                        </tr>\r\n                                                    </thead>\r\n                                                    <tbody>\r\n                                                        <tr class=\"parent-data\">\r\n                                                            <td>12967</td>\r\n                                                            <td>1</td>\r\n                                                            <td> 5,501.00 </td>\r\n                                                            <td> 5,501.00 </td>\r\n                                                            <td>USD</td>\r\n                                                            <td>ABC Aero</td>\r\n                                                            <td>2/23/2018</td>\r\n                                                            <td>3/25/2018</td>\r\n                                                            <td>Closed</td>\r\n                                                            <td>\r\n                                                                <span data-toggle=\"modal\" data-target=\"#\">\r\n                                                                    <a class=\"btn btn-info boxed-float-btn nobg\" data-toggle=\"tooltip\" title=\"View\"><i class=\"fa fa-eye\"></i></a>\r\n                                                                </span>\r\n\r\n                                                                <span data-toggle=\"modal\" data-target=\"#\">\r\n                                                                    <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"History\"><i class=\"fa fa-history\"></i></a>\r\n                                                                </span>\r\n                                                            </td>\r\n                                                        </tr>\r\n                                                        <tr class=\"parent-data\">\r\n                                                            <td>324566</td>\r\n                                                            <td>1</td>\r\n                                                            <td> 3,455.00 </td>\r\n                                                            <td> 3,455.00 </td>\r\n                                                            <td>USD</td>\r\n                                                            <td>Premier Turbine</td>\r\n                                                            <td>2/20/2018</td>\r\n                                                            <td>3/18/2018</td>\r\n                                                            <td>Open</td>\r\n                                                            <td>\r\n                                                                <span data-toggle=\"modal\" data-target=\"#\">\r\n                                                                    <a class=\"btn btn-info boxed-float-btn nobg\" data-toggle=\"tooltip\" title=\"View\"><i class=\"fa fa-eye\"></i></a>\r\n                                                                </span>\r\n                                                                <a data-toggle=\"tooltip\" title=\"Edit\" class=\"btn btn-primary boxed-float-btn nobg\"><i class=\"fa fa-edit\"></i></a>\r\n                                                                <span data-toggle=\"modal\" data-target=\"#\">\r\n                                                                    <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"History\"><i class=\"fa fa-history\"></i></a>\r\n                                                                </span>\r\n                                                            </td>\r\n                                                        </tr>\r\n\r\n                                                    </tbody>\r\n                                                </table>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"tab-pane step-data\" id=\"step3\">\r\n                                        <p class=\"clr-red\">Data not Provided</p>\r\n                                    </div>\r\n                                    <div class=\"tab-pane step-data\" id=\"step4\">\r\n                                        <div class=\"tab-content\">\r\n                                            <div class=\"table-responsive default-bg clear ro-grid-table\">\r\n                                                <table class=\"table table-bordered table-striped\">\r\n                                                    <thead>\r\n                                                        <tr>\r\n                                                            <th>WO #</th>\r\n                                                            <th>Customer</th>\r\n                                                            <th>PN</th>\r\n                                                            <th>Description</th>\r\n                                                            <th>Stock Line</th>\r\n                                                            <th>SN</th>\r\n                                                            <th>Qty to Return</th>\r\n                                                            <th>Qty Reserved</th>\r\n                                                            <th></th>\r\n                                                        </tr>\r\n                                                    </thead>\r\n                                                    <tbody>\r\n                                                        <tr class=\"parent-data\">\r\n                                                            <td>9675</td>\r\n                                                            <td>US Air</td>\r\n                                                            <td>28B141</td>\r\n                                                            <td>Housing</td>\r\n                                                            <td>10</td>\r\n                                                            <td>67855</td>\r\n                                                            <td>1</td>\r\n                                                            <td>1</td>\r\n                                                            <td>\r\n                                                                <span data-toggle=\"modal\" data-target=\"#\">\r\n                                                                    <a class=\"btn btn-info boxed-float-btn nobg\" data-toggle=\"tooltip\" title=\"View\"><i class=\"fa fa-eye\"></i></a>\r\n                                                                </span>\r\n                                                                <a data-toggle=\"tooltip\" title=\"Edit\" class=\"btn btn-primary boxed-float-btn nobg\"><i class=\"fa fa-edit\"></i></a>\r\n                                                                <span data-toggle=\"modal\" data-target=\"#\">\r\n                                                                    <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"History\"><i class=\"fa fa-history\"></i></a>\r\n                                                                </span>\r\n                                                                <span data-toggle=\"modal\" data-target=\"#\">\r\n                                                                    <a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"Create Shipping\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                </span>\r\n                                                            </td>\r\n                                                        </tr>\r\n                                                    </tbody>\r\n                                                </table>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"clear\"></div>\r\n                <br />\r\n                <br />\r\n                <br />\r\n                <br />\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 2002:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2003);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2003:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 2004:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\" style=\"min-height: 629px;\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"x_panel\" style=\"\">\r\n                <div class=\"x_content\">\r\n                    <nav aria-label=\"breadcrumb\">\r\n                        <ol class=\"breadcrumb\">\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"index.html\">Dashboard</a></li>\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"wo-main.html\">WO Setup</a></li>\r\n                            <li class=\"breadcrumb-item active\" aria-current=\"page\">Sub-WO</li>\r\n                        </ol>\r\n                    </nav>\r\n                    <div class=\"pheading\">\r\n                        <h4 class=\"page-heading clr-green\">WO Setup - Sub-WO</h4>\r\n                        <div class=\"clear mtop10\"></div>\r\n                    </div>\r\n                    <div class=\"cdetails-top\">\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Company</label>\r\n                            <span>Silverxis</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>BU</label>\r\n                            <span>Adso</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Division</label>\r\n                            <span>Development</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Dept</label>\r\n                            <span>Java</span>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-sm-12 col-12 po-ro-setup\">\r\n            <div class=\"x_panel\">\r\n                <div class=\"x_content\">\r\n                    <div class=\"tab-content\">\r\n                        <div class=\"table-responsive default-bg clear ro-grid-table\">\r\n\r\n                            <table class=\"table table-bordered table-striped\">\r\n                                <thead>\r\n                                    <tr>\r\n                                        <th colspan=\"8\">Sub-WO &nbsp; &nbsp;<a routerLink=\"/app-work-order-sub-wo-add\" target=\"_blank\"><i class=\"fa fa-plus plus-icon\"></i></a></th>\r\n                                    </tr>\r\n                                    <tr>\r\n                                        <th>Sub-WO #</th>\r\n                                        <th>Gate Code</th>\r\n                                        <th>PN</th>\r\n                                        <th>PN Des.</th>\r\n                                        <th>Open Date</th>\r\n                                        <th>Need By Date</th>\r\n                                        <th>Work Scope</th>\r\n                                        <th class=\"w100\"></th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr>\r\n                                        <td>45450-1</td>\r\n                                        <td>Received</td>\r\n                                        <td>1223454</td>\r\n                                        <td>Actuator</td>\r\n                                        <td>3/18/2018</td>\r\n                                        <td>4/18/2018</td>\r\n                                        <td>Repair</td>\r\n                                        <td>\r\n                                            <a data-toggle=\"tooltip\" title=\"View\" class=\"btn btn-success boxed-float-btn nobg\"><i class=\"fa fa-eye\"></i></a>\r\n                                            <a data-toggle=\"tooltip\" title=\"Edit\" class=\"btn btn-primary boxed-float-btn nobg\"><i class=\"fa fa-edit\"></i></a>\r\n                                        </td>\r\n                                    </tr>\r\n                                    \r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"clear\"></div>\r\n                <br>\r\n                <br>\r\n                <br>\r\n                <br>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 2005:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2006);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2006:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 2007:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"x_panel\" style=\"\">\r\n                <div class=\"x_content\">\r\n                    <nav aria-label=\"breadcrumb\">\r\n                        <ol class=\"breadcrumb\">\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">Dashboard</a></li>\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">WO Setup</a></li>\r\n                            <li class=\"breadcrumb-item active\" aria-current=\"page\">Sub WO Setup</li>\r\n                        </ol>\r\n                    </nav>\r\n                    <div class=\"pheading\">\r\n                        <h4 class=\"page-heading clr-green\">Sub WO Setup</h4>\r\n                    </div>\r\n                    <div class=\"cdetails-top\">\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Company</label>\r\n                            <span>Silverxis</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>BU</label>\r\n                            <span>Adso</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Division</label>\r\n                            <span>Development</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Dept</label>\r\n                            <span>Java</span>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n                    <form id=\"\" class=\"form-horizontal ro-grid-form mtop10\" name=\"\" action=\"#\" method=\"post\" onsubmit=\"return false;\">\r\n                        <div class=\"col-sm-3\">\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Sub WO Num</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control numberids\" value=\"SWO123\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">WO Num</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control numberids\" value=\"WO123\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Name</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control names\" value=\"Shabbir\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Code</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control numberids\" value=\"C123\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Ref</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input type=\"text\" class=\"form-control\" value=\"Ref\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Contact</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input type=\"text\" class=\"form-control\" value=\"Cust Contact\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Phone</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input type=\"text\" class=\"form-control\" value=\"Cust Phone\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Fax</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input type=\"text\" class=\"form-control\" value=\"Cust Fax\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Contract Ref</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input type=\"text\" class=\"form-control\" value=\"Cust Contract Ref\">\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-sm-3\">\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Internal or External</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input type=\"radio\" disabled checked> Internal&nbsp;&nbsp;\r\n                                    <input type=\"radio\" disabled> External\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">WO Qty</label>\r\n                                <input type=\"number\" class=\"form-control \" name=\"\" placeholder=\"WO Qty\" />\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Open Date</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control datepicker\" type=\"text\" placeholder=\"Open Date\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Cust Request Date</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control datepicker\" type=\"text\" placeholder=\"Cust Request Date\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Promise Date</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control datepicker\" type=\"text\" placeholder=\"Promise Date\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Completion Date</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control datepicker\" type=\"text\" placeholder=\"Completion Date\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Work Scope</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control\" type=\"text\" placeholder=\"Work Scope\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Workflow ID</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"input-group\">\r\n                                        <select>\r\n                                            <option value=\"ACC123\" class=\"\">ACC123</option>\r\n                                            <option value=\"ACC124\" class=\"\">ACC124</option>\r\n                                            <option value=\"ACC125\" class=\"\">ACC125</option>\r\n                                            <option value=\"ACC126\" class=\"\">ACC126</option>\r\n                                            <option value=\"ACC127\" class=\"\">ACC127</option>\r\n\r\n                                        </select>\r\n                                    </div>\r\n                                </div>\r\n\r\n\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-sm-3\">\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">PN</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control numberids\" value=\"1223454\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">PN Description</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control\" type=\"text\" value=\"PN Description\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Revised PN</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control numberids\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">SN</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control\" type=\"text\" placeholder=\"\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">PMA</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control\" type=\"text\" placeholder=\"PMA\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">DER</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control\" type=\"text\" placeholder=\"DER\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">CMM/Pub Ref</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <input class=\"form-control\" type=\"text\" placeholder=\"CMM/Pub Ref\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Priority</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <select>\r\n                                        <option value=\"AOG\">AOG</option>\r\n                                        <option value=\"Critical\">Critical</option>\r\n                                        <option value=\"Routine\" selected=\"\">Routine</option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Gate Code</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <select class=\"form-control\" id=\"\" name=\"\">\r\n                                        <option value=\"\">select</option>\r\n                                        <option value=\"\">Manual Review</option>\r\n                                        <option value=\"\">Preliminary Inspection</option>\r\n                                        <option value=\"\">Teardown Evaluation</option>\r\n                                        <option value=\"\">Quoting</option>\r\n                                        <option value=\"\">Awaiting Approval</option>\r\n                                        <option value=\"\">Long Term Waiting on Approval</option>\r\n                                        <option value=\"\">Approved Pull Parts</option>\r\n                                        <option value=\"\">Parts Ordered</option>\r\n                                        <option value=\"\">Ready to Build</option>\r\n                                        <option value=\"\">In Assembly</option>\r\n                                        <option value=\"\">Final Testing</option>\r\n                                        <option value=\"\">Inspection</option>\r\n                                        <option value=\"\">Invoicing</option>\r\n                                        <option value=\"\">Work Order Closed</option>\r\n                                        <option value=\"\">Awaiting Shipping instructions</option>\r\n                                        <option value=\"\">Awaiting payment</option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-sm-3\">\r\n\r\n\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Reason for Removal</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <select class=\"w150\">\r\n                                        <option>select Reason</option>\r\n                                        <option>Screaming</option>\r\n                                        <option>Whining</option>\r\n                                        <option>Rubbing</option>\r\n                                        <option>Smoking</option>\r\n                                        <option>Time Life</option>\r\n                                    </select>\r\n                                    <a data-toggle=\"modal\" data-target=\"#removalreason\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Findings</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <select class=\"w150\">\r\n                                        <option>select Findings</option>\r\n                                        <option>Damaged Items</option>\r\n                                        <option>Bent Shaft</option>\r\n                                    </select>\r\n                                    <a data-toggle=\"modal\" data-target=\"#findings\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Work Performed</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <select class=\"w150\">\r\n                                        <option>select Work Performed</option>\r\n                                        <option>IAW OEM Requirements for Bench Check</option>\r\n                                    </select>\r\n                                    <a data-toggle=\"modal\" data-target=\"#workperformed\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                </div>\r\n\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Default Message</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <select class=\"w150\">\r\n                                        <option>select Default Message</option>\r\n                                        <option value=\"47\">Material Certification must accompany items.  Items without material certification will be rejected and returned at customs check point.</option>\r\n                                    </select>\r\n                                    <a data-toggle=\"modal\" data-target=\"#defaultmessages\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-12\">\r\n                                <label class=\"control-label col-sm-4\">Memo</label>\r\n                                <div class=\"col-sm-7\">\r\n                                    <textarea placeholder=\"Memo\" rows=\"5\" style=\"height:130px;\"></textarea>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"clear\"></div>\r\n                        <br />\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-sm-12 buttons-group\">\r\n            <div class=\"x_panel\">\r\n                <div class=\"x_content\">\r\n                    <a class=\"btn btn-warning\" data-toggle=\"modal\" data-target=\"#wf-options\">Workflow</a>\r\n                    <a routerLink=\"/app-work-order-manual-entry-labor-hours\" class=\"btn btn-info\">Add Labor</a>\r\n                    <a routerLink=\"/app-work-order-equipment-list\" class=\"btn btn-info\">Equipment</a>\r\n                    <a routerLink=\"/app-work-order-quote\" class=\"btn btn-info\">WO Quote</a>\r\n                    <a routerLink=\"/app-work-order-complete-material-list\" class=\"btn btn-info\">Complete Material List</a>\r\n                    <a routerLink=\"/app-work-order-shipping\" class=\"btn btn-info\">Shipping??</a>\r\n                    <a routerLink=\"/app-work-order-billing-invoicing\" class=\"btn btn-info\">Billing/Invoicing</a>\r\n                    <a routerLink=\"/app-work-order-analysis\" class=\"btn btn-info\">Analysis</a>\r\n                    <a routerLink=\"/app-work-order-main-component\" class=\"btn btn-info\">Main Component</a>\r\n                    <a routerLink=\"/app-work-order-sub-wo-list\" class=\"btn btn-info\">Sub-WO</a>\r\n                    <a routerLink=\"/app-work-order-memo\" class=\"btn btn-info\">Memo</a>\r\n                    <a routerLink=\"/app-work-order-documents\" class=\"btn btn-info\">Documents</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-sm-12 col-12 \">\r\n            <div class=\"x_panel\">\r\n                <div class=\"x_content\">\r\n                    <div class=\"tab-content\">\r\n\r\n                        <div class=\"table-responsive\">\r\n                            <div class=\"clear mtop5\"></div>\r\n                            <div class=\"default-workflow-table\">\r\n                                <form id=\"\" class=\"lgrey-bg\" name=\"\" action=\"#\" method=\"post\" onsubmit=\"return false;\">\r\n                                    <hr />\r\n                                    <div class=\"col-sm-6 w300\">\r\n                                        <div class=\"form-group col-sm-12\">\r\n                                            <label class=\"control-label col-sm-4 w50\">Actions</label>\r\n                                            <div class=\"col-sm-7\">\r\n                                                <div class=\"input-group\">\r\n                                                    <select id=\"workflowtype\" name=\"workflowtype\" class=\"\">\r\n                                                        <option value=\"assemble\">Assemble</option>\r\n                                                        <option value=\"clean\">Clean</option>\r\n                                                        <option value=\"disassemble\">Disassemble</option>\r\n                                                        <option value=\"evaluate\">Evaluate</option>\r\n                                                        <option value=\"inspect\">Inspect</option>\r\n                                                        <option value=\"qc\">QC</option>\r\n                                                        <option value=\"receive\">Receive</option>\r\n                                                        <option value=\"ship\">Ship</option>\r\n                                                        <option value=\"teardown\">Teardown</option>\r\n                                                        <option value=\"testing\">Testing</option>\r\n                                                    </select>\r\n                                                    <a data-toggle=\"modal\" data-target=\"#addAction\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-sm-6 w300 \">\r\n                                        <div class=\"form-group col-sm-12\">\r\n                                            <label class=\"control-label col-sm-4 w90\">Action Attributes</label>\r\n                                            <div class=\"col-sm-7\">\r\n                                                <div class=\"input-group\">\r\n                                                    <select class=\"mselect\" id=\"cexpertise receive-attributes\" name=\"catadd\" multiple>\r\n                                                        <option value=\"charges\" class=\"charges\">Charges</option>\r\n                                                        <option value=\"directions\" class=\"directions\">Directions</option>\r\n                                                        <option value=\"equipment\" class=\"equipment\">Equipment</option>\r\n                                                        <option value=\"exclusions\" class=\"exclusions\">Exclusions</option>\r\n                                                        <option value=\"expertise\" class=\"expertise\">Expertise</option>\r\n                                                        <option value=\"materiallist\" class=\"materiallist\">Material List</option>\r\n                                                        <option value=\"publications\" class=\"publications\">Publications/CMM</option>\r\n                                                    </select>\r\n                                                    <a href=\"#\" data-toggle=\"modal\" data-target=\"#AddActionAttribute\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n\r\n                                    <div class=\"col-sm-6 w100 text-right \">\r\n                                        <a href=\"javascript:void(0)\" class=\"btn btn-default black-search-button \">Add</a>\r\n                                    </div>\r\n                                </form>\r\n                                <div class=\"col-md-12 col-sm-12 col-12 content-block workflow-block\">\r\n                                    <div class=\"x_panel\">\r\n                                        <div id=\"adminsearchlocationajax\" class=\"table-responsive default-bg clear\">\r\n                                            <div class=\"col-md-12 col-sm-12 col-12 workflow-attributes-block\">\r\n                                                <ul class=\"nav nav-pills tabs-left\" role=\"tablist\">\r\n                                                    <li class=\"a1\"><a href=\"#step1\" data-toggle=\"tab\" aria-expanded=\"true\" class=\"active\">Receive</a></li>\r\n                                                    <li class=\"a2\"><a href=\"#step2\" data-toggle=\"tab\">Inspect</a></li>\r\n                                                    <li class=\"a3\"><a href=\"#step3\" data-toggle=\"tab\">Evaluate</a></li>\r\n                                                    <li class=\"a4\"><a href=\"#step4\" data-toggle=\"tab\">Teardown</a></li>\r\n                                                    <li class=\"a5\"><a href=\"#step5\" data-toggle=\"tab\">Disassemble</a></li>\r\n                                                    <li class=\"a6\"><a href=\"#step6\" data-toggle=\"tab\">Assemble</a></li>\r\n                                                    <li class=\"a7\"><a href=\"#step7\" data-toggle=\"tab\">Testing</a></li>\r\n                                                    <li class=\"a8\"><a href=\"#step8\" data-toggle=\"tab\">QC</a></li>\r\n                                                    <li class=\"a9\"><a href=\"#step9\" data-toggle=\"tab\">Ship</a></li>\r\n                                                    <li class=\"a10\"><a href=\"#step10\" data-toggle=\"tab\">Clean</a></li>\r\n                                                </ul>\r\n                                                <div class=\"tab-content form-bg\" id=\"workflow-attributes-block\">\r\n                                                    <div class=\"tab-pane step-data active\" id=\"step1\">\r\n                                                        <div class=\"attribute-heading\">Receive</div>\r\n                                                        <div class=\"receive-attributes-block active action-attributes-block\">\r\n                                                            <ul class=\"nav nav-pills attributes-tabs\" role=\"tablist\">\r\n                                                                <li><a data-toggle=\"pill\" href=\"#receive-home\" class=\"active\">Material List</a></li>\r\n                                                                <li><a data-toggle=\"pill\" href=\"#receive-menu1\">Equipment List</a></li>\r\n                                                                <li><a data-toggle=\"pill\" href=\"#receive-menu2\">Expertise</a></li>\r\n                                                                <li><a data-toggle=\"pill\" href=\"#receive-menu3\">Directions</a></li>\r\n                                                                <li><a data-toggle=\"pill\" href=\"#receive-menu4\">Publications/CMM</a></li>\r\n                                                                <li><a data-toggle=\"pill\" href=\"#receive-menu5\">Charges</a></li>\r\n                                                                <li><a data-toggle=\"pill\" href=\"#receive-menu6\">Exclusions</a></li>\r\n                                                            </ul>\r\n                                                            <div class=\"clear\"></div>\r\n                                                            <div id=\"receive-home\" class=\"tab-pane in active form-bg\">\r\n                                                                <P class=\"cat-heading cat1\">Add New Material List <i class=\"fa fa-plus cat1-i\" ng-click=\"addMaterial()\"></i></P>\r\n\r\n                                                                <div class=\"fixed-table-container\">\r\n                                                                    <div class=\"fixed-table-container-inner table-responsive cat1-table\">\r\n\r\n                                                                        <table class=\"table table-bordered table-fixed mltablehfixed\">\r\n                                                                            <thead>\r\n                                                                                <tr>\r\n                                                                                    <th><div class=\"th-inner\">PN</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Description </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Item Classificcation </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Qty </div></th>\r\n                                                                                    <th><div class=\"th-inner\">UOM </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Condition </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Unit Cost </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Ext. Cost </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Provision </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Deferred </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Figure ID </div></th>\r\n                                                                                    <th><div class=\"th-inner\">Actions </div></th>\r\n                                                                                </tr>\r\n                                                                            </thead>\r\n                                                                            <tbody>\r\n\r\n                                                                                <tr ng-repeat=\"material in assets1\">\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <i class=\"fa fa-search\"></i>\r\n                                                                                            <input type=\"text\" class=\"form-control numberids\" name=\"\" placeholder=\"ID\" />\r\n                                                                                        </div>\r\n                                                                                        <a routerLink=\"/app-item-master-stock-setup\" target=\"_blank\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                                    </td>\r\n                                                                                    <td>\r\n                                                                                        <input class=\"w100\" name=\"\" />\r\n                                                                                    </td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <i class=\"fa fa-search\"></i>\r\n                                                                                            <input type=\"text\" class=\"form-control itemclassification\" name=\"\" placeholder=\"ID\" />\r\n                                                                                        </div>\r\n                                                                                        <a routerLink=\"/app-item-classification\" target=\"_blank\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                                    </td>\r\n                                                                                    <td><input class=\"w50\" type=\"number\" name=\"\" value=\"1\" /></td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <select class=\"w70\">\r\n                                                                                                <option value=\"Ctr\">Ctr</option>\r\n                                                                                                <option value=\"Ea\">Ea</option>\r\n                                                                                                <option value=\"Ft\">Ft</option>\r\n                                                                                                <option value=\"g\">g</option>\r\n                                                                                                <option value=\"Gal\">Gal</option>\r\n                                                                                                <option value=\"inch\">inch</option>\r\n                                                                                                <option value=\"kg\">kg</option>\r\n                                                                                                <option value=\"lbs\">lbs</option>\r\n                                                                                                <option value=\"Ltr\">Ltr</option>\r\n                                                                                                <option value=\"Mtr\">Mtr</option>\r\n                                                                                                <option value=\"Oz\">Oz</option>\r\n                                                                                                <option value=\"Yd\">Yd</option>\r\n                                                                                            </select>\r\n                                                                                        </div>\r\n                                                                                        <a data-toggle=\"modal\" data-target=\"#addUom\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                                    </td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <select class=\"w70\">\r\n                                                                                                <option value=\"AR\">AR</option>\r\n                                                                                                <option value=\"AS-IS\">AS-IS</option>\r\n                                                                                                <option value=\"NEW\">NEW</option>\r\n                                                                                                <option value=\"OVH\">OVH</option>\r\n                                                                                                <option value=\"REP\">REP</option>\r\n                                                                                                <option value=\"SRV\">SRV</option>\r\n                                                                                            </select>\r\n                                                                                        </div>\r\n                                                                                        <a data-toggle=\"modal\" data-target=\"#condition\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                                    </td>\r\n\r\n                                                                                    <td><input class=\"w50 materialunitcost amount\" name=\"\" /></td>\r\n                                                                                    <td><input class=\"w50 materialextcost amount attributeextcost\" name=\"\" /></td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <select class=\"w70 ng-pristine ng-valid ng-empty ng-touched\" name=\"provision0\" ng-model=\"material.provision\" ng-enabled=\"!enabledMaterialsavedEdit[0]\">\r\n                                                                                                <option value=\"Exchange\">Exchange</option>\r\n                                                                                                <option value=\"Loan\">Loan</option>\r\n                                                                                                <option value=\"Repair\">Repair</option>\r\n                                                                                                <option value=\"Replace\">Replace</option>\r\n                                                                                                <option value=\"Turn-in\">Turn-in</option>\r\n                                                                                                <option value=\"WO\">WO</option>\r\n                                                                                            </select>\r\n                                                                                        </div>\r\n                                                                                        <a routerLink=\"/app-provision\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                                    </td>\r\n                                                                                    <td>\r\n                                                                                        <select class=\"w50 ng-pristine ng-valid ng-empty ng-touched\" name=\"deferred0\" ng-model=\"material.deferred\" ng-enabled=\"!enabledMaterialsavedEdit[0]\">\r\n                                                                                            <option value=\"No\">No</option>\r\n                                                                                            <option value=\"Yes\">Yes</option>\r\n                                                                                        </select>\r\n                                                                                    </td>\r\n                                                                                    <td><input class=\"w70\" type=\"text\" name=\"\" value=\"\" /></td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"buttons\">\r\n                                                                                            <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                                        </div>\r\n                                                                                    </td>\r\n                                                                                </tr>\r\n\r\n                                                                                <tr class=\"attributes-total\">\r\n                                                                                    <td colspan=\"6\">Total Material Cost:</td>\r\n                                                                                    <td><input class=\"materialunitcosttotal\" type=\"text\" disabled /></td>\r\n                                                                                    <td><input class=\"materialextcosttotal attributeextcosttotal\" type=\"text\" disabled /></td>\r\n                                                                                </tr>\r\n                                                                            </tbody>\r\n                                                                        </table>\r\n                                                                    </div>\r\n                                                                </div>\r\n\r\n                                                            </div>\r\n                                                            <div id=\"receive-menu1\" class=\"tab-pane form-bg\">\r\n                                                                <P class=\"cat-heading cat2\">Add New Equipment List <i class=\"fa fa-plus cat1-i\" ng-click=\"addEquipment()\"></i></P>\r\n\r\n                                                                <div class=\"fixed-table-container\">\r\n                                                                    <div class=\"fixed-table-container-inner table-responsive cat2-table\">\r\n                                                                        <table class=\"table table-bordered table-fixed \">\r\n                                                                            <thead>\r\n                                                                                <tr>\r\n                                                                                    <th><div class=\"th-inner\">Item #</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Item Description</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Item Classification</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Qty</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                                </tr>\r\n                                                                            </thead>\r\n                                                                            <tbody>\r\n\r\n                                                                                <tr ng-repeat=\"equipment in assets2\">\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <i class=\"fa fa-search\"></i>\r\n                                                                                            <input type=\"text\" class=\"form-control numberids\" name=\"\" placeholder=\"ID\" />\r\n                                                                                        </div>\r\n                                                                                        <a routerLink=\"/app-item-master-equipment-setup\" target=\"_blank\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                                    </td>\r\n                                                                                    <td><input name=\"\" /></td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <select class=\"w70 ng-pristine ng-valid ng-empty ng-touched\" name=\"materialType0\" ng-model=\"material.materialType\" ng-enabled=\"!enabledMaterialsavedEdit[0]\">\r\n                                                                                                <option value=\"Consumable\">Consumable</option>\r\n                                                                                                <option value=\"Equipment\">Equipment</option>\r\n                                                                                                <option value=\"Expendable\">Expendable</option>\r\n                                                                                                <option value=\"Kit\">Kit</option>\r\n                                                                                                <option value=\"Rotatable\">Rotatable</option>\r\n                                                                                            </select>\r\n                                                                                        </div>\r\n                                                                                        <a href=\"#\" data-toggle=\"modal\" data-target=\"#addType\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                                    </td>\r\n                                                                                    <td><input class=\"w50\" type=\"number\" name=\"\" value=\"1\" /></td>\r\n\r\n                                                                                    <td>\r\n                                                                                        <div class=\"buttons\">\r\n                                                                                            <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                                        </div>\r\n                                                                                    </td>\r\n                                                                                </tr>\r\n\r\n                                                                            </tbody>\r\n                                                                        </table>\r\n                                                                    </div>\r\n                                                                </div>\r\n\r\n                                                            </div>\r\n                                                            <div id=\"receive-menu2\" class=\"tab-pane form-bg\">\r\n                                                                <P class=\"cat-heading cat3\">Add New Expertise <i class=\"fa fa-plus cat1-i\" ng-click=\"addExpertise()\"></i></P>\r\n\r\n                                                                <div class=\"fixed-table-container\">\r\n                                                                    <div class=\"fixed-table-container-inner table-responsive cat3-table\">\r\n                                                                        <table class=\"table table-bordered table-fixed\">\r\n                                                                            <thead>\r\n                                                                                <tr>\r\n                                                                                    <th><div class=\"th-inner\">Expertise Type</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Estimated Hours</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Standard Rate</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Estimated Cost</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                                </tr>\r\n                                                                            </thead>\r\n                                                                            <tbody>\r\n\r\n                                                                                <tr ng-repeat=\"expertise in assets3\">\r\n                                                                                    <td>\r\n                                                                                        <select>\r\n                                                                                            <option value=\"\"></option>\r\n                                                                                            <option value=\"Auditor\">Auditor</option>\r\n                                                                                            <option value=\"Engineer\">Engineer</option>\r\n                                                                                            <option value=\"Inspector\">Inspector</option>\r\n                                                                                            <option value=\"Mechanic\">Mechanic</option>\r\n                                                                                            <option value=\"Quality\">Quality</option>\r\n                                                                                            <option value=\"Receiver\">Receiver</option>\r\n                                                                                            <option value=\"Technician\">Technician</option>\r\n                                                                                        </select>\r\n                                                                                    </td>\r\n                                                                                    <td><input class=\"hours w50\" name=\"\" /></td>\r\n                                                                                    <td><input name=\"\" class=\"w50 expertisestandardrate amount\" /></td>\r\n                                                                                    <td><input class=\"w100 expertiseestimatedcost attributeextcost amount\" name=\"\" /></td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"buttons\">\r\n                                                                                            <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                                        </div>\r\n                                                                                    </td>\r\n                                                                                </tr>\r\n\r\n                                                                                <tr class=\"attributes-total\">\r\n                                                                                    <td colspan=\"2\">Total Expertise Cost:</td>\r\n                                                                                    <td><input class=\"expertisestandardratetotal\" type=\"text\" disabled /></td>\r\n                                                                                    <td><input class=\"expertiseestimatedcosttotal attributeextcosttotal\" type=\"text\" disabled /></td>\r\n                                                                                </tr>\r\n                                                                            </tbody>\r\n                                                                        </table>\r\n                                                                    </div>\r\n                                                                </div>\r\n\r\n                                                            </div>\r\n                                                            <div id=\"receive-menu3\" class=\"tab-pane form-bg\">\r\n                                                                <P class=\"cat-heading cat3\">Directions</P>\r\n                                                                <div class=\"form-group col-sm-3 mtop10\">\r\n                                                                    <label class=\"control-label col-sm-3\">Action</label>\r\n                                                                    <div class=\"col-sm-8 col-offset-1\">\r\n                                                                        <input class=\"form-control\" type=\"text\" id=\"\" name=\"\" placeholder=\"Action\">\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"form-group col-sm-3 mtop10\">\r\n                                                                    <label class=\"control-label col-sm-4\">Direction Name</label>\r\n                                                                    <div class=\"col-sm-7 col-offset-1\">\r\n                                                                        <input class=\"form-control\" type=\"text\" placeholder=\"Direction Name\">\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"form-group col-sm-2 mtop10\">\r\n                                                                    <label class=\"control-label col-sm-6\">Sequence</label>\r\n                                                                    <div class=\"col-sm-4 col-offset-1\">\r\n                                                                        <input class=\"form-control w50\" type=\"number\" value=\"1\" placeholder=\"Sequence\">\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"form-group col-sm-4 mtop10\">\r\n                                                                    <label class=\"control-label col-sm-2\">Memo</label>\r\n                                                                    <div class=\"col-sm-9 col-offset-1\">\r\n                                                                        <textarea placeholder=\"Memo\" id=\"\" name=\"\" class=\"form-control directon-memo\" rows=\"1\"></textarea>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                            <div id=\"receive-menu4\" class=\"tab-pane fade form-bg\">\r\n                                                                <P class=\"cat-heading cat4\">Publications/CMM</P>\r\n                                                                <div class=\"col-sm-5 mtop10\">\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Entry Date</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control datepicker\" type=\"text\" disabled=\"disabled\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Action</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control\" type=\"text\" placeholder=\"Action Name\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Publication ID  </label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control\" type=\"text\" placeholder=\"Publication ID\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Publication Description</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <textarea id=\"\" name=\"\" placeholder=\"Publication Description\" rows=\"3\" class=\"form-control margin0\"></textarea>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Publication Type</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control\" type=\"text\" placeholder=\"Publication Type\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Author/Source/Directive</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Vendor Name\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Published By</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Published By\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Platform</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Platform\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Model</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Model\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">ATA-Main</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"ATA-Main\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">ATA-Sub Chapter</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"ATA-Sub Chapter\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">ATA-position/Zone</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"ATA-position/Zone\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Location</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Location\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div><!--end-->\r\n                                                                <div class=\"col-sm-4 mtop10\">\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Revision</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control revision-checkbox\" type=\"checkbox\" id=\"\" name=\"\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <!--Hidden Block-->\r\n                                                                    <div class=\"revision-block bg-grey\">\r\n                                                                        <hr>\r\n                                                                        <div class=\"form-group col-sm-12\">\r\n                                                                            <label class=\"control-label col-sm-4\">Revision ID </label>\r\n                                                                            <div class=\"col-sm-7\">\r\n                                                                                <input class=\"form-control\" type=\"text\" placeholder=\"Revision ID\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                        <div class=\"form-group col-sm-12\">\r\n                                                                            <label class=\"control-label col-sm-4\">Revision Date</label>\r\n                                                                            <div class=\"col-sm-7\">\r\n                                                                                <input class=\"form-control datepicker\" type=\"text\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                        <div class=\"form-group col-sm-12\">\r\n                                                                            <label class=\"control-label col-sm-4\">Verified By </label>\r\n                                                                            <div class=\"col-sm-7\">\r\n                                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Employee Name\" autocomplete=\"off\">\r\n                                                                                </div>\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                        <div class=\"form-group col-sm-12\">\r\n                                                                            <label class=\"control-label col-sm-4\">Verified Date</label>\r\n                                                                            <div class=\"col-sm-7\">\r\n                                                                                <input class=\"form-control datepicker\" type=\"text\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                        <div class=\"clear\"></div>\r\n                                                                    </div>\r\n                                                                    <!--end-->\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Verified by</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Verified by\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Next Review Date</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control datepicker\" type=\"text\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Expiration Date</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control datepicker\" type=\"text\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Employee</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"inner-addon right-addon inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Employee\" autocomplete=\"off\">\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Revision Date</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"form-control datepicker\" type=\"text\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Image</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <div class=\"upload\">\r\n                                                                                <input type=\"file\" name=\"upload[]\" id=\"upload\" class=\"inputfile upload-file\" data-multiple-caption=\"{count} files selected\" multiple />\r\n                                                                                <label for=\"upload\">\r\n                                                                                    <figure><i class=\"fa fa-upload\"></i></figure>\r\n                                                                                    <span>Choose a file&hellip;</span>\r\n                                                                                </label>\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Status</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <select>\r\n                                                                                <option value=\"Active\" selected=\"selected\">Active</option>\r\n                                                                                <option value=\"In-Active\">In-Active</option>\r\n                                                                            </select>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"form-group col-sm-12\">\r\n                                                                        <label class=\"control-label col-sm-4\">Expired</label>\r\n                                                                        <div class=\"col-sm-7\">\r\n                                                                            <input class=\"\" type=\"checkbox\" id=\"\">\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div><!--end-->\r\n\r\n                                                                <div class=\"clear\"></div>\r\n                                                            </div>\r\n                                                            <div id=\"receive-menu5\" class=\"tab-pane form-bg\">\r\n                                                                <P class=\"cat-heading cat4\">Add New Charges <i class=\"fa fa-plus cat1-i\" ng-click=\"addCharges()\"></i></P>\r\n                                                                <div class=\"fixed-table-container\">\r\n                                                                    <div class=\"fixed-table-container-inner table-responsive cat4-table\">\r\n                                                                        <table class=\"table table-bordered table-fixed \">\r\n                                                                            <thead>\r\n                                                                                <tr>\r\n                                                                                    <th><div class=\"th-inner\">Type</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Qty</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Unit Cost</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Extended Cost</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                                </tr>\r\n                                                                            </thead>\r\n                                                                            <tbody>\r\n\r\n                                                                                <tr ng-repeat=\"charges in assets4\">\r\n                                                                                    <td>\r\n                                                                                        <select>\r\n                                                                                            <option value=\"\"></option>\r\n                                                                                            <option value=\"AOG Fee\">AOG Fee</option>\r\n                                                                                            <option value=\"Out of Scope\">Out of Scope</option>\r\n                                                                                            <option value=\"Rework\">Rework</option>\r\n                                                                                        </select>\r\n                                                                                    </td>\r\n                                                                                    <td><input type=\"number\" name=\"\" value=\"1\" class=\"w50\" /></td>\r\n                                                                                    <td><input name=\"\" class=\"w100 chargesunitcost amount\"></td>\r\n                                                                                    <td><input name=\"\" class=\"w100 chargesextendedcost attributeextcost amount\"></td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"buttons\">\r\n                                                                                            <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                                        </div>\r\n                                                                                    </td>\r\n                                                                                </tr>\r\n\r\n                                                                                <tr class=\"attributes-total\">\r\n                                                                                    <td colspan=\"2\">Total Charges Cost:</td>\r\n                                                                                    <td><input class=\"chargesunitcosttotal\" type=\"text\" disabled /></td>\r\n                                                                                    <td><input class=\"chargesextendedcosttotal attributeextcosttotal\" type=\"text\" disabled /></td>\r\n                                                                                </tr>\r\n                                                                            </tbody>\r\n                                                                        </table>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                            <div id=\"receive-menu6\" class=\"tab-pane form-bg\">\r\n                                                                <P class=\"cat-heading cat4\">Add New Exclusion <i class=\"fa fa-plus cat1-i\"></i></P>\r\n                                                                <div class=\"fixed-table-container\">\r\n                                                                    <div class=\"fixed-table-container-inner table-responsive cat4-table\">\r\n                                                                        <table class=\"table table-bordered table-fixed \">\r\n                                                                            <thead>\r\n                                                                                <tr>\r\n                                                                                    <th><div class=\"th-inner\">PN</div></th>\r\n                                                                                    <th><div class=\"th-inner\">PN Description</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Notes</div></th>\r\n                                                                                    <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                                </tr>\r\n                                                                            </thead>\r\n                                                                            <tbody>\r\n\r\n                                                                                <tr ng-repeat=\"exclusions in assets5\">\r\n                                                                                    <td>\r\n                                                                                        <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                            <i class=\"fa fa-search\"></i>\r\n                                                                                            <input type=\"text\" class=\"form-control numberids\" name=\"\" placeholder=\"ID\" />\r\n                                                                                        </div>\r\n                                                                                    </td>\r\n                                                                                    <td><input class=\"w150\" name=\"\" /></td>\r\n                                                                                    <td><input class=\"w150\" name=\"\" /></td>\r\n                                                                                    <td>\r\n                                                                                        <div class=\"buttons\">\r\n                                                                                            <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                                        </div>\r\n                                                                                    </td>\r\n                                                                                </tr>\r\n\r\n                                                                            </tbody>\r\n                                                                        </table>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div>\r\n\r\n\r\n\r\n                                                </div>\r\n                                            </div>\r\n                                            <a routerLink=\"/app-workflow-list\" class=\"btn btn-primary mtop40 black-search-button save-action-btn1 pull-right\">Save Workflow Details</a>\r\n\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"deferred-table\">\r\n                                <h4>Deferred Material List</h4>\r\n                                <table class=\"table table-bordered table-striped po-ro-setup-table\">\r\n                                    <thead>\r\n                                        <tr>\r\n                                            <th>PN</th>\r\n                                            <th>PN Description</th>\r\n                                            <th>Qty Required</th>\r\n                                            <th>Qty Needed</th>\r\n                                            <th>Qty Remaining</th>\r\n                                            <th>Item Classification</th>\r\n                                            <th>Workflow ID</th>\r\n                                            <th>Work Flow Description</th>\r\n                                            <th>Action</th>\r\n                                            <th>Figure ID</th>\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                        <tr>\r\n                                            <td>PN123</td>\r\n                                            <td>Description</td>\r\n                                            <td><input type=\"number\" class=\"form-control\" value=\"3\"></td>\r\n                                            <td><input type=\"number\" class=\"form-control\" value=\"4\"></td>\r\n                                            <td><input type=\"number\" class=\"form-control\" value=\"1\"></td>\r\n                                            <td>\r\n                                                <div class=\"inner-addon right-addon w150 inline-block\">\r\n                                                    <i class=\"fa fa-search\"></i>\r\n                                                    <input type=\"text\" class=\"itemclassification form-control\" id=\"cmname\" name=\"\" placeholder=\"Item Classification\">\r\n                                                </div>\r\n                                            </td>\r\n                                            <td>ACC 123</td>\r\n                                            <td>Workflow Description</td>\r\n                                            <td></td>\r\n                                            <td></td>\r\n                                        </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div id=\"tab1\" class=\"tab-pane fade\">\r\n                            <p class=\"clr-red\">This is Workflow setup funcionality, dynamic functionality is not done in this page.</p>\r\n                            <div class=\"col-sm-6 w300\">\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4 w50\">Actions</label>\r\n                                    <div class=\"col-sm-7\">\r\n                                        <div class=\"input-group\">\r\n                                            <select id=\"workflowtype\" name=\"workflowtype\" class=\"form-control\">\r\n                                                <option value=\"receive\">Receive</option>\r\n                                                <option value=\"inspect\">Inspect</option>\r\n                                                <option value=\"evaluate\">Evaluate</option>\r\n                                                <option value=\"teardown\">Teardown</option>\r\n                                                <option value=\"disassemble\">Disassemble</option>\r\n                                                <option value=\"assemble\">Assemble</option>\r\n                                                <option value=\"testing\">Testing</option>\r\n                                                <option value=\"qc\">QC</option>\r\n                                                <option value=\"ship\">Ship</option>\r\n                                                <option value=\"clean\">Clean</option>\r\n                                            </select>\r\n                                            <a data-toggle=\"modal\" data-target=\"#addAction\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-sm-6 w300 action-attributes-select-block\">\r\n                                <div class=\"form-group col-sm-12\">\r\n                                    <label class=\"control-label col-sm-4 w90\">Action Attributes</label>\r\n                                    <div class=\"col-sm-7\">\r\n                                        <div class=\"input-group\">\r\n                                            <select id=\"cexpertise\" name=\"catadd\" multiple>\r\n                                                <option value=\"materiallist\" class=\"materiallist\">Material List</option>\r\n                                                <option value=\"equipment\" class=\"equipment\">Equipment</option>\r\n                                                <option value=\"expertise\" class=\"expertise\">Expertise</option>\r\n                                                <option value=\"directions\" class=\"directions\">Directions</option>\r\n                                                <option value=\"publications\" class=\"publications\">Publications/CMM</option>\r\n                                                <option value=\"charges\" class=\"charges\">Charges</option>\r\n                                                <option value=\"exclusions\" class=\"exclusions\">Exclusions</option>\r\n                                            </select>\r\n                                            <a data-toggle=\"modal\" data-target=\"#AddActionAttribute\" class=\"add-icon\"><i class=\"fa fa-plus\"></i></a>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-sm-6 w100 text-right\">\r\n                                <a href=\"javascript:void(0)\" class=\"btn btn-default black-search-button cat-add-btn cat-add-btn1\">Add</a>\r\n                            </div>\r\n\r\n                            <div id=\"adminsearchlocationajax\" class=\"table-responsive default-bg clear\">\r\n                                <div class=\"col-md-12 col-sm-12 col-12 workflow-attributes-block\">\r\n                                    <ul class=\"nav nav-pills tabs-left\" role=\"tablist\">\r\n                                        <li class=\"a1\"><a href=\"#step1\" data-toggle=\"tab\" aria-expanded=\"true\" class=\"active\">Receive</a></li>\r\n                                        <li class=\"a2\"><a href=\"#step2\" data-toggle=\"tab\">Inspect</a></li>\r\n                                        <li class=\"a3\"><a href=\"#step3\" data-toggle=\"tab\">Evaluate</a></li>\r\n                                        <li class=\"a4\"><a href=\"#step4\" data-toggle=\"tab\">Teardown</a></li>\r\n                                        <li class=\"a5\"><a href=\"#step5\" data-toggle=\"tab\">Disassemble</a></li>\r\n                                        <li class=\"a6\"><a href=\"#step6\" data-toggle=\"tab\">Assemble</a></li>\r\n                                        <li class=\"a7\"><a href=\"#step7\" data-toggle=\"tab\">Testing</a></li>\r\n                                        <li class=\"a8\"><a href=\"#step8\" data-toggle=\"tab\">QC</a></li>\r\n                                        <li class=\"a9\"><a href=\"#step9\" data-toggle=\"tab\">Ship</a></li>\r\n                                        <li class=\"a10\"><a href=\"#step10\" data-toggle=\"tab\">Clean</a></li>\r\n                                    </ul>\r\n                                    <div class=\"tab-content form-bg\" id=\"workflow-attributes-block\">\r\n                                        <div class=\"tab-pane step-data active\" id=\"step1\">\r\n                                            <div class=\"attribute-heading\">Receive</div>\r\n                                            <div class=\"receive-attributes-block active action-attributes-block\">\r\n                                                <ul class=\"nav nav-pills attributes-tabs\" role=\"tablist\">\r\n                                                    <li><a data-toggle=\"pill\" href=\"#receive-home\" class=\"active\">Material List</a></li>\r\n                                                    <li><a data-toggle=\"pill\" href=\"#receive-menu1\">Equipment List</a></li>\r\n                                                    <li><a data-toggle=\"pill\" href=\"#receive-menu2\">Expertise</a></li>\r\n                                                    <li><a data-toggle=\"pill\" href=\"#receive-menu3\">Directions</a></li>\r\n                                                    <li><a data-toggle=\"pill\" href=\"#receive-menu4\">Publications/CMM</a></li>\r\n                                                    <li><a data-toggle=\"pill\" href=\"#receive-menu5\">Charges</a></li>\r\n                                                    <li><a data-toggle=\"pill\" href=\"#receive-menu6\">Exclusions</a></li>\r\n                                                </ul>\r\n                                                <div class=\"clear\"></div>\r\n                                                <div id=\"receive-home\" class=\"tab-pane in active form-bg\">\r\n                                                    <P class=\"cat-heading cat1\">Add New Material List <i class=\"fa fa-plus cat1-i\" ng-click=\"addMaterial()\"></i></P>\r\n\r\n                                                    <div class=\"fixed-table-container\">\r\n                                                        <div class=\"fixed-table-container-inner table-responsive cat1-table\">\r\n\r\n                                                            <table class=\"table table-bordered table-fixed mltablehfixed\">\r\n                                                                <thead>\r\n                                                                    <tr>\r\n                                                                        <th><div class=\"th-inner\">PN</div></th>\r\n                                                                        <th><div class=\"th-inner\">Description </div></th>\r\n                                                                        <th><div class=\"th-inner\">Item Classificcation </div></th>\r\n                                                                        <th><div class=\"th-inner\">Qty </div></th>\r\n                                                                        <th><div class=\"th-inner\">UOM </div></th>\r\n                                                                        <th><div class=\"th-inner\">Condition </div></th>\r\n                                                                        <th><div class=\"th-inner\">Unit Cost </div></th>\r\n                                                                        <th><div class=\"th-inner\">Ext. Cost </div></th>\r\n                                                                        <th><div class=\"th-inner\">Provision </div></th>\r\n                                                                        <th><div class=\"th-inner\">Deferred </div></th>\r\n                                                                        <th><div class=\"th-inner\">Figure ID </div></th>\r\n                                                                        <th><div class=\"th-inner\">Actions </div></th>\r\n                                                                    </tr>\r\n                                                                </thead>\r\n                                                                <tbody>\r\n\r\n                                                                    <tr ng-repeat=\"material in assets1\">\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control numberids\" name=\"\" placeholder=\"ID\" />\r\n                                                                            </div>\r\n                                                                            <a routerLink=\"/app-item-master-stock-setup\" target=\"_blank\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                        </td>\r\n                                                                        <td>\r\n                                                                            <input class=\"w100\" name=\"\" />\r\n                                                                        </td>\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control itemclassification\" name=\"\" placeholder=\"ID\" />\r\n                                                                            </div>\r\n                                                                            <a routerLink=\"/app-item-classification\" target=\"_blank\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                        </td>\r\n                                                                        <td><input class=\"w50\" type=\"number\" name=\"\" value=\"1\" /></td>\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <select class=\"w70\">\r\n                                                                                    <option value=\"Ctr\">Ctr</option>\r\n                                                                                    <option value=\"Ea\">Ea</option>\r\n                                                                                    <option value=\"Ft\">Ft</option>\r\n                                                                                    <option value=\"g\">g</option>\r\n                                                                                    <option value=\"Gal\">Gal</option>\r\n                                                                                    <option value=\"inch\">inch</option>\r\n                                                                                    <option value=\"kg\">kg</option>\r\n                                                                                    <option value=\"lbs\">lbs</option>\r\n                                                                                    <option value=\"Ltr\">Ltr</option>\r\n                                                                                    <option value=\"Mtr\">Mtr</option>\r\n                                                                                    <option value=\"Oz\">Oz</option>\r\n                                                                                    <option value=\"Yd\">Yd</option>\r\n                                                                                </select>\r\n                                                                            </div>\r\n                                                                            <a data-toggle=\"modal\" data-target=\"#addUom\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                        </td>\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <select class=\"w70\">\r\n                                                                                    <option value=\"AR\">AR</option>\r\n                                                                                    <option value=\"AS-IS\">AS-IS</option>\r\n                                                                                    <option value=\"NEW\">NEW</option>\r\n                                                                                    <option value=\"OVH\">OVH</option>\r\n                                                                                    <option value=\"REP\">REP</option>\r\n                                                                                    <option value=\"SRV\">SRV</option>\r\n                                                                                </select>\r\n                                                                            </div>\r\n                                                                            <a data-toggle=\"modal\" data-target=\"#condition\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                        </td>\r\n\r\n                                                                        <td><input class=\"w50 materialunitcost amount\" name=\"\" /></td>\r\n                                                                        <td><input class=\"w50 materialextcost amount attributeextcost\" name=\"\" /></td>\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <select class=\"w70 ng-pristine ng-valid ng-empty ng-touched\" name=\"provision0\" ng-model=\"material.provision\" ng-enabled=\"!enabledMaterialsavedEdit[0]\">\r\n                                                                                    <option value=\"Exchange\">Exchange</option>\r\n                                                                                    <option value=\"Loan\">Loan</option>\r\n                                                                                    <option value=\"Repair\">Repair</option>\r\n                                                                                    <option value=\"Replace\">Replace</option>\r\n                                                                                    <option value=\"Turn-in\">Turn-in</option>\r\n                                                                                    <option value=\"WO\">WO</option>\r\n                                                                                </select>\r\n                                                                            </div>\r\n                                                                            <a routerLink=\"/app-provision\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                        </td>\r\n                                                                        <td>\r\n                                                                            <select class=\"w50 ng-pristine ng-valid ng-empty ng-touched\" name=\"deferred0\" ng-model=\"material.deferred\" ng-enabled=\"!enabledMaterialsavedEdit[0]\">\r\n                                                                                <option value=\"No\">No</option>\r\n                                                                                <option value=\"Yes\">Yes</option>\r\n                                                                            </select>\r\n                                                                        </td>\r\n                                                                        <td><input class=\"w70\" type=\"text\" name=\"\" value=\"\" /></td>\r\n                                                                        <td>\r\n                                                                            <div class=\"buttons\">\r\n                                                                                <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                            </div>\r\n                                                                        </td>\r\n                                                                    </tr>\r\n\r\n                                                                    <tr class=\"attributes-total\">\r\n                                                                        <td colspan=\"6\">Total Material Cost:</td>\r\n                                                                        <td><input class=\"materialunitcosttotal\" type=\"text\" disabled /></td>\r\n                                                                        <td><input class=\"materialextcosttotal attributeextcosttotal\" type=\"text\" disabled /></td>\r\n                                                                    </tr>\r\n                                                                </tbody>\r\n                                                            </table>\r\n                                                        </div>\r\n                                                    </div>\r\n\r\n                                                </div>\r\n                                                <div id=\"receive-menu1\" class=\"tab-pane form-bg\">\r\n                                                    <P class=\"cat-heading cat2\">Add New Equipment List <i class=\"fa fa-plus cat1-i\" ng-click=\"addEquipment()\"></i></P>\r\n\r\n                                                    <div class=\"fixed-table-container\">\r\n                                                        <div class=\"fixed-table-container-inner table-responsive cat2-table\">\r\n                                                            <table class=\"table table-bordered table-fixed \">\r\n                                                                <thead>\r\n                                                                    <tr>\r\n                                                                        <th><div class=\"th-inner\">Item #</div></th>\r\n                                                                        <th><div class=\"th-inner\">Item Description</div></th>\r\n                                                                        <th><div class=\"th-inner\">Item Classification</div></th>\r\n                                                                        <th><div class=\"th-inner\">Qty</div></th>\r\n                                                                        <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                    </tr>\r\n                                                                </thead>\r\n                                                                <tbody>\r\n\r\n                                                                    <tr ng-repeat=\"equipment in assets2\">\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control numberids\" name=\"\" placeholder=\"ID\" />\r\n                                                                            </div>\r\n                                                                            <a routerLink=\"/app-item-master-equipment-setup\" target=\"_blank\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                        </td>\r\n                                                                        <td><input name=\"\" /></td>\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <select class=\"w70 ng-pristine ng-valid ng-empty ng-touched\" name=\"materialType0\" ng-model=\"material.materialType\" ng-enabled=\"!enabledMaterialsavedEdit[0]\">\r\n                                                                                    <option value=\"Consumable\">Consumable</option>\r\n                                                                                    <option value=\"Equipment\">Equipment</option>\r\n                                                                                    <option value=\"Expendable\">Expendable</option>\r\n                                                                                    <option value=\"Kit\">Kit</option>\r\n                                                                                    <option value=\"Rotatable\">Rotatable</option>\r\n                                                                                </select>\r\n                                                                            </div>\r\n                                                                            <a href=\"#\" data-toggle=\"modal\" data-target=\"#addType\" class=\"add-icon2\"><i class=\"fa fa-plus\"></i></a>\r\n                                                                        </td>\r\n                                                                        <td><input class=\"w50\" type=\"number\" name=\"\" value=\"1\" /></td>\r\n\r\n                                                                        <td>\r\n                                                                            <div class=\"buttons\">\r\n                                                                                <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                            </div>\r\n                                                                        </td>\r\n                                                                    </tr>\r\n\r\n                                                                </tbody>\r\n                                                            </table>\r\n                                                        </div>\r\n                                                    </div>\r\n\r\n                                                </div>\r\n                                                <div id=\"receive-menu2\" class=\"tab-pane form-bg\">\r\n                                                    <P class=\"cat-heading cat3\">Add New Expertise <i class=\"fa fa-plus cat1-i\" ng-click=\"addExpertise()\"></i></P>\r\n\r\n                                                    <div class=\"fixed-table-container\">\r\n                                                        <div class=\"fixed-table-container-inner table-responsive cat3-table\">\r\n                                                            <table class=\"table table-bordered table-fixed\">\r\n                                                                <thead>\r\n                                                                    <tr>\r\n                                                                        <th><div class=\"th-inner\">Expertise Type</div></th>\r\n                                                                        <th><div class=\"th-inner\">Estimated Hours</div></th>\r\n                                                                        <th><div class=\"th-inner\">Standard Rate</div></th>\r\n                                                                        <th><div class=\"th-inner\">Estimated Cost</div></th>\r\n                                                                        <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                    </tr>\r\n                                                                </thead>\r\n                                                                <tbody>\r\n\r\n                                                                    <tr ng-repeat=\"expertise in assets3\">\r\n                                                                        <td>\r\n                                                                            <select>\r\n                                                                                <option value=\"\"></option>\r\n                                                                                <option value=\"Auditor\">Auditor</option>\r\n                                                                                <option value=\"Engineer\">Engineer</option>\r\n                                                                                <option value=\"Inspector\">Inspector</option>\r\n                                                                                <option value=\"Mechanic\">Mechanic</option>\r\n                                                                                <option value=\"Quality\">Quality</option>\r\n                                                                                <option value=\"Receiver\">Receiver</option>\r\n                                                                                <option value=\"Technician\">Technician</option>\r\n                                                                            </select>\r\n                                                                        </td>\r\n                                                                        <td><input class=\"hours w50\" name=\"\" /></td>\r\n                                                                        <td><input name=\"\" class=\"w50 expertisestandardrate amount\" /></td>\r\n                                                                        <td><input class=\"w100 expertiseestimatedcost attributeextcost amount\" name=\"\" /></td>\r\n                                                                        <td>\r\n                                                                            <div class=\"buttons\">\r\n                                                                                <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                            </div>\r\n                                                                        </td>\r\n                                                                    </tr>\r\n\r\n                                                                    <tr class=\"attributes-total\">\r\n                                                                        <td colspan=\"2\">Total Expertise Cost:</td>\r\n                                                                        <td><input class=\"expertisestandardratetotal\" type=\"text\" disabled /></td>\r\n                                                                        <td><input class=\"expertiseestimatedcosttotal attributeextcosttotal\" type=\"text\" disabled /></td>\r\n                                                                    </tr>\r\n                                                                </tbody>\r\n                                                            </table>\r\n                                                        </div>\r\n                                                    </div>\r\n\r\n                                                </div>\r\n                                                <div id=\"receive-menu3\" class=\"tab-pane form-bg\">\r\n                                                    <P class=\"cat-heading cat3\">Directions</P>\r\n                                                    <div class=\"form-group col-sm-3 mtop10\">\r\n                                                        <label class=\"control-label col-sm-3\">Action</label>\r\n                                                        <div class=\"col-sm-8 col-offset-1\">\r\n                                                            <input class=\"form-control\" type=\"text\" id=\"\" name=\"\" placeholder=\"Action\">\r\n                                                        </div>\r\n                                                    </div>\r\n                                                    <div class=\"form-group col-sm-3 mtop10\">\r\n                                                        <label class=\"control-label col-sm-4\">Direction Name</label>\r\n                                                        <div class=\"col-sm-7 col-offset-1\">\r\n                                                            <input class=\"form-control\" type=\"text\" placeholder=\"Direction Name\">\r\n                                                        </div>\r\n                                                    </div>\r\n                                                    <div class=\"form-group col-sm-2 mtop10\">\r\n                                                        <label class=\"control-label col-sm-6\">Sequence</label>\r\n                                                        <div class=\"col-sm-4 col-offset-1\">\r\n                                                            <input class=\"form-control w50\" type=\"number\" value=\"1\" placeholder=\"Sequence\">\r\n                                                        </div>\r\n                                                    </div>\r\n                                                    <div class=\"form-group col-sm-4 mtop10\">\r\n                                                        <label class=\"control-label col-sm-2\">Memo</label>\r\n                                                        <div class=\"col-sm-9 col-offset-1\">\r\n                                                            <textarea placeholder=\"Memo\" id=\"\" name=\"\" class=\"form-control directon-memo\" rows=\"1\"></textarea>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div id=\"receive-menu4\" class=\"tab-pane fade form-bg\">\r\n                                                    <P class=\"cat-heading cat4\">Publications/CMM</P>\r\n                                                    <div class=\"col-sm-5 mtop10\">\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Entry Date</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control datepicker\" type=\"text\" disabled=\"disabled\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Action</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control\" type=\"text\" placeholder=\"Action Name\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Publication ID  </label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control\" type=\"text\" placeholder=\"Publication ID\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Publication Description</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <textarea id=\"\" name=\"\" placeholder=\"Publication Description\" rows=\"3\" class=\"form-control margin0\"></textarea>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Publication Type</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control\" type=\"text\" placeholder=\"Publication Type\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Author/Source/Directive</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Vendor Name\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Published By</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Published By\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Platform</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Platform\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Model</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Model\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">ATA-Main</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"ATA-Main\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">ATA-Sub Chapter</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"ATA-Sub Chapter\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">ATA-position/Zone</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"ATA-position/Zone\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Location</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Location\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div><!--end-->\r\n                                                    <div class=\"col-sm-4 mtop10\">\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Revision</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control revision-checkbox\" type=\"checkbox\" id=\"\" name=\"\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <!--Hidden Block-->\r\n                                                        <div class=\"revision-block bg-grey\">\r\n                                                            <hr>\r\n                                                            <div class=\"form-group col-sm-12\">\r\n                                                                <label class=\"control-label col-sm-4\">Revision ID </label>\r\n                                                                <div class=\"col-sm-7\">\r\n                                                                    <input class=\"form-control\" type=\"text\" placeholder=\"Revision ID\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                            <div class=\"form-group col-sm-12\">\r\n                                                                <label class=\"control-label col-sm-4\">Revision Date</label>\r\n                                                                <div class=\"col-sm-7\">\r\n                                                                    <input class=\"form-control datepicker\" type=\"text\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                            <div class=\"form-group col-sm-12\">\r\n                                                                <label class=\"control-label col-sm-4\">Verified By </label>\r\n                                                                <div class=\"col-sm-7\">\r\n                                                                    <div class=\"inner-addon right-addon inline-block\">\r\n                                                                        <i class=\"fa fa-search\"></i>\r\n                                                                        <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Employee Name\" autocomplete=\"off\">\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                            <div class=\"form-group col-sm-12\">\r\n                                                                <label class=\"control-label col-sm-4\">Verified Date</label>\r\n                                                                <div class=\"col-sm-7\">\r\n                                                                    <input class=\"form-control datepicker\" type=\"text\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                            <div class=\"clear\"></div>\r\n                                                        </div>\r\n                                                        <!--end-->\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Verified by</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Verified by\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Next Review Date</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control datepicker\" type=\"text\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Expiration Date</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control datepicker\" type=\"text\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Employee</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"inner-addon right-addon inline-block\">\r\n                                                                    <i class=\"fa fa-search\"></i>\r\n                                                                    <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Employee\" autocomplete=\"off\">\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Revision Date</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"form-control datepicker\" type=\"text\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Image</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <div class=\"upload\">\r\n                                                                    <input type=\"file\" name=\"upload[]\" id=\"upload\" class=\"inputfile upload-file\" data-multiple-caption=\"{count} files selected\" multiple />\r\n                                                                    <label for=\"upload\">\r\n                                                                        <figure><i class=\"fa fa-upload\"></i></figure>\r\n                                                                        <span>Choose a file&hellip;</span>\r\n                                                                    </label>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Status</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <select>\r\n                                                                    <option value=\"Active\" selected=\"selected\">Active</option>\r\n                                                                    <option value=\"In-Active\">In-Active</option>\r\n                                                                </select>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"form-group col-sm-12\">\r\n                                                            <label class=\"control-label col-sm-4\">Expired</label>\r\n                                                            <div class=\"col-sm-7\">\r\n                                                                <input class=\"\" type=\"checkbox\" id=\"\">\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div><!--end-->\r\n\r\n                                                    <div class=\"clear\"></div>\r\n                                                </div>\r\n                                                <div id=\"receive-menu5\" class=\"tab-pane form-bg\">\r\n                                                    <P class=\"cat-heading cat4\">Add New Charges <i class=\"fa fa-plus cat1-i\" ng-click=\"addCharges()\"></i></P>\r\n                                                    <div class=\"fixed-table-container\">\r\n                                                        <div class=\"fixed-table-container-inner table-responsive cat4-table\">\r\n                                                            <table class=\"table table-bordered table-fixed \">\r\n                                                                <thead>\r\n                                                                    <tr>\r\n                                                                        <th><div class=\"th-inner\">Type</div></th>\r\n                                                                        <th><div class=\"th-inner\">Qty</div></th>\r\n                                                                        <th><div class=\"th-inner\">Unit Cost</div></th>\r\n                                                                        <th><div class=\"th-inner\">Extended Cost</div></th>\r\n                                                                        <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                    </tr>\r\n                                                                </thead>\r\n                                                                <tbody>\r\n\r\n                                                                    <tr ng-repeat=\"charges in assets4\">\r\n                                                                        <td>\r\n                                                                            <select>\r\n                                                                                <option value=\"\"></option>\r\n                                                                                <option value=\"AOG Fee\">AOG Fee</option>\r\n                                                                                <option value=\"Out of Scope\">Out of Scope</option>\r\n                                                                                <option value=\"Rework\">Rework</option>\r\n                                                                            </select>\r\n                                                                        </td>\r\n                                                                        <td><input type=\"number\" name=\"\" value=\"1\" class=\"w50\" /></td>\r\n                                                                        <td><input name=\"\" class=\"w100 chargesunitcost amount\"></td>\r\n                                                                        <td><input name=\"\" class=\"w100 chargesextendedcost attributeextcost amount\"></td>\r\n                                                                        <td>\r\n                                                                            <div class=\"buttons\">\r\n                                                                                <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                            </div>\r\n                                                                        </td>\r\n                                                                    </tr>\r\n\r\n                                                                    <tr class=\"attributes-total\">\r\n                                                                        <td colspan=\"2\">Total Charges Cost:</td>\r\n                                                                        <td><input class=\"chargesunitcosttotal\" type=\"text\" disabled /></td>\r\n                                                                        <td><input class=\"chargesextendedcosttotal attributeextcosttotal\" type=\"text\" disabled /></td>\r\n                                                                    </tr>\r\n                                                                </tbody>\r\n                                                            </table>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div id=\"receive-menu6\" class=\"tab-pane form-bg\">\r\n                                                    <P class=\"cat-heading cat4\">Add New Exclusion <i class=\"fa fa-plus cat1-i\"></i></P>\r\n                                                    <div class=\"fixed-table-container\">\r\n                                                        <div class=\"fixed-table-container-inner table-responsive cat4-table\">\r\n                                                            <table class=\"table table-bordered table-fixed \">\r\n                                                                <thead>\r\n                                                                    <tr>\r\n                                                                        <th><div class=\"th-inner\">PN</div></th>\r\n                                                                        <th><div class=\"th-inner\">PN Description</div></th>\r\n                                                                        <th><div class=\"th-inner\">Notes</div></th>\r\n                                                                        <th><div class=\"th-inner\">Actions</div></th>\r\n                                                                    </tr>\r\n                                                                </thead>\r\n                                                                <tbody>\r\n\r\n                                                                    <tr ng-repeat=\"exclusions in assets5\">\r\n                                                                        <td>\r\n                                                                            <div class=\"inner-addon right-addon autosuggesions-add inline-block\">\r\n                                                                                <i class=\"fa fa-search\"></i>\r\n                                                                                <input type=\"text\" class=\"form-control numberids\" name=\"\" placeholder=\"ID\" />\r\n                                                                            </div>\r\n                                                                        </td>\r\n                                                                        <td><input class=\"w150\" name=\"\" /></td>\r\n                                                                        <td><input class=\"w150\" name=\"\" /></td>\r\n                                                                        <td>\r\n                                                                            <div class=\"buttons\">\r\n                                                                                <button class=\"btn btn-danger nobg\"><i class=\"fa fa-trash\"></i></button>\r\n                                                                            </div>\r\n                                                                        </td>\r\n                                                                    </tr>\r\n\r\n                                                                </tbody>\r\n                                                            </table>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n\r\n\r\n\r\n                                    </div>\r\n                                </div>\r\n                                <a routerLink=\"/app-workflow-list\" class=\"btn btn-primary mtop40 black-search-button save-action-btn1 pull-right\">Save Workflow Details</a>\r\n\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n                <div class=\"clear\"></div>\r\n                <hr />\r\n                <div class=\"clear\"></div>\r\n                <br />\r\n                <br />\r\n                <br />\r\n                <br />\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal fade\" id=\"wf-options\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" id=\"\" name=\"\">×</button>\r\n                    <h4 class=\"modal-title\">WO - Workflow Options</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n\r\n                    <a data-dismiss=\"modal\" class=\"btn btn-info default-workflow-btn\">Create New Workflow</a>\r\n                    <a routerLink=\"/app-workflowList\" class=\"btn btn-info\">Edit Existing Workflow</a>\r\n                    <a routerLink=\"/app-workflowList\" class=\"btn btn-info deferred-btn\">Deferred Material List</a>\r\n                    <a routerLink=\"/app-workflowList\" class=\"btn btn-info\">Append</a>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"modal fade hide-model\" id=\"removalreason\" role=\"dialog\">\r\n        <div class=\"modal-dialog modal-sm\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    <h4 class=\"modal-title\"> Reason for Removal</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <form method=\"post\" id=\"\" name=\"\">\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Reason ID: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Reason ID\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Reason for Removal: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Reason for Removal\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Memo: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Memo\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-4 col-offset-5\">\r\n                                <button type=\"button\" id=\"\" name=\"\" class=\"btn btn-success add\" data-toggle=\"modal\" data-target=\"#success-popup\"><i data-dismiss=\"modal\">Save</i></button>\r\n                            </span>\r\n                        </p>\r\n                    </form>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Close</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"modal fade hide-model\" id=\"findings\" role=\"dialog\">\r\n        <div class=\"modal-dialog modal-sm\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    <h4 class=\"modal-title\"> Findings</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <form method=\"post\" id=\"\" name=\"\">\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Finding ID: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Finding ID\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Finding Description: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Finding Description\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Memo: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Memo\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-4 col-offset-5\">\r\n                                <button type=\"button\" id=\"\" name=\"\" class=\"btn btn-success add\" data-toggle=\"modal\" data-target=\"#success-popup\"><i data-dismiss=\"modal\">Save</i></button>\r\n                            </span>\r\n                        </p>\r\n                    </form>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Close</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"modal fade hide-model\" id=\"workperformed\" role=\"dialog\">\r\n        <div class=\"modal-dialog modal-sm\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    <h4 class=\"modal-title\"> Work Performed </h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <form method=\"post\" id=\"\" name=\"\">\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Work Performed ID: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Work Performed ID\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Work Performed Description: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Work Performed Description\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Memo: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Memo\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-4 col-offset-5\">\r\n                                <button type=\"button\" id=\"\" name=\"\" class=\"btn btn-success add\" data-toggle=\"modal\" data-target=\"#success-popup\"><i data-dismiss=\"modal\">Save</i></button>\r\n                            </span>\r\n                        </p>\r\n                    </form>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Close</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"modal fade hide-model\" id=\"defaultmessages\" role=\"dialog\">\r\n        <div class=\"modal-dialog modal-sm\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    <h4 class=\"modal-title\"> Default Messages</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <form method=\"post\" id=\"\" name=\"\">\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Default Message ID: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Default Message ID\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Default Message Description: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Default Message Description\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-5\"><b>Memo: </b></span> <span class=\"col-sm-7 inner-addon right-addon w200 inline-block\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                                <input type=\"text\" class=\"actionattribute form-control ui-autocomplete-input\" id=\"\" name=\"\" placeholder=\"Memo\" autocomplete=\"off\">\r\n                            </span>\r\n                        </p>\r\n                        <p>\r\n                            <span class=\"col-sm-4 col-offset-5\">\r\n                                <button type=\"button\" id=\"\" name=\"\" class=\"btn btn-success add\" data-toggle=\"modal\" data-target=\"#success-popup\"><i data-dismiss=\"modal\">Save</i></button>\r\n                            </span>\r\n                        </p>\r\n                    </form>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Close</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"modal fade success-msg\" id=\"success-popup\" role=\"dialog\">\r\n        <div class=\"modal-dialog modal-sm popup-timeout\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\r\n                    <h4> <i class=\"fa fa-check\"></i>&nbsp; You Added Successfully !</h4>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 2008:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2009);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2009:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 2010:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"x_panel\">\r\n            <div class=\"x_content\">\r\n                <nav aria-label=\"breadcrumb\">\r\n                    <ol class=\"breadcrumb\">\r\n                        <li class=\"breadcrumb-item\"><a routerLink=\"/\">Dashboard</a></li>\r\n                        <li class=\"breadcrumb-item\"><a routerLink=\"/\">WO Setup</a></li>\r\n                        <li class=\"breadcrumb-item active\" aria-current=\"page\">Memo</li>\r\n                    </ol>\r\n                </nav>\r\n                <h4 class=\"page-heading clr-green\">WO Setup - Memo</h4>\r\n                <div class=\"col-sm-12 form-bg\">\r\n                    <!--calssification Body Start-->\r\n                    <div class=\"form-group add-inputs\">\r\n                        <!--Add claffication Start -->\r\n\r\n                        <form id=\"\" name=\"\" method=\"post\">\r\n                            <div class=\"form-group col-sm-3\">\r\n                                <label class=\"control-label col-sm-4\">Memo ID</label>\r\n                                <div class=\"col-sm-7 cust-name\">\r\n                                    <div class=\"inner-addon right-addon w200 inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control ui-autocomplete-input\" id=\"cmname\" name=\"\" placeholder=\"Memo ID\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-4\">\r\n                                <label class=\"control-label col-sm-4\">Memo</label>\r\n                                <div class=\"col-sm-7 cust-name\">\r\n                                    <div class=\"inner-addon right-addon w200 inline-block\">\r\n                                        <i class=\"fa fa-search\"></i>\r\n                                        <input type=\"text\" class=\"form-control \" id=\"\" name=\"\" placeholder=\"Memo\" />\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group col-sm-2\">\r\n                                <button type=\"button\" id=\"\" name=\"\" data-toggle=\"tooltip\" data-original-title=\"Filter\" class=\"btn btn-warning\"><i class=\"fa fa-search\"></i></button>\r\n                                <button type=\"button\" id=\"\" name=\"\" data-toggle=\"tooltip\" data-original-title=\"Add\" class=\"btn btn-success\"><i class=\"fa fa-plus\"></i></button>\r\n                            </div>\r\n                        </form>\r\n                    </div><!--Add claffication End -->\r\n                    <!--Uplad Doc-->\r\n                    <form id=\"\" name=\"\" class=\"mtop10\">\r\n                        <div class=\"upload pull-right\">\r\n                            <input type=\"file\" name=\"upload[]\" multiple=\"\" id=\"upload\" class=\"uploaddoc upload-file\" data-multiple-caption=\"{count} files selected\" accept=\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\">\r\n                            <label for=\"upload\">\r\n                                <span data-toggle=\"tooltip\" title=\"Excel Upload (table rows)\"><i class=\"fa fa-file-excel-o\"></i></span>\r\n                            </label>\r\n                        </div>\r\n                    </form>\r\n                    <!--End-->\r\n                    <div class=\"table-responsive\">\r\n                        <table class=\"table table-bordered table-striped\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th>MID</th>\r\n                                    <th>Memo ID</th>\r\n                                    <th>Memo</th>\r\n                                    <th>&nbsp;</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>1</td>\r\n                                    <td>Customs</td>\r\n                                    <td>Perform custom exam - Perfrom measurement and record weight in Kg and lbs</td>\r\n                                    <td>\r\n                                        <span data-toggle=\"tooltip\" class=\"status\" title=\"Active\" data-placement=\"right\"><input type=\"checkbox\" checked data-toggle=\"toggle\" data-width=\"30\" id=\"toggle-one\" data-on=\"<i class='fa fa-check'></i>\" data-off=\"<i class='fa fa-times'></i>\" data-onstyle=\"success\" data-offstyle=\"danger\"></span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#Ecurrency\"> <a data-toggle=\"tooltip\" title=\"\" class=\"btn btn-primary nobg\" data-original-title=\"Edit\"><i class=\"fa fa-edit\"></i></a> </span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#Hcurrency\"> <a data-toggle=\"tooltip\" title=\"\" class=\"btn btn-success nobg\" data-original-title=\"History\"><i class=\"fa fa-history\"></i></a> </span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#Dcurrency\"> <a class=\"btn btn-danger nobg\" data-toggle=\"tooltip\" title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash\"></i></a> </span>\r\n                                    </td>\r\n                                </tr>\r\n\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                    <br>\r\n                    <div class=\"padding5\">\r\n                        <ul class=\"pagination\">\r\n                            <li class=\"arrows disabled\"><a > <i class=\"fa fa-angle-left\"></i> </a></li>\r\n                            <li class=\"active\"><a >1</a></li>\r\n                            <li><a >2</a></li>\r\n                            <li><a >3</a></li>\r\n                            <li class=\"arrows\"><a > <i class=\"fa fa-angle-right\"></i> </a></li>\r\n                        </ul>\r\n                        <div class=\"pull-right\"> &copy; 2018 <a routerLink=\"/\">PAS</a> </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"modal fade\" id=\"Dcurrency\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" id=\"\" name=\"\">×</button>\r\n                    <h4 class=\"modal-title\">Are You Sure Want to Delete 'Memo' ?</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\">Yes</button>\r\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">No</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!--Delete  Modal End-->\r\n    <!-- Edit Modal -->\r\n    <div class=\"modal fade\" id=\"Ecurrency\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    <h4 class=\"modal-title\"> Edit 'Customs' Memo ID</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <p>\r\n                        <span class=\"col-sm-3\"><b>MID: </b></span> <span class=\"col-sm-6\">\r\n                            1\r\n                        </span>\r\n                    </p>\r\n                    <hr>\r\n                    <p>\r\n                        <span class=\"col-sm-3\"><b>Memo ID: </b></span> <span class=\"col-sm-6\">\r\n                            <input type=\"text\" name=\"\" value=\"Customs\" class=\"form-control\">\r\n                        </span>\r\n                    </p>\r\n                    <hr>\r\n                    <p>\r\n                        <span class=\"col-sm-3\"><b>Memo: </b></span> <span class=\"col-sm-6\">\r\n                            <input type=\"text\" name=\"\" value=\"Perform custom exam - Perfrom measurement and record weight in Kg and lbs\" class=\"form-control\">\r\n                        </span>\r\n                    </p>\r\n                    <hr>\r\n                    <p><span class=\"col-sm-3\"><b>Last update by: </b></span> <span class=\"col-sm-9\">Meghanadh D</span></p>\r\n                    <hr>\r\n                    <p><span class=\"col-sm-3\"><b>Last Updated Time: </b></span> <span class=\"col-sm-9\">02-03-2018 21:15:45</span></p><hr>\r\n                    <p><span class=\"col-sm-3\"><b>Created by: </b></span> <span class=\"col-sm-9\">Shabbir</span></p>\r\n                    <hr>\r\n                    <p><span class=\"col-sm-3\"><b>Created Time: </b></span> <span class=\"col-sm-9\">02-01-2018 09:20:30</span></p>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\">Update Memo</button>\r\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Close</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!--Edit Modal End-->\r\n    <!-- Histroy Modal -->\r\n    <div class=\"modal fade\" id=\"Hcurrency\" role=\"dialog\">\r\n        <div class=\"modal-dialog modal-lg\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    <h4 class=\"modal-title\"> History of Memo</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <div class=\"table-responsive\">\r\n                        <table class=\"table table-bordered\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th>MID</th>\r\n                                    <th>Memo ID</th>\r\n                                    <th>Memo</th>\r\n                                    <th>Last Updated By</th>\r\n                                    <th>Last Updated Time</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>1</td>\r\n                                    <td>Customs</td>\r\n                                    <td>Perform custom exam - Perfrom measurement and record weight in Kg and lbs</td>\r\n                                    <td>Meghanadh D</td>\r\n                                    <td>02-03-2018 14:15:45</td>\r\n\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>1</td>\r\n                                    <td>Customs</td>\r\n                                    <td>Perform custom exam</td>\r\n                                    <td>Roger A</td>\r\n                                    <td>01-23-2018 15:23:21</td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Close</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 2011:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2012);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2012:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 2013:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"x_panel\" style=\"\">\r\n                <div class=\"x_content\">\r\n                    <nav aria-label=\"breadcrumb\">\r\n                        <ol class=\"breadcrumb\">\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"index.html\">Dashboard</a></li>\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"wo-main.html\">WO Setup</a></li>\r\n                            <li class=\"breadcrumb-item active\" aria-current=\"page\">Documents</li>\r\n                        </ol>\r\n                    </nav>\r\n                    <div class=\"pheading\">\r\n                        <h4 class=\"page-heading clr-green\">WO Setup - Documents</h4>\r\n                        <div class=\"clear mtop10\"></div>\r\n                    </div>\r\n                    <div class=\"cdetails-top\">\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Company</label>\r\n                            <span>Silverxis</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>BU</label>\r\n                            <span>Adso</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Division</label>\r\n                            <span>Development</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Dept</label>\r\n                            <span>Java</span>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-12 col-sm-12 col-12 po-ro-setup\">\r\n            <div class=\"x_panel\">\r\n                <div class=\"tab-content\">\r\n                    <div class=\"table-responsive default-bg clear ro-grid-table\">\r\n\r\n                        <table class=\"table table-bordered table-striped\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th colspan=\"5\">Documents &nbsp; &nbsp;<i class=\"fa fa-plus plus-icon\"></i></th>\r\n                                </tr>\r\n                                <tr>\r\n                                    <th>Document Code</th>\r\n                                    <th>Description</th>\r\n                                    <th>WO</th>\r\n                                    <th>Link to Doc</th>\r\n                                    <th class=\"w100\"></th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>\r\n                                        <select>\r\n                                            <option>8130</option>\r\n                                            <option>APO</option>\r\n                                            <option>ASO</option>\r\n                                            <option>CERT</option>\r\n                                            <option selected>CON</option>\r\n                                            <option>FIGURE</option>\r\n                                            <option>PL</option>\r\n                                            <option>VA</option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>Contract</td>\r\n                                    <td>WO12345</td>\r\n                                    <td><input type=\"text\" class=\"form-control w200\" value=\"http://google.co.in/\" /></td>\r\n                                    <td>\r\n                                        <a data-toggle=\"tooltip\" title=\"View\" class=\"btn btn-success boxed-float-btn nobg\"><i class=\"fa fa-eye\"></i></a>\r\n                                        <a data-toggle=\"tooltip\" title=\"Edit\" class=\"btn btn-primary boxed-float-btn nobg\"><i class=\"fa fa-edit\"></i></a>\r\n                                        <a data-toggle=\"tooltip\" title=\"Delete\" class=\"btn btn-success boxed-float-btn nobg\"><i class=\"fa fa-trash\"></i></a>\r\n                                    </td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n                <div class=\"clear\"></div>\r\n                <br />\r\n                <br />\r\n                <br />\r\n                <br />\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 2014:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2015);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2015:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 2016:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"x_panel\">\r\n            <div class=\"x_content\">\r\n                <nav aria-label=\"breadcrumb\">\r\n                    <ol class=\"breadcrumb\">\r\n                        <li class=\"breadcrumb-item\"><a routerLink=\"/\">Dashboard</a></li>\r\n                    </ol>\r\n                </nav>\r\n                <div class=\"col-sm-12 form-bg\">\r\n                    <div class=\"form-group add-inputs\">\r\n                        <h3 class=\"text-center\"> Content not given for Analysis page.</h3>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 2017:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2018);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2018:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 2019:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"x_panel\">\r\n            <div class=\"x_content\">\r\n                <nav aria-label=\"breadcrumb\">\r\n                    <ol class=\"breadcrumb\">\r\n                        <li class=\"breadcrumb-item\"><a routerLink=\"/\">Dashboard</a></li>\r\n                    </ol>\r\n                </nav>\r\n                <div class=\"col-sm-12 form-bg\">\r\n                    <div class=\"form-group add-inputs\">\r\n                        <h3 class=\"text-center\"> Content not given for Billing page.</h3>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 2020:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2021);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2021:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 2022:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"x_panel\">\r\n            <div class=\"x_content\">\r\n                <nav aria-label=\"breadcrumb\">\r\n                    <ol class=\"breadcrumb\">\r\n                        <li class=\"breadcrumb-item\"><a routerLink=\"/\">Dashboard</a></li>\r\n                    </ol>\r\n                </nav>\r\n                <div class=\"col-sm-12 form-bg\">\r\n                    <div class=\"form-group add-inputs\">\r\n                        <h3 class=\"text-center\"> Content not given for Quote page.</h3>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 2023:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2024);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2024:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 2025:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"x_panel\">\r\n            <div class=\"x_content\">\r\n                <nav aria-label=\"breadcrumb\">\r\n                    <ol class=\"breadcrumb\">\r\n                        <li class=\"breadcrumb-item\"><a routerLink=\"/\">Dashboard</a></li>\r\n                    </ol>\r\n                </nav>\r\n                <div class=\"col-sm-12 form-bg\">\r\n                    <div class=\"form-group add-inputs\">\r\n                        <h3 class=\"text-center\"> Content not given for Shipping page.</h3>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 2026:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2027);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2027:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 2028:
/***/ (function(module, exports) {

module.exports = "<div [@fadeInOut] class=\"page-content\">\r\n    <div class=\"right_col\" role=\"main\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"x_panel\" style=\"\">\r\n                <div class=\"x_content\">\r\n                    <nav aria-label=\"breadcrumb\">\r\n                        <ol class=\"breadcrumb\">\r\n                            <li class=\"breadcrumb-item\"><a routerLink=\"/\">Dashboard</a></li>\r\n                            <li class=\"breadcrumb-item active\" aria-current=\"page\">Work Order List</li>\r\n                        </ol>\r\n                    </nav>\r\n                    <div class=\"pheading\">\r\n                        <h4 class=\"page-heading\">List of Work Order's</h4>\r\n\t\t\t\t\t\t<form id=\"\" class=\"lgrey-bg div8 filters\" name=\"\" action=\"#\" method=\"post\" onsubmit=\"return false;\">\r\n\t\t\t\t\t\t\t<div class=\"col-sm-2\">\r\n\t\t\t\t\t\t\t\t<label>WO Num</label>\r\n\t\t\t\t\t\t\t\t<br />\r\n\t\t\t\t\t\t\t\t<div class=\"inner-addon right-addon inline-block\">\r\n\t\t\t\t\t\t\t\t\t<i class=\"fa fa-search\"></i>\r\n\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control numberids\" id=\"\" name=\"\" placeholder=\"WO Number\" />\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-2\">\r\n\t\t\t\t\t\t\t\t<label>Cust Name</label>\r\n\t\t\t\t\t\t\t\t<br />\r\n\t\t\t\t\t\t\t\t<div class=\"inner-addon right-addon inline-block\">\r\n\t\t\t\t\t\t\t\t\t<i class=\"fa fa-search\"></i>\r\n\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control names\" id=\"\" name=\"\" placeholder=\"Cust Name\" />\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-2\">\r\n\t\t\t\t\t\t\t\t<label>Cust Code</label>\r\n\t\t\t\t\t\t\t\t<br />\r\n\t\t\t\t\t\t\t\t<div class=\"inner-addon right-addon inline-block\">\r\n\t\t\t\t\t\t\t\t\t<i class=\"fa fa-search\"></i>\r\n\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control numberids\" id=\"\" name=\"\" placeholder=\"Cust Code\" />\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-2\">\r\n\t\t\t\t\t\t\t\t<label>Int./Ext.</label>\r\n\t\t\t\t\t\t\t\t<br />\r\n\t\t\t\t\t\t\t\t<select>\r\n\t\t\t\t\t\t\t\t\t<option value=\"\">Select</option>\r\n\t\t\t\t\t\t\t\t\t<option value=\"External\">External</option>\r\n\t\t\t\t\t\t\t\t\t<option value=\"Internal\">Internal</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-2\">\r\n\t\t\t\t\t\t\t\t<label>Open Date</label>\r\n\t\t\t\t\t\t\t\t<br />\r\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control datepicker\" id=\"\" name=\"\" placeholder=\"Open Date\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-2\">\r\n\t\t\t\t\t\t\t\t<label>Promise Date</label>\r\n\t\t\t\t\t\t\t\t<br />\r\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control datepicker\" id=\"\" name=\"\" placeholder=\"Promise Date\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-2\">\r\n\t\t\t\t\t\t\t\t<label>Workflow ID</label>\r\n\t\t\t\t\t\t\t\t<br />\r\n\t\t\t\t\t\t\t\t<div class=\"inner-addon right-addon inline-block\">\r\n\t\t\t\t\t\t\t\t\t<i class=\"fa fa-search\"></i>\r\n\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control numberids\" id=\"\" name=\"\" placeholder=\"W123\" />\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-2\">\r\n\t\t\t\t\t\t\t\t<label>PN</label>\r\n\t\t\t\t\t\t\t\t<br />\r\n\t\t\t\t\t\t\t\t<div class=\"inner-addon right-addon inline-block\">\r\n\t\t\t\t\t\t\t\t\t<i class=\"fa fa-search\"></i>\r\n\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control numberids\" id=\"\" name=\"\" placeholder=\"PN123\" />\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-2\">\r\n\t\t\t\t\t\t\t\t<label>Revised PN</label>\r\n\t\t\t\t\t\t\t\t<br />\r\n\t\t\t\t\t\t\t\t<div class=\"inner-addon right-addon inline-block\">\r\n\t\t\t\t\t\t\t\t\t<i class=\"fa fa-search\"></i>\r\n\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control numberids\" id=\"\" name=\"\" placeholder=\"PN456\" />\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-2\">\r\n\t\t\t\t\t\t\t\t<label>Status</label>\r\n\t\t\t\t\t\t\t\t<br />\r\n\t\t\t\t\t\t\t\t<select>\r\n\t\t\t\t\t\t\t\t\t<option value=\"\">Select Status</option>\r\n\t\t\t\t\t\t\t\t\t<option value=\"Active\">Active</option>\r\n\t\t\t\t\t\t\t\t\t<option value=\"Inactive\">Inactive</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default height40 black-search-button btmargin\"><i class=\"fa fa-search\"></i></button>\r\n\t\t\t\t\t\t\t<div class=\"excel-upload\">\r\n\t\t\t\t\t\t\t\t<input type=\"file\" name=\"upload[]\" multiple=\"\" id=\"upload\" class=\"uploaddoc upload-file\" data-multiple-caption=\"{count} files selected\" accept=\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\">\r\n\t\t\t\t\t\t\t\t<label for=\"upload\">\r\n\t\t\t\t\t\t\t\t\t<span data-toggle=\"tooltip\" title=\"Excel Upload (table rows)\"><i class=\"fa fa-file-excel-o\"></i></span>\r\n\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</form>\r\n                    </div>\r\n                    <div class=\"cdetails-top\">\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Company</label>\r\n                            <span>Silverxis</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>BU</label>\r\n                            <span>Adso</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Division</label>\r\n                            <span>Development</span>\r\n                        </div>\r\n                        <div class=\"col-sm-12\">\r\n                            <label>Dept</label>\r\n                            <span>Java</span>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-sm-12 col-12\">\r\n            <div class=\"x_panel\">\r\n                <div id=\"adminsearchlocationajax\" class=\"table-responsive default-bg clear\">\r\n                    <div class=\"col-12\">\r\n                        <table class=\"table table-bordered table-striped table-sorting\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th>WO Num</th>\r\n                                    <th>Cust Name</th>\r\n                                    <th>Cust Code</th>\r\n                                    <th>Int./Ext.</th>\r\n                                    <th>WO Qty</th>\r\n                                    <th>Open Date</th>\r\n                                    <th>Promise Date</th>\r\n                                    <th>Workflow ID</th>\r\n                                    <th>PN</th>\r\n                                    <th>PN Des.</th>\r\n                                    <th>Revised PN</th>\r\n                                    <th class=\"events5\"></th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>WO123</td>\r\n                                    <td>Shabbir</td>\r\n                                    <td>C123</td>\r\n                                    <td>Internal</td>\r\n                                    <td>2</td>\r\n                                    <td>03/13/2018</td>\r\n                                    <td>04/13/2018</td>\r\n                                    <td>W123</td>\r\n                                    <td>PN123</td>\r\n                                    <td>single drum towing winch</td>\r\n                                    <td>PN456</td>\r\n                                    <td>\r\n                                        <span data-toggle=\"tooltip\" class=\"status\" title=\"Active\" data-placement=\"right\"><input type=\"checkbox\" checked data-toggle=\"toggle\" data-width=\"30\" id=\"toggle-one\" data-on=\"<i class='fa fa-check'></i>\" data-off=\"<i class='fa fa-times'></i>\" data-onstyle=\"success\" data-offstyle=\"danger\"></span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#viewcustomer\"> <a class=\"btn btn-info boxed-float-btn nobg\" data-toggle=\"tooltip\" title=\"View\"><i class=\"fa fa-eye\"></i></a> </span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#history\"><a class=\"btn btn-success nobg\" data-toggle=\"tooltip\" title=\"History\"><i class=\"fa fa-history\"></i></a></span>\r\n                                        <span data-toggle=\"modal\" data-target=\"#delete\"> <a class=\"btn btn-danger boxed-float-btn nobg\" data-toggle=\"tooltip\" title=\"Delete\"><i class=\"fa fa-trash\"></i></a> </span>\r\n                                    </td>\r\n                                </tr>                                \r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n                    <div class=\"padding5\">\r\n                        <ul class=\"pagination\">\r\n                            <li class=\"arrows disabled\"><a> <i class=\"fa fa-angle-left\"></i> </a></li>\r\n                            <li class=\"active\"><a>1</a></li>\r\n                            <li><a>2</a></li>\r\n                            <li><a>3</a></li>\r\n                            <li class=\"arrows\"><a> <i class=\"fa fa-angle-right\"></i> </a></li>\r\n                        </ul>\r\n                        <div class=\"pull-right\"> &copy; 2018 <a routerLink=\"/\">PAS</a> </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"modal fade\" id=\"active\" role=\"dialog\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" id=\"\" name=\"\">&times;</button>\r\n                <h4 class=\"modal-title\">Are You Sure Want to Active the current selection ?</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\">Yes</button>\r\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">No</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"modal fade\" id=\"inactive\" role=\"dialog\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" id=\"\" name=\"\">&times;</button>\r\n                <h4 class=\"modal-title\">Are You Sure Want to InActive the current selection ?</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\">Yes</button>\r\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">No</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"modal fade\" id=\"delete\" role=\"dialog\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" id=\"\" name=\"\">&times;</button>\r\n                <h4 class=\"modal-title\">Are You Sure Want to Delete ?</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\">Yes</button>\r\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">No</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";

/***/ }),

/***/ 2029:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2030);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2030:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ })

});
//# sourceMappingURL=3.js.map