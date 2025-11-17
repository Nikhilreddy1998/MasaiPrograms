import Ticket from "../model/Ticket";
import { ITicket, IVehicle } from "../types";
import PARKING_RATES from "../config/ParkingRates";

class TicketController {
  private static instance: TicketController | null;

  static tickets = new Map<string, ITicket>();

  private constructor() {}
  static getInstance(): TicketController {
    if (!TicketController.instance) {
      TicketController.instance = new TicketController();
    }
    return TicketController.instance;
  }

  static generateTicket(
    lotId: string,
    slotId: string | number,
    floorId: string | number,
    vehicle: IVehicle
  ) {
    const ticketId = `${lotId}_${floorId}_${slotId}`;
    const ticket = new Ticket(ticketId, vehicle);
    TicketController.tickets.set(ticketId, ticket);
    return ticket;
  }

  static getTicketWithId(ticketId: string): ITicket | undefined {
    return TicketController.tickets.get(ticketId);
  }

  static deleteTicket(ticketId: string) {
    return TicketController.tickets.delete(ticketId);
  }

  static unparkVehicle(ticketId: string): { ticket: ITicket; fee: number } {
    const ticket = TicketController.getTicketWithId(ticketId);
    if (!ticket) {
      throw new Error("Invalid Ticket!!");
    }

    ticket.setExitTime();
    const fee = ticket.calculateParkingFee(PARKING_RATES);

    return { ticket, fee };
  }
}

export default TicketController;
