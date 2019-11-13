
/****** Object:  Table [dbo].[MasterSalesCreditTerms]    Script Date: 09-11-2019 10:54:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
IF EXISTS ( SELECT 1 FROM SYS.TABLES WHERE NAME = 'MasterSalesCreditTerms' )
BEGIN  
	DROP TABLE dbo.MasterSalesCreditTerms
END  

CREATE TABLE [dbo].[MasterSalesCreditTerms](
	[Id] [int] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](250) NULL,
	[MasterCompanyId] [int] NOT NULL, 
	[CreatedBy] [varchar](50) NOT NULL,
	[CreatedOn] [datetime] NOT NULL DEFAULT GETDATE(),
	[UpdatedBy] [varchar](50) NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_MasterSalesCreditTerms] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

INSERT INTO [dbo].[MasterSalesCreditTerms]
	([Id], [Name], [CreatedBy], MasterCompanyId)
	VALUES
	(1, '2% 10, Net 30', 'admin', 1), 
	(2, '2% 10, Net 45', 'admin', 1),
	(3, '3% 10, Net 45', 'admin', 1),
	(4, 'CIA', 'admin', 1),
	(5, 'Due Upon Receipt', 'admin', 1),
	(6, 'CIA', 'admin', 1),
	(7, 'Net 30', 'admin', 1),
	(8, 'Net 45', 'admin', 1),
	(9, 'Net 60', 'admin', 1),
	(10, 'Net 90', 'admin', 1)




