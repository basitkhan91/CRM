IF EXISTS (
	SELECT 1 FROM sys.tables t WITH(NOLOCK)
	INNER JOIN sys.columns c WITH(NOLOCK) ON c.[object_id] = t.[object_id]
	WHERE t.[name] = 'SalesOrderQuote' AND c.[name] = 'QuoteApprovedById'
) 
BEGIN 
	ALTER TABLE SalesOrderQuote ALTER COLUMN [QuoteApprovedById] BIGINT;
	PRINT 'Column QuoteApprovedById for table SalesOrderQuote modified successfully'
END