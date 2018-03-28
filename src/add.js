// @flow
import React, { Component } from "react";
import { Icon } from "antd";
import styled from 'styled-components';

type Props = {
  onClick: () => void;
}

const AddContainer = styled.div`
  width: 100%;
	height: 292px;
	display: flex;
	border: 1px dashed #CCC;
	text-align: center;
	justify-content: center;
	align-items: center;
`

export default class Add extends Component<Props> {

  render() {
    return (
      <div style={{padding: '5px'}}>
        <AddContainer onClick={this.props.onClick}>
          <Icon type="plus-circle" style={{fontSize: 60}}/>
        </AddContainer>
      </div>
    );
  }
}
