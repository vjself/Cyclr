# Cyclr Personal Project

## Database Tables

```sql
   - users
      - user_id serial primary key
      - first_name varchar(64) not null
      - last_name varchar(64) not null
      - age int
      - gender varchar(5)
      - email varchar(64) not null
      - username varchar(24) not null
      - password varchar(64) not null

   - user_routes
      - latitude/longitude json not null
      - name varchar(24) not null
      - description text not null
      - id foreign key references (user_id) users

   - comment_section
      - username
      - date timestamp not null
      - id foreign key references (user_id) users
```

## Front-End

### Dependecies

- axios
- react-router-dom
- redux
- react-redux

- **Components**
  - Home
  - MapDisplay
  - UserProfileDisplay
    - IndividualRouteDisplay
  - Header
    - Login/Register/Logout
  - CommentWindowDisplay
    - IndividualCommentCard

## Back-End

### Dependencies

- express
- express-session
- dotenv
- massive
- bcrypt
- concurrently

## **Endpoints**

**User Registration/Login/Logout**

- register - post > /auth/register
- login - post > /auth/login/:id
- logout - post > /auth/logout

**User Route Endpoints**

- getAllUserRoutes - get > /route/getAll
- searchUserRoute - get > /route/getOne
- startPoint - post > /route/start?long&lat
- endPoint - post > /route/end?long&lat
- hotSpot - post > /route/hotspot?long&lat
- deleteRoute - delete > /route/remove/:id

**User Comments Section**

- postComment - post > /chat/postChat
- updateComment - put > /chat/updateChat/:id
- deleteComment - delete > /chat/deleteChat/:id
- getAllComments - get > /chat/public
- getUserComments - get > /chat/public/:id
