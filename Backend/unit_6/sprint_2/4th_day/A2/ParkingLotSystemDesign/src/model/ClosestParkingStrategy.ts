import {
  IFloor,
  IParkingStrategy,
  ISlot,
  IVehicle,
  VehicleType,
} from "../types";

class ClosestParkingStrategy implements IParkingStrategy {
  park(floors: IFloor[], vehicle: IVehicle): ISlot | null {
    const sortedFloors = [...floors].sort((a, b) => a.id - b.id);

    for (let floor of sortedFloors) {
      const availableSlots = floor.getAvailableSlots(vehicle.type);

      if (availableSlots.length > 0) {
        const sortedSlots = availableSlots.sort((a, b) => a.id - b.id);
        return sortedSlots[0];
      }
    }

    return null;
  }
}

export default ClosestParkingStrategy;
