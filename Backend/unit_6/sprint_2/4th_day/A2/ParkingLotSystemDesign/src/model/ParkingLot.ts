import TicketController from "../controller/TicketController";
import {
  IFloor,
  IParkingStrategy,
  ISlot,
  IVehicle,
  VehicleType,
} from "../types";
import Floor from "./Floor";
import Ticket from "./Ticket";

export class ParkingLot {
  id: string;
  floors: Array<IFloor>;
  private parkingStrategy: IParkingStrategy;

  constructor(id: string, parkingStrategy: IParkingStrategy) {
    this.id = id;
    this.parkingStrategy = parkingStrategy;
    this.floors = [];
  }

  addFloors(floorsToAdd: number) {
    for (let i = 0; i < floorsToAdd; i++) {
      const floor = new Floor(i);

      floor.addSlot(VehicleType.CAR);
      floor.addSlot(VehicleType.CAR);
      floor.addSlot(VehicleType.CAR);
      floor.addSlot(VehicleType.BIKE);
      floor.addSlot(VehicleType.BIKE);
      floor.addSlot(VehicleType.TRUCK);

      floor.addReservedEVSlot();

      this.floors.push(floor);
    }
  }

  setParkingStrategy(parkingStrategy: IParkingStrategy) {
    this.parkingStrategy = parkingStrategy;
  }

  parkVehicle(vehicle: IVehicle) {
    const slotToBook = this.parkingStrategy.park(this.floors, vehicle);
    if (slotToBook) {
      slotToBook.occupy();
      const ticket = TicketController.generateTicket(
        this.id,
        slotToBook.id,
        slotToBook.floorId,
        vehicle
      );

      return ticket;
    }

    throw new Error("No slots available");
  }

  getFreeSlots(vehicleType: VehicleType, showSlots: boolean = false) {
    const floors = this.floors;
    const freeSlots: { [x: string]: ISlot[] | number } = {};

    floors.forEach((floor) => {
      const availableSlots = floor.getAvailableSlots(vehicleType);
      freeSlots[floor.id] = showSlots ? availableSlots : availableSlots.length;
    });
    return freeSlots;
  }

  getOccupiedSlots(vehicleType: VehicleType) {
    const floors = this.floors;
    const occupiedSlots: { [x: string]: ISlot[] | number } = {};

    floors.forEach((floor) => {
      occupiedSlots[floor.id] = floor.getOccupiedSlots(vehicleType);
    });
    return occupiedSlots;
  }

  unParkVehicle(ticketId: string) {
    try {
      const { ticket, fee } = TicketController.unparkVehicle(ticketId);

      const [parkingLotId, floorId, slotId] = ticketId.split("_");
      const floor = this.floors[Number(floorId)];
      const slot = floor.slots[Number(slotId) - 1];

      slot.release();
      TicketController.deleteTicket(ticketId);

      const durationMs =
        ticket.exitTime!.getTime() - ticket.entryTime.getTime();
      const durationHours = Math.ceil(durationMs / (1000 * 60 * 60));
      const durationMinutes = Math.floor(
        (durationMs % (1000 * 60 * 60)) / (1000 * 60)
      );

      return (
        `Unparked Vehicle with Registration No: ${ticket.vehicle.regNo} and Color: ${ticket.vehicle.color}\n` +
        `Parking Duration: ${durationHours} hour(s) ${durationMinutes} minute(s)\n` +
        `Parking Fee: ${fee} units`
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Invalid Ticket!!");
    }
  }
}

export default ParkingLot;
