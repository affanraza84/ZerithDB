// ─────────────────────────────────────────────────────────────────────────────
// Environment Utilities
// Cross-platform access to native APIs (Browser, Node, Deno)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Access to cross-platform localStorage.
 * Supports Deno's native localStorage and Browser localStorage.
 */
export function getLocalStorage(): Storage | null {
  try {
    if (typeof globalThis !== "undefined" && "localStorage" in globalThis) {
      return (globalThis as any).localStorage as Storage;
    }
    if (typeof window !== "undefined" && "localStorage" in window) {
      return window.localStorage;
    }
  } catch {
    // Ignore environments where localStorage exists but is inaccessible (e.g. security constraints)
  }
  return null;
}

export interface WebRTCContext {
  RTCPeerConnection: typeof RTCPeerConnection;
  RTCSessionDescription: typeof RTCSessionDescription;
  RTCIceCandidate: typeof RTCIceCandidate;
}

/**
 * Access to cross-platform WebRTC implementations.
 * Supports Deno's native WebRTC and Browser WebRTC.
 */
export function getWebRTC(): WebRTCContext | null {
  try {
    if (
      typeof globalThis !== "undefined" &&
      "RTCPeerConnection" in globalThis &&
      "RTCSessionDescription" in globalThis &&
      "RTCIceCandidate" in globalThis
    ) {
      return {
        RTCPeerConnection: (globalThis as any).RTCPeerConnection,
        RTCSessionDescription: (globalThis as any).RTCSessionDescription,
        RTCIceCandidate: (globalThis as any).RTCIceCandidate,
      };
    }
    if (
      typeof window !== "undefined" &&
      "RTCPeerConnection" in window &&
      "RTCSessionDescription" in window &&
      "RTCIceCandidate" in window
    ) {
      return {
        RTCPeerConnection: (window as any).RTCPeerConnection,
        RTCSessionDescription: (window as any).RTCSessionDescription,
        RTCIceCandidate: (window as any).RTCIceCandidate,
      };
    }
  } catch {
    // Ignore errors when accessing WebRTC
  }
  return null;
}

/**
 * Helper to check if the current environment is Deno.
 */
export const isDeno =
  typeof globalThis !== "undefined" &&
  "Deno" in globalThis &&
  typeof (globalThis as any).Deno === "object";
