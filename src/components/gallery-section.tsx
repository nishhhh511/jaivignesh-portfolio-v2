"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  { src: "/gallery/g952.png", alt: "At the stadium in Bengaluru jersey" },
  { src: "/gallery/g885.png", alt: "At Karnataka Institute of Cricket" },
  { src: "/gallery/g923.png", alt: "Net session — helmet portrait" },
  { src: "/gallery/g990.png", alt: "Cover drive on match day" },
  { src: "/gallery/g960.png", alt: "Full kit on the practice ground" },
  { src: "/gallery/g936.png", alt: "Batting stance in the nets" },
  { src: "/gallery/g977.png", alt: "Lofted shot during match" },
  { src: "/gallery/g943.png", alt: "Karnataka jersey at the stadium" },
  { src: "/gallery/g968.png", alt: "Front-foot defence" },
  { src: "/gallery/g1002.png", alt: "Night practice session" },
]

export function GallerySection() {
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % images.length))
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length))
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Gallery
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
            Moments On{" "}
            <span className="text-primary" style={{ textShadow: "0 0 30px rgba(34,197,94,0.3)" }}>
              The Field
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            A look at the journey through training, matches, and milestones.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {images.map((img, i) => (
            <button
              type="button"
              key={img.src}
              onClick={() => setOpen(i)}
              className="group mb-4 block w-full overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-sm break-inside-avoid focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`Open image: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90"
              />
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setOpen(null) }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full border border-border bg-card/60 hover:bg-primary/10 hover:border-primary/60 transition flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + images.length) % images.length) }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border bg-card/60 hover:bg-primary/10 hover:border-primary/60 transition flex items-center justify-center"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % images.length) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border bg-card/60 hover:bg-primary/10 hover:border-primary/60 transition flex items-center justify-center"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <img
            src={images[open].src}
            alt={images[open].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[92vw] max-h-[88vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </section>
  )
}
