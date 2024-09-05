export const safeParseJSON = (arg: Record<string, unknown>): any => {
  return JSON.stringify(
    arg,
    (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
  );
};
