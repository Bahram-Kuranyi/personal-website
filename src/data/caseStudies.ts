import type { Locale } from "@/lib/site";
import type { CaseStudySection, projects } from "./projects";

type CaseStudies = Record<Locale, Record<(typeof projects)[number]["slug"], readonly CaseStudySection[]>>;

/** Portfolio details are observable in this repository; archive copy uses existing experience data. */
export const caseStudies: CaseStudies = {
  en: {
    "personal-website": [
      { id: "overview", body: "A personal portfolio built as a small, coherent product: project stories, professional experience and a visual identity that carries across pages and languages." },
      { id: "role", body: "Design and software engineering — from the page compositions and reusable UI to routing, localization and the custom visual system." },
      { id: "challenge", body: "Give the portfolio a distinctive identity while keeping the content readable, navigation predictable and motion considerate of different devices and accessibility preferences." },
      { id: "approach", body: "Separate content, page structure and decorative scenes. Shared components present the projects; typed dictionaries supply English and German copy; lightweight SVG layers add depth without taking over the interface." },
      { id: "decisions", items: [
        "Next.js App Router and Server Components keep the content statically rendered, with small client boundaries for interaction.",
        "TypeScript project data drives detail routes, language variants and metadata without duplicated page templates.",
        "SVG and transform-based scroll updates use requestAnimationFrame, cached geometry and reduced-motion support instead of an animation library.",
        "Canonical URLs, language alternates, sitemap and robots configuration prepare both languages for deployment.",
      ] },
      { id: "features", items: ["English/German routes with page-preserving language switching.", "A hand-to-system homepage morph, Work constellation and warm project-specific scenes.", "Responsive layouts, keyboard navigation and downloadable CV."] },
      { id: "outcome", body: "The implementation brings content, routing and visual behavior into one reusable system. New projects can be added through typed data while keeping a shared page structure. This case study describes the implementation, not measured production results." },
    ],
    "freelance-web-archive": [
      { id: "overview", body: "A collection of earlier freelance website and interface work. The focus is on turning client needs into usable web experiences." },
      { id: "role", body: "Web design and development, covering the path from initial concept through implementation." },
      { id: "approach", body: "The existing experience record covers website delivery, frontend interfaces and WordPress work. This archive brings that work into the same portfolio structure as newer engineering projects." },
    ],
  },
  de: {
    "personal-website": [
      { id: "overview", body: "Ein persönliches Portfolio als zusammenhängendes digitales Produkt: Projekte, berufliche Erfahrung und eine visuelle Identität, die über Seiten und Sprachen hinweg funktioniert." },
      { id: "role", body: "Design und Softwareentwicklung — vom Seitenaufbau und wiederverwendbaren UI bis zu Routing, Lokalisierung und dem individuellen visuellen System." },
      { id: "challenge", body: "Dem Portfolio einen eigenen Charakter geben und dabei Inhalte gut lesbar, die Navigation nachvollziehbar und Bewegungen für verschiedene Geräte und Barrierefreiheitseinstellungen geeignet halten." },
      { id: "approach", body: "Inhalte, Seitenstruktur und dekorative Szenen sind getrennt. Gemeinsame Komponenten präsentieren die Projekte, typisierte Wörterbücher liefern deutsche und englische Texte. Leichte SVG-Ebenen erzeugen Tiefe, ohne die Inhalte zu überlagern." },
      { id: "decisions", items: [
        "Next.js App Router und Server Components ermöglichen statisch gerenderte Inhalte. Nur die interaktiven Teile benötigen Client Components.",
        "Typisierte Projektdaten steuern Detailseiten, Sprachvarianten und Metadaten ohne doppelte Seitenvorlagen.",
        "SVG und scrollabhängige Transformationen nutzen requestAnimationFrame, zwischengespeicherte Geometrie und reduzierte Bewegung statt einer Animationsbibliothek.",
        "Kanonische URLs, Sprachverweise, Sitemap und Robots-Konfiguration bereiten beide Sprachen auf die Veröffentlichung vor.",
      ] },
      { id: "features", items: ["Deutsche und englische Routen mit Sprachwechsel auf derselben Seite.", "Ein Übergang von Händen zu einem Softwaresystem auf der Startseite, eine Work-Konstellation und warme Projektszenen.", "Responsive Layouts, Tastaturnavigation und ein herunterladbarer Lebenslauf."] },
      { id: "outcome", body: "Inhalte, Routing und visuelles Verhalten bilden ein wiederverwendbares System. Neue Projekte lassen sich über typisierte Daten ergänzen, während die Seitenstruktur gleich bleibt. Diese Fallstudie beschreibt die Umsetzung, keine gemessenen Ergebnisse im Produktivbetrieb." },
    ],
    "freelance-web-archive": [
      { id: "overview", body: "Eine Sammlung früherer freiberuflicher Website- und Oberflächenprojekte. Im Mittelpunkt steht die Umsetzung von Kundenanforderungen in nutzbare Webangebote." },
      { id: "role", body: "Webdesign und Entwicklung — vom ersten Konzept bis zur Umsetzung." },
      { id: "approach", body: "Die vorhandene Berufserfahrung umfasst Websites, Frontend-Oberflächen und WordPress-Projekte. Das Archiv präsentiert diese Arbeit in derselben Portfoliostruktur wie die neueren Entwicklungsprojekte." },
    ],
  },
};
