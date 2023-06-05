import * as React from 'react';
import { ICamlQuery } from '@pnp/sp/lists';
import { IAnnouncementsProps } from './IAnnouncementsProps';
import { SPFI } from '@pnp/sp';
import { getSP } from '../../../Services/pnpConfig';
import Announcements from './Annoucements';
import "../../../Styles/GlobalStyles/global.scss"
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp";


const announcments = (props: IAnnouncementsProps) => {
  const [announcementsdata, setAnnouncementsData] = React.useState<any>();
  const caml: ICamlQuery = {
    ViewXml:
      "<View><ViewFields><FieldRef Name='Title' /></ViewFields><RowLimit>5</RowLimit></View>",
  };

const getAnnouncementsData = async () => {
  let _sp: SPFI = getSP(props.context);
  const list = await _sp.web.lists.getByTitle("Announcements");
  var r = await list.getItemsByCAMLQuery(caml);
  setAnnouncementsData(r);
  console.log(announcementsdata);
};

React.useEffect(() => {
  const execute = async () => {
    await getAnnouncementsData();
  };
  execute();
}, []);

return (
  <div className="mainContainer">
      <div className="Containers" >
        <div className="announcments">
          <Announcements data={announcementsdata} />
        </div>
      </div>
    </div>
)
}

export default announcments
