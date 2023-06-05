import * as React from 'react'
import Marquee from 'react-fast-marquee'
import "../../../../Styles/GlobalStyles/global.scss"

const News = (props: any) => {
  return (
    <div className='rowMain'>
      <div className='row2'>
        <h2>News</h2>
      </div>
      <Marquee speed={10} direction='up' className='marqueetag'>
                <div className='row1'>
                    {props.data?.map((x: any) => {
                        return (
                            <div className='row5'>
                                <ul className='bullets'>
                                    <li>{x.Title}</li>
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </Marquee>
    </div>
  )
}

export default News