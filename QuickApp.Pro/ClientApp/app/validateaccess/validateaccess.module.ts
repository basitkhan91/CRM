import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ValidateAccessDirective } from "../directive/validateaccess.directive";
import { AuthService } from "../services/auth.service";

@NgModule({
	declarations: [
		ValidateAccessDirective
    ],

    imports: [
        CommonModule
    ],

    exports: [
        ValidateAccessDirective
    ],

    providers: [
        AuthService
    ],

    bootstrap: [        
    ],

})
export class ValidateAccessModule {

}