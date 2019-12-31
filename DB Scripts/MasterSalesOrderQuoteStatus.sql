
SET QUOTED_IDENTIFIER ON
GO
IF EXISTS ( SELECT 1 FROM SYS.TABLES WHERE NAME = 'MasterSalesOrderQuoteStatus' )
BEGIN  
	DROP TABLE dbo.MasterSalesOrderQuoteStatus
END  

CREATE TABLE [dbo].[MasterSalesOrderQuoteStatus](
	[Id] [int] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](250) NULL,
	[DisplayInDropdown] [bit] NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](50) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedBy] [varchar](50) NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_MasterSalesOrderQuoteStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

INSERT INTO dbo.MasterSalesOrderQuoteStatus
([Id], [Name], [Description], [DisplayInDropDown], [MasterCompanyId], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn])
VALUES
(1, 'Open', 'Open', 1, 1, 'admin', getdate(), 'admin', getdate()),
(2, 'Closed', 'Closed', 0, 1, 'admin', getdate(), 'admin', getdate()),
(3, 'Sent', 'Sent', 1, 1, 'admin', getdate(), 'admin', getdate()),
(4, 'Approved', 'Approved', 1, 1, 'admin', getdate(), 'admin', getdate()),
(5, 'Cancelled', 'Cancelled', 1, 1, 'admin', getdate(), 'admin', getdate()),
(6, 'Expired', 'Expired', 1, 1, 'admin', getdate(), 'admin', getdate())

