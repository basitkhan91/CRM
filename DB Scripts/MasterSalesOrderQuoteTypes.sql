
/****** Object:  Table [dbo].[MasterSalesOrderQuoteTypes]    Script Date: 09-11-2019 10:54:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
IF EXISTS ( SELECT 1 FROM SYS.TABLES WHERE NAME = 'MasterSalesOrderQuoteTypes' )
BEGIN  
	DROP TABLE dbo.MasterSalesOrderQuoteTypes
END  

CREATE TABLE [dbo].[MasterSalesOrderQuoteTypes](
	[Id] [int] NOT NULL,
	[Name] [varchar](50) NULL,
	[Description] [varchar](250) NULL,
	[MasterCompanyId] [int] NOT NULL, 
	[CreatedBy] [varchar](50) NOT NULL,
	[CreatedOn] [datetime] NOT NULL DEFAULT GETDATE(),
	[UpdatedBy] [varchar](50) NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_MasterSalesOrderQuoteTypes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



INSERT INTO [dbo].[MasterSalesOrderQuoteTypes] 
(Id, Name, CreatedBy, MasterCompanyId)
VALUES
(1, 'Parts Sales', 'admin',1),
(2, 'Repair', 'admin',1),
(3, 'Exchange', 'admin',1),
(4, 'Non Stock', 'admin',1)