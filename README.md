# Coffee Space Backend

[Frontend Repo](https://github.com/sabaiprimo/coffee-space-front)

[Endpoint of deployed backend](https://env-8924245.jelastic.metropolia.fi/) `https://env-8924245.jelastic.metropolia.fi/graphql`

### Update After Presentation
Only update readme, nothing change on code.

### Feature

- Browse for new coffee recipe and read coffee article
- Create and edit new coffee recipe and article about coffee!
- Rate other recipes and add them to favorite 
- Comment on others recipe
- Subscribe for newsletter
- Edit personal information, password

### Packages

This project is created using NodeJS. Some libraries include
```
   "@google-cloud/storage": "^5.8.4",
   "apollo-server-express": "^2.22.2",
   "bcrypt": "^5.0.1",
   "body-parser": "^1.19.0",
   "cors": "^2.8.5",
   "dotenv": "^8.2.0",
   "express": "^4.17.1",
   "firebase-admin": "^9.6.0",
   "graphql": "^15.5.0",
   "graphql-scalars": "^1.9.0",
   "mongoose": "^5.12.3",
   "multer": "^1.4.2",
   "passport": "^0.4.1",
   "passport-jwt": "^4.0.0",
   "passport-local": "^1.0.0"
```

### .env file

* DB_URL= `mongodb cloud server uri`
* PORT_HTTP = `port http`
* PORT_HTTPS = `port https`
* DEPLOY_SERVER_ENVI = `for environment`
* GCLOUD_PROJECT_ID =`google cloud firebase id`
* GCLOUD_APPLICATION_CREDENTIALS = `path to credential`
* GCLOUD_STORAGE_BUCKET_URL = `Storage bucket url`
* SECRETJWT = `your jwt secret here`

## Installation

Make sure you have NodeJS installed on your system.

1. Clone or download this repository.
2. Run `npm install`
3. Run `npm start`
4. The backend should be running on HTTPS at port 8000.

## Roadmap

Please refer to [Trello Board](https://trello.com/b/nufc9yaf/coffee-space)

## Acknowledgment

Thank you for my hard work.

## License

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Checklist
<ol>
<li>✅ Implement GraphQL API w/ authenticated mutations </li>
<li>✅ NoSQL Database functionality (CRUD)</li>
<li>✅ Users have to be able to interact with the app </li>
<li>❌ ** My project doesn't need real time communication ** can use WebSocket API (e.g. chat, real time game, push notification (for client to refresh the data,...),...) or
  WebRTC (real time voice and/or video) </li>
<li>✅ Publish your work in cloud service </li>
<li>✅ For the frontend you can (but you don't have to) use React, Angular, Bootstrap, jQuery, Ionic, React Native etc...</li> 
<li>✅ In the user interface, elements / components have proper design / layout </li>
<li>✅ Visual appearance of the app is appreciated  (so at least use Bootstrap etc.) ** Material UI **</li>
<li>✅ Application has to function properly :)  (Maybe some bugs here and there but should function)</li>
<li>✅ Application has to be coded correctly (Waiting for strict mode and clean up)</li>
   <ol>
   <li>  correct code structuring (Waiting for refractors) </li>
   <li>  small enough, meaningful functions (Waiting for refractors)</li>
   <li>  proper variable & function naming (Waiting for refractors)</li>
   <li>  written with Ecmascript 6 in strict mode (Waiting for refractors)</li>
   </ol>
<li>✅ App shouldn't copy or imitate stuff provided in the exercises </li>
<li>✅ Project source code in git </li>
   <ol>
   <li>  at your convenience github </li>
   <li>  .gitignore </li>
   <li>  documentation (e.g. readme.md) </li>
   <li>  Eventually: hook (deploy from source to server on git commit/push to master) ❓</li>
   <li>  Trello: [Link](https://trello.com/b/nufc9yaf/coffee-space)</li>
   </ol>
</ol>


## Example Query and Mutation

Register

```
mutation {
    register(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      displayName: $displayName
    )
  }
```

Login

```
query {
    login(email: $email, password: $password) {
      _id
      email
      token
    }
}
```


Get 5 Recipes

```
 query  {
    recipes(limit: 5) {
      _id
      title
      images {
        src
        srcSet
      }
      author {
        _id
        displayName
        pictureProfile
      }
      preparationTime
      totalTime
      roastLevel
      level
      serving
    }
  }
```

Search for articles by title with start and limit

```
  query  {
    articles(filter: {title:"Coffee" }, limit: 10, start: 1) {
      _id
      title
      subtitle
      headline
      author {
        _id
        displayName
        pictureProfile
      }
      cover {
        src
      }
      content {
        text
        images
      }
      issueDate
      tags
    }
  }

```

Get average rating for each recipe

```
 query {
    avgRatingRecipe(recipeID:"608fc6a0241bae1f08b14dd3") {
      _id
      avgRate
      reviews
    }
  }
```

Toggle favorite recipe

```
  mutation {
    modifyFavRecipe(_id: "608fc6d4241bae1f08b14dd7") {
      isFav
    }
  }
```

Add comment
```
 mutation {
    addComment(recipeID: "608fc6a0241bae1f08b14dd3", userID: "608ff4035969de20acb7afa1", context: "Some comment") {
      _id
    }
  }

```
