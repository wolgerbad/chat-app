export type UserType = {
  id: string;
  name: string;
  email: string;
  image?: {
    type: string;
  };
};

export type ConversationStateType = {
  selectedFriend: null | UserType;
  setSelectedFriend: (val: null | UserType) => void;
};

export type ModelType = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

export type MessageType = {
  _id: string;
  conversationId: string;
  createdAt: string;
  message: string;
  senderId: string;
};

export type MessagesType = [MessageType];

export type ConversationType = {
  _id: string;
  participants: [UserType];
};

export type AuthType = {
  user: null | UserType;
  setUser: (val: null | UserType) => void;
};
