// @flow
import React, { Component } from "react";
import { Icon } from "antd";
import styled from 'styled-components';

type Props = {
  onClick: () => void;
  rowHeight: number;
}

const AddContainer = styled.div`
  width: 100%;
  height: ${props => props.rowHeight};
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: center;
`

export default class Add extends Component<Props> {
  render() {
    const {rowHeight} = this.props;
    return (
      <div style={{margin: '4px 2px', padding: '18px 0', border: '1px dashed #CCC'}}>
        <AddContainer onClick={this.props.onClick} rowHeight={rowHeight}>
          <Icon type="plus-circle" style={{fontSize: 60}}/>
        </AddContainer>
      </div>
    );
  }
}
