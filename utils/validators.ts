function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

/**
 * Checks existence of @propKey on an object and retypes the @obj
 */
export function hasOwnProperty<Y extends PropertyKey>(
  obj: unknown,
  propKey: Y
): obj is Record<Y, unknown> {
  return isObject(obj) && propKey in obj;
}

export function hasOwnProperties<Y extends PropertyKey>(
  obj: unknown,
  propKeys: Y[]
): obj is Record<Y, unknown> {
  return isObject(obj) && propKeys.every((propKey) => propKey in obj);
}

export function isNonEmptyArray(obj: unknown): obj is unknown[] {
  return Array.isArray(obj) && obj.length > 0;
}

export function isEmptyArray(obj: unknown): obj is unknown[] {
  return Array.isArray(obj) && obj.length === 0;
}

export function isEnumKey<T extends Record<string | number | symbol, string>>(
  enumType: T,
  val: string
): boolean {
  return Object.keys(enumType).includes(val);
}
