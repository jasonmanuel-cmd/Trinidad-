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
        <h2 className="text-2xl font-bold text-primary">VIP MEMBERSHIP</h2>
        <p className="text-muted-foreground leading-relaxed">
          VIP membership is a separate monthly subscription ($50/month) paid via Cash App or other agreed method. Membership includes exclusive benefits like free delivery on orders $20+, $10 monthly credit, free pre-rolls, monthly gift bags, and more.
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
