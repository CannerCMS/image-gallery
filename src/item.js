// @flow
import * as React from "react";
import ImageLoader from 'react-loading-image';
import styled from 'styled-components';
import { Card, Button, Icon } from "antd";

const PreviewImg = styled.div`
  margin-top: 15px;
  background-image: url(${props => props.src});
  width: 100%;
  height: 200px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`;

const Loading = styled.div`
  margin-top: 15px;
  width: 100%;
  height: 200px;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
`

const BtnContainer = styled.div`
  float: right;

  button {
    margin: 0 3px;
  }
`;

type Props = {
  id: number,
  image: string,
  deleteImage: (id: number) => void,
  showContent?: (id: number) => void,
  disableDrag: boolean
}

export default class Item extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  deleteImage = () => {
    const { id, deleteImage } = this.props;
    deleteImage(id);
  }

  render() {
    const { image, disableDrag, showContent, id } = this.props;
    return (
      <Card
        hoverable
        style={{margin: '5px'}}
        cover={
          <ImageLoader
            src={image}
            image={props => <PreviewImg {...props}/>} // change to your customized component
            loading={() => <Loading><Icon type="loading" /></Loading>}
            error={() => <PreviewImg src="http://i.imgur.com/DUaZWMd.png"/>}
          />
        }>
        <BtnContainer>
          {!disableDrag && (
            <Button type="primary" className="handle">
              <Icon type="swap" />
            </Button>
          )}
          {showContent && (
            <Button onClick={() => showContent(id)}>
              <Icon type="edit" />
            </Button>
          )}
          <Button onClick={this.deleteImage} type="danger">
            <Icon type="delete" />
          </Button>
        </BtnContainer>
      </Card>
    );
  }
}
