import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  description?: string;
};

/**
 * Deliberately has no eyebrow / index prop. Numbered micro-labels above every
 * headline are a templated tell, and the section's position already
 * categorises it.
 */
export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-balance text-3xl font-bold tracking-[-0.025em] text-fg sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg max-w-2xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 border-t border-line py-16 sm:py-20 lg:py-24 ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
