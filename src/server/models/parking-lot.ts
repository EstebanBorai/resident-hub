import { Document, Schema, model, Model } from 'mongoose';

import type { Thruway } from '../../@types/thruway';

export interface ParkingLot extends Document {
  name: string;
  toPresentationLayer(): Thruway.ParkingLot;
}

export const ParkingLotSchema = new Schema<
  ParkingLot,
  Model<ParkingLot, ParkingLot>
>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

ParkingLotSchema.methods.toPresentationLayer = function (): Thruway.ParkingLot {
  return {
    id: this._id,
    name: this.name,
  };
};

const ParkingLotModel = model<ParkingLot>('ParkingLot', ParkingLotSchema);

export default ParkingLotModel;
