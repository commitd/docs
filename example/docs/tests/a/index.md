# /tests/a/

This file is the index.md in the `a` folder. It appears on the path as with a trailing slash.

To link relatively to the folder `b` you should use, [b/](b/) or [b/index](b/index) the last has the advantage that is also works in the raw markdown. A full link is also valid [/tests/a/b/](/tests/a/b/) or [/tests/a/b/index](/tests/a/b/index) linking to headings is also supported [b/#link-test](b/#link-test) and [b/index#link-test](b/index#link-test). 

You can also link 'up' directories, for example: [../a](../a), [../../tests/mdTest](../../tests/mdTest), [../../tests/a/b#link-test](../../tests/a/b#link-test)

We consider paths as case insensitive, so the following also work [B/](B/) or [B/Index](B/Index).

The following are invalid.

```markdown
[a/b/c/d](a/b/c/d) // missing
[b/#link-test](b/#link-tests) // missing
```
