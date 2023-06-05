import * as React  from 'react'
import '../../../Styles/GlobalStyles/global.scss'
import { IOpinionPollProps } from './IOpinionPollProps'
import Poll from './OpinionPoll1'

const OpinionPoll = (props:IOpinionPollProps) => {
  return (
    <div className="Containers3" > 
    <div><Poll description={props.description} isDarkTheme={props.isDarkTheme} environmentMessage={props.environmentMessage} hasTeamsContext={props.hasTeamsContext} userDisplayName={props.userDisplayName} context={props.context} ListName={props.ListName}/></div> 
    </div>
  )
}

export default OpinionPoll