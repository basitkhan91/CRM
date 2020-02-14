IF NOT EXISTS (
		SELECT  1  FROM Sys.Columns c WITH(NOLOCK)
		INNER JOIN Sys.Tables t WITH(NOLOCK) ON c.object_id  = t.object_id 
		WHERE c.name  ='ManagementStructureId' and t.name = 'SalesOrderQuote'
) 
BEGIN  
 	ALTER TABLE SalesOrderQuote ADD [ManagementStructureId] [BigInt] NULL
END 