import React, { useState } from "react";
import { X, Copy, Check, Printer, FileText, Share2, Sparkles, Store, Phone, MapPin } from "lucide-react";

interface OnboardingInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingInquiryModal: React.FC<OnboardingInquiryModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const whatsappMessage = `🇸🇿 *MBABANE SERVICE & PRODUCT FINDER - FREE VENDOR ENQUIRY*

Sawubona! Are you a service provider or business owner in Mbabane?
(Hairstylist, Nail Tech, Food Stall, Braai, Printing, Mechanic, Plumber, Tailor, Electrician, etc.)

We are adding all verified local providers to the *Mbabane Service Finder* so customers looking for the nearest services can find you directly on WhatsApp and phone!

📝 *Please reply with your details to get listed for FREE:*
1. *Business / Stall Name:* 
2. *Owner / Contact Person:* 
3. *WhatsApp & Phone Number:* 
4. *Exact Location in Mbabane:* (e.g. Container # at Bus Rank, Msunduza Market, Sheffield Rd, or Mobile / House visits)
5. *Neighborhood:* (e.g. CBD, Swazi Plaza, Bus Rank, Msunduza, Fonteyn, Eveni, Sidwashini, Checkers)
6. *Services Offered & Starting Price:* 
7. *Do you travel to clients?* (Yes/No)

👉 Or list yourself directly online:
https://eswatini-service-finder-1.onrender.com`;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="glass-card max-w-2xl w-full p-6 sm:p-8 relative my-8 border border-white/80 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="neu-btn w-9 h-9 rounded-full flex items-center justify-center absolute top-5 right-5 text-slate-500 hover:text-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <span className="glass-pill text-[11px] font-black uppercase tracking-wider text-swazi-blue px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Field Recruitment & Vendor Onboarding Kit
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Mbabane Provider Enquiry Slip & Handout
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Hand this out to self-employed artisans, market stalls, and small businesses around Mbabane Bus Rank, Swazi Plaza, Sheffield Rd, and Msunduza so you can add them to the system.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap gap-2.5 mb-5">
          <button
            onClick={handleCopy}
            className="neu-btn-primary flex-1 py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied WhatsApp Message!" : "Copy WhatsApp Enquiry Text"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="neu-btn py-2.5 px-4 rounded-xl text-xs font-black text-slate-700 flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-swazi-blue" />
            <span>Print Physical Slips</span>
          </button>
        </div>

        {/* Printable Paper Slip Layout */}
        <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-slate-300 space-y-4 shadow-sm text-slate-800 font-sans">
          <div className="text-center border-b border-slate-200 pb-3">
            <span className="bg-swazi-yellow text-slate-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">
              Free Listing • Eswatini Service Finder
            </span>
            <h3 className="text-base font-black tracking-tight mt-1 text-slate-900">
              MBABANE PROVIDER REGISTRATION ENQUIRY
            </h3>
            <p className="text-[11px] text-slate-500">
              Get direct customer requests and let nearby clients find your business in Mbabane.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-extrabold text-[10px] uppercase text-slate-400 block">1. Business / Trade Name:</span>
              <div className="h-6 border-b border-dotted border-slate-400 mt-2"></div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-extrabold text-[10px] uppercase text-slate-400 block">2. Contact Person & Title:</span>
              <div className="h-6 border-b border-dotted border-slate-400 mt-2"></div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-extrabold text-[10px] uppercase text-slate-400 block">3. WhatsApp & Phone:</span>
              <div className="h-6 border-b border-dotted border-slate-400 mt-2"></div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-extrabold text-[10px] uppercase text-slate-400 block">4. Mbabane Neighborhood:</span>
              <div className="h-6 border-b border-dotted border-slate-400 mt-2"></div>
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="font-extrabold text-[10px] uppercase text-slate-400 block">
              5. Exact Location / Stall / Mobile:
            </span>
            <p className="text-[10px] text-slate-400 mb-1">e.g. Container # at Bus Rank, Sheffield Rd near Post Office, or Home Visits across Eveni</p>
            <div className="h-6 border-b border-dotted border-slate-400"></div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="font-extrabold text-[10px] uppercase text-slate-400 block">
              6. Specific Services & Starting Prices (SZL):
            </span>
            <div className="h-6 border-b border-dotted border-slate-400 mt-1"></div>
            <div className="h-6 border-b border-dotted border-slate-400 mt-2"></div>
          </div>

          <div className="pt-2 text-center text-[10px] text-slate-500 border-t border-slate-200">
            <span>Powered by Mbabane Service Finder • Submit details directly online: </span>
            <strong className="text-swazi-blue font-black">https://eswatini-service-finder-1.onrender.com</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
