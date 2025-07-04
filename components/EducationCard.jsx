import { FaUniversity } from "react-icons/fa";

export default function EducationCard({
  logo = <FaUniversity className="text-primary text-4xl" />, // Accepts a React node
  years = "2021–2024",
  title = "BCA (Bachelor in Computer Application)",
  institution = "Indira Gandhi National Open University",
  location = "India",
  major = "Computer Application",
  duration = "3 Years (2021–2024)",
  credential = null,
}) {
  return (
    <div className="bg-zinc-900/80 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl flex flex-col items-center justify-center aspect-square w-full max-w-sm ml-0 p-8">
      {/* Logo or Icon */}
      <div className="flex flex-col items-center mb-4">
        <div className="bg-white/10 rounded-full p-4 mb-2">
          {logo}
        </div>
        <span className="text-xs bg-primary text-white px-3 py-1 rounded-full font-semibold tracking-wider mt-2">
          {years}
        </span>
      </div>
      {/* Details */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <div className="text-primary font-semibold text-base">
          {institution}
        </div>
        {location && <div className="text-gray-400 text-sm">{location}</div>}
        {major && (
          <div className="text-gray-400 text-sm mt-2">
            <span className="font-semibold">Major:</span> {major}
          </div>
        )}
        {duration && (
          <div className="text-gray-400 text-sm">
            <span className="font-semibold">Duration:</span> {duration}
          </div>
        )}
        {credential && (
          <div className="text-gray-400 text-xs mt-2 whitespace-pre-line">{credential}</div>
        )}
      </div>
    </div>
  );
} 