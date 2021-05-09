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

Create new recipe
```
mutation {
    addRecipe(
      title: "Cappuccino"
      description: "Make your favourite morning coffee from scratch – it\'s easy with the right equipment. We love a creamy cappuccino topped with a sprinkling of cocoa powder"
      preparationTime: 2
      totalTime: 5
      serving: 1
      roastLevel: "Medium roast"
      level: "Beginner"
      ingredients:  [
        "18g ground espresso (or 1 espresso pod)",
        "150ml milk",
        "cocoa powder (optional)"
    ]
      equipments:  [
        "200-250ml capacity cup",
        "Coffee machine"
    ]
      directions: [
        {
            step: 1
            content: "Make around 35ml espresso using a coffee machine and pour it into the base of your cup."
        },
        {
            step: 2
            content: "Steam the milk with the steamer attachment so that it has around 4-6cm of foam on top. Hold the jug so that the spout is about 3-4cm above the cup and pour the milk in steadily. As the volume within the cup increases, bring the jug as close to the surface of the drink as possible whilst aiming to pour into the centre. Once the milk jug is almost touching the surface of the coffee, tilt the jug to speed up the rate of pour. As you accelerate, the milk will hit the back of the cup and start naturally folding in on itself to create a pattern on the top. Dust the surface with a little cocoa powder if you like."
        }
    ]
      author: "608f9aba241bae1f08b14db2"
      images:  [
        {
            src: "https://firebasestorage.googleapis.com/v0/b/coffeespace-d0049.appspot.com/o/63ae880e034d60492ac8header_visual.jpg?alt=media"
            srcSet: "https://firebasestorage.googleapis.com/v0/b/coffeespace-d0049.appspot.com/o/63ae880e034d60492ac8header_visual.jpg?alt=media"
        }
    ]
    ) {
      _id
      title
    }
  }
```

Create new article
```
mutation {
    addArticle(
      title: "Is Coffee Good for You?"
      subtitle: "Yes! But it depends on the kind of coffee and the quantity."
      headline: "We’ve come a long way from the cans of Folgers that filled our grandparents’ cupboards, with our oat milk lattes, cold brews and Frappuccinos. Some of us are still very utilitarian about the drink while others perform elaborate rituals. The fourth most popular beverage in the country, coffee is steeped into our culture. Just the right amount can improve our mood; too much may make us feel anxious and jittery."
      author: "608f9aba241bae1f08b14db2"
      cover: {
        src: "https://firebasestorage.googleapis.com/v0/b/coffeespace-d0049.appspot.com/o/61b8b1f63f568ceb4d74art1_ban.jpg?alt=media"
    }
      content:  [
        {
            images: [
                "https://firebasestorage.googleapis.com/v0/b/coffeespace-d0049.appspot.com/o/0694a6debc34bee2ea2eart1.jpg?alt=media"
            ]
            text: "In moderation, coffee seems to be good for most people — that’s 3 to 5 cups daily, or up to 400 milligrams of caffeine.\n\n“The evidence is pretty consistent that coffee is associated with a lower risk of mortality,” said Erikka Loftfield, a research fellow at the National Cancer Institute who has studied the beverage.\n\nFor years, coffee was believed to be a possible carcinogen, but the 2015 Dietary Guidelines helped to change perception. For the first time, moderate coffee drinking was included as part of a healthy diet. When researchers controlled for lifestyle factors, like how many heavy coffee drinkers also smoked, the data tipped in coffee’s favor."
        },
        {
            images: []
            text: "A large 2017 review on coffee consumption and human health in the British Medical Journal also found that most of the time, coffee was associated with a benefit, rather than a harm. In examining more than 200 reviews of previous studies, the authors observed that moderate coffee drinkers had less cardiovascular disease, and premature death from all causes, including heart attacks and stroke, than those skipping the beverage."
        }
      ]
      tags: [
        "health",
        "expert"
    ]
      issueDate: "2021-05-03T07:32:24.576Z"
    ) {
      _id
      title
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

Rate a recipe

```
 mutation {
    addRating(user: "609070115669e61867f5719d", recipe: "60904bbdcf46a973ed5768ca", rating: 5) {
      _id
      rating
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
