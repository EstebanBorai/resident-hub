export class UnexistentParkingLotID extends Error {
  constructor() {
    super(`Unexistent Parking lot ID!`);

    this.name = 'UnexistentParkingLotID';
  }
}
