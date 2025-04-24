export const isSlotExpired = (placedAt) => {
    if (!placedAt) return false;
    const now = new Date();
    const placedDate = new Date(placedAt);
    const diffInDays = (now - placedDate) / (1000 * 60 * 60 * 24);
    return diffInDays > 2;
  };
  
  export const hasExpiredSlot = (input) => {
    if (!input) return false;
  
    // Pokud input obsahuje `slots`, je to automat
    if ("slots" in input) {
      return input.slots.some((slot) => isSlotExpired(slot.placedAt));
    }
  
    // Pokud input obsahuje `automaty`, je to město
    if ("automaty" in input) {
      return input.automaty.some((automat) =>
        automat.slots.some((slot) => isSlotExpired(slot.placedAt))
      );
    }
  
    return false;
  };