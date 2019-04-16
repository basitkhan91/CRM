export class SingleScreenAuditDetails {
    SubModuleName: string;
    ChangesOverview: string;
    LastUpdatedBy: string;
    LastUpdatedTime: string;
    AuditChanges: AuditChanges[];
    Visible: Boolean;
}

export class AuditChanges {
    FieldFriendlyname: string;
    NewValue: string;
    OldValue: string;

}