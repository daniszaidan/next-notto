/**
 * Common utility functions for the application
 */

// Pastel colors for checklist cards
const PASTEL_COLORS = [
  '#e2aa50',
  '#e5707e',
  '#cd5d7d',
  '#97bae7',
  '#949cdf',
  '#999b84',
  '#d8ac9c',
  '#726a95',
  '#709fb0',
  '#a0c1b8'
];

/**
 * Get a random pastel color from the predefined color palette
 * @returns A random hex color string
 */
export function getRandomPastelColor(): string {
  return PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
}

/**
 * Get a consistent color based on an ID (for deterministic coloring)
 * @param id - The ID to base the color selection on
 * @returns A hex color string based on the ID
 */
export function getPastelColorById(id: number): string {
  return PASTEL_COLORS[id % PASTEL_COLORS.length];
}

/**
 * Export the pastel colors array for direct access if needed
 */
export { PASTEL_COLORS };