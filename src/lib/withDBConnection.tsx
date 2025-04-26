import dbConnect from './mongodb';

export function withDbConnect(handler: (request: Request) => Promise<Response>) {
  return async function (request: Request) {
    await dbConnect(); // always connect first
    return handler(request); // then run the actual logic
  };
}