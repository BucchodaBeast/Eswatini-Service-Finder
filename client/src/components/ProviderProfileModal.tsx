import React, { useState } from "react";
import { X, Star, ShieldCheck, MapPin, Phone, MessageCircle, CheckCircle2, Clock, DollarSign, Award, Send } from "lucide-react";
import { Provider, ProviderReview } from "../types";

interface ProviderProfileModalProps {
  provider: Provider | null;
  onClose: () => void;
  onReviewSubmitted: (updatedProvider: Provider) => void;
}

export const ProviderProfileModal: React.FC<ProviderProfileModalProps> = ({
  provider,
  onClose,
  onReviewSubmitted
}) => {
  const [reviews, setReviews] = useState<ProviderReview[]>(provider?.reviews || []);
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [serviceRendered, setServiceRendered] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"services" | "reviews">("services");
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);

  if (!provider) return null;

  const cleanPhone = provider.phoneNumber.replace(/[^0-9]/g, "");
  const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${provider.businessName}! I found your service profile on the Mbabane Service Finder and would like to inquire about your services.`
  )}`;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !comment) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/providers/${provider.id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          rating,
          comment,
          serviceRendered: serviceRendered || provider.servicesOffered[0] || "General Service"
        })
      });

      const data = await res.json();
      if (data.success) {
        setReviews([data.data, ...reviews]);
        setComment("");
        setUserName("");
        setFeedbackSuccess("Your review has been submitted! It helps other Emaswati find trustworthy services.");
        
        // Refresh provider in parent
        const updatedProvider: Provider = {
          ...provider,
          reviewsCount: provider.reviewsCount + 1,
          rating: Number(((provider.rating * provider.reviewsCount + rating) / (provider.reviewsCount + 1)).toFixed(1)),
          reviews: [data.data, ...reviews]
        };
        onReviewSubmitted(updatedProvider);
      }
    } catch (err) {
      alert("Error submitting review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="glass-card max-w-xl w-full p-6 sm:p-8 relative my-8 border border-white/80 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="neu-btn w-9 h-9 rounded-full flex items-center justify-center absolute top-5 right-5 text-slate-500 hover:text-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl neu-flat flex items-center justify-center text-swazi-blue flex-shrink-0 font-black text-xl">
            {provider.businessName.charAt(0)}
          </div>
          <div className="flex-1 pr-6">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              {provider.tier === "TIER1_ID_VERIFIED" ? (
                <span className="glass-pill text-[10px] font-black text-emerald-700 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  ID-Verified Artisan
                </span>
              ) : provider.tier === "TIER2_BUSINESS_VERIFIED" ? (
                <span className="glass-pill text-[10px] font-black text-blue-700 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3 text-blue-600" />
                  Registered Business
                </span>
              ) : (
                <span className="glass-pill text-[10px] font-black text-slate-600 px-2.5 py-0.5 rounded-full">
                  Self-Hired Local Vendor
                </span>
              )}
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-500" />
                {provider.neighborhood}
              </span>
            </div>

            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {provider.businessName}
            </h2>
            <p className="text-xs text-slate-500 font-medium">Proprietor: {provider.fullName}</p>
          </div>
        </div>

        {/* Trust & Performance Metrics Wells */}
        <div className="grid grid-cols-3 gap-2.5 mt-5">
          <div className="neu-pressed p-2.5 rounded-xl text-center">
            <span className="text-[9px] font-black uppercase text-slate-400 block">Rating</span>
            <div className="flex items-center justify-center gap-1 text-amber-500 font-black text-base mt-0.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{provider.rating > 0 ? provider.rating : "New"}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">{reviews.length} reviews</span>
          </div>

          <div className="neu-pressed p-2.5 rounded-xl text-center">
            <span className="text-[9px] font-black uppercase text-slate-400 block">Completed Jobs</span>
            <span className="text-base font-black text-emerald-700 block mt-0.5">
              {provider.completedJobsCount}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">on platform</span>
          </div>

          <div className="neu-pressed p-2.5 rounded-xl text-center">
            <span className="text-[9px] font-black uppercase text-slate-400 block">Starts At</span>
            <span className="text-base font-black text-slate-800 block mt-0.5">
              {provider.startingPriceSzl ? `SZL ${provider.startingPriceSzl}` : "Varies"}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">negotiable</span>
          </div>
        </div>

        {/* Location Spot */}
        <div className="mt-4 neu-flat-sm p-3 flex items-start gap-2.5 text-xs text-slate-700">
          <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold block text-slate-800">Exact Location / Operation:</span>
            <span>{provider.exactLocation}</span>
          </div>
        </div>

        {/* Quick Connect Actions */}
        <div className="mt-4 flex gap-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="neu-btn-success flex-1 py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`tel:${cleanPhone}`}
            className="neu-btn flex-1 py-2.5 px-3 rounded-xl font-black text-xs text-slate-800 flex items-center justify-center gap-1.5"
          >
            <Phone className="w-4 h-4 text-swazi-blue" />
            <span>Call ({provider.phoneNumber})</span>
          </a>
        </div>

        {/* Tab switch between Offerings & Reviews */}
        <div className="mt-6 neu-pressed p-1 rounded-xl flex">
          <button
            onClick={() => setActiveTab("services")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all ${
              activeTab === "services" ? "neu-btn text-swazi-blue bg-[#e9eef5]" : "text-slate-500"
            }`}
          >
            Services Offered ({provider.servicesOffered.length})
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all ${
              activeTab === "reviews" ? "neu-btn text-swazi-blue bg-[#e9eef5]" : "text-slate-500"
            }`}
          >
            Reviews & Ratings ({reviews.length})
          </button>
        </div>

        {/* Services Tab Content */}
        {activeTab === "services" && (
          <div className="mt-4 space-y-3">
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "{provider.bio}"
            </p>

            <div className="space-y-1.5">
              <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                Full Service Menu & Specialities:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {provider.servicesOffered.map((svc, idx) => (
                  <div
                    key={idx}
                    className="neu-flat-sm p-2.5 flex items-center gap-2 text-xs font-bold text-slate-700"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{svc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab Content */}
        {activeTab === "reviews" && (
          <div className="mt-4 space-y-4">
            {/* Feedback form */}
            <form onSubmit={handleSubmitReview} className="neu-flat p-4 space-y-3">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Leave a Review for this Provider
              </h4>

              {feedbackSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold">
                  {feedbackSuccess}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sindi M."
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    className="neu-input w-full px-3 py-1.5 rounded-lg text-slate-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">
                    Rating *
                  </label>
                  <select
                    value={rating}
                    onChange={e => setRating(Number(e.target.value))}
                    className="neu-input w-full px-3 py-1.5 rounded-lg text-slate-800 text-xs font-bold"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5 Very Good)</option>
                    <option value={3}>⭐⭐⭐ (3/5 Average)</option>
                    <option value={2}>⭐⭐ (2/5 Below Average)</option>
                    <option value={1}>⭐ (1/5 Poor)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">
                  Service You Received
                </label>
                <input
                  type="text"
                  placeholder="e.g. Knotless Braids / Tyre Puncture / Chicken Dust"
                  value={serviceRendered}
                  onChange={e => setServiceRendered(e.target.value)}
                  className="neu-input w-full px-3 py-1.5 rounded-lg text-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">
                  Your Review Comment *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="How was the service, timing, and pricing? Help others in Mbabane..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="neu-input w-full px-3 py-1.5 rounded-lg text-slate-800 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="neu-btn-primary w-full py-2 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Verified Review</span>
              </button>
            </form>

            {/* Existing Reviews List */}
            <div className="space-y-2.5">
              {reviews.length === 0 ? (
                <p className="text-center text-xs text-slate-400 py-4">
                  No customer reviews yet. Be the first to review!
                </p>
              ) : (
                reviews.map(rev => (
                  <div key={rev.id} className="neu-flat-sm p-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-slate-800">{rev.userName}</span>
                        {rev.verifiedClient && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                            Verified User
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-400 text-xs font-black">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    {rev.serviceRendered && (
                      <span className="text-[10px] text-swazi-blue font-semibold block">
                        Service: {rev.serviceRendered}
                      </span>
                    )}

                    <p className="text-xs text-slate-600 italic">"{rev.comment}"</p>
                    <span className="text-[9px] text-slate-400 block">{rev.date}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
