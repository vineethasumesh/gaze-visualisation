// src/components/GazeVisualisation.js

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { hexbin as d3Hexbin } from 'd3-hexbin';

const GazeVisualisation = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('border', '1px solid black');

    svg.selectAll('*').remove();

    const points = data.map(d => ({ x: d.x, y: d.y, z: d.z, timestamp: d.timestamp }));

    const xScale = d3.scaleLinear().domain([d3.min(points, d => d.x), d3.max(points, d => d.x)]).range([0, width]);
    const yScale = d3.scaleLinear().domain([d3.min(points, d => d.y), d3.max(points, d => d.y)]).range([height, 0]);

    svg.selectAll('circle')
      .data(points)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5)
      .style('fill', 'red');

    const heatmap = d3Hexbin()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .radius(20)
      .extent([[0, 0], [width, height]]);

    const bins = heatmap(points);

    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
      .domain([0, d3.max(bins, d => d.length)]);

    svg.append('g')
      .selectAll('path')
      .data(bins)
      .enter()
      .append('path')
      .attr('d', d => `M${d.x},${d.y}${d.hexagon()}`)
      .attr('fill', d => colorScale(d.length))
      .attr('stroke', 'black');

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default GazeVisualisation;
