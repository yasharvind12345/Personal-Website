/**
 * Images for the work reel and the in-page case studies.
 * Each project gets one cover (16:10) plus a few gallery shots that don't repeat it.
 *
 * Sources:
 * - tam/*: frames from /videos/tam-demo.mp4 and diagrams from the TAM repo.
 * - flux/*: iPhone screenshots from Flux's App Store listing.
 * - ghostkeys/*: the Ghostkeys repo (docs/readme) and the Build Fest demo video thumbnail.
 * - plates/*.svg: drawn plates for work with no shareable screenshots (illustrative data).
 */

export interface WorkImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** What the image is. Phone screenshots are tall; plates are drawn on paper. */
  kind?: 'screenshot' | 'phone' | 'plate' | 'diagram';
  caption?: string;
}

const img = {
  dibPlate: {
    src: '/images/plates/zendesk-dib.svg',
    alt: 'Diagram of Data Integrity Bot: Salesforce CPQ contract lines matched against Zuora billing lines, with mismatches classified as pricing, proration, discount, and contract math',
    width: 1600,
    height: 1000,
    kind: 'plate',
  },
  tamCover: {
    src: '/images/tam/cover.jpg',
    alt: 'TAM analyst workspace showing an executive overview: LTM revenue, reported and adjusted EBITDA, deal-risk score, and an EBITDA bridge chart',
    width: 1600,
    height: 1000,
    kind: 'screenshot',
  },
  tamIntake: {
    src: '/images/tam/intake.jpg',
    alt: 'TAM intake workspace: company details form, deal documents uploading, and a walkthrough of document intelligence and the financial build engine',
    width: 1920,
    height: 1030,
    kind: 'screenshot',
    caption: 'Deal intake: upload the data room, TAM parses and maps it.',
  },
  ghostkeysCover: {
    src: '/images/ghostkeys/cover.jpg',
    alt: 'Ghostkeys film still: a translucent hand hovering above a MacBook keyboard while sonar ripples trace its movement',
    width: 1152,
    height: 720,
    kind: 'screenshot',
  },
  ghostkeysLive: {
    src: '/images/ghostkeys/live.jpg',
    alt: 'Ghostkeys Live screen: a map of the MacBook with numbered tap zones, one lit in orange, beside a feed of recent gestures and the actions they ran',
    width: 1600,
    height: 1032,
    kind: 'screenshot',
    caption: 'Live view: zones on the case, and every gesture as it lands.',
  },
  ghostkeysBindings: {
    src: '/images/ghostkeys/bindings-editor.jpg',
    alt: 'Ghostkeys binding editor: a double tap on the left palm rest bound to AutoSum in Excel',
    width: 1600,
    height: 1032,
    kind: 'screenshot',
    caption: 'Per-app bindings: the same double tap is AutoSum in Excel, play/pause everywhere else.',
  },
  ghostkeysCalibration: {
    src: '/images/ghostkeys/calibration-4-results.jpg',
    alt: 'Ghostkeys calibration results: per-zone accuracy, a confusion table, and recommendations for which zones to keep or merge',
    width: 1600,
    height: 1032,
    kind: 'screenshot',
    caption: 'Calibration: per-zone accuracy and which zones get confused.',
  },
  fluxCover: {
    src: '/images/flux/cover.jpg',
    alt: 'Three Flux iOS screens side by side: a co-founder profile card on Discover, a chat between matched students, and a profile generated from an uploaded résumé',
    width: 1600,
    height: 1000,
    kind: 'screenshot',
  },
  auraPlate: {
    src: '/images/plates/aurahealth.svg',
    alt: 'Diagram of an AuraHealth follow-up call: transcript lines from the AI agent and patient, with the call triaged as high urgency and an SMS alert sent to the doctor',
    width: 1600,
    height: 1000,
    kind: 'plate',
  },
} satisfies Record<string, WorkImage>;

export const images = img;

/** Cover per project slug (16:10). Used by the work reel and as the case-study hero. */
export const workMedia: Record<string, WorkImage> = {
  'zendesk-dib': img.dibPlate,
  tam: img.tamCover,
  ghostkeys: img.ghostkeysCover,
  flux: img.fluxCover,
  aurahealth: img.auraPlate,
};

/** Extra images shown inside a case study. Never repeats the cover. */
export const gallery: Record<string, WorkImage[]> = {
  tam: [img.tamIntake],
  ghostkeys: [img.ghostkeysLive, img.ghostkeysBindings, img.ghostkeysCalibration],
};
