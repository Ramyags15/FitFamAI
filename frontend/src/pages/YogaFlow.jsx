import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

import morningFlow from "../data/morningFlow";
import deepSleepRelaxation from "../data/deepSleepFlow";
import postWorkoutStretch from "../data/postWorkoutFlow";

import "../styles/Yoga.css";

export default function YogaFlow() {
  const { id } = useParams();
  const flowId = parseInt(id);

  // include all flows here
  const allFlows = [
    morningFlow,
    deepSleepRelaxation,
    postWorkoutStretch
  ];

  const [index, setIndex] = useState(0);

  // get the chosen flow
  const flowSteps = allFlows[flowId];
  if (!flowSteps) return <h2>Flow not found</h2>;

  const step = flowSteps[index];

  const next = () => {
    if (index < flowSteps.length - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const openVideo = (vid) => {
    window.open(`https://www.youtube.com/watch?v=${vid}`, "_blank");
  };

  return (
    <div className="content-page padded-section light-bg">
      <Link to="/yoga" className="back-link">← Back</Link>

      <h1 className="text-gradient">Yoga Flow</h1>
      <h3>Step {index + 1} / {flowSteps.length}</h3>

      <div className="yoga-layout">
        <img src={step.image} className="yoga-img" alt="" />
        <div className="yoga-info">
          <h2>{step.title}</h2>
          <p>{step.description}</p>
        </div>
      </div>

      <div className="video-row">
        {step.videos.map((vid, i) => (
          <div className="video-card" key={i} onClick={() => openVideo(vid)}>
            <img src={`https://img.youtube.com/vi/${vid}/hqdefault.jpg`} alt="" />
          </div>
        ))}
      </div>

      <div className="yoga-buttons">
        <button onClick={prev} disabled={index === 0}>◀ Previous</button>
        <button onClick={next} disabled={index === flowSteps.length - 1}>Next ▶</button>
      </div>
    </div>
  );
}

