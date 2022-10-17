export class HashMap {
  hashMap: Record<string | number, unknown>;
  length: number;

  constructor() {
    this.hashMap = {};
    this.length = 0;
  }

  hashString(str: string | number): number {
    let outputHash = 0;
    const string = String(str);
    for (let i = 0; i < string.length; i++) {
      const charCode = string.charCodeAt(i);
      outputHash += charCode;
    }
    return outputHash;
  }

  set(key: string | number, val: unknown) {
    let hashIndex = this.hashString(key);
    if (!this.hashMap[hashIndex]) {
      this.hashMap[hashIndex] = [];
      this.length++;
    }
    //@ts-ignore
    this.hashMap[hashIndex][key] = val;
  }

  get(key: string | number) {
    const hashIndex = this.hashString(key);
    //@ts-ignore
    if (
      this.hashMap.hasOwnProperty(hashIndex) ||
      //@ts-ignore
      this.hashMap[hashIndex].hashOwnProperty(key)
    ) {
      //@ts-ignore
      return this.hashMap[hashIndex][key];
    } else {
      return null;
    }
  }
}
