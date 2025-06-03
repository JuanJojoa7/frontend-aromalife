import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import React from "react";

const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function HeroSection() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center">
      <Link href={ROUTES.PERSONALIZE} className="absolute inset-0">
        <Image
          src={`${imageBaseUrl}/hero-bg.png`}
          alt="Hero Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </Link>
    </section>
  );
}
