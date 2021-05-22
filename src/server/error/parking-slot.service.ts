export class ParkingSlotWithIDNotFound extends Error {
  constructor(id: string) {
    super(`A Parking Lot with ID: ${id} doesn't exists`);

    this.name = 'ParkingSlotWithIDNotFound';
  }
}
