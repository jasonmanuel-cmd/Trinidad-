import Link from "next/link";
import Image from "next/image";
import { Camera, X, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-primary">
                <Image
                  src="/trippy'sheadstashlogo.png"
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-lg tracking-tight">
                TRIPPY HEAD <span className="text-primary">STASH DELIVERY</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Premium cannabis delivery for Bakersfield adults. Quality, speed, and discretion guaranteed.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-secondary rounded-full hover:text-primary transition-colors">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-full hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-foreground uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/shop" className="hover:text-primary transition-colors">Shop Menu</Link></li>
              <li><Link href="/preorders" className="hover:text-primary transition-colors">Preorders</Link></li>
              <li><Link href="/delivery" className="hover:text-primary transition-colors">Delivery Info</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-foreground uppercase tracking-widest text-sm">Legal & Policies</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/policies/age" className="hover:text-primary transition-colors">Age Verification</Link></li>
              <li><Link href="/policies/payment" className="hover:text-primary transition-colors">Payment Policy</Link></li>
              <li><Link href="/policies/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/policies/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-foreground uppercase tracking-widest text-sm">Support</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>support@trippyheadstash.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>(661) 555-0123</span>
              </li>
              <li className="pt-2 italic text-xs">
                Available Mon-Sun, 9am - 10pm
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Trippy Head Stash Delivery. All rights reserved.</p>
          <p>License: C10-0000XXX-LIC (Pending)</p>
        </div>
      </div>
    </footer>
  );
}
