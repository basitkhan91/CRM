

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[StocklineAdjustmentReason](
	[AdjustmentReasonId] [bigint] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](200) NOT NULL,
	[Memo] [varchar](200) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK__Stocklin__EED076554FC8936B] PRIMARY KEY CLUSTERED 
(
	[AdjustmentReasonId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[StocklineAdjustmentReason] ADD  CONSTRAINT [DF_StocklineAdjustmentReason_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[StocklineAdjustmentReason] ADD  CONSTRAINT [DF_StocklineAdjustmentReason_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[StocklineAdjustmentReason]  WITH CHECK ADD  CONSTRAINT [FK_StocklineAdjustmentReason_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[StocklineAdjustmentReason] CHECK CONSTRAINT [FK_StocklineAdjustmentReason_MasterCompany]
GO
