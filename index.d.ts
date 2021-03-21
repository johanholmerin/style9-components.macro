import * as React from 'react';
import { Style, StyleProperties } from 'style9';

type PropsAsFunc<BaseType, Props> = {
  [KeyType in keyof BaseType]:
    | BaseType[KeyType]
    | ((props: Props) => BaseType[KeyType])
};

type StylePropertiesAndFunc<Props> = PropsAsFunc<StyleProperties, Props>;

type StyleWithProps<Props> = StylePropertiesAndFunc<Props> &
  Omit<Style, keyof StyleProperties>;

type ComponentProps = {
  xstyle?: Style;
  style?: React.CSSProperties;
  as?: string | React.ComponentType<any>;
};

type createComponent = <Props>(style: StyleWithProps<Props>) =>
  React.FunctionComponent<Props & ComponentProps>;

interface BaseCreateStyled {
  (comp: React.ComponentType): createComponent;
}

type StyledTags = {
  [Tag in keyof JSX.IntrinsicElements]: createComponent
}

interface CreateStyled extends BaseCreateStyled, StyledTags {}

declare const styled: CreateStyled
export default styled
