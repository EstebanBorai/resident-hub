export class DriverWithIDNotFound extends Error {
  constructor(id: string) {
    super(`A driver with ID: ${id} doesn't exists`);

    this.name = 'DriverWithIDNotFound';
  }
}
