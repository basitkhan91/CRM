ALTER TABLE [dbo].[VendorCapes] DROP CONSTRAINT [FK_VendorCapes_Vendor]
GO

ALTER TABLE [dbo].[VendorCapes] DROP CONSTRAINT [FK_VendorCapes_MasterCompany]
GO

ALTER TABLE [dbo].[VendorCapes] DROP CONSTRAINT [FK_VendorCapes_Capability]
GO


DROP TABLE [dbo].[VendorCapes]
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[VendorCapes](
	[VendorCapesId] [bigint] IDENTITY(1,1) NOT NULL,
	[VendorId] [bigint] NOT NULL,
	[CapabilityId] [bigint] NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_VendorCapes] PRIMARY KEY CLUSTERED 
(
	[VendorCapesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[VendorCapes]  WITH CHECK ADD  CONSTRAINT [FK_VendorCapes_Capability] FOREIGN KEY([CapabilityId])
REFERENCES [dbo].[Capability] ([CapabilityId])
GO

ALTER TABLE [dbo].[VendorCapes] CHECK CONSTRAINT [FK_VendorCapes_Capability]
GO

ALTER TABLE [dbo].[VendorCapes]  WITH CHECK ADD  CONSTRAINT [FK_VendorCapes_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[VendorCapes] CHECK CONSTRAINT [FK_VendorCapes_MasterCompany]
GO

ALTER TABLE [dbo].[VendorCapes]  WITH CHECK ADD  CONSTRAINT [FK_VendorCapes_Vendor] FOREIGN KEY([VendorId])
REFERENCES [dbo].[Vendor] ([VendorId])
GO

ALTER TABLE [dbo].[VendorCapes] CHECK CONSTRAINT [FK_VendorCapes_Vendor]
GO


