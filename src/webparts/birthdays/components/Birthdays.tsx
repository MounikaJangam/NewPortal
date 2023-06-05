import * as React from 'react';
import { SPFI } from '@pnp/sp';
import { IBirthdaysProps } from './IBirthdaysProps';
import { getSP } from '../../../Services/pnpConfig';
import { Birthday } from './Birthdays1';
import { SharePointService } from './Birthdays1/Utils/SharepointService';
import { BirthdaysMonth } from './Birthdays1/models/BirthdayMonths';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp";

const Birthdayss = (props: IBirthdaysProps) => {
  const [birthdaydata, setBirthdayData] = React.useState<any>();
  const getBirthdayData = async () => {
    let _sp: SPFI = getSP(props.context);
    const sharePointService = new SharePointService(_sp);
    const birthdays: Array<BirthdaysMonth> =
      await sharePointService.GetBirthdays();
    setBirthdayData(birthdays);
  };

  React.useEffect(() => {
    const execute = async () => {
      await getBirthdayData();
    };
    execute();
  }, []);

return (
  <div className="mainContainer">
    <div className="Containers" >
      <div className='Birthdays'>
        <Birthday data={birthdaydata} />
      </div>
    </div>
  </div>
);
};
export default Birthdayss 