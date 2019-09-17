USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[Discount]    Script Date: 9/17/2019 5:27:44 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Discount](
	[DiscountId] [bigint] IDENTITY(1,1) NOT NULL,
	[DiscontValue] [decimal](18, 2) NOT NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [nvarchar](256) NOT NULL,
	[UpdatedBy] [nvarchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK__Discount__E43F6D963F493CDE] PRIMARY KEY CLUSTERED 
(
	[DiscountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Discount]  WITH CHECK ADD  CONSTRAINT [FK_Discount_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[Discount] CHECK CONSTRAINT [FK_Discount_MasterCompany]
GO

