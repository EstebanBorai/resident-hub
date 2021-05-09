export class ExpiredTokenProvidedForRefresh extends Error {
  constructor() {
    super('A expired token where provided to refresh');

    this.name = 'ExpiredTokenProvidedForRefresh';
  }
}
