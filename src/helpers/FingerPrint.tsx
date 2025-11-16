// utils/fingerprint.ts
import * as LocalAuthentication from "expo-local-authentication";

export async function isFingerprintAvailable(): Promise<boolean> {
  // Check if device has hardware
  const hasHardware = await LocalAuthentication.hasHardwareAsync();

  // Check if fingerprint is enrolled
  const supportedTypes =
    await LocalAuthentication.supportedAuthenticationTypesAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();

  // Only return true if fingerprint is supported and enrolled
  return (
    hasHardware &&
    enrolled &&
    supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
  );
}

export async function authenticateFingerprint(): Promise<boolean> {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with Fingerprint to confirm payment",
      disableDeviceFallback: true, // no PIN/passcode fallback
    });

    return result.success;
  } catch (error) {
    console.error("Fingerprint authentication error:", error);
    return false;
  }
}
