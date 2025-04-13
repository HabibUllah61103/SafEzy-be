export enum PgErrorCode {
  NotNullViolation = '23502',
  ForeignKeyViolation = '23503',
  UniqueViolation = '23505',
  UndefinedTable = '42P01',
  UndefinedColumn = '42703',
  OperatorNotFound = '42883',
}
