import React from 'react'

export default function NoData(props) {
  if ( props.display ) {
    return (
      <div className='text-center container d-flex h-75'>
          <div className="row justify-content-center align-self-center">
              <h4 className="p-0 m-0 fs-bolder text-blue-900"> 
                  No reports
              </h4>
              <span className="text-gray p-0 m-0 fw-700 w-50 text-center mb-5">
                  Currently you have no data or the reports to be generated. Once you start generating traffic through the Balance application the reports will be shown.
              </span>
              <img src="/pages/no-data.svg" className="no-data-img"/>
          </div> 
      </div>
    )
  }
}
