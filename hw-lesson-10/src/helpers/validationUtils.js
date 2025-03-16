export const isDuplicateDriver = (drivers, driver) => {
  return drivers.some(
    d => d.licenseNumber === driver.licenseNumber && d.id !== driver.id
  );
};

export const isDuplicateBus = (buses, bus) => {
  return buses.some(
    b => b.licensePlate === bus.licensePlate && b.id !== bus.id
  );
};

export const isDuplicateAssignment = (assignments, assignment) => {
  return assignments.some(
    a => a.driverId === assignment.driverId && a.busId === assignment.busId && a.id !== assignment.id
  );
};
