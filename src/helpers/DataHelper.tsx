export const sanitizeCashInput = (text: string): string => {
  // Remove all non-numeric and non-dot characters
  let sanitizedText = text.replace(/[^0-9.]/g, "");

  // Prevent more than one decimal point
  const parts = sanitizedText.split(".");
  if (parts.length > 2) {
    sanitizedText = parts[0] + "." + parts[1];
  }

  // Limit to 2 decimal places
  if (parts[1]?.length > 2) {
    sanitizedText = parts[0] + "." + parts[1].slice(0, 2);
  }

  return sanitizedText;
};

export function formatCurrency(amount: number | undefined | null): string {
  if (amount === undefined || amount === null) return "0.00";
  return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
