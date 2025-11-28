export default function Notification({ type = "success", text }) {
  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-md z-50 ${type === "error" ? "bg-red-600" : "bg-emerald-500"}`}>
      <span className="font-semibold text-white">{text}</span>
    </div>
  );
}