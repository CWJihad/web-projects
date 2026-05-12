import React from 'react'
import Card from './components/Card';
import {icons} from './assets'

const App = () => {

  const jobOpenings = [
  {
    brandLogo: `${icons.facebook}`,
    companyName: "Facebook",

    datePosted: "5 days ago",
    post: "Frontend Developer",
    tag1: "Full-time",
    tag2: "Junior Level",
    salary: "80k-100k/yr",
    location: "California, US"
  },
  {
    brandLogo: `${icons.amazon}`,
    companyName: "Amazon",

    datePosted: "2 weeks ago",
    post: "Backend Developer",
    tag1: "Part-time",
    tag2: "Senior Level",
    salary: "120k-150k/yr",
    location: "New York, US"
  },
  {
    brandLogo: `${icons.apple}`,
    companyName: "Apple",

    datePosted: "3 days ago",
    post: "iOS Developer",
    tag1: "Full-time",
    tag2: "Junior Level",
    salary: "90k-110k/yr",
    location: "Texas, US"
  },
  {
    brandLogo: `${icons.github}`,
    companyName: "Github",

    datePosted: "1 week ago",
    post: "UI/UX Designer",
    tag1: "Part-time",
    tag2: "Mid Level",
    salary: "70k-90k/yr",
    location: "Washington, US"
  },
  {
    brandLogo: `${icons.linkedin}`,
    companyName: "Linkedin",

    datePosted: "4 days ago",
    post: "DevOps Engineer",
    tag1: "Full-time",
    tag2: "Senior Level",
    salary: "130k-160k/yr",
    location: "Florida, US"
  },
  {
    brandLogo: `${icons.google}`,
    companyName: "Google",

    datePosted: "10 days ago",
    post: "Data Analyst",
    tag1: "Full-time",
    tag2: "Junior Level",
    salary: "75k-95k/yr",
    location: "Illinois, US"
  }
];
  
  return (
    <div className='parent'>
      {jobOpenings.map(function(elem, idx){
        return <div key={idx}>
        <Card logo={elem.brandLogo} company={elem.companyName} date={elem.datePosted} post={elem.post} work={elem.tag1} level={elem.tag2} salary={elem.salary} location={elem.location} />
        </div>
      })}
    </div>
  )
}

export default App
