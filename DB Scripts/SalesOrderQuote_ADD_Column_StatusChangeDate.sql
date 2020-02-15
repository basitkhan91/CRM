IF NOT EXISTS (
		SELECT  1  FROM Sys.Columns c WITH(NOLOCK)
		INNER JOIN Sys.Tables t WITH(NOLOCK) ON c.object_id  = t.object_id 
		WHERE c.name  ='StatusChangeDate' and t.name = 'SalesOrderQuote'
) 
BEGIN  
 	ALTER TABLE SalesOrderQuote ADD [StatusChangeDate] [DATETIME2] NOT NULL DEFAULT GETDATE()
END 