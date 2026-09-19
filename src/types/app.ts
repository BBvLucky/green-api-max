export interface AuthCredentials {
  idInstance: string;
  apiTokenInstance: string;
}

export type Page = 'login' | 'create-chat' | 'chat';

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
}
