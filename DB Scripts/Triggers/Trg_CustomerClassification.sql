/* 
  Following trigger creates an audit entry in CustomerClassificationAudit table  
  when ever insert, delete or update happens in CustomerClassification table.
*/ 
IF EXISTS(SELECT * 
          FROM   sys.triggers 
          WHERE  NAME = N'trig_Insert_CustomerClassification') 
  DROP TRIGGER trig_insert_customerclassification 

IF EXISTS (SELECT * 
           FROM   sys.triggers 
           WHERE  NAME = N'Trg_CustomerClassification') 
  DROP TRIGGER trg_customerclassification 

 IF EXISTS (SELECT * 
           FROM   sys.triggers 
           WHERE  NAME = N'trig_Update_CustomerClassification') 
  DROP TRIGGER trig_Update_CustomerClassification

go 

CREATE TRIGGER [dbo].[Trg_CustomerClassification] 
ON [dbo].[customerclassification] 
FOR INSERT, DELETE, UPDATE 
AS 
  BEGIN 
      INSERT INTO customerclassificationaudit 
                  ([customerclassificationid], 
                   [memo], 
                   [description], 
                   [createdby], 
                   [createddate], 
                   [updatedby], 
                   [updateddate], 
                   [mastercompanyid], 
                   [isactive]) 
      SELECT i.customerclassificationid, 
             i.memo, 
             i.[description], 
             i.createdby, 
             Getdate(), 
             i.updatedby, 
             Getdate(), 
             i.mastercompanyid, 
             Isnull(isactive, 0) 
      FROM   inserted i; 

      SET nocount ON; 
  END 