import { AWS_CONFIG, COGNITO_POOL_NAME } from "./config";

import {
  CognitoIdentityProviderClient,
  ListUserPoolClientsCommand,
  AdminCreateUserCommand,
  AdminAddUserToGroupCommand,
  CreateGroupCommand,
  InitiateAuthCommand,
  AuthFlowType,
  ListUserPoolsCommand,
  UsernameExistsException,
} from "@aws-sdk/client-cognito-identity-provider";

interface LoginUser {
  email: string;
  password: string;
  group: string;
}

const adminUser: LoginUser = {
  email: "admin@example.com",
  password: "test1234",
  group: "admin",
};

const normalUser: LoginUser = {
  email: "user@example.com",
  password: "test1234",
  group: "user",
};

const identifierClient = new CognitoIdentityProviderClient(AWS_CONFIG);

const getUserPoolId = async (poolName: string) => {
  const identityPoolsCommand = new ListUserPoolsCommand({ MaxResults: 60 });
  const data = await identifierClient.send(identityPoolsCommand);
  for (const pool of data.UserPools || []) {
    if (pool.Name === poolName) {
      return pool.Id as string;
    }
  }
  throw new Error(`No pool found with name ${poolName}`);
};

const getUserPoolClientId = async (UserPoolId: string) => {
  const listUserPoolClientsCommand = new ListUserPoolClientsCommand({
    UserPoolId,
  });
  const data = await identifierClient.send(listUserPoolClientsCommand);
  return data.UserPoolClients?.[0].ClientId as string;
};

const createUser = async (
  UserPoolId: string,
  { email, password, group }: LoginUser,
) => {
  try {
    const createUserCommand = new AdminCreateUserCommand({
      UserPoolId,
      Username: email,
      TemporaryPassword: password,
      MessageAction: "SUPPRESS",
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
        {
          Name: "email_verified",
          Value: "true",
        },
      ],
    });
    await identifierClient.send(createUserCommand);

    const createGroupCommand = new CreateGroupCommand({
      UserPoolId,
      GroupName: group,
    });
    await identifierClient.send(createGroupCommand);

    const addUserToGroupCommand = new AdminAddUserToGroupCommand({
      UserPoolId,
      Username: email,
      GroupName: group,
    });
    await identifierClient.send(addUserToGroupCommand);
  } catch (e) {
    if (e instanceof UsernameExistsException) {
      console.log("User already exists");
      return;
    }
    throw e;
  }
};

async function authenticateUser(
  ClientId: string,
  { email: USERNAME, password: PASSWORD }: LoginUser,
) {
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH" as AuthFlowType,
    ClientId,
    AuthParameters: {
      USERNAME,
      PASSWORD,
    },
  };

  const command = new InitiateAuthCommand(params);
  const response = await identifierClient.send(command);
  if (response.AuthenticationResult == null) {
    throw new Error("No authentication result");
  }
  return response.AuthenticationResult.AccessToken as string;
}

export const initializeCognito = async () => {
  const userPoolId = await getUserPoolId(COGNITO_POOL_NAME);

  const userPoolClientId = await getUserPoolClientId(userPoolId);
  await createUser(userPoolId, adminUser);
  await createUser(userPoolId, normalUser);

  const admin = await authenticateUser(userPoolClientId, adminUser);
  const user = await authenticateUser(userPoolClientId, normalUser);
  return { admin, user };
};
