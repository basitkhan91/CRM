SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF EXISTS ( SELECT 1 FROM sys.tables NOLOCK WHERE name ='SalesOrderQuoteApproverList' )
BEGIN
	DROP TABLE [SalesOrderQuoteApproverList]
END 

CREATE TABLE [dbo].[SalesOrderQuoteApproverList](
	[SalesOrderQuoteApproverListId] [bigint] IDENTITY(1,1) NOT NULL,
	[SalesOrderQuoteId] [bigint] NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[Level] [int] NOT NULL,
	[StatusId] [int] NOT NULL,
	[MasterCompanyId] [int] NOT NULL,  
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2] NOT NULL,
	[UpdatedDate] [datetime2] NOT NULL,
 CONSTRAINT [PK_SalesOrderQuoteApproverList] PRIMARY KEY CLUSTERED 
(
	[SalesOrderQuoteApproverListId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
