import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../main';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const { isAuthorized } = useContext(Context);
  const [jobs, setJobs] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v2/job/getAlljobs", { withCredentials: true });
        setJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => (
              <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/Job/${element._id}`}>Job Details</Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
