"use client"

import { useRef, useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { Trophy, GraduationCap, MapPin, Award, Star, ChevronLeft, ChevronRight, Calendar } from "lucide-react"

// ---- Data (unchanged content from the original) ----

const currentAssociations = [
  {
    name: "Karnataka State Cricket Association",
    shortName: "KSCA",
    description:
      "Official state cricket governing body. Training under elite coaching programs and competing in state-level tournaments.",
    type: "current",
    year: "Present",
    achievements: ["State Level Tournaments", "Elite Coaching", "Professional Training"],
  },
  {
    name: "KIOC Cricket Academy",
    shortName: "KIOC",
    description:
      "Premier cricket academy known for producing quality cricketers with world-class facilities and coaching.",
    type: "current",
    year: "Present",
    achievements: ["World-Class Facilities", "Technical Excellence", "Match Exposure"],
  },
  {
    name: "MBCA",
    shortName: "MBCA",
    description:
      "Dedicated cricket association focusing on nurturing talent and providing competitive match exposure.",
    type: "current",
    year: "Present",
    achievements: ["Talent Development", "Competition Focus", "Team Building"],
  },
]

const previousAssociations = [
  {
    name: "Neon Cricket Academy",
    shortName: "NCA",
    description: "Foundation years of professional training. Building technical skills and match temperament.",
    type: "previous",
    year: "2019-2021",
    achievements: ["Skill Foundation", "Basic Techniques", "Cricket Fundamentals"],
  },
  {
    name: "Vision Cricket Academy",
    shortName: "VCA",
    description: "Enhanced training programs focusing on advanced techniques and competitive mindset.",
    type: "previous",
    year: "2021-2022",
    achievements: ["Advanced Training", "Mental Conditioning", "Competition Prep"],
  },
  {
    name: "Jharkhand State Cricket Association",
    shortName: "JSCA",
    description: "Exposure to different playing conditions and competitive cricket circuits across India.",
    type: "previous",
    year: "2022",
    achievements: ["Multi-State Exposure", "Adaptability", "Match Experience"],
  },
]

// Cities — coordinates on a 500x550 India viewBox (x = (lon-68)/29*500, y = (37-lat)/29*550)
const cities = [
  { name: "Chennai", state: "Tamil Nadu", x: 211, y: 454 },
  { name: "Coimbatore", state: "Tamil Nadu", x: 154, y: 493 },
  { name: "Jharkhand", state: "Ranchi", x: 298, y: 260 },
  { name: "Visakhapatnam", state: "Andhra Pradesh", x: 264, y: 366 },
]

const experienceTimeline = [
  { year: "2005", event: "Born in Vellore", type: "birth", description: "The journey begins in Tamil Nadu" },
  { year: "2008", event: "Moved to Bengaluru", type: "milestone", description: "New chapter in Karnataka" },
  { year: "2015", event: "First Cricket Bat", type: "milestone", description: "The dream takes shape" },
  { year: "2017", event: "School Cricket Selection", type: "milestone", description: "Selected for school team in 6th standard" },
  { year: "2018", event: "First Century", type: "achievement", description: "Scored first 100 runs in school match" },
  { year: "2019", event: "Neon Cricket Academy", type: "academy", description: "Professional training begins" },
  { year: "2020", event: "Inter-School Champion", type: "tournament", description: "Won inter-school tournament" },
  { year: "2020", event: "District Selection", type: "milestone", description: "Selected for district trials" },
  { year: "2021", event: "Vision Cricket Academy", type: "academy", description: "Advanced training phase" },
  { year: "2021", event: "All-Rounder Award", type: "achievement", description: "Best all-rounder in academy" },
  { year: "2022", event: "Jharkhand Circuit", type: "exposure", description: "Multi-state tournament exposure" },
  { year: "2022", event: "200+ Match Wickets", type: "achievement", description: "Career wicket milestone" },
  { year: "2023", event: "KSCA Registration", type: "milestone", description: "Official state cricket body member" },
  { year: "2023", event: "State Camp Selection", type: "milestone", description: "Selected for state cricket camp" },
  { year: "2024", event: "KIOC & MBCA Active", type: "current", description: "Training with premier academies" },
  { year: "2024", event: "500+ Career Runs", type: "achievement", description: "Batting milestone achieved" },
]

const typeIcon: Record<string, ReactNode> = {
  birth: <Star className="w-5 h-5" />,
  milestone: <Calendar className="w-5 h-5" />,
  achievement: <Trophy className="w-5 h-5" />,
  academy: <GraduationCap className="w-5 h-5" />,
  tournament: <Award className="w-5 h-5" />,
  exposure: <MapPin className="w-5 h-5" />,
  current: <Star className="w-5 h-5" />,
}

// ---- Academy Evolution (subtle hover only) ----

function AcademyCard({ a }: { a: (typeof currentAssociations)[number] }) {
  const isCurrent = a.type === "current"
  return (
    <div
      className={`group relative h-full rounded-2xl border bg-card/60 backdrop-blur-sm p-6 transition-colors duration-200 hover:border-primary/60 ${
        isCurrent ? "border-primary/30" : "border-border"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold ${
            isCurrent ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
          }`}
        >
          {a.shortName}
        </div>
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{a.year}</span>
      </div>
      <h4 className="text-lg font-bold text-foreground mb-2">{a.name}</h4>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{a.description}</p>
      <ul className="space-y-1">
        {a.achievements.map((x) => (
          <li key={x} className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary" />
            {x}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ---- Static India Map ----

// Simplified India outline (viewBox 0 0 500 550). Hand-traced from real boundary coords.
const INDIA_OUTLINE_PATH =
  "M103 0 L138 14 L172 38 L207 57 L241 95 L276 133 L310 152 L345 171 L379 190 L414 171 L448 162 L483 152 L500 171 L483 200 L466 228 L448 257 L431 285 L414 266 L397 276 L379 285 L362 295 L345 295 L328 304 L328 333 L310 352 L293 371 L276 390 L259 419 L241 447 L224 476 L207 504 L190 532 L172 550 L155 522 L138 493 L121 465 L121 436 L121 408 L103 380 L103 352 L86 323 L86 295 L69 266 L52 247 L35 247 L17 257 L0 247 L17 219 L35 200 L52 181 L69 162 L86 133 L103 105 L103 76 L86 57 L86 38 L103 19 L103 0 Z"

function StaticIndiaMap() {
  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-2xl border border-border bg-background p-4 sm:p-6">
      <svg
        viewBox="0 0 500 600"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Map of India with tournament cities"
      >
        <path
          d={INDIA_OUTLINE_PATH}
          fill="none"
          stroke="#22c55e"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {cities.map((c) => (
          <g key={c.name}>
            <circle cx={c.x} cy={c.y} r={6} fill="#22c55e" />
            <circle cx={c.x} cy={c.y} r={3} fill="#0a0a0a" />
            <text
              x={c.x + 12}
              y={c.y + 5}
              fontSize={16}
              fontWeight={600}
              className="fill-foreground"
              style={{ paintOrder: "stroke", stroke: "rgba(0,0,0,0.7)", strokeWidth: 3 }}
            >
              {c.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ---- Horizontal sliding timeline ----

function HorizontalTimeline() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-card]")
    const step = (card?.offsetWidth || 320) + 16
    el.scrollBy({ left: dir * step, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">Cricket Journey Timeline</h3>
          <p className="text-sm text-muted-foreground mt-1">Slide through the milestones</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Scroll timeline left"
            onClick={() => scrollBy(-1)}
            className="w-10 h-10 rounded-full border border-border bg-card/60 hover:bg-primary/10 hover:border-primary/60 transition flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Scroll timeline right"
            onClick={() => scrollBy(1)}
            className="w-10 h-10 rounded-full border border-border bg-card/60 hover:bg-primary/10 hover:border-primary/60 transition flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 scroll-smooth"
        style={{ scrollbarWidth: "thin" }}
        onScroll={(e) => {
          const el = e.currentTarget
          const card = el.querySelector<HTMLElement>("[data-card]")
          const step = (card?.offsetWidth || 320) + 16
          setActive(Math.round(el.scrollLeft / step))
        }}
      >
        {experienceTimeline.map((item, i) => (
          <div
            key={`${item.year}-${item.event}`}
            data-card
            className="snap-start shrink-0 w-[280px] md:w-[320px] rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 hover:border-primary/60 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                {typeIcon[item.type] ?? <Calendar className="w-4 h-4" />}
                {item.type}
              </span>
              <span className="text-sm font-bold text-foreground">{item.year}</span>
            </div>
            <h4 className="text-lg font-bold text-foreground mb-2">{item.event}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-2">
        {experienceTimeline.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-primary" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// ---- Main section ----

export default function CricketJourneySection() {
  return (
    <section id="journey" className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 space-y-24">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Cricket Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
            From Vellore to{" "}
            <span className="text-primary" style={{ textShadow: "0 0 30px rgba(34,197,94,0.3)" }}>
              the Field
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Academies, tournaments, and milestones shaping the player.
          </p>
        </motion.div>

        {/* Academy Evolution */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Academy Evolution</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Premier institutions that shaped technique, temperament, and growth.
          </p>

          <div className="mb-10">
            <h4 className="text-sm uppercase tracking-widest text-primary mb-4">Current Associations</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {currentAssociations.map((a) => (
                <AcademyCard key={a.name} a={a} />
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Previous Journey</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {previousAssociations.map((a) => (
                <AcademyCard key={a.name} a={a} />
              ))}
            </div>
          </div>
        </div>

        {/* Static India Map */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Tournament Cities</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Cricket has taken the journey across multiple Indian states.
          </p>
          <StaticIndiaMap />
        </div>

        {/* Horizontal timeline */}
        <HorizontalTimeline />
      </div>
    </section>
  )
}
