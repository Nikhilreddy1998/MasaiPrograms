import { ISlot, VehicleType } from "../types";

class Slot implements ISlot {
  id: number;
  type: VehicleType;
  isOccupied: boolean;
  floorId: number;
  isReserved: boolean;

  constructor(
    id: number,
    type: VehicleType,
    floorId: number,
    isReserved: boolean = false
  ) {
    this.id = id;
    this.type = type;
    this.isOccupied = false;
    this.floorId = floorId;
    this.isReserved = isReserved;
  }

  occupy() {
    if (this.isOccupied) {
      throw new Error("Already Occupied");
    }
    this.isOccupied = true;
  }

  release() {
    if (!this.isOccupied) {
      throw new Error("Already free");
    }

    this.isOccupied = false;
  }
}

export default Slot;
