"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, User, Crown, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useVIPStore } from "@/store/vipStore";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Shop", href: "/shop" },
  { name: "Preorders", href: "/preorders" },
  { name: "Delivery", href: "/delivery" },
  { name: "FAQ", href: "/faq" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { items } = useCartStore();
  const { vipMember } = useVIPStore();
  const { user, signOut, isSupabaseConfigured } = useAuth();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-primary group-hover:scale-105 transition-transform">
            <Image
              src="/trippy'sheadstashlogo.png"
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            TRIPPY HEAD <span className="text-primary font-black">STASH DELIVERY</span>
            {vipMember.isVIP && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-primary to-accent-purple rounded-full text-xs font-black text-white">
                <Crown className="w-3 h-3" />
                VIP
              </span>
            )}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative" ref={userMenuRef}>
            {user ? (
              <>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="p-2 text-primary hover:opacity-80 transition-opacity"
                  title="Account"
                >
                  {vipMember.isVIP ? (
                    <Crown className="w-6 h-6" />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-border">
                        <p className="font-bold text-sm truncate">{user.email}</p>
                        {vipMember.isVIP && (
                          <p className="text-xs text-primary font-bold mt-1">VIP MEMBER</p>
                        )}
                      </div>
                      <div className="p-2">
                        <Link
                          href="/account"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-sm font-medium"
                        >
                          <User className="w-4 h-4" />
                          My Account
                        </Link>
                        <button
                          onClick={() => { signOut(); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-sm font-medium text-red-500"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : isSupabaseConfigured ? (
              <Link href="/auth/login" className="p-2 text-muted-foreground hover:text-primary transition-colors" title="Sign In">
                <User className="w-6 h-6" />
              </Link>
            ) : (
              <Link href="/account" className="p-2 text-muted-foreground hover:text-primary transition-colors" title="Account">
                <User className="w-6 h-6" />
              </Link>
            )}
          </div>
          <Link href="/cart" className="p-2 relative text-muted-foreground hover:text-primary transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border bg-card"
          >
            <nav className="flex flex-col p-4 gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium p-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
