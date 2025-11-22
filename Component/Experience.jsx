import React, { useState } from "react";

// Default sample reviews
const sampleExperiences = [
  {
    id: 1,
    guest: "Rahul Patil",
    title: "Great stay — clean rooms",
    text: "Stayed for 2 nights. Staff was friendly and breakfast was excellent.",
    rating: 4.5,
    date: "2025-09-12",
  },
  {
    id: 2,
    guest: "Anita Deshpande",
    title: "Lovely rooftop view",
    text: "Awesome rooftop seating and quick service. Will come again!",
    rating: 5,
    date: "2025-08-02",
  },
  {
    id: 1,
    guest: "Rahul Patil",
    title: "Great stay — clean rooms",
    text: "Stayed for 2 nights. Staff was friendly and breakfast was excellent.",
    rating: 4.5,
    date: "2025-09-12",
  },
  {
    id: 2,
    guest: "Anita Deshpande",
    title: "Lovely rooftop view",
    text: "Awesome rooftop seating and quick service. Will come again!",
    rating: 5,
    date: "2025-08-02",
  },
];

// Simple star icon
const StarIcon = () => (
  <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current text-yellow-400">
    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.91l6.561-.955L10 1l2.951 5.955 6.561.955-4.756 3.635 1.122 6.545z" />
  </svg>
);

export default function Experience({ experiences = sampleExperiences }) {
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [data, setData] = useState(experiences);
  const [activeCard, setActiveCard] = useState(null);

  // Modal state + form
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    guest: "",
    title: "",
    text: "",
    rating: "",
  });

  // Filtered list
  const filtered = data.filter((e) => {
    const matchText = `${e.guest} ${e.title} ${e.text}`.toLowerCase().includes(query.toLowerCase());
    const matchRating = e.rating >= minRating;
    return matchText && matchRating;
  });

  // Add new review
  const addReview = () => {
    if (!form.guest || !form.title || !form.text || !form.rating) {
      alert("Please fill all fields");
      return;
    }
    if (Number(form.rating) < 0 || Number(form.rating) > 5) {
      alert("Rating must be between 0 and 5");
      return;
    }

    const newReview = {
      id: Date.now(),
      guest: form.guest,
      title: form.title,
      text: form.text,
      rating: Number(form.rating),
      date: new Date().toISOString(),
    };

    setData([newReview, ...data]);
    setOpen(false);
    setForm({ guest: "", title: "", text: "", rating: "" });
    setActiveCard(newReview.id); // mark new card active
  };

  // Close modal when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target.dataset.backdrop === "true") {
      setOpen(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-gray-100 mt-15">
      <div className="w-full max-w-7xl mx-auto p-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Guest Experiences
          </h2>
          <p className="text-gray-600 mt-2">Real stories from hotel guests</p>
        </div>

        {/* Filters / Top bar */}
        <div className="flex flex-wrap gap-4 items-center justify-between bg-white/80 backdrop-blur-sm p-4 border rounded-xl shadow">
          <input
            placeholder="Search reviews, guests, keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full md:w-80 focus:ring-2 ring-blue-400 outline-none"
            aria-label="Search reviews"
          />

          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="px-4 py-2 border rounded-lg w-full md:w-40 focus:ring-2 ring-purple-400"
            aria-label="Filter by rating"
          >
            <option value={0}>All ratings</option>
            <option value={4}>4+</option>
            <option value={4.5}>4.5+</option>
            <option value={5}>5</option>
          </select>

          <button
            onClick={() => setOpen(true)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Review
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-14 text-gray-500">No experiences found.</div>
          ) : (
            filtered.map((exp) => (
              <div
                key={exp.id}
                onClick={() => setActiveCard(exp.id)}
                className={`p-6 rounded-2xl border shadow cursor-pointer transition-transform duration-200
                  ${activeCard === exp.id ? "bg-gradient-to-r from-white to-blue-50 border-blue-400 shadow-2xl scale-[1.02]" : "bg-white hover:shadow-lg hover:-translate-y-1"}
                `}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") setActiveCard(exp.id); }}
                aria-pressed={activeCard === exp.id}
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center rounded-full text-lg font-bold">
                    {exp.guest.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{exp.title}</h3>
                    <p className="text-sm text-gray-500">by {exp.guest}</p>

                    <div className="flex items-center gap-2 mt-2">
                      {/* show full rounded number of stars */}
                      {Array.from({ length: Math.round(exp.rating) }).map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                      <span className="text-sm font-semibold">{exp.rating.toFixed(1)}</span>
                    </div>

                    <p className="mt-3 text-gray-700 text-sm">{exp.text}</p>
                    <p className="mt-2 text-xs text-gray-500">{new Date(exp.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer count */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          Showing {filtered.length} of {data.length} experiences
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          data-backdrop="true"
          onMouseDown={handleBackdropClick}
        >
          <div
            className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg transform transition-transform animate-scale"
            // prevent closing when clicking inside modal
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-semibold mb-2">Add Review</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mt-4">
              <input
                placeholder="Guest Name"
                value={form.guest}
                onChange={(e) => setForm({ ...form, guest: e.target.value })}
                className="w-full border p-3 rounded-lg"
              />
              <input
                placeholder="Review Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border p-3 rounded-lg"
              />
              <textarea
                placeholder="Write your review..."
                rows={4}
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className="w-full border p-3 rounded-lg"
              />
              <input
                type="number"
                min="0"
                max="5"
                step="0.5"
                placeholder="Rating (0–5)"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
                className="w-full border p-3 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addReview}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Small modal scale animation */}
      <style>{`
        .animate-scale {
          animation: scaleIn .18s ease;
        }
        @keyframes scaleIn {
          from { transform: scale(.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
