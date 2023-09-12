import { DataRowProps } from "../components/DataRow/DataRow";

function deepEqual(objA: any, objB: any): boolean {
  if (typeof objA !== typeof objB) {
    return false;
  }

  if (typeof objA !== "object" || objA === null) {
    return objA === objB;
  }

  if (Array.isArray(objA)) {
    if (!Array.isArray(objB) || objA.length !== objB.length) {
      return false;
    }

    for (let i = 0; i < objA.length; i++) {
      if (!deepEqual(objA[i], objB[i])) {
        return false;
      }
    }

    return true;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}

export function areEqual(prevProps: DataRowProps, nextProps: DataRowProps) {
  const isDataEqual = deepEqual(prevProps.data, nextProps.data);

  const isStyleEqual = deepEqual(prevProps.style, nextProps.style);

  return isDataEqual && isStyleEqual;
}
