### Instructions

```
// Run the server
yarn run dev
```

### Complete GraphQL schema

```

type Query {
    user(id: Int): User
    forum(id: Int): [Forum]
  }

type User {
      id: Int
      name: String!
      email: String
      pic_url: String
      member_since: String
      forums: [Forum]
  }
  
type Forum {
      id: Int!
      name: String!
      created_at: String!
      admin: User
      messages:[Message]!
      members: [User]!
    }

type Message {
      id: Int!
      author: User!
      text: String!
      forum: Forum!
      created_at: String!
      updated_at: String
    }

type Mutation {
    new_user(input: UserInput!): Int
    join_forum(input: JoinInput): Boolean
    new_forum(input: ForumInput!): Int
    new_message(input: MessageInput!): Int
  }

input UserInput {
    name: String!
    email: String!
    pic_url: String!

input JoinInput {
    user_id: Int!
    forum_id: Int
    forum_name: String
}

input ForumInput {
    name: String!
    admin: Int!
}

input MessageInput {
    author: Int!
    text: String!
    forum: Int!
}

```