SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[LegalEntityDocumentDetailsAudit](
	[AuditLegalEntityDocumentDetailId] [bigint] IDENTITY(1,1) NOT NULL,
	[LegalEntityDocumentDetailId] [bigint] NOT NULL,
	[LegalEntityId] [bigint] NOT NULL,
	[AttachmentId] [bigint] NOT NULL,
	[DocName] [varchar](100) NULL,
	[DocMemo] [varchar](100) NULL,
	[DocDescription] [varchar](100) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_LegalEntityDocumentDetailsAudit] PRIMARY KEY CLUSTERED 
(
	[AuditLegalEntityDocumentDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


