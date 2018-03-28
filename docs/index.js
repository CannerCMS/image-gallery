/* eslint-disable no-console */
import * as React from 'react';
import ReactDOM from 'react-dom';
import Gallery from '../src';
import {ImgurService} from "@canner/image-service-config";
import 'antd/dist/antd.css';

class Demo extends React.Component {
  render() {
    return (
      <Gallery
        value={[
          'https://images.unsplash.com/photo-1494005612480-90f50fd9376f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=36d7fc577cf6a4527cbee851db481b8c&auto=format&fit=crop&w=3153&q=80',
          'https://images.unsplash.com/photo-1500531279542-fc8490c8ea4d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=add00823c6d712c149aa86c82f02c21e&auto=format&fit=crop&w=3151&q=80',
          'https://images.unsplash.com/photo-1506241537529-eefea1fbe44d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7c743141b38a2afe4a8ec4d77c889ef3&auto=format&fit=crop&w=3150&q=80'
        ]}
        renderContent={(i) => <div>content {i}</div>}
        contentTitle={"Content title"}
        onDelete={(i) => console.log(i)}
        onCreate={(item) => console.log(item)}
        onSwap={(from, to) => console.log(from, to)}
        serviceConfig={new ImgurService({
          mashapeKey: 'bF1fkS9EKrmshtCbRspDUxPL5yhCp1rzz8ejsnqLqwI2KQC3s9',
          clientId: 'a214c4836559c77'
        })}
      />
    );
  }
}

ReactDOM.render(
  <Demo/>
, document.getElementById('root'));
