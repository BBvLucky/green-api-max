export interface SendMessageRequest {
  chatId: string;
  message: string;
  typingTime?: number;
  quotedMessageId?: string;
}

export interface SendMessageResponse {
  idMessage: string;
}

export interface CheckAccountRequest {
  phoneNumber: number;
  force?: boolean;
}

export interface CheckAccountResponse {
  exist: boolean;
  chatId: string;
}

export interface SetSettingsRequest {
  webhookUrl?: string;
  webhookUrlToken?: string;
  delaySendMessagesMilliseconds?: number;
  markIncomingMessagesReaded?: string;
  markIncomingMessagesReadedOnReply?: string;
  outgoingWebhook?: string;
  outgoingMessageWebhook?: string;
  outgoingAPIMessageWebhook?: string;
  stateWebhook?: string;
  incomingWebhook?: string;
  editedMessageWebhook?: string;
  deletedMessageWebhook?: string;
  pollMessageWebhook?: string;
  downloadUrlJpeg?: string;
}

export interface SetSettingsResponse {
  saveSettings: boolean;
}

export interface ReceiveNotificationResponse {
  receiptId: number;
  body: {
    typeWebhook: string;
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData: {
      chatId: string;
      chatName: string;
      chatType: string;
      sender: string;
      senderName: string;
      senderType: string;
      senderContactName: string;
      senderPhoneNumber: number;
    };
    messageData: {
      typeMessage: string;
      textMessageData?: {
        textMessage: string;
      };
    };
  };
}

export interface DeleteNotificationResponse {
  result: boolean;
  reason: string;
}

export interface ApiError {
  message: string;
  httpStatus?: number;
}