# style9-components.macro

**Experimental**

Styled API for style9 using babel macros. Static properties will be extracted
and dynamic will be set inline.

```javascript
// From
import styled from 'style9-components.macro';

const Container = styled.div({
  fontSize: `${sizes.medium}px`,
  color: props => props.color,
  border: '1px solid red'
});


// To
import style9 from 'style9';

const Container = props => {
  const styles = style9.create({
    styles: {
      fontSize: `${sizes.medium}px`,
      border: '1px solid red'
    }
  });

  return (
    <div
      style={{ color: props.color }}
      className={styles('styles')}
    >{props.children}</div>
  );
};
```

## Install

```sh
yarn add git+https://github.com/johanholmerin/style9-components.macro#semver:^0.1.0
```
