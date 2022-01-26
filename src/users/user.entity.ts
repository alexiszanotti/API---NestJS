export class User {
  id: number;
  email: string;
  password: string;
  isActive: boolean;
  message?: [
    {
      id: number;
      userId: number;
      content: string;
    },
  ];
}
