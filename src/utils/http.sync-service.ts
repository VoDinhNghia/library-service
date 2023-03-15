import { HttpService } from '@nestjs/axios';

export class Http {
  private http = new HttpService();

  async get(url: string, keyAccess: string) {
    try {
      const results = this.http.get(url, {
        headers: {
          'key-access-secret': keyAccess,
        },
      });
      return (await results.toPromise())?.data?.data;
    } catch {
      return null;
    }
  }
}
