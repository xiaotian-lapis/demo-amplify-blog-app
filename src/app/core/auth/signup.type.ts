import { signUp } from 'aws-amplify/auth';

export type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  name: string;
  bio: string;
};
