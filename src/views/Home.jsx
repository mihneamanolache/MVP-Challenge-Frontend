import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import Table from '../components/Charts/Table'
import NoData from '../components/Templates/NoData'
import Page from '../components/Templates/Page'
import { fetchGateways, fetchGrouped, fetchProjects } from '../utils/api'
import "react-datepicker/dist/react-datepicker.css";
import { findGatewayById, findProjectById } from '../utils/helpers';
import { PieChart } from 'react-minimal-pie-chart';
import { PIECHART_LABEL_STYLE, PIECHART_STYLE } from '../utils/constants';

export default function Home() {
  const [displayNoData, setDisplayNoData] = useState(true)
  const [displayProjects, setDisplayProjects] = useState(false)
  const [displayGateways, setDisplayGateways] = useState(false)

  const [projectsList, setProjectsList] = useState([])
  const [gatewaysList, setGatewaysList] = useState([])

  const [pieChartData, setPieChartData] = useState([])

  const [projectId, setProjectId] = useState(null)
  const [gatewayId, setGatewayId] = useState(null)
  const [fromDate, setFromDate]   = useState('From date')
  const [toDate, setToDate]       = useState('To Date')

  const [projectName, setProjectName] = useState('Select project')
  const [gatewayName, setGatewayName] = useState('Select gateway')

  const [projectsBnt, setProjectsButton]  = useState(null)
  const [gatewaysBtn, setGatewaysBtn]     = useState(null)

  const [projectsAccordion, setProjectsAccordion] = useState([])

  const [projectsTotal, setProjectsTotal] = useState(0)

  const getProjects = async () => {
    try {
      let response = await fetchProjects()
      setProjectsList(response.data)
      setProjectsButton(response.data.map((project) => 
          <option value={project.projectId}>{project.name}</option>
        ))
    } catch (err) {
      console.log(err)
    }
  }

  const getGetaways = async () => {
    try {
      let response = await fetchGateways()
      setGatewaysList(response.data)
      setGatewaysBtn(response.data.map((gateway) => 
        <option value={gateway.gatewayId}>{gateway.name}</option>
      ))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=> {
    getProjects()
    getGetaways()
  }, [])

  const selectProject = (e) => {
    if (e.target.value == 'Select project' ) {
      setDisplayNoData(true)
      setDisplayProjects(false)
    }
    setProjectId(e.target.value)
    setProjectName(findProjectById(e.target.value, projectsList))
    setGatewayId('')
  }

  const selectGateway = (e) => {
    setGatewayId(e.target.value)
    setGatewayName(findGatewayById(e.target.value, gatewaysList))
  }

  const showReport = async () => {
    var totalAmount = 0
    setProjectsAccordion([])
    setPieChartData([])
    setDisplayGateways(false)
    let response = await fetchGrouped(fromDate, toDate, projectId, gatewayId)

    if ( projectId !== '' && gatewayId === '' ) {
      setDisplayGateways(true)
      response.gateways.forEach(gateway => {
        totalAmount += Number(gateway.totalAmount)
        setProjectsAccordion(projectsAccordion => [...projectsAccordion, <Table project={gateway} />])
        let data = {
          title: gateway.name,
          value: (Number(gateway.totalAmount) / totalAmount)*100,
          color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        }
        setPieChartData(pieChartData => [...pieChartData, data])
      });
    }

    if ( projectId === '' && gatewayId !== '' ) {
      setDisplayGateways(true)
      response.projects.forEach(project => {
        totalAmount += Number(project.totalAmount)
        setProjectsAccordion(projectsAccordion => [...projectsAccordion, <Table project={project} />])
        let data = {
          title: project.name,
          value: (Number(project.totalAmount) / totalAmount)*100,
          color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        }
        setPieChartData(pieChartData => [...pieChartData, data])
      });
    }
    setProjectsTotal(totalAmount.toFixed(2))
    setDisplayNoData(false)
    setDisplayProjects(true)
  }

  return (
    <>
        <Page> 
          <div className="d-flex justify-content-between">
            <div className="container">
              <h4 className="p-0 m-0 fs-bolder text-blue-900">
                Reports
              </h4>
              <span className="text-gray p-0 m-0 fw-700">
                Easily generate a report of your transactions
              </span>
            </div>
            <div className="d-flex justify-content-end">

              {/* Projects Dropdown */}
              <select 
                className="btn btn-green text-white dropdown-toggle form-sm me-4 fs-sm" 
                aria-label="Select project"
                value={projectId}
                onChange={selectProject}
              >
                <option selected>Select project</option>
                <option value="">All projects</option>
                { projectsBnt }
              </select>

              {/* Gateways Dropdown */}
              <select 
                className="btn btn-green text-white dropdown-toggle form-sm me-4 fs-sm" 
                aria-label="Select project"
                value={gatewayId}
                onChange={selectGateway}
              >
                <option selected>Select gateway</option>
                <option value="">All gateways</option>
                { gatewaysBtn }
              </select>

              {/* Date pickers */}
              <div className='btn btn-green text-white dropdown-toggle form-sm me-4 fs-sm'>
                {fromDate}
                <DatePicker 
                  onChange={(date) => setFromDate(String(date.toISOString().split('T')[0]))} 
                  className="w-sqare-sm bg-green m-0 p-0 border-0"
                />
              </div>

              <div className='btn btn-green text-white dropdown-toggle form-sm me-4 fs-sm'>
                {toDate}
                <DatePicker 
                  onChange={(date) => setToDate(String(date.toISOString().split('T')[0]))} 
                  className="w-sqare-sm bg-green m-0 p-0 border-0"
                />
              </div>

              {/* Generate report button */}
              <button
                className="btn btn-sm btn-blue text-white btn-long form-sm fs-sm" 
                onClick={showReport}
              >
                Generate report
              </button>
          </div>
          </div>

          {/* Display content inside page */}

          <NoData 
            display={displayNoData}
          />

          <div className="d-flex justify-content-even">
          <div className="container">
            <div className={`${displayProjects ? 'd-block' : 'd-none'} rounded-more p-3 bg-lightblue mt-3 mb-3 me-2 ${displayGateways ? 'width-50' : 'width-100'}`} >
              <span className="text-blue-900 fw-700">
                { projectName } | { gatewayName }
              </span>
              <div className="accordion accordion-flush" id="accordionFlushExample">
                { projectsAccordion }
              </div>
            </div>
            <div className={`${displayGateways ? 'd-none' : 'd-block'} rounded-more p-3 bg-lightblue mt-4`}>
                <span className="text-blue-900">TOTAL: {projectsTotal} USD</span> 
            </div>
          </div>
          <div className={`${displayGateways ? 'd-block' : 'd-none'} text-blue-900 fw-700 mt-3 mb-3 me-2 ${displayGateways ? 'width-50' : 'width-100'}`} >
              <div className={`${displayProjects ? 'd-block' : 'd-none'} rounded-more p-3 bg-lightblue mb-4 text-center`}>
                { pieChartData.map((e) => 
                  <span className='me-5'>
                    <span className="me-2 ps-1 pe-1 rounded-more" style={{backgroundColor: e.color, minWidth: '10px', color: e.color}}>+</span>
                    {e.title}
                  </span>
                )}
              </div>
              <PieChart
                label={({ dataEntry }) => `${dataEntry.value.toFixed(2)}%`}
                labelStyle={{
                  ...PIECHART_LABEL_STYLE,
                }}
                style={PIECHART_STYLE}
                lineWidth={60}
                segmentsStyle={{ transition: 'stroke .3s' }}
                segmentsShift={(index) => (0.4)}
                labelPosition={70}
                data={pieChartData}
              />
              <div className={`${displayProjects ? 'd-block' : 'd-none'} rounded-more p-3 bg-lightblue mt-4`}>
                TOTAL: {projectsTotal} USD
              </div>
          </div>
          </div>
        </Page>
    </>
  )
}
