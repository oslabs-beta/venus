/**
 * @name DependencyTree
 * @desc Visual dependency tree that renders when Depenedency Graph tab is selected. Complete display of interconnectivity of application and
 * its endpoints. Child component of DependencyGraphContainer.
 * 
 */
//import of files and dependencies for dependency graph to properly render
import React, { useState, useContext, useEffect } from "react";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import { LinearGradient } from "@visx/gradient";
import { pointRadial } from "d3-shape";
import { treeData } from './DataFuncDepGraph'
import Select from "antd/es/select";
import { dynamicContext } from '../contexts/dynamicContext';
import { globalContext } from "../contexts/globalContext"
import { io } from "socket.io-client";
const { Option } = Select;

import {
  LinkHorizontal,
  LinkVertical,
  LinkRadial,
  LinkHorizontalStep,
  LinkVerticalStep,
  LinkRadialStep,
  LinkHorizontalCurve,
  LinkVerticalCurve,
  LinkRadialCurve,
  LinkHorizontalLine,
  LinkVerticalLine,
  LinkRadialLine
} from "@visx/shape";


const controlStyles = { fontSize: 24  };
const controlStyles2 = { fontSize: 20, width: 200 };
export type Props = {
  layout: string;
  orientation: string;
  linkType: string;
  stepPercent: number;
  setLayout: (layout: string) => void;
  setOrientation: (orientation: string) => void;
  setLinkType: (linkType: string) => void;
  setStepPercent: (percent: number) => void;
};

function LinkControls({
  layout,
  orientation,
  linkType,
  stepPercent,
  setLayout,
  setOrientation,
  setLinkType,
  setStepPercent
}: Props) {

  function handleChangeLayout(value: any) {
    setLayout(value);
  }

  function LayoutSelect(): any {
    return (
      <Select
        defaultValue={layout}
        style={controlStyles2}
        onChange={handleChangeLayout}
      >
        <Option value="polar">Polar</Option>
        <Option value="cartesian">Cartesian</Option>
      </Select>
    );
  }

  function handleChangeOrientation(value: string) {
    setOrientation(value);
  }
 //set
  function OrientationSelect(): any {
    return (
      <Select
        defaultValue={orientation}
        style={controlStyles2 }
        onChange={handleChangeOrientation}
      >
        <Option value="horizontal">Horizontal</Option>
        <Option value="vertical">Vertical</Option>
      </Select>
    );
  }

  function handleChangeLinkType(value: string) {
    setLinkType(value);
  }
  function LinkTypeSelect(): any {
    return (
      <Select
        defaultValue={linkType}
        style={controlStyles2 }
        onChange={handleChangeLinkType}
      >
        <Option value="diagonal">Diagonal</Option>
        <Option value="step">Step</Option>
        <Option value="curve">Curve</Option>
        <Option value="line">Line</Option>
      </Select>
    );
  }
  return (
    <div>
      {/* <div width={totalWidth+200}></div> */}
      <label>layout: </label>&nbsp;
      <LayoutSelect />
      &nbsp;&nbsp;
      <label>Orientation: </label>&nbsp;
      <OrientationSelect />
      &nbsp;&nbsp;
      <label>Link: </label>&nbsp;
      <LinkTypeSelect />
      {linkType === "step" && layout !== "polar" && (
        <>
          &nbsp;&nbsp;
          {/* <label>step:</label>&nbsp;
          <input
            onClick={(e) => e.stopPropagation()}
            type="range"
            min={0}
            max={1}
            step={0.1}
            onChange={(e) => setStepPercent(Number(e.target.value))}
            value={stepPercent}
            disabled={linkType !== "step" || layout === "polar"}
          /> */}
        </>
      )}
      <br />
    </div>
  );
}

// function for Link Component w/ type assigned properties

function getLinkComponent({
  layout,
  linkType,
  orientation
}: {
  layout: string;
  linkType: string;
  orientation: string;
}): React.ComponentType<any> {
  let LinkComponent: React.ComponentType<any>;

  function removeChildren (node:any) {
    node.data.isExpanded = !node.data.isExpanded;
    console.log(node);
    forceUpdate();
  }
  if (layout === "polar") {
    if (linkType === "line") {
      LinkComponent = LinkRadialStep;
    } else if (linkType === "curve") {
      LinkComponent = LinkRadialCurve;
    } else if (linkType === "step") {
      LinkComponent = LinkRadialLine;
    } else {
      LinkComponent = LinkRadial;
    }
  } else if (orientation === "vertical") {
    if (linkType === "step") {
      LinkComponent = LinkVerticalStep;
    } else if (linkType === "curve") {
      LinkComponent = LinkVerticalCurve;
    } else if (linkType === "line") {
      LinkComponent = LinkVerticalLine;
    } else {
      LinkComponent = LinkVertical;
    }
  } else if (linkType === "step") {
    LinkComponent = LinkHorizontalStep;
  } else if (linkType === "curve") {
    LinkComponent = LinkHorizontalCurve;
  } else if (linkType === "line") {
    LinkComponent = LinkHorizontalLine;
  } else {
    LinkComponent = LinkHorizontal;
  }
  return LinkComponent;
}

// margin from chart to the sides 
const defaultMargin = { top: 30, left: 110, right: 110, bottom: 20 };
// link props type
export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

