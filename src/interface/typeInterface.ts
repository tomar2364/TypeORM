export interface Type {
  type: 'postgres';
  uid: number;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
