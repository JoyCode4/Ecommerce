import dbConnect from './mongodb';

export function withDbConnect(handler: any) {
  return async function (...args:any[]) {
    await dbConnect(); // always connect first
    return handler(...args); // then run the actual logic
  };
}