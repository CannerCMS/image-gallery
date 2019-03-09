// @flow

import * as React from "react";
import GridDraggable, { Section } from "grid-draggable";
import {Modal} from 'antd';
import GridBreakpoint from "grid-breakpoint";
import ImageUpload from "@canner/image-upload";
import Item from "./item";
import Add from "./add";

type ImageItem = {
  index: number,
  image: string
}

type Props = {
  value: Array<string>,
  disableDrag: boolean,
  disableDelete: boolean,
  disableEdit: boolean,
  contentTitle?: string,
  renderContent?: (index: number) => React.Element<*>,
  onDelete?: (index: number) => void,
  onCreate?: (ImageItem | Array<ImageItem>) => void,
  onSwap?: (from: number, to: number) => void,
  onEdit?: (index: number) => void,
  serviceConfig: Object,
  grid: Object,
  rowHeight: string, 
  imageStyle: Object
}

type State = {
  editPopup: boolean,
  showContentPopup: boolean,
  currentContent: ?number,
  itemWidth: string
}

export default class Gallery extends React.Component<Props, State> {
  defaultGrid = {
    lg: 4,
    md: 4,
    sm: 4,
    xs: 12
  }

  gallery = React.createRef();

  state = {
    editPopup: false,
    showContentPopup: false,
    currentContent: undefined,
    itemWidth: '300px'
  };

  componentDidMount() {
    this.setState({
      itemWidth: this.getItemWidth()
    })
  }

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

  showContent = (id: number) => {
    this.setState({
      showContentPopup: true,
      currentContent: id
    })
  }

  hideContent = () => {
    this.setState({
      showContentPopup: false,
      currentContent: undefined
    })
  }

  getItemWidth = () => {
    if (this.gallery.current) {
      const containerWidth = this.gallery.current.offsetWidth;
      const gridType = getGridType(containerWidth);
      const grid = this.getGrid()[gridType];
      return `${containerWidth / (12 / grid)}px`;
    }
    return `${300}px`;
  }

  getGrid = () => {
    const {grid = {}} = this.props;
    return {...this.defaultGrid, ...grid};
  }

  render() {
    const { editPopup, showContentPopup, currentContent, itemWidth } = this.state;
    const {
      value,
      disableDrag,
      disableDelete,
      disableEdit,
      serviceConfig,
      renderContent,
      contentTitle,
      rowHeight,
      imageStyle = {},
      onEdit
    } = this.props;
    let list = value.map((item, i) => {
      if (disableDrag) {
        return (
          <Item
            image={item}
            disableDrag={disableDrag}
            disableDelete={disableDelete}
            disableEdit={disableEdit}
            showContent={renderContent && this.showContent}
            deleteImage={this.deleteImage}
            editImage={onEdit}
            id={i}
            key={i}
            width={itemWidth}
            height={rowHeight}
            imageStyle={imageStyle}
          />
        );
      }
      return (
        <Section
          key={i}
          handle=".handle"
          dragStyle={{
            width: itemWidth,
            height: rowHeight,
            opacity: 0.4
          }}>
          <Item
            image={item}
            disableDrag={disableDrag}
            showContent={renderContent && this.showContent}
            deleteImage={this.deleteImage}
            editImage={onEdit}
            disableDelete={disableDelete}
            disableEdit={disableEdit}
            id={i}
            key={i}
            width={itemWidth}
            height={rowHeight}
            imageStyle={imageStyle}
          />
        </Section>
      );
    });

    list.push(<Add key="add" onClick={this.showEditPopup} rowHeight={rowHeight}/>);
    return (
      <div ref={this.gallery} style={{width: '100%'}}>
        {disableDrag ? (
          <GridBreakpoint {...this.getGrid()}>
            {list}
          </GridBreakpoint>
        ) : (
          <GridDraggable
            onSwap={this.onSwap}
            {...this.getGrid()}>
            {list}
          </GridDraggable>
        )}
        {renderContent &&
          <Modal
            title={contentTitle}
            visible={showContentPopup}
            footer={null}
            onCancel={this.hideContent}
          >
            {
              currentContent !== null &&
              currentContent !== undefined &&
              renderContent(currentContent)
            }
          </Modal>
        }

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


function getGridType(width: number) {
  if (width > 1600) return 'xxl';
  if (width > 1200) return 'xl';
  if (width > 992) return 'lg';
  if (width > 768) return 'md';
  if (width > 576) return 'sm';
  return 'xs';
}