export enum ErolesUser {
  SUPPER_ADMIN = 'SUPPER_ADMIN',
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  LECTURER = 'LECTURER',
  LIBRARIAN = 'LIBRARIAN',
  ACCOUNTANT = 'ACCOUNTANT',
  STAFF = 'STAFF',
}

export enum EstatusUser {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ElibraryServiceType {
  BORROW_BOOK = 'BORROW_BOOK',
  BORROW_MAGAZINE = 'BORROW_MAGAZINE',
  BORROW_ROOM = 'BORROW_ROOM',
  RESERVE_SEAT = 'RESERVE_SEAT',
}

export enum EtypePayments {
  CASH = 'CASH',
  ONLINE = 'ONLINE',
}

export enum EstatusPayments {
  PAID = 'PAID',
  OWED = 'OWED',
}

export enum EstatusAppoinment {
  EXPIRED = 'EXPIRED',
  ACCEPTED = 'ACCEPTED',
  CANCEL = 'CANCEL',
}

export const keyAccessBackend = 'Key_library_service_backend_private';

export const expiresInJwt = '7d';

export const linkAccessService = {
  COURSE: 'http://localhost:3003',
  ATTENDANCE: 'http://localhost:3001',
  ADMIN_FRONTEND: 'http://localhost:8000',
  LIBRARY_FRONTEND: 'http://localhost:8001',
  BACKEND: 'http://localhost:3000',
};

export enum EtypeRoom {
  GROUP_STUDY = 'GROUP_STUDY',
  COMPUTER = 'COMPUTER',
  COMMON_READ = 'COMMON_READ',
  BOOK = 'BOOK',
}

export const numberIdLibrary = '101_library';
