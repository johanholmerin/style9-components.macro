# style9-components.macro

**Experimental**

Styled API for style9 using babel macros. Static properties will be extracted
and dynamic will be set inline.

```javascript
// From
import styled from 'style9-components.macro';

const Container = styled.div({
  fontSize: `${FONT_SIZE}px`,
  color: props => props.color,
  backgroundColor: 'red'
});


// To
import style9 from 'style9';

const Container = props => {
  const styles = style9.create({
    styles: {
      fontSize: `${FONT_SIZE}px`,
      backgroundColor: 'red'
    }
  });
  const Type = props.as || 'div';

  return (
    <Type
      style={{ color: props.color, ...props.style }}
      className={style9(styles.styles, ...props.xstyle || [])}
    >{props.children}</Type>
  );
};
```

## Features

* `as` attribute to override element type
* extending components using `styled(Container)({ /* ...styles */ })`

## Install

```sh
yarn add git+https://github.com/johanholmerin/style9-components.macro#semver:^0.2.1
```