// renders the graph
function DependencyGraph({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin
}: LinkTypesProps) {
  const { dependencyGraph, setDependencyGraph } = useContext(dynamicContext)
  // set default mode
  const [layout, setLayout] = useState<string>("polar");
  const [orientation, setOrientation] = useState<string>("horizontal");
  const [linkType, setLinkType] = useState<string>("step");
  const [stepPercent, setStepPercent] = useState<number>(0.5);
  const forceUpdate = useForceUpdate();

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;
// sets chart point origin
  if (layout === "polar") {
    // modifies margin for "polar" layout
    margin = { top: 390, left: 110, right: 110, bottom: 200 }
    origin = {
      x: innerWidth / 2,
      y: (innerHeight / 4)-200
    };
    sizeWidth = 2 * Math.PI;
    // can set how spread out chart is here
    sizeHeight = Math.min(innerWidth, innerHeight) / 2;
  } else {
    origin = { x: 0, y: 0 };
    if (orientation === "vertical") {
      margin = {top:0, left:100, right:500, bottom: 0}
      origin = {
        x: 0,
        y: 30
      };
      sizeWidth = innerWidth+80;
      sizeHeight = innerHeight;
    } else {
      sizeWidth = innerHeight;
      sizeHeight = innerWidth;
    }
  }

// can add a feature to remove the children nodes instead of orientation change in a future version
  // function removeChildren (node:any) {
  //     node.data.isExpanded = !node.data.isExpanded;
  //     console.log(node);
  //     forceUpdate();
  //   }

// console.log('data from dep graph context in graph', dependencyGraph)
// console.log('current data in graph', treeData)
  const LinkComponent = getLinkComponent({ layout, linkType, orientation });
// can modify components here i.e. color, stroke size
  return totalWidth < 10 ? null : (
    <div style={controlStyles}>
      {/* <br />
      <LinkControls
        layout={layout}
        orientation={orientation}
        linkType={linkType}
        stepPercent={stepPercent}
        setLayout={setLayout}
        setOrientation={setOrientation}
        setLinkType={setLinkType}
        setStepPercent={setStepPercent}
      />
      <br/> */}
      <svg width={1000} height={700}>
        <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
        // can change rectangle color
        <rect width={totalWidth} height={totalHeight} rx={14} fill="#f5f5f5" />
        <Group top={margin.top} left={margin.left}>
          <Tree
      /*------- Put our data from context in place of dummy data ('treeData') --------*/
            root={hierarchy(dependencyGraph, (d) => (d.isExpanded ? null : d.children))}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? .4 : .4) / a.depth}
          >
            {(tree) => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => (
                  <LinkComponent
                    key={i}
                    data={link}
                    percent={stepPercent}
                    stroke="#03c0dc"
                    strokeWidth="1.75"
                    fill="none"
                  />
                ))}
              // settings for children of tree graph
                {tree.descendants().map((node, key) => {
                  const width = 160;
                  const height = 30;

                  let top: number;
                  let left: number;
                  // if (node.data.status === 'good'){ console.log('node', node)}
                  if (layout === "polar") {
                    const [radialX, radialY] = pointRadial(node.x, node.y);
                    top = radialY;
                    left = radialX;
                  } else if (orientation === "vertical") {
                    top = node.y;
                    left = node.x;
                    // can add a feature to remove the children nodes instead of orientation change in a future version
                    // removeChildren(node)
                    console.log('data input for vert', node)
                    
                  } else {
                    top = node.x;
                    left = node.y;
                  }
                  // THIS LINE OF CODE IS THE EQUATION FOR CHANGING COLOR BASED ON NODE HEALTH
                  const colorChange = (node.data.status === 'good') ? "#F6FFED" : (node.data.status === 'fair') ? '#FFF7E6' : (node.data.status === 'bad') ? '#FFF1F0' : (node.data.status)
                  const changeChildren = (node.data.children) ? colorChange : colorChange
                  
                  const colorChangeText = (node.data.status === 'good') ? "#52C41A" : (node.data.status === 'fair') ? '#FA8C16' : (node.data.status === 'bad') ? '#F5222D' : (node.data.status)
                  const changeChildrenText = (node.data.children) ? colorChangeText : colorChangeText
                  
                  const colorChangeBorder = (node.data.status === 'good') ? "#B7EB8F" : (node.data.status === 'fair') ? '#FFD591' : (node.data.status === 'bad') ? '#FFA39E' : (node.data.status)
                  const changeChildrenBorder = (node.data.children) ? colorChangeBorder : colorChangeBorder
                  

                  return (
                    <Group top={top} left={left} key={key}>
                      {node.depth === 0 && (
                        <circle
                          r={12}
                          fill="#f5f5f5"
                          // onClick={() => {
                          //   node.data.isExpanded = !node.data.isExpanded;
                          //   console.log(node);
                          //   forceUpdate();
                          // }}
                        />
                      )}
                      {node.depth !== 0 && (
                        <rect
                          height={height}
                          width={node.data.children ? "19%" : "8%"}
                          y={-height / 2}
                          x={node.data.children ? -(width+30) / 2 : -(width-80) / 2}
                          // fill of individual node boxes
                          fill={changeChildren}
                          // change border here ------------
                          stroke= {colorChangeBorder}
                          strokeWidth={1.75}
                          strokeDasharray={node.data.children ? "0" : "2,2"}
                          strokeOpacity={node.data.children ? 1 : 0.6}
                          rx={node.data.children ? 0 : 10}
                          // onClick={() => {
                          //   node.data.isExpanded = !node.data.isExpanded;
                          //   console.log(node);
                          //   forceUpdate();
                          // }}
                        />
                      )}
                      <text
                        dy=".33em"
                        fontSize={20}
                        fontFamily= 'Roboto'
                        textAnchor="middle"
                        style={{ pointerEvents: "none" }}
                        fill={colorChangeText}
                      >
                        {node.data.service}
                      </text>
                    </Group>
                  );
                })}
              </Group>
            )}
          </Tree>
        </Group>
      </svg>
    </div>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState<number>(0);
  return () => setValue(value => value + 1); // update state to force render
}

export { DependencyGraph, treeData, getLinkComponent, LinkControls };
