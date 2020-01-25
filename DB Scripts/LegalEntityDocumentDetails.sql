SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[LegalEntityDocumentDetails](
	[LegalEntityDocumentDetailId] [bigint] IDENTITY(1,1) NOT NULL,
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
 CONSTRAINT [PK_LegalEntityDocumentDetails] PRIMARY KEY CLUSTERED 
(
	[LegalEntityDocumentDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ_LegalEntityDocumentDeatails] UNIQUE NONCLUSTERED 
(
	[LegalEntityId] ASC,
	[MasterCompanyId] ASC,
	[AttachmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


