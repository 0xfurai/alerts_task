export interface QueryResult<Row> {
  rows: Row[];
  rowCount: number | null;
}

export interface Queryable {
  query<Row = Record<string, unknown>>(
    text: string,
    values?: unknown[],
  ): Promise<QueryResult<Row>>;
}
