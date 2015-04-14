# Observable Objects

Observable objects is lib you could use on any JavaScript object to create an observable copy of that ones.

### Idea

The most common use pattern is:

- you have an object;
- next you wanna pass into any number of models, views, or any other structures which probably will change the original object;
- finally you wanna observe the changes on the original object you have passed into the child structures.

### How to

```
var original_object = {...};
```

```
var observable_object = Observe(original_object, handler);
```

```
observable_object.val; // the observable copy of an original one to pass into the child structures.
```

```
original_object; // will change after automatically any changes take place on observable_object.val
```

License
----

MIT