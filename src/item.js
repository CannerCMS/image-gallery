// @flow
import * as React from "react";
import ImageLoader from 'react-loading-image';
import styled from 'styled-components';
import { Card, Button, Icon } from "antd";
const ButtonGroup = Button.Group;

const PreviewImg = styled.div`
  margin-top: 15px;
  background-image: url(${props => props.src});
  width: 100%;
  height: ${props => props.height || '200px'};
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  ${props => Object.keys(props.imageStyle)
    .reduce((pre, cur) => `${pre}${cur}:${props.imageStyle[cur]};`, '')
  }
`;

const Loading = styled.div`
  margin-top: 15px;
  width: 100%;
  height: ${props => props.height || '200px'};
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
`

const BtnContainer = styled.div`
  float: right;
  position: absolute;
  top: 3px;
  right: 3px;
`;

type Props = {
  id: number,
  image: string,
  deleteImage: (id: number) => void,
  showContent?: (id: number) => void,
  disableDrag: boolean,
  width: string,
  height: string,
  imageStyle: Object,
  disableDelete?: boolean,
  disableEdit?: boolean,
  editImage?: (id: number) => void
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
    const { image, disableDrag, disableDelete, disableEdit, showContent, editImage, id, width, height, imageStyle } = this.props;
    return (
      <Card
        hoverable
        style={{margin: '2px', position: 'relative'}}>
        <ImageLoader
          src={image}
          style={{height}}
          image={props => <PreviewImg {...props} width={width} height={height} imageStyle={imageStyle} />} // change to your customized component
          loading={() => <Loading  width={width} height={height} ><Icon type="loading" /></Loading>}
          error={() => <PreviewImg src="http://i.imgur.com/DUaZWMd.png"  width={width} height={height} imageStyle={imageStyle} />}
        />
        <BtnContainer>
          <ButtonGroup>
            {!disableDrag && (
              <Button type="primary" className="handle">
                <Icon type="swap" />
              </Button>
            )}
            {((editImage || showContent) && !disableEdit) && (
              <Button onClick={editImage ? () => editImage(id) : () => showContent && showContent(id)}>
                <Icon type="edit" />
              </Button>
            )}
            {
              !disableDelete && (
                <Button onClick={this.deleteImage} type="danger">
                  <Icon type="delete" />
                </Button>
              )
            }
          </ButtonGroup>
        </BtnContainer>
      </Card>
    );
  }
}
