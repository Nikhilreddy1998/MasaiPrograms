import { PaymentContext } from "./src/PaymentContext";
import { BitCoinPaymentStrategy } from "./src/strategies/BitCoinPaymentStrategy";
import { CardPaymentStrategy } from "./src/strategies/CardPaymentStrategy";
import { UPIIPaymentStrategy } from "./src/strategies/UPIPaymentStrategy";


const payment = new PaymentContext(new CardPaymentStrategy)
payment.process(200)

payment.setPaymentMode(new BitCoinPaymentStrategy)
payment.process(1000)

payment.setPaymentMode(new UPIIPaymentStrategy)
payment.process(150)