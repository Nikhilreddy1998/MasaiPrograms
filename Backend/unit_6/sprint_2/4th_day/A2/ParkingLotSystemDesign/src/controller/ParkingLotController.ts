import DefaultParkingStrategy from "../model/DefaultParkingStrategy";
import ClosestParkingStrategy from "../model/ClosestParkingStrategy";
import ParkingLot from "../model/ParkingLot";
import RandomParkingStrategy from "../model/RandomParkingStrategy";
import Vehicle from "../model/Vehicle";
import { ISlot, VehicleType } from "../types";

export class ParkingLotController {
  parkingLot!: ParkingLot;

  createParkingLot(id: string, totalFloors: number, totalSlots: number) {
    if (this.parkingLot) {
      throw new Error("ParkingLot already Exists");
    }

    this.parkingLot = new ParkingLot(id, new DefaultParkingStrategy());
    this.parkingLot.addFloors(totalFloors);

    return `Created parking lot ${totalFloors} floors with reserved EV slots`;
  }

  parkVehicle(vType: string, regNo: string, color: string) {
    let vehicleType: VehicleType;

    if (vType === "EV_CAR") {
      vehicleType = VehicleType.EV_CAR;
    } else if (vType === "CAR") {
      vehicleType = VehicleType.CAR;
    } else {
      vehicleType = VehicleType[vType as keyof typeof VehicleType];
    }

    const vehicle = new Vehicle(vehicleType, regNo, color);
    const ticket = this.parkingLot.parkVehicle(vehicle);
    if (ticket) {
      return `Parked vehicle. Ticket ID: ${ticket.id}`;
    }
    return "Parking Lot Full";
  }

  unparkVehicle(ticketId: string) {
    return this.parkingLot.unParkVehicle(ticketId);
  }

  display(displayType: string, vType: string) {
    let vehicleType: VehicleType;

    if (vType === "EV_CAR") {
      vehicleType = VehicleType.EV_CAR;
    } else if (vType === "CAR") {
      vehicleType = VehicleType.CAR;
    } else {
      vehicleType = VehicleType[vType as keyof typeof VehicleType];
    }

    let data;
    switch (displayType) {
      case "free_slots":
      case "free_count":
        data = this.parkingLot.getFreeSlots(
          vehicleType,
          displayType === "free_slots"
        );
        break;
      case "occupied_slots":
        data = this.parkingLot.getOccupiedSlots(vehicleType);
        break;
    }

    let resp = "";
    if (data) {
      Object.entries(data).forEach((d: [string, ISlot[] | number]) => {
        const [floor, slotsOrCount] = d;
        resp +=
          printSlotsData(displayType, vehicleType, floor, slotsOrCount) + "\n";
      });
    }
    return resp;
  }

  setParkingStrategy(strategy: string) {
    let parkingStrategy;

    switch (strategy.toLowerCase()) {
      case "default":
        parkingStrategy = new DefaultParkingStrategy();
        break;
      case "random":
        parkingStrategy = new RandomParkingStrategy();
        break;
      case "closest":
        parkingStrategy = new ClosestParkingStrategy();
        break;
      default:
        throw new Error(
          "Invalid parking strategy. Available strategies: default, random, closest"
        );
    }

    this.parkingLot.setParkingStrategy(parkingStrategy);
    return `Parking strategy changed to: ${strategy}`;
  }
}

function printSlotsData(
  displayType: string,
  vehicleType: string,
  floor: string,
  slotsOrCount?: Array<ISlot> | number
) {
  switch (displayType) {
    case "free_slots":
      return `No. of free slots for ${vehicleType} on Floor ${floor}: ${(
        slotsOrCount as Array<ISlot>
      ).map((slot) => slot.id)}`;
    case "free_count":
      return `Free slots for ${vehicleType} on Floor ${floor}: ${slotsOrCount}`;
    case "occupied_slots":
      return `Occupied slots for ${vehicleType} on Floor ${floor}: ${(
        slotsOrCount as Array<ISlot>
      ).map((slot) => slot.id)}`;
  }
}
