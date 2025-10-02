import { makeAutoObservable } from "mobx";

interface User {
  id: string;
  email: string;
}

export class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User | null) {
    this.user = user;
  }
}

export const userStore = new UserStore();
