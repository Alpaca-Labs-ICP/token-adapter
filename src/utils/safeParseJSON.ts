export const safeParseJSON = (arg: Record<string, unknown>): any => {
  JSON.stringify(
    arg,
    (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
  );
};
