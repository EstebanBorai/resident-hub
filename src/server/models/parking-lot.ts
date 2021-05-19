import { Document, Schema, model, Model } from 'mongoose';

import type { Thruway } from '../../@types/thruway';

export interface ParkingLot extends Document {
  name: string;
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

ParkingLotSchema.methods.toJSON = function (): Thruway.ParkingLot {
  return {
    id: this._id,
    name: this.name,
  };
};

const ParkingLotModel = model<ParkingLot>('ParkingLot', ParkingLotSchema);

export default ParkingLotModel;
