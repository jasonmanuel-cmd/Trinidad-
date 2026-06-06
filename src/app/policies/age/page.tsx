export default function AgePolicy() {
  return (
    <div className="space-y-8">
      <h1 className="text-5xl font-black tracking-tight">AGE VERIFICATION POLICY</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">21+ REQUIRED</h2>
        <p className="text-muted-foreground leading-relaxed">
          Trippy Head Stash Delivery operates in strict compliance with California state law. You must be at least 21 years of age to access this website and purchase products.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">ID VERIFICATION PROCESS</h2>
        <p className="text-muted-foreground leading-relaxed">
          Site entry confirmation is only the first step. Real verification happens at two points:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Checkout:</strong> You must provide your date of birth and confirm that you possess a valid government-issued photo ID.</li>
          <li><strong>Delivery:</strong> Our couriers are required to physically inspect and scan your ID at the time of handoff. The person who placed the order must be the one to receive it.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">ACCEPTED IDENTIFICATION</h2>
        <p className="text-muted-foreground leading-relaxed">
          We accept the following forms of valid, unexpired, government-issued photo identification:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>State-issued Driver&apos;s License</li>
          <li>State-issued Identification Card</li>
          <li>Federal-issued Passport</li>
          <li>Military Identification</li>
        </ul>
        <p className="text-sm italic">Note: Temporary paper IDs or photos of IDs are not accepted.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">CONSEQUENCES OF NON-COMPLIANCE</h2>
        <p className="text-muted-foreground leading-relaxed">
          If a valid ID matching the order name is not presented at delivery, the order will be cancelled, and a restocking fee may apply.
        </p>
      </section>
    </div>
  );
}
