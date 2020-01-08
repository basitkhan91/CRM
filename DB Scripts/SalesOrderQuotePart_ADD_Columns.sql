IF NOT EXISTS ( SELECT 1 FROM sys.tables t with(nolock)
	INNER JOIN sys.columns c WITH(NOLOCK) ON c.[object_id] = t.[object_id]
	WHERE t.[name] = 'SalesOrderQuotePart' AND c.[name] = 'MethodType'
 ) 
BEGIN  
	print 'column [MethodType] created for table [SalesOrderQuotePart] successfully'
	ALTER TABLE SalesOrderQuotePart ADD [MethodType] [char](1) NULL DEFAULT NULL
END
ELSE 
BEGIN
	print 'column [MethodType] for table [SalesOrderQuotePart] already exist'
END 
IF NOT EXISTS ( SELECT 1 FROM sys.tables t with(nolock)
	INNER JOIN sys.columns c WITH(NOLOCK) ON c.[object_id] = t.[object_id]
	WHERE t.[name] = 'SalesOrderQuotePart' AND c.[name] = 'UnitCost'
 ) 
BEGIN  
	print 'column [UnitCost] created for table [SalesOrderQuotePart] successfully'
	ALTER TABLE SalesOrderQuotePart ADD [UnitCost] [numeric](9,2) NOT NULL DEFAULT 0
END
ELSE 
BEGIN
	print 'column [UnitCost] for table [SalesOrderQuotePart] already exist'
END

IF NOT EXISTS ( SELECT 1 FROM sys.tables t with(nolock)
	INNER JOIN sys.columns c WITH(NOLOCK) ON c.[object_id] = t.[object_id]
	WHERE t.[name] = 'SalesOrderQuotePart' AND c.[name] = 'SalesPriceExtended'
 ) 
BEGIN  
	print 'column [SalesPriceExtended] created for table [SalesOrderQuotePart] successfully'
	ALTER TABLE SalesOrderQuotePart ADD [SalesPriceExtended] [numeric](9,2) NOT NULL DEFAULT 0
END
ELSE 
BEGIN
	print 'column [SalesPriceExtended] for table [SalesOrderQuotePart] already exist'
END 


IF NOT EXISTS ( SELECT 1 FROM sys.tables t with(nolock)
	INNER JOIN sys.columns c WITH(NOLOCK) ON c.[object_id] = t.[object_id]
	WHERE t.[name] = 'SalesOrderQuotePart' AND c.[name] = 'MarkupExtended'
 ) 
BEGIN  
	print 'column [MarkupExtended] created for table [SalesOrderQuotePart] successfully'
	ALTER TABLE SalesOrderQuotePart ADD [MarkupExtended] [numeric](9,2) NOT NULL DEFAULT 0
END
ELSE 
BEGIN
	print 'column [MarkupExtended] for table [SalesOrderQuotePart] already exist'
END 

IF NOT EXISTS ( SELECT 1 FROM sys.tables t with(nolock)
	INNER JOIN sys.columns c WITH(NOLOCK) ON c.[object_id] = t.[object_id]
	WHERE t.[name] = 'SalesOrderQuotePart' AND c.[name] = 'SalesDiscountExtended'
 ) 
BEGIN  
	print 'column [SalesDiscountExtended] created for table [SalesOrderQuotePart] successfully'
	ALTER TABLE SalesOrderQuotePart ADD [SalesDiscountExtended] [numeric](9,2) NOT NULL DEFAULT 0
END
ELSE 
BEGIN
	print 'column [SalesDiscountExtended] for table [SalesOrderQuotePart] already exist'
END 

IF NOT EXISTS ( SELECT 1 FROM sys.tables t with(nolock)
	INNER JOIN sys.columns c WITH(NOLOCK) ON c.[object_id] = t.[object_id]
	WHERE t.[name] = 'SalesOrderQuotePart' AND c.[name] = 'NetSalePriceExtended'
 ) 
