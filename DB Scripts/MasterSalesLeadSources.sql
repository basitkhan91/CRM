
/****** Object:  Table [dbo].[MasterSalesLeadSources]    Script Date: 09-11-2019 10:54:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
IF EXISTS ( SELECT 1 FROM SYS.TABLES WHERE NAME = 'MasterSalesLeadSources' )
BEGIN  
	DROP TABLE dbo.MasterSalesLeadSources
END  

CREATE TABLE [dbo].[MasterSalesLeadSources](
	[Id] [int] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](250) NULL,
	[MasterCompanyId] [int] NOT NULL, 
	[CreatedBy] [varchar](50) NOT NULL,
	[CreatedOn] [datetime] NOT NULL DEFAULT GETDATE(),
	[UpdatedBy] [varchar](50) NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_MasterSalesLeadSources] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

INSERT INTO [dbo].[MasterSalesLeadSources]
	([Id], [Name], [CreatedBy], [MasterCompanyId])
	VALUES
	(1, 'Ads', 'admin',1), 
	(2, 'Tradeshow', 'admin',1),
	(3, 'Marketing', 'admin',1),
	(4, 'Search Engine', 'admin', 1)

