 import * as React from "react"
 import { SPFI } from "@pnp/sp";
 import { useState } from "react"
 import QuickLinks from "./quickLink";
 import { IQuickLinksProps } from "./IQuickLinksProps";
 import { getSP } from "../../../Services/pnpConfig";
 import "../../../Styles/GlobalStyles/global.scss"

const QuickLink = (props: IQuickLinksProps) => {
 let arrobj: any[] = [];
 const [quicklinkdata, SetQuickLinkData] = useState<any>();

 const getQuickLinkData = async () => {
  let _sp: SPFI = getSP(props.context);
  const qllist = await _sp.web.lists.getByTitle("Quick Links");
  var qlistitems = await qllist.items();

  qlistitems.map((x) => {
    let imgobj = x.Icon;
    let jobj = JSON.parse(imgobj);
    console.log(window.location.protocol + "//" + window.location.host + jobj.serverRelativeUrl)
    console.log(x.URL.Url)
    arrobj.push({ Title: x.Title, Icon: window.location.protocol + "//" + window.location.host + jobj.serverRelativeUrl, Url: x.URL.Url })
    console.log(arrobj)
  })
  SetQuickLinkData(arrobj)
  console.log(quicklinkdata)
}

React.useEffect(() => {
  try {
    getQuickLinkData();
  }
  catch (e) {
    console.log(e);
  }
}, []);


return (
  <>
   <div className="row2container__part2">
            <div className="row2container__part2_quicklinks">
              <QuickLinks data={quicklinkdata} />
            </div>
          </div>
  </>
)
}

export default QuickLink