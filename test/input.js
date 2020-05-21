import styled from 'style9-components.macro';
import { h } from 'preact';

const medium = 14;

const Container = styled.div({
  fontSize: `${medium}px`,
  color: props => props.color,
  border: '1px solid red'
});

export default Container;
