export type LightningVisit = { count: 0 | 1 | 2; downArmed: boolean; upArmed: boolean };
export const newLightningVisit = (): LightningVisit => ({ count: 0, downArmed: false, upArmed: false });

/** A dead band around halfway prevents small scroll reversals from retriggering. */
export function advanceLightning(visit: LightningVisit, progress: number, busy = false): LightningVisit {
  const next = { ...visit };
  if (next.count === 2) return next;
  if (next.count === 0) {
    if (progress <= 0.44) next.downArmed = true;
    if (next.downArmed && progress >= 0.5 && !busy) next.count = 1;
  }
  if (next.count === 1) {
    if (progress >= 0.56) next.upArmed = true;
    if (next.upArmed && progress <= 0.5 && !busy) next.count = 2;
  }
  return next;
}
