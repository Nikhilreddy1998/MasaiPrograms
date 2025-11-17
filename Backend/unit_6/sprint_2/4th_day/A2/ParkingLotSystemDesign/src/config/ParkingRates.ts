import { IParkingRates, VehicleType } from "../types";

export const PARKING_RATES: IParkingRates = {
  [VehicleType.CAR]: 20,
  [VehicleType.EV_CAR]: 25,
  [VehicleType.BIKE]: 10,
  [VehicleType.TRUCK]: 30,
};

export default PARKING_RATES;
