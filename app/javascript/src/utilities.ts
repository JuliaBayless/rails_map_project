export const parseDistanceToDecimal = (distanceStr: string): number => {
    const numericPart = parseFloat(distanceStr.replace(/[^\d.-]/g, ''));
    if (distanceStr.includes("mi")) {
      return numericPart * 1.60934; 
    }
    return numericPart;
  };