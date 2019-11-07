
/****** Object:  Table [dbo].[StocklineAdjustmentReasonAudit]    Script Date: 11/7/2019 4:03:09 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[StocklineAdjustmentReasonAudit](
	[AdjustmentReasonAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AdjustmentReasonId] [bigint] NOT NULL,
	[Description] [varchar](200) NOT NULL,
	[Memo] [varchar](200) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_StocklineAdjustmentReasonAudit] PRIMARY KEY CLUSTERED 
(
	[AdjustmentReasonAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[StocklineAdjustmentReasonAudit]  WITH CHECK ADD  CONSTRAINT [FK_StocklineAdjustmentReasonAudit_StocklineAdjustmentReason] FOREIGN KEY([AdjustmentReasonId])
REFERENCES [dbo].[StocklineAdjustmentReason] ([AdjustmentReasonId])
GO

ALTER TABLE [dbo].[StocklineAdjustmentReasonAudit] CHECK CONSTRAINT [FK_StocklineAdjustmentReasonAudit_StocklineAdjustmentReason]
GO
