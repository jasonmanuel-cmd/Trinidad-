export default function PaymentPolicy() {
  return (
    <div className="space-y-8">
      <h1 className="text-5xl font-black tracking-tight">PAYMENT POLICY</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">CASH ON DELIVERY (COD)</h2>
        <p className="text-muted-foreground leading-relaxed">
          Cash on Delivery is our primary and recommended payment method for all Bakersfield residents. This ensures a safe, direct transaction at the time of delivery.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Please have the exact amount ready if possible; our drivers carry limited change.</li>
          <li>Payment is required in full before products are handed over.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">CASH APP & MANUAL PAYMENTS</h2>
        <p className="text-muted-foreground leading-relaxed">
          We offer manual payment options via Cash App for certain orders. If selected:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Detailed instructions will be provided after checkout.</li>
          <li>Payments must be confirmed by our admin team before the order is dispatched.</li>
          <li>Order names must match the payment account name.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">SQUARE (CBD/HEMP ONLY)</h2>
        <p className="text-muted-foreground leading-relaxed">
          Online card processing via Square is available exclusively for eligible hemp and CBD products containing less than 0.3% THC. Standard cannabis products cannot be purchased via online card processing at this time.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">REFUNDS & ISSUES</h2>
        <p className="text-muted-foreground leading-relaxed">
          In the event of an order cancellation or fulfillment issue, refunds for pre-paid manual payments will be processed within 24-48 hours. Cash payments are final once the driver leaves the delivery site.
        </p>
      </section>
    </div>
  );
}
