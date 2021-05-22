import { Document, Schema, model, Model } from 'mongoose';

import type { Thruway } from '../../@types/thruway';

export interface ParkingSlot extends Document {
  name: string;
  parkingLotId: string;
  toPresentationLayer(): Thruway.ParkingSlot;
}

export const ParkingSlotSchema = new Schema<
  ParkingSlot,
  Model<ParkingSlot, ParkingSlot>
>(
  {
    name: {
      type: String,
      required: true,
    },
    parkingLotId: {
      ref: 'ParkingLot',
      type: Schema.Types.ObjectId,
    },
  },
  {
    versionKey: false,
  },
);

ParkingSlotSchema.methods.toJSON = function (): Thruway.ParkingSlot {
  return {
    id: this._id,
    name: this.name,
    parkingLotId: this.parkingLotId,
  };
};

const ParkingSlotModel = model<ParkingSlot>('ParkingSlot', ParkingSlotSchema);

export default ParkingSlotModel;