BEGIN  
	print 'column [NetSalePriceExtended] created for table [SalesOrderQuotePart] successfully'
	ALTER TABLE SalesOrderQuotePart ADD [NetSalePriceExtended] [numeric](9,2) NOT NULL DEFAULT 0
END
ELSE 
BEGIN
	print 'column [NetSalePriceExtended] for table [SalesOrderQuotePart] already exist'
END 

IF NOT EXISTS ( SELECT 1 FROM sys.tables t with(nolock)
	INNER JOIN sys.columns c WITH(NOLOCK) ON c.[object_id] = t.[object_id]
	WHERE t.[name] = 'SalesOrderQuotePart' AND c.[name] = 'UnitCostExtended'
 ) 
BEGIN  
	print 'column [UnitCostExtended] created for table [SalesOrderQuotePart] successfully'
	ALTER TABLE SalesOrderQuotePart ADD [UnitCostExtended] [numeric](9,2) NOT NULL DEFAULT 0
END
ELSE 
BEGIN
	print 'column [UnitCostExtended] for table [SalesOrderQuotePart] already exist'
END 

IF NOT EXISTS ( SELECT 1 FROM sys.tables t with(nolock)
	INNER JOIN sys.columns c WITH(NOLOCK) ON c.[object_id] = t.[object_id]
	WHERE t.[name] = 'SalesOrderQuotePart' AND c.[name] = 'MarginAmount'
 ) 
BEGIN  
	print 'column [MarginAmount] created for table [SalesOrderQuote] successfully'
	ALTER TABLE SalesOrderQuotePart ADD [MarginAmount] [numeric](9,2) NOT NULL DEFAULT 0
END
ELSE 
BEGIN
	print 'column [MarginAmount] for table [SalesOrderQuotePart] already exist'
END 

IF NOT EXISTS ( SELECT 1 FROM sys.tables t with(nolock)
	INNER JOIN sys.columns c WITH(NOLOCK) ON c.[object_id] = t.[object_id]
	WHERE t.[name] = 'SalesOrderQuotePart' AND c.[name] = 'MarginAmountExtended'
 ) 
BEGIN  
	print 'column [MarginAmountExtended] created for table [SalesOrderQuotePart] successfully'
	ALTER TABLE SalesOrderQuotePart ADD [MarginAmountExtended] [numeric](9,2) NOT NULL DEFAULT 0
END
ELSE 
BEGIN
	print 'column [MarginAmountExtended] for table [SalesOrderQuotePart] already exist'
END 


IF NOT EXISTS ( SELECT 1 FROM sys.tables t with(nolock)
	INNER JOIN sys.columns c WITH(NOLOCK) ON c.[object_id] = t.[object_id]
	WHERE t.[name] = 'SalesOrderQuotePart' AND c.[name] = 'MarginPercentage'
 ) 
BEGIN  
	print 'column [MarginPercentage] created for table [SalesOrderQuotePart] successfully'
	ALTER TABLE SalesOrderQuotePart ADD [MarginPercentage] [int] NOT NULL DEFAULT 0
END
ELSE 
BEGIN
	print 'column [MarginAmountExtended] for table [SalesOrderQuotePart] already exist'
END 

IF NOT EXISTS ( SELECT 1 FROM sys.tables t with(nolock)
	INNER JOIN sys.columns c WITH(NOLOCK) ON c.[object_id] = t.[object_id]
	WHERE t.[name] = 'SalesOrderQuotePart' AND c.[name] = 'ConditionId'
 ) 
BEGIN  
	print 'column [ConditionId] created for table [SalesOrderQuotePart] successfully'
	ALTER TABLE SalesOrderQuotePart ADD [ConditionId] [bigint] NOT NULL DEFAULT 0
END
ELSE 
BEGIN
	print 'column [ConditionId] for table [SalesOrderQuotePart] already exist'
END 
