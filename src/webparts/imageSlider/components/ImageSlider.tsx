// // 

// import * as React from 'react'

// import { ICamlQuery } from '@pnp/sp/lists';
// import { SPFI } from '@pnp/sp';
// import { getSP } from '../../../Services/pnpConfig';
// import { IImageSliderProps } from './IImageSliderProps';
// import { Slide } from 'react-slideshow-image';
// import "@pnp/sp/webs";
// import "@pnp/sp/lists";
// import "@pnp/sp";
// import "@pnp/sp/site-users/web";
// import 'react-slideshow-image/dist/styles.css';  
// const ImageSlider = (props:IImageSliderProps) => {
//   let arr: any[] = [];
//   const [imagedata, setImageData] = React.useState<any>();
//   const caml3: ICamlQuery = {
//     ViewXml:
//       "<View><ViewFields><FieldRef Name='Title'/><FieldRef Name='image'/></ViewFields></View>",
//   };

//   const getImageData = async () => {
//     try {
//       let _sp: SPFI = getSP(props.context);
//       const list = await _sp.web.lists.getByTitle("ImageSlider");

//       var r = await list.getItemsByCAMLQuery(caml3);

//       r.map((x: any) => {
//         let y = JSON.parse(x.image)
//         console.log(y.serverUrl + y.serverRelativeUrl)
//         arr.push(y.serverUrl + y.serverRelativeUrl)

//       })
//       setImageData(arr);


//     }
//     catch (e) {
//       console.log(e);
//     }
    
    
//   };
  
//   React.useEffect(()=>{
//     getImageData();
//   },[])
  
//   return (
//     <div>
// <Slide>
//     {imagedata && imagedata.map((x: any) => {
//       return (<div className='each-slide'>
//         <img src={x} /></div>)
//     })}
//   </Slide>
//   </div>
//   )
// }

// export default ImageSlider
import * as React from "react";
import { ICamlQuery } from "@pnp/sp/lists";
import { SPFI } from "@pnp/sp";
import { getSP } from "../../../Services/pnpConfig";
import { IImageSliderProps } from "./IImageSliderProps";
import ImageSliders from "./Sliders";
import "../../../Styles/GlobalStyles/global.scss"
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp";
import "@pnp/sp/site-users/web";

export interface IListitems {
  Title: string;
  Icon: string;
  url: string;

}
const ImageSlider = (props: IImageSliderProps) => {
  let arr: any[] = [];
  const [imagedata, setImageData] = React.useState<any>();
  const caml3: ICamlQuery = {
    ViewXml:
      "<View><ViewFields><FieldRef Name='Title'/><FieldRef Name='image'/></ViewFields></View>",
  };
  const getImageData = async () => {
    try {
      let _sp: SPFI = getSP(props.context);
      const list = await _sp.web.lists.getByTitle("ImageSlider");

      var r = await list.getItemsByCAMLQuery(caml3);

      r.map((x: any) => {
        let y = JSON.parse(x.image)
        console.log(y.serverUrl + y.serverRelativeUrl)
        arr.push(y.serverUrl + y.serverRelativeUrl)

      })
      setImageData(arr);


    }
    catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    try {
      getImageData();
      console.log("pls work");
      
    }
    catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <div className="mainContainer" >
        <div className="Containers1">
          <div className="row2container__part1">
            <ImageSliders data={imagedata} />
            {/* <ImageSliders/> */}
          </div>
        </div>

      </div>
    </>

  );
};
export default ImageSlider;

