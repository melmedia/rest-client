declare module 'object-to-map' {

  interface ObjectToMap {
    (input: object): Map<string, any>;
  }

  const objectToMap: ObjectToMap;
  export = objectToMap;

}
