const toPairs = (value: any) => (value ? (Object as any).entries(value) : []);
export function getDescription(validator: any, self: boolean = true) {
  if (!validator) return {};

  return (Object as any)
    .entries(validator)
    .flatMap(([key, value]: any[]) => [
      [key, typeof value === "function" ? value.toString().trim() : value],
      ...(typeof value === "function"
        ? toPairs(getDescription(value, false)).map(([key2, value]: any[]) => [
            `${key}.${key2}`,
            value
          ])
        : [])
    ])
    .reduce(
      (dict: any, [k, desc]: any[]) => {
        dict[k] = desc;
        return dict;
      },
      self ? { _: validator.toString().trim() } : {}
    );
}
