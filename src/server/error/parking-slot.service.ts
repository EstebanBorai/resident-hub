export class UnexistentParkingSlotID extends Error {
  constructor() {
    super(`Unexistent Parking slot ID!`);

    this.name = 'UnexistentParkingSlotID';
  }
}
