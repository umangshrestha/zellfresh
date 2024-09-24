import React from "react";

export default function Badge({ badgeText }: { badgeText: string | null }) {
  if (!badgeText) {
    return null;
  }
  return (
    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
      {badgeText}
    </div>
  );
}
