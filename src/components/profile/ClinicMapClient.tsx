"use client";

import dynamic from "next/dynamic";

interface ClinicMapProps {
  lat: number | null;
  lng: number | null;
  address: string | null;
}

const MapView = dynamic(() => import("@/components/profile/ClinicMap"), {
  ssr: false,
  loading: () => (
    <section className="mb-10 px-2">
      <h2 className="text-base font-semibold mb-3 text-center text-foreground/80">الموقع على الخريطة</h2>
      <div className="w-full h-[250px] sm:h-[300px] rounded-3xl overflow-hidden border border-border bg-muted animate-pulse" />
    </section>
  ),
});

export default function ClinicMapClient(props: ClinicMapProps) {
  if (props.lat == null || props.lng == null) return null;
  return <MapView {...props} />;
}