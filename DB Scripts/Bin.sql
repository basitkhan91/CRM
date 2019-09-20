USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[Bin]    Script Date: 9/17/2019 5:19:12 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Bin](
	[BinId] [bigint] IDENTITY(1,1) NOT NULL,
	[ShelfId] [bigint] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Memo] [varchar](2000) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Bin] PRIMARY KEY CLUSTERED 
(
	[BinId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Bin] ADD  CONSTRAINT [DF_Bin_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[Bin] ADD  CONSTRAINT [DF_Bin_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[Bin]  WITH CHECK ADD  CONSTRAINT [FK_Bin_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[Bin] CHECK CONSTRAINT [FK_Bin_MasterCompany]
GO

ALTER TABLE [dbo].[Bin]  WITH CHECK ADD  CONSTRAINT [FK_Bin_Shelf] FOREIGN KEY([ShelfId])
REFERENCES [dbo].[Shelf] ([ShelfId])
GO

ALTER TABLE [dbo].[Bin] CHECK CONSTRAINT [FK_Bin_Shelf]
GO

