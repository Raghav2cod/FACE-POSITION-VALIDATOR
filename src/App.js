import * as faceapi from 'face-api.js';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

const App = () => {
  const [isValid, setIsValid] = useState(false);
  const webcamRef = useRef(null);
  const history = useHistory();
  const validateFacePosition = async () => {
    const net = await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    const { width, height } = webcamRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = webcamRef.current.getScreenshot();
    img.onload = async () => {
      ctx.drawImage(img, 0, 0, width, height);
      const detections = await faceapi.detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
      if (detections.length === 1) {
        const face = detections[0].detection;
        const landmarks = detections[0].landmarks;
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();
        const nose = landmarks.getNose();
        const leftEyeCenter = leftEye.position;
        const rightEyeCenter = rightEye.position;
        const noseCenter = nose.position;
        const leftEyeToNose = leftEyeCenter.distanceTo(noseCenter);
        const leftEyeToRightEye = leftEyeCenter.distanceTo(rightEyeCenter);
        const noseToLeftEye = noseCenter.distanceTo(leftEyeCenter);
        const noseToRightEye = noseCenter.distanceTo(rightEyeCenter);
        const leftEyeToLeftEye = leftEyeCenter.distanceTo(leftEyeCenter);
        const noseToNose = noseCenter.distanceTo(noseCenter);
        const rightEyeToRightEye = rightEyeCenter.distanceTo(rightEyeCenter);
        const rightEyeToNose = rightEyeCenter.distanceTo(noseCenter);
      }
    }
  }
}
