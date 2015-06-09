# create-http-error

Simply creates http ERRORs with the given http error code.

## install

```bash
npm install --save create-http-error
```

## use

```js
// e.g. as finalhandler after no route matched.
function finalhandler (req, res, next) {
    next(HttpError('400'));
}

app.use(finalhandler); // connect or express app.
```

## api

#### HttpError(code [,message])

creates an `Error` Object:
 - with the provided http error `code` like e.g. 500
 - if the `message` is omitted, the standard `http` error message is taken.

#### HttpError.toString()
returns the `String` representation of the `HttpError`.

#### HttpError.toJSON()
returns the Javascript Object properties of the `HttpError` Object.


## test
```bash
npm test
```

## license
MIT




