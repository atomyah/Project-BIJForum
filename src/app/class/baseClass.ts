import * as moment from 'moment';

export class Session {
    login: boolean;
    user: User;

    constructor(init?: User) { 
      this.login = (!!init);
      this.user = (init) ? new User(init.uid, init.name) : new User();
    }
  
    reset(): Session {
      this.login = false;
      this.user =  new User();
      return this;
    }
}

export class User {
  uid: string;
  name: string;
/*
  title1: string;
  title2: string;
  profile: string;
  email: string;
  num_favorite: number;
  flag_admin: boolean;
  flag_moderator: boolean;
  created_at: number;
  updated_at: number;
*/

  constructor(uid?: string, 
              name?: string,  
/*          
              title1?: string, 
              title2?:string, 
              profile?: string, 
              email?: string,
              num_favorite?: number,
              flag_admin?: boolean,
              flag_moderator?: boolean,
              created_at?: number,
              updated_at?: number
*/
              ) { 
    this.uid = (uid) ? uid : '';
    this.name = (name) ? name : '';
/*
    this.title1 = (title1) ? title1 : '';
    this.title2 = (title2) ? title2 : '';
    this.profile = (profile) ? profile : '';
    this.email = (email) ? email : '';
    this.num_favorite = (num_favorite) ? num_favorite : null;
    this.flag_admin = (flag_admin) ? flag_admin : false;
    this.flag_moderator = (flag_moderator) ? flag_moderator : false;
    this.created_at = (created_at) ? created_at : +moment();
    this.updated_at = (updated_at) ? updated_at : null;
*/
  }

  deserialize() {
    return Object.assign({}, this);
  }
}

export class Password {
  name: string; 
  email: string;
  password: string;
  password_confirmation: string;

  constructor() {
    this.name = ''; 
    this.email = '';
    this.password = '';
    this.password_confirmation = '';
  }

  reset() {
    this.name = ''; 
    this.email = '';
    this.password = '';
    this.password_confirmation = '';
  }
}

  export class faqComment {
    user: User;
    initial: string;
    content: string;
    id?: string;
    parent_id?: string;
    favorite_count?: number;
    media_type?: string;
    media_path_01?: string;
    media_path_02?: string;
    media_path_03?: string;
    created_at: number;
    remote_address?: string;
    edit_flag?: boolean;
  
    constructor(user: User, content: string) {
      this.user = user;
      this.initial = user.name.slice(0, 1);
      this.content = content;
      this.created_at = +moment();
    }
  
    deserialize() {
      this.user = this.user.deserialize();
      return Object.assign({}, this);
    }
  
    // 取得した日付を反映し、更新フラグをつける
    setData(date: number, key: string): faqComment {
      this.created_at = date;
      this.id = key;
      this.edit_flag = false;
      return this;
    }
}
