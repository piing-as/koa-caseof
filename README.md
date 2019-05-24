
# koa-caseof

Koa Middleware for handling branching routes based on Context

### Install
```bash
npm i @piing/koa-caseof
```

### Usage
```typescript

import KoaRouter from "koa-router"
import caseof from "@piing/koa-caseof"

const router = new KoaRouter();

router.get("/items/",
  authenticate,
  caseof( "user.type", {
    Admin: itemController.getAll
    User:  itemController.getAllBelongingToUser
  }))

```