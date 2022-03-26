export default interface DataResponse {
  Error: string;
  Id: null;
  Success: boolean;
  Value: {
    Goods: {
      T: number;
      G: number;
      C: number;
      P: number;
    }[];
  };
}
