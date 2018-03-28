// @flow

import * as React from "react";
import GridDraggable, { Section } from "grid-draggable";
import GridBreakpoint from "grid-breakpoint";
import ImageUpload from "@canner/image-upload";
import type ImageServiceConfig from "@canner/image-service-config/lib/imageService";
import Item from "./item";
import Add from "./add";

type ImageItem = {
  index: number,
  image: string
}

type Props = {
  value: Array<string>,
  disableDrag: boolean,
  renderContent?: (index: number) => React.Element<*>,
  onDelete?: (index: number) => void,
  onCreate?: (ImageItem | Array<ImageItem>) => void,
  onSwap?: (from: number, to: number) => void,
  serviceConfig: ImageServiceConfig
}

type State = {
  editPopup: boolean
}

export default class Gallery extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      editPopup: false
    };
  }

  static defaultProps = {
    value: [],
    disableDrag: false
  };

  onSwap = (fromKey: number, toKey: number) => {
    const {onSwap} = this.props
    if (onSwap)
      onSwap(fromKey, toKey);
  };

  showEditPopup = () => {
    this.setState({ editPopup: true });
  };

  closeEditPopup = () => {
    this.setState({ editPopup: false });
  };

  addImages = (newImage: string | Array<string>) => {
    const { onCreate, value } = this.props;
    let val;
    if (Array.isArray(newImage)) {
      val = newImage.map(((image, i) => {
        return {
          index: value.length + i,
          image
        }
      }))
    } else {
      val = {
        index: value.length,
        image: newImage
      }
    }

    if (onCreate) {
      onCreate(val);
    }
    this.closeEditPopup();
  };

  deleteImage = (imageId: number) => {
    const {onDelete} = this.props;
    if (onDelete)
      onDelete(imageId)
  };

  render() {
    const { editPopup } = this.state;
    const { value, disableDrag, serviceConfig } = this.props;
    let list = value.map((item, i) => {
      if (disableDrag) {
        return (
          <Item
            image={item}
            disableDrag={disableDrag}
            deleteImage={this.deleteImage}
            id={i}
            key={i}
          />
        );
      }

      return (
        <Section key={i} handle=".handle" style={{height: '300px'}}>
          <Item
            image={item}
            disableDrag={disableDrag}
            deleteImage={this.deleteImage}
            id={i}
            key={i}
          />
        </Section>
      );
    });

    list.push(<Add key="add" onClick={this.showEditPopup} />);
    return (
      <div>
        {disableDrag ? (
          <GridBreakpoint lg={4} md={4} sm={12} xs={12}>
            {list}
          </GridBreakpoint>
        ) : (
          <GridDraggable onSwap={this.onSwap} lg={4} md={6} sm={12} xs={12}>
            {list}
          </GridDraggable>
        )}
        <ImageUpload
          onChange={this.addImages}
          editPopup={editPopup}
          serviceConfig={serviceConfig}
          closeEditPopup={this.closeEditPopup}
          multiple={true}
        />
      </div>
    );
  }
}
