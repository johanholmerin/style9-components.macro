import styled from 'style9-components.macro';
import { h } from 'preact';

const medium = 14;

const Container = styled.div({
  fontSize: `${medium}px`,
  color: props => props.color,
  backgroundColor: 'red'
});

const SecondContainer = styled(Container)({
  color: props => props.dark ? 'white' : 'black',
  backgroundColor: 'green'
});

export default Container;
