import { ITicket, IVehicle } from "../types";

class Ticket implements ITicket {
  id: string;
  vehicle: IVehicle;
  entryTime: Date;
  exitTime?: Date;
  parkingFee?: number;

  constructor(id: string, vehicle: IVehicle) {
    this.id = id;
    this.vehicle = vehicle;
    this.entryTime = new Date();
  }

  setExitTime(): void {
    this.exitTime = new Date();
  }

  calculateParkingFee(hourlyRates: { [key: string]: number }): number {
    if (!this.exitTime) {
      throw new Error("Exit time not set");
    }

    const durationMs = this.exitTime.getTime() - this.entryTime.getTime();
    const durationHours = Math.ceil(durationMs / (1000 * 60 * 60));

    const rate = hourlyRates[this.vehicle.type] || 0;
    this.parkingFee = durationHours * rate;

    return this.parkingFee;
  }
}

export default Ticket;
