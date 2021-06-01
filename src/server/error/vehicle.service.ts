export class VehicleWithIDNotFound extends Error {
  constructor(id: string) {
    super(`A vehicle with ID: ${id} doesn't exists`);

    this.name = 'VehicleWithIDNotFound';
  }
}
