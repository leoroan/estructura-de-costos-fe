export default function SectionCard({ title, description, accent = "indigo" }) {
  const accentClass = {
    indigo: "border-indigo-500 bg-indigo-50 text-indigo-700",
    emerald: "border-emerald-500 bg-emerald-50 text-emerald-700",
    amber: "border-amber-500 bg-amber-50 text-amber-700",
  }[accent] || "border-slate-300 bg-slate-50 text-slate-700";

  return (
    <div className={`rounded-2xl border p-4 ${accentClass}`}>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 opacity-90">{description}</p>
    </div>
  );
}
