export interface QueryOptions<T> {
  select?: FindOptionsSelect<T>;
  relations?: FindOptionsRelations<T>;
}
