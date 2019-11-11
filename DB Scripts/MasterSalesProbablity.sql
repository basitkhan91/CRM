
/****** Object:  Table [dbo].[MasterSalesProbablity]    Script Date: 09-11-2019 10:54:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
IF EXISTS ( SELECT 1 FROM SYS.TABLES WHERE NAME = 'MasterSalesProbablity' )
BEGIN  
	DROP TABLE dbo.MasterSalesProbablity
END  

CREATE TABLE [dbo].[MasterSalesProbablity](
	[Id] [int] NOT NULL,
	[Value] [int] NOT NULL,
	[Description] [varchar](250) NULL,
	[MasterCompanyId] [int] NOT NULL, 
	[CreatedBy] [varchar](50) NOT NULL,
	[CreatedOn] [datetime] NOT NULL DEFAULT GETDATE(),
	[UpdatedBy] [varchar](50) NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_MasterSalesProbablity] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



DECLARE @index INT = 1, @max INT = 10; 

WHILE ( @index <=  @max ) 
BEGIN  
	INSERT INTO [dbo].[MasterSalesProbablity]
	([Id], [Value], [CreatedBy], [MasterCompanyId])
	VALUES
	(@index, @index, 'admin', 1)
	set @index = @index + 1
END  
	