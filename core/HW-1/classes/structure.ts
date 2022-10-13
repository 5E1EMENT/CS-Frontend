export class Structure {
  /**
   * Structure
   */
  values: Record<string, unknown> = {};

  constructor(keys: Array<string>) {
    this.setkeys(keys);
  }
  /**
   * Create a keys in our values structure
   * @param keys array of keys from constructor
   */
  setkeys(keys: Array<string>): void {
    keys.forEach((key) => {
      this.values[key] = '';
    });
  }
  /**
   * Set a key value pair in our values structure
   * @param key key
   * @param value data
   */
  set(key: string, value: unknown): void {
    this.values[key] = value;
  }
  /**
   *
   * @param key
   * @returns value from values structure
   */
  get(key: string): unknown {
    return this.values[key];
  }
}
