import React, { useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as posedetection from '@tensorflow-models/pose-detection';

export default function LiveCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [bodyDetected, setBodyDetected] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startCamera = async () => {
    if (cameraOn) return;

    try {
      await tf.setBackend('webgl');
      await tf.ready();

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (!videoRef.current) {
        console.error("Video ref not ready yet!");
        return;
      }

      videoRef.current.srcObject = stream;

      // Wait until metadata is loaded
      await new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => {
          resolve(true);
        };
      });

      await videoRef.current.play();
      setCameraOn(true);

      const detector = await posedetection.createDetector(
        posedetection.SupportedModels.MoveNet,
        { modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
      );

      const id = setInterval(async () => {
        if (!videoRef.current) return;
        const poses = await detector.estimatePoses(videoRef.current);
        setBodyDetected(poses.length > 0);
      }, 200);

      setIntervalId(id);
    } catch (err) {
      console.error("Cannot open camera:", err);
      alert("Cannot open camera: " + err.message);
    }
  };

  const stopCamera = () => {
    if (intervalId) clearInterval(intervalId);

    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);
    setBodyDetected(false);
  };

  const handleCapture = () => {
    if (!bodyDetected) {
      alert("No human detected!");
      return;
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg');
    onCapture(dataUrl); // send to parent component
    stopCamera();
  };

  return (
    <div>
      {!cameraOn && <button onClick={startCamera} className="btn-gradient">Open Camera</button>}

      <video
        ref={videoRef}
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '8px',
          display: cameraOn ? 'block' : 'none'
        }}
        autoPlay
        muted
        playsInline
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {cameraOn && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={handleCapture} className="btn-gradient">Capture Photo</button>
          <button onClick={stopCamera} className="btn-gradient" style={{ marginLeft: '10px', backgroundColor:'#555' }}>Close Camera</button>
          <p>{bodyDetected ? "✅ Human detected" : "❌ No human detected"}</p>
        </div>
      )}
    </div>
  );
}




