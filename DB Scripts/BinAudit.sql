USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[BinAudit]    Script Date: 9/17/2019 5:19:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[BinAudit](
	[BinAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[BinId] [bigint] NULL,
	[ShelfId] [bigint] NULL,
	[Name] [varchar](50) NULL,
	[Memo] [varchar](2000) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_BinAudit] PRIMARY KEY CLUSTERED 
(
	[BinAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[BinAudit]  WITH CHECK ADD  CONSTRAINT [FK_BinAudit_Bin] FOREIGN KEY([BinId])
REFERENCES [dbo].[Bin] ([BinId])
GO

ALTER TABLE [dbo].[BinAudit] CHECK CONSTRAINT [FK_BinAudit_Bin]
GO

