USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AddressAudit]    Script Date: 8/29/2019 6:06:56 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AddressAudit](
	[AddressAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AddressId] [bigint] NOT NULL,
	[Line1] [varchar](50) NULL,
	[Line2] [varchar](50) NULL,
	[Line3] [varchar](50) NULL,
	[City] [varchar](50) NULL,
	[StateOrProvince] [varchar](50) NULL,
	[PostalCode] [varchar](20) NULL,
	[Country] [varchar](30) NULL,
	[Latitude] [decimal](12, 9) NULL,
	[Longitude] [decimal](12, 9) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[RecordCreateDate] [datetime2](7) NOT NULL,
	[RecordModifiedDate] [datetime2](7) NULL,
	[LastModifiedBy] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[DMActionId] [tinyint] NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_AddressAuditId] PRIMARY KEY CLUSTERED 
(
	[AddressAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AddressAudit]  WITH CHECK ADD  CONSTRAINT [FK_AddressAudit_Address] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Address] ([AddressId])
GO

ALTER TABLE [dbo].[AddressAudit] CHECK CONSTRAINT [FK_AddressAudit_Address]
GO

