import styled from 'style9-components.macro';
import { h } from 'preact';

const medium = 14;

const Container = styled.div({
  fontSize: `${medium}px`,
  color: props => props.color,
  backgroundColor: 'red'
});

export default Container;
