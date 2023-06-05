import * as React from "react";
import { ICamlQuery } from "@pnp/sp/lists";
import { INewsProps } from "./INewsProps";
import { SPFI } from "@pnp/sp";
import { getSP } from "../../../Services/pnpConfig";
import News from "./News1";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp";

const Newss = (props: INewsProps) => {
  const [newsdata, setNewsData] = React.useState<any>();
  const caml: ICamlQuery = {
    ViewXml:
      "<View><ViewFields><FieldRef Name='Title' /></ViewFields><RowLimit>5</RowLimit></View>",
  }

  const getNewsData = async () => {
    let _sp: SPFI = getSP(props.context);
    const list = await _sp.web.lists.getByTitle("News");
    var r2 = await list.getItemsByCAMLQuery(caml);
    setNewsData(r2);
    console.log(newsdata);
  };


  React.useEffect(() => {
    const execute = async () => {
      await getNewsData();
    };
    execute();
  }, []);
  return (
    <div className="mainContainer">
      <div className="Containers" >
          <div className="news">
          <News data={newsdata} />  
        </div>
      </div>
    </div>
  );
};
export default Newss;
