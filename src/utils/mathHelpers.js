// Tonearm angle constants
export const TONEARM_REST_ANGLE = -30;  // Resting position (outside record)
export const TONEARM_START_ANGLE = 0;    // Start of song (outer edge)
export const TONEARM_END_ANGLE = 25;     // End of song (inner edge)

// Play zone threshold - angle at which playback starts
export const PLAY_THRESHOLD_ANGLE = -5;

/**
 * Convert tonearm angle to audio time
 * @param {number} angle - Tonearm angle in degrees
 * @param {number} duration - Total audio duration in seconds
 * @returns {number} - Time in seconds
 */
export function angleToTime(angle, duration) {
  if (duration <= 0) return 0;

  // Clamp angle to valid range
  const clampedAngle = Math.max(TONEARM_START_ANGLE, Math.min(angle, TONEARM_END_ANGLE));

  // Map angle range (0 to 25) to time range (0 to duration)
  const progress = (clampedAngle - TONEARM_START_ANGLE) / (TONEARM_END_ANGLE - TONEARM_START_ANGLE);

  return progress * duration;
}

/**
 * Convert audio time to tonearm angle
 * @param {number} time - Current time in seconds
 * @param {number} duration - Total audio duration in seconds
 * @returns {number} - Angle in degrees
 */
export function timeToAngle(time, duration) {
  if (duration <= 0) return TONEARM_REST_ANGLE;

  // Calculate progress (0 to 1)
  const progress = Math.max(0, Math.min(time / duration, 1));

  // Map progress to angle range
  return TONEARM_START_ANGLE + progress * (TONEARM_END_ANGLE - TONEARM_START_ANGLE);
}

/**
 * Check if angle is in the play zone (over the record)
 * @param {number} angle - Tonearm angle in degrees
 * @returns {boolean}
 */
export function isInPlayZone(angle) {
  return angle >= PLAY_THRESHOLD_ANGLE;
}

/**
 * Calculate angle from mouse position relative to pivot point
 * @param {number} mouseX - Mouse X coordinate
 * @param {number} mouseY - Mouse Y coordinate
 * @param {number} pivotX - Pivot point X coordinate
 * @param {number} pivotY - Pivot point Y coordinate
 * @returns {number} - Angle in degrees
 */
export function calculateAngleFromMouse(mouseX, mouseY, pivotX, pivotY) {
  const deltaX = mouseX - pivotX;
  const deltaY = mouseY - pivotY;

  // Calculate angle in radians, then convert to degrees
  let angle = Math.atan2(deltaX, -deltaY) * (180 / Math.PI);

  // Clamp to valid range
  return Math.max(TONEARM_REST_ANGLE, Math.min(angle, TONEARM_END_ANGLE));
}

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}
