export interface BadgeProps {
  badgeText: string | null;
}

export default function Badge({ badgeText }: BadgeProps) {
  if (!badgeText) {
    return null;
  }
  return (
    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
      {badgeText}
    </div>
  );
}
