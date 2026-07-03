import { MapPin } from "lucide-react";

export default function LocationCallout() {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-muted p-8 shadow-soft sm:p-10">
      <MapPin className="mt-1 h-6 w-6 shrink-0 text-accent" />
      <p className="text-base leading-7 text-foreground/80">
        Our first Regional Hub is located in{" "}
        <span className="font-semibold text-primary">downtown St. Louis</span>
        , serving organizations across healthcare, government,
        transportation, and corporate industries.
      </p>
    </div>
  );
}
