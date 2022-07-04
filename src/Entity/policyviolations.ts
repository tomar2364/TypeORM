import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('policyviolations')
@Index('ix_policyviolations_idx_policyviolation_cloudid', [
  'cloudid',
  'violationtime',
])
@Index('ix_policyviolations_idx_policyviolations_isresolved', [
  'isresolved',
  'isarchived',
  'snapshotid',
  'domainid',
  'policyid',
  'docid',
  'cloudid',
])
@Index('ix_policyviolations_idx_syscloud_policyviolations_snapshotids', [
  'snapshotid',
  'domainid',
  'policyid',
  'owner',
  'cloudid',
  'confidencelevel',
])
@Index('ix_policyviolations_idx_syscloud_policyviolations_snapshot_doci', [
  'snapshotid',
  'docid',
  'isresolved',
  'isfalse',
])
@Index('ix_policyviolations_idx_syscloud_policyviolations_threatcenters', [
  'domainid',
  'docid',
  'cloudid',
  'snapshotid',
  'violationid',
  'policyid',
])
@Index('ix_policyviolations_nc_docsprocted2', [
  'snapshotid',
  'domainid',
  'violationid',
  'policyid',
  'docid',
  'violationtype',
])
@Index('ix_policyviolations_nc_docsprotected', [
  'domainid',
  'violationtype',
  'snapshotid',
  'policyid',
  'docid',
])
@Index('ix_policyviolations_nc_policyviolations_allowedaccess', [
  'allowedaccess',
])
@Index('ix_policyviolations_nc_policyviolations_doctitle', ['doctitle'])
@Index('ix_policyviolations_nc_policyviolations_exsitingaccesse', [
  'exsitingaccess',
])
@Index('ix_policyviolations_nc_policyviolations_mimetype', ['mimetype'])
@Index('ix_policyviolations_nc_policyviolations_owner', ['owner'])
@Index('ix_policyviolations_nc_policyviolations_reasonstatus', ['reasonstatus'])
@Index('ix_policyviolations_nc_policyviolations_violationtime', [
  'violationtime',
])
export class policyViolations {
  @PrimaryColumn({ type: 'bigint', generated: 'identity' })
  violationid: number;
  @Column({ type: 'bigint', nullable: true })
  snapshotid: number;
  @Column({ type: 'bigint', nullable: true })
  domainid: number;
  @Column({ nullable: true })
  policyid: number;
  @Column({ length: 255, nullable: true, collation: 'default' })
  owner: string;
  @Column({ type: 'text', nullable: true, collation: '' })
  collaborator: string;
  @Column({ type: 'bigint', nullable: true, collation: '' })
  violationtime: number;
  @Column({ length: 255, nullable: true, collation: '' })
  docid: string;
  @Column({ length: 511, nullable: true, collation: '' })
  doctitle: string;
  @Column({ length: 100, nullable: true, collation: '' })
  mimetype: string;
  @Column({ type: 'smallint', nullable: true, collation: '' })
  violationtype: number;
  @Column({ type: 'smallint', nullable: true, collation: '' })
  exsitingaccess: number;
  @Column({ type: 'smallint', nullable: true, collation: '' })
  allowedaccess: number;
  @Column({ type: 'json', nullable: true, collation: '' })
  summarydetails: string;
  @Column({ default: 0, type: 'smallint', nullable: false, collation: '' })
  isresolved: number;
  @Column({ default: 0, type: 'smallint', nullable: false, collation: '' })
  isflag: number;
  @Column({ type: 'text', nullable: true, collation: '' })
  reason: string;
  @Column({ default: 0, type: 'smallint', nullable: false, collation: '' })
  reasonstatus: number;
  @Column({ nullable: true, collation: '' })
  cloudid: number;
  @Column({ default: 0, type: 'smallint', nullable: true, collation: '' })
  isfalse: number;
  @Column({ default: 0, nullable: false, collation: '' })
  isthreat: number;
  @Column({ default: '', type: 'text', nullable: false, collation: '' })
  threatids: string;
  @Column({ type: 'smallint', nullable: true, collation: '' })
  thresholdpriority: number;
  @Column({ nullable: true, collation: '' })
  frequency: number;
  @Column({ default: 0, type: 'smallint', nullable: true, collation: '' })
  ismail: number;
  @Column({ length: 500, nullable: true, collation: '' })
  transferredto: string;
  @Column({ default: 0, nullable: false, collation: '' })
  filemodifiedtime: number;
  @Column({ length: 210, nullable: true, collation: '' })
  approvereason: string;
  @Column({ nullable: true, collation: '' })
  confidencelevel: number;
  @Column({ length: 128, nullable: true, collation: '' })
  teamdriveid: string;
  @Column({ length: 1000, nullable: true, collation: '' })
  truepositivereason: string;
  @Column({ type: 'smallint', nullable: true, collation: '' })
  manualconfidence: number;
  @Column({ type: 'smallint', nullable: true, collation: '' })
  confidencebackup: number;
  @Column({ type: 'smallint', nullable: true, collation: '' })
  isarchived: number;
  @Column({ length: 500, nullable: true, collation: '' })
  begin_document: string;
  @Column({ length: 500, nullable: true, collation: '' })
  end_document: string;
  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  intent1: number;
  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  intent2: number;
  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  intent3: number;
  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  intent4: number;
  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  intent5: number;
  @Column({ type: 'smallint', nullable: true, collation: '' })
  daagreewithintents: number;
  @Column({ length: 500, nullable: true, collation: '' })
  dacomments: string;
  @Column({ default: 0, type: 'smallint', nullable: false, collation: '' })
  isrevoked: number;
  @Column({ default: 0, nullable: true, collation: '' })
  safesnapshotid_backup: number;
}

// intent1 numeric(4, 2) NULL,
