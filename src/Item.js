// @flow
import React, { Component } from "react";
import imagesLoaded from "imagesloaded";
import { Card, Button, Icon } from "antd";

type Props = {
  id: number,
  image: string,
  deleteImage: (id: number) => void,
  disableDrag: boolean
}

export default class Item extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  imgWrapper: ?HTMLDivElement;
  showImage: ?HTMLImageElement;

  static defaultProps = {
    cardWidth: "100%"
  };

  componentDidMount() {
    var that = this;
    var imgLoad = imagesLoaded(this.imgWrapper);
    imgLoad.on("fail", function() {
      if (that.showImage) {
        that.showImage.src = "http://i.imgur.com/DUaZWMd.png";
      }
    });
  }

  deleteImage = () => {
    const { id, deleteImage } = this.props;
    deleteImage(id);
  }

  render() {
    const { image, disableDrag } = this.props;
    return (
      <div style={{padding: '5px'}}>
        <Card>
          <div ref={node => (this.imgWrapper = node)}>
            <img style={{width: '300px', height: '200px'}} ref={showImage => (this.showImage = showImage)} src={image} />
          </div>
          <div styleName="custom-card" className="custom-card">
            {!disableDrag ? (
              <Button type="primary" className="handle">
                <Icon type="swap" />
              </Button>
            ) : null}
            <Button onClick={this.deleteImage} className="remove-button">
              <Icon type="cross" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}
