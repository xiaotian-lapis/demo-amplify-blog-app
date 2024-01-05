export type ListUsersResponse = {
  "PaginationToken": "string",
  "Users": [
    {
      "Attributes": [
        {
          "Name": "string",
          "Value": "string"
        }
      ],
      "Enabled": boolean,
      "MFAOptions": [
        {
          "AttributeName": "string",
          "DeliveryMedium": "string"
        }
      ],
      "UserCreateDate": number,
      "UserLastModifiedDate": number,
      "Username": "string",
      "UserStatus": "string"
    }
  ]
}

export type ListGroupResponse = {
  "Groups": [
    {
      "CreationDate": number,
      "Description": "string",
      "GroupName": "string",
      "LastModifiedDate": number,
      "Precedence": number,
      "RoleArn": "string",
      "UserPoolId": "string"
    }
  ],
    "NextToken": "string"
}

export type GetUserResponse = {
  "MFAOptions": [
    {
      "AttributeName": "string",
      "DeliveryMedium": "string"
    }
  ],
  "PreferredMfaSetting": "string",
  "UserAttributes": [
    {
      "Name": "string",
      "Value": "string"
    }
  ],
  "UserMFASettingList": [ "string" ],
  "Username": "string"
}

export type GetGroupResponse = {
  "Group": {
    "CreationDate": number,
    "Description": "string",
    "GroupName": "string",
    "LastModifiedDate": number,
    "Precedence": number,
    "RoleArn": "string",
    "UserPoolId": "string"
  }
}
