import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';

const USER_KEY = 'user-gestao-normativos';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [
    {name: 'Mario', password: '1'},
    {name: 'Luigi', password: '2'},
    {name: 'Bowser', password: '3'},
  ];

  constructor() { }

  isUserLogged() : boolean {
    let userLogged: string | null = localStorage.getItem(USER_KEY);
    return userLogged ? true : false;
  }

  login(user: User) : boolean {

    let _user = this.searchUser(user);

    if(!_user) return false;

    this.setUserInLocalStorage(_user);
    return true;
  }

  logout(){
    localStorage.removeItem(USER_KEY);
  }

  private searchUser(user: User): User | undefined{
    return this.users.find(e => e.name?.toLocaleLowerCase() == user.name?.toLocaleLowerCase()
                          && e.password?.toLocaleLowerCase() == user.password?.toLocaleLowerCase());
  }

  setUserInLocalStorage(user: User){
    //todo: definir o formato do que vai ser armazenado
    const {name} = user;
    localStorage.setItem(USER_KEY, JSON.stringify(name));
  }


}
