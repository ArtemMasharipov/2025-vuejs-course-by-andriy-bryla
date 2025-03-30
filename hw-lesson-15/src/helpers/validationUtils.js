export const isDuplicateDriver = (drivers, driver) => {
  if (!driver.licenseNumber) return false;
  
  return drivers.some(
    d => d.licenseNumber === driver.licenseNumber && d.id !== driver.id
  );
};

export const isDuplicateBus = (buses, bus) => {
  if (!bus.licensePlate) return false;
  
  return buses.some(
    b => b.licensePlate === bus.licensePlate && b.id !== bus.id
  );
};

export const isDuplicateAssignment = (assignments, assignment) => {
  if (!assignment.driverId || !assignment.busId) return false;
  
  return assignments.some(
    a => a.driverId === assignment.driverId && a.busId === assignment.busId && a.id !== assignment.id
  );
};
