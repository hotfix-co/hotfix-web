interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export default function ServiceCard({
  title,
  description,
  features,
  icon,
}: ServiceCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
      <div className="text-5xl mb-6">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 text-lg">{description}</p>
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
          Key Features
        </h4>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-gray-600">
              <span className="text-[var(--primary-red)] mr-3 mt-1">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

