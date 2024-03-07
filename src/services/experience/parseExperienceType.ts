export const parseExperienceType = (type: string[]): number => {
  let experienceTypeId: number;
  if (type.length === 2) experienceTypeId = 3;
  else if (type[0] === "Profesional") experienceTypeId = 2;
  else experienceTypeId = 1;

  return experienceTypeId;
};
