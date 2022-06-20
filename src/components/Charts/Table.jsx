import React from 'react'

export default function Table({project, single=false}) {

  if ( single ) {
    return (
      <table className="table table-hover table-sm mt-5">
        <thead className="thead-light">
          <tr key="head">
            <th scope="col">Date</th>
            <th scope="col">Gateaway</th>
            <th scope="col">Transaction ID</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          { project.transactions.map((transaction) => 
            <tr key={transaction.paymentId}>
              <th>{transaction.created}</th>
              <th>{transaction.gatewayName}</th>
              <th>{transaction.paymentId}</th>
              <th>{transaction.amount}</th>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  return (
    <div className="accordion-item mt-2 rounded-10 border-0" key={project.projectId}>
      <h2 className="accordion-header" id={`flush-headint${project.projectId}`}>
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${project.projectId}`} aria-expanded="false" aria-controls={`flush-collapse${project.projectId}`}>
          <div className="d-flex justify-content-between fw-700 text-blue-900 p-2 w-100">
            <span>
              { project.name }
            </span>
            <span>
              TOTAL: {project.totalAmount} USD
            </span>
          </div>
        </button>
      </h2>
      <div id={`flush-collapse${project.projectId}`} className="accordion-collapse collapse bg-lightblue" aria-labelledby={`flush-headint${project.projectId}`} data-bs-parent="#accordionFlushExample">
        <div className="accordion-body">
          <table className="table table-hover table-sm">
            <thead className="thead-light">
              <tr key="head">
                <th scope="col">Date</th>
                <th scope="col">Gateaway</th>
                <th scope="col">Transaction ID</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              { project.transactions.map((transaction) => 
                <tr key={transaction.paymentId}>
                  <th>{transaction.created}</th>
                  <th>{transaction.gatewayName}</th>
                  <th>{transaction.paymentId}</th>
                  <th>{transaction.amount}</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
