interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: string;
  includesLabel?: string;
}

export default function ServiceCard({
  title,
  description,
  features,
  includesLabel = "Što uključuje",
}: ServiceCardProps) {
  return (
    <div className="card-feature-light h-full transition-transform duration-200 hover:-translate-y-1">
      <span className="pill-tag-soft mb-6">{title.split(" ")[0]}</span>
      <h3 className="mb-4 text-[26px] font-bold leading-[1.12] tracking-[-0.26px] text-[var(--ink)]">
        {title}
      </h3>
      <p className="mb-6 text-[15px] leading-[1.4] text-[var(--ink-mute)]">{description}</p>
      <div className="border-t border-[var(--hairline)] pt-6">
        <h4 className="section-eyebrow mb-4">
          {includesLabel}
        </h4>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-[15px] leading-[1.4] text-[var(--ink-secondary)]">
              <span className="mr-3 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
