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

export const keyAccessBackend = 'Key_library_service_backend_private';

export const expiresInJwt = '7d';

export const linkAccessService = {
  COURSE: 'http://localhost:3003',
  ATTENDANCE: 'http://localhost:3001',
  ADMIN_FRONTEND: 'http://localhost:8000',
  FRONTEND: 'http://localhost:8001',
  LIBRARY_FRONTEND: 'http://localhost:8002',
  BACKEND: 'http://localhost:3000',
};
