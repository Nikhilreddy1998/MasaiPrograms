import { IFloor, ISlot, VehicleType } from "../types";
import Slot from "./Slot";

class Floor implements IFloor {
  id: number;
  slots: ISlot[];

  constructor(id: number) {
    this.id = id;
    this.slots = [];
  }

  addSlot(vehicleType: VehicleType): void {
    this.slots.push(new Slot(this.slots.length + 1, vehicleType, this.id));
  }

  addReservedEVSlot(): void {
    this.slots.push(
      new Slot(this.slots.length + 1, VehicleType.EV_CAR, this.id, true)
    );
  }

  getAvailableSlots(vehicleType?: VehicleType): Array<ISlot> {
    let availableSlots = [];

    for (const slot of this.slots) {
      if (slot.isOccupied) {
        continue;
      }

      if (!vehicleType) {
        availableSlots.push(slot);
      } else if (slot.type === vehicleType) {
        if (vehicleType === VehicleType.EV_CAR) {
          availableSlots.push(slot);
        } else if (vehicleType === VehicleType.CAR) {
          if (!slot.isReserved) {
            availableSlots.push(slot);
          }
        } else {
          availableSlots.push(slot);
        }
      }
    }

    return availableSlots;
  }

  getOccupiedSlots(vehicleType?: VehicleType): Array<ISlot> {
    let occupiedSlots = [];

    for (const slot of this.slots) {
      if (!slot.isOccupied) {
        continue;
      }

      if (!vehicleType) {
        occupiedSlots.push(slot);
      } else if (slot.type === vehicleType) {
        occupiedSlots.push(slot);
      }
    }

    return occupiedSlots;
  }
}

export default Floor;
