# /tests/a/b/

This file is the `index.md` in the `b` folder. It appears in the path naturally as `/tests/a/b/`, with the trailing slash but `/tests/a/b` will also be routed here.

So to link to this page use [/tests/a/b/](/tests/a/b/) or [/tests/a/b/index](/tests/a/b/index)

```markdown
[/tests/a/b/](/tests/a/b/)
[/tests/a/b/index](/tests/a/b/index)
```

## Link Test

File `b1.md` is in the same folder, so to link to it use [b1](b1), [./b1](./b1) or [/tests/a/b/b1](/tests/a/b/b1).

```markdown
[b1](b1)
[./b1](./b1)
[/tests/a/b/b1](/tests/a/b/b1)
```
