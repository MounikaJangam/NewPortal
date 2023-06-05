import * as React from "react"
import { SPFI } from "@pnp/sp";
import FeedBack from "./FeedBack";
import { IFeedBackFormProps } from "./IFeedBackFormProps";
import { useState } from "react"
import { getSP } from "../../../Services/pnpConfig";
import "../../../Styles/GlobalStyles/global.scss"
import { WebPartContext } from "@microsoft/sp-webpart-base";

const FeedBackForm = (props: IFeedBackFormProps) => {
    let arrobj: any[] = [];
    const [depID, setDepID] = React.useState<any>();
    const [repMan, setRepMan] = React.useState<any>();
    const [quicklinkdata, SetQuickLinkData] = useState<any>();

    const getUserData = async () => {
        let _sp: SPFI = getSP(props.context);
        const list = await _sp.web.lists.getByTitle("EmployeeDetails");
        let user = await _sp.web.currentUser();
        console.log(user);
        let userobj = user.Email
        var r = await list.items.filter("Name/EMail eq '" + userobj + "'")()
        var y = await list.items.select('ReportingManager/EMail').expand('ReportingManager').filter("Name/EMail eq '" + userobj + "'")()
        y.map((x) => {
          console.log(x.ReportingManager.EMail)
          setRepMan(x.ReportingManager.EMail)
        })
        r.map((x) => {
          console.log(x.DepartmentId)
          setDepID(x.DepartmentId)
        })
      }
   
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
        getUserData();
       getQuickLinkData();
     }
     catch (e) {
       console.log(e);
     }
   }, []);
   
    
   return (
     <>
      <div className="row2container__part2">
            <FeedBack context={WebPartContext} depID={depID} repman={repMan} />
          </div>
     </>
   )
}
   
export default FeedBackForm