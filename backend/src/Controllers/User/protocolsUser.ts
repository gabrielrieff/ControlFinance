import { HttpRequest, HttpResponse } from "../commonProtocols";

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
