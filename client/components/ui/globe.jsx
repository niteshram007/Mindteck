"use client"
import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const countryData = [
  { labelLat: 12.9716, labelLng: 77.5946, labelLabel: "Bengaluru", arcAltitude: 0.1 },
  { labelLat: 22.5726, labelLng: 88.3639, labelLabel: "Kolkata", arcAltitude: 0.1 },
  { labelLat: 19.076, labelLng: 72.8777, labelLabel: "Mumbai", arcAltitude: 0.1 },
  { labelLat: 34.0522, labelLng: -118.2437, labelLabel: "California", arcAltitude: 0.1 },
  { labelLat: 25.7617, labelLng: -80.1918, labelLabel: "Florida", arcAltitude: 0.1 },
  { labelLat: 43.6532, labelLng: -79.3832, labelLabel: "Ontario", arcAltitude: 0.1 },
  { labelLat: 51.5074, labelLng: -0.1278, labelLabel: "UK", arcAltitude: 0.1 },
  { labelLat: 50.1109, labelLng: 8.6821, labelLabel: "Germany", arcAltitude: 0.1 },
  { labelLat: 1.3521, labelLng: 103.8198, labelLabel: "Singapore", arcAltitude: 0.1 },
  { labelLat: 3.139, labelLng: 101.6869, labelLabel: "Malaysia", arcAltitude: 0.1 },
  { labelLat: 26.2235, labelLng: 50.5876, labelLabel: "Bahrain", arcAltitude: 0.1 },
];


export function GlobeComponent() {
  const globeEl = useRef(undefined);

  const [popover, setPopover] = useState({
    visible: false,
    label: "",
    lat: 0,
    lng: 0,
    top: 0,
    left: 0,
  });

  const popoverRef = useRef (null); // Ref to the popover element

  const handleLabelClick = (lat, lng, label, event) => {
    const canvas = globeEl.current?.renderer().domElement;
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();

    // Get the mouse click position relative to the canvas
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;

    // Set the popover position
    setPopover({
      visible: true,
      label,
      lat,
      lng,
      top: mouseY + 10, // Offset by 10px to ensure it's below the click point
      left: mouseX,
    });
  };

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3;
      globeEl.current.controls().enableZoom = false;
    }

    // Close popover when clicking outside
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setPopover((prevState) => ({ ...prevState, visible: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [arcs, setArcs] = useState([]);

  useEffect(() => {
    let interval;

    setTimeout(() => {
      const initialArcs = [];
      for (let i = 0; i < 10; i++) {
        initialArcs.push(generateArc());
      }
      setArcs(initialArcs);

      interval = setInterval(() => {
        const newArc = generateArc();
        setArcs((prevArcs) => [...prevArcs.slice(1), newArc]);
      }, 10000);
    }, 2000);

    const generateArc = () => {
      const start = countryData[Math.floor(Math.random() * countryData.length)];
      const end = countryData[Math.floor(Math.random() * countryData.length)];

      return {
        startLat: start.labelLat,
        startLng: start.labelLng,
        endLat: end.labelLat,
        endLng: end.labelLng,
        arcColor: ["rgba(0,255,255,0.5)", "rgba(255,255,0,0.5)"],
      };
    };

    return () => clearInterval(interval);
  }, [countryData]);

  return (
    <div style={{ position: "relative" }}>
      <Globe
        ref={globeEl}
        width={1000}
        height={1000}
        
        globeImageUrl="//unpkg.com/three-globe@2.41.12/example/img/earth-night.jpg"
        // bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        // globeTransparent={true}
        labelsData={countryData}
        backgroundColor="#fff"
        labelIncludeDot
        labelDotRadius={0.5}
        
        labelSize={2}
        labelLat={(d) => d.labelLat}
        labelLng={(d) => d.labelLng}
        labelText={(d) => d.labelLabel}
        onLabelClick={(labelData, event) => {
          const { labelLat, labelLng, labelLabel } = labelData;
          handleLabelClick(labelLat, labelLng, labelLabel, event);
        }}
        arcsData={arcs}
        arcStartLat={(d) => d.startLat}
        arcStartLng={(d) => d.startLng}
        // arcAltitude={(d) => d.arcAltitude}
        arcEndLat={(d) => d.endLat}
        arcEndLng={(d) => d.endLng}
        arcColor={(d) => d.arcColor}
        atmosphereColor="red"
        // arcAltitudeAutoScale={(d)=>d.arcAltitude}
        // arcsTransitionDuration={(d)=>10000}
        arcStroke={0.6}
        arcDashLength={1}
        arcDashGap={0.7}
        arcDashAnimateTime={2500}
        // arcCurvature={0.05}
        
        // Rings Data
        ringsData={countryData}
        ringLat={(d) => d.labelLat}
        ringLng={(d) => d.labelLng}
        // ringRadius={pulseSize} // This will animate the ring's radius for pulsating effect
        ringColor={["rgba(0,255,255,0.5)", "rgba(255,255,0,0.5)"]} // Pulsating color
        ringResolution={2000} // Higher resolution for smoother rings
        // ringOpacity={0.5} // Transparency of the rings
      />

      {/* Popover */}
      {popover.visible && (
        <div
          ref={popoverRef}
          style={{
            position: "absolute",
            top: popover.top,
            left: popover.left,
            backgroundColor: "#fff", // Clean white background
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Stronger shadow for more depth
            pointerEvents: "none", // Disable interaction with the popover
            transform: "translate(-50%, 0)", // Center horizontally
            zIndex: 1000,
            animation: "fadeIn 0.3s ease-out", // Smooth fade-in animation
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Clean and modern font
            maxWidth: "200px", // Max width for readability
            minWidth: "180px", // Ensures popover has a consistent width
          }}
        >
          {/* Arrow */}
          <div
            style={{
              position: "absolute",
              bottom: "100%",
              left: "50%",
              marginLeft: "-10px",
              borderWidth: "10px",
              borderStyle: "solid",
              borderColor: "transparent transparent #fff transparent", // White arrow
            }}
          />

          {/* Popover Content */}
          <h3
            style={{
              margin: "0",
              fontSize: "18px",
              fontWeight: "600", // Lighter weight for better readability
              color: "#333", // Dark color for better contrast
              marginBottom: "8px", // Space between label and content
            }}
          >
            {popover.label}
          </h3>

          <div
            style={{
              fontSize: "14px",
              color: "#555", // Lighter color for the data text
            }}
          >
            <p style={{ margin: "5px 0", fontWeight: "500" }}>
              <strong>Latitude:</strong> {popover.lat}
            </p>
            <p style={{ margin: "5px 0", fontWeight: "500" }}>
              <strong>Longitude:</strong> {popover.lng}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
