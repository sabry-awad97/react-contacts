export interface Contact {
  id: string;
  name: string;
  handle: string;
  avatarURL: string;
}

declare global {
  namespace Express {
    export interface Request {
      token: string;
    }
  }
}
