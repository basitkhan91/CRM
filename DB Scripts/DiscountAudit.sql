USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[DiscountAudit]    Script Date: 9/17/2019 5:28:08 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[DiscountAudit](
	[DiscountAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[DiscountId] [bigint] NOT NULL,
	[DiscontValue] [decimal](18, 2) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[UpdatedBy] [nvarchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_DiscountAudit] PRIMARY KEY CLUSTERED 
(
	[DiscountAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[DiscountAudit]  WITH CHECK ADD  CONSTRAINT [FK_DiscountAudit_Discount] FOREIGN KEY([DiscountId])
REFERENCES [dbo].[Discount] ([DiscountId])
GO

ALTER TABLE [dbo].[DiscountAudit] CHECK CONSTRAINT [FK_DiscountAudit_Discount]
GO

