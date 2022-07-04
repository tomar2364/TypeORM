import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('policyviolationsmail')
@Index('ix_policyviolationsmail_idx_policyviolationmail_owner_snapshot', [
  'owner',
  'snapshotid',
  'policyid',
  'docid',
  'isresolved',
  'isfalse',
])
@Index('ix_policyviolationsmail_idx_policyviolationsmail_isresolved', [
  'isresolved',
  'snapshotid',
  'policyid',
  'docid',
])
@Index('ix_policyviolationsmail_idx_syscloud_policyviolationmail_domain', [
  'cloudid',
  'snapshotid',
  'domainid',
  'policyid',
  'owner',
  'violationtime',
  'docid',
  'doctitle',
])
export class policyViolationsmail {
  @PrimaryColumn({ type: 'bigint', generated: 'identity' })
  violationid: number;
  @Column({ type: 'bigint', nullable: true })
  snapshotid: number;
  @Column({ type: 'bigint', nullable: true })
  domainid: number;
  @Column({ nullable: true })
  policyid: number;
  @Column({ length: 255, nullable: true })
  'owner': string;
  @Column({ type: 'text', nullable: true })
  collaborator: string;
  @Column({ type: 'bigint', nullable: true })
  violationtime: number;
  @Column({ length: 500, nullable: true })
  docid: string;
  @Column({ length: 511, nullable: true })
  doctitle: string;
  @Column({ length: 100, nullable: true })
  mimetype: string;
  @Column({ type: 'smallint', nullable: true })
  violationtype: number;
  @Column({ type: 'smallint', nullable: true })
  exsitingaccess: number;
  @Column({ type: 'smallint', nullable: true })
  allowedaccess: number;
  @Column({ type: 'json', nullable: true })
  summarydetails: string;
  @Column({ default: 0, type: 'smallint', nullable: false })
  isresolved: number;
  @Column({ default: 0, type: 'smallint', nullable: false })
  isflag: number;
  @Column({ type: 'text', nullable: true })
  reason: string;
  @Column({ default: 0, type: 'smallint', nullable: false })
  reasonstatus: number;
  @Column({ nullable: true })
  cloudid: number;
  @Column({ default: 0, type: 'smallint', nullable: true })
  isfalse: number;
  @Column({ default: 0, nullable: false })
  isthreat: number;
  @Column({ default: '', type: 'text', nullable: false })
  threatids: string;
  @Column({ default: 0, type: 'smallint', nullable: true })
  ismail: number;
  @Column({ default: 0, type: 'smallint', nullable: false })
  ischat: number;
  @Column({ length: 100, nullable: true })
  thresholdpriority: string;
  @Column({ nullable: true })
  frequency: number;
  @Column({ length: 210, nullable: true })
  approvereason: string;
  @Column({ length: 500, nullable: true })
  mailid: string;
  @Column({ nullable: true })
  confidencelevel: number;
  @Column({ length: 1000, nullable: true })
  truepositivereason: string;
  @Column({ type: 'smallint', nullable: true })
  manualconfidence: number;
  @Column({ type: 'smallint', nullable: true })
  confidencebackup: number;
  @Column({ length: 500, nullable: true })
  begin_document: string;
  @Column({ length: 500, nullable: true })
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
  @Column({ type: 'smallint', nullable: true })
  daagreewithintents: number;
  @Column({ length: 500, nullable: true })
  dacomments: string;
}
