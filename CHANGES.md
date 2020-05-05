### Updated GraphQL schema

```

scalar DateTime

type Query {
    user(id: Int): User
    forum(id: Int, public: Boolean): [Forum]
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
      members: [User]
      public: Boolean
  }

type Message {
      id: Int!
      author: User
      text: String!
      forum: Forum
      created_at: String
      updated_at: String
  }

type Mutation {
    new_user(input: UserInput!): Int
    join_forum(input: JoinInput): Boolean
    new_forum(input: ForumInput!): Int
    new_message(input: MessageInput!): Int
    accept_new_user(input:AcceptInput!): Boolean
  }

input AcceptInput {
    admin_id: Int!
    forum_id: Int!
    member_id: Int!
}

input UserInput {
    name: String!
    email: String!
    pic_url: String!
}


input JoinInput {
    user_id: Int!
    forum_id: Int
    public: Boolean
    forum_name: String
}

input ForumInput {
    name: String!
    admin: Int!
    public: Boolean!
}

input MessageInput {
    author: Int!
    text: String!
    forum: Int!
}

```