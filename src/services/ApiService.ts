export default class ApiService {
  private basePath = "/data/";

  get(point: string) {
    return fetch(`${this.basePath}${point}`);
  }
}
