import { useEffect, useState } from "react";
import "./style.css";

export default function Container({ settings }) {
  return (
    <>
      <div className="myContainer">
        <div
          style={{
            width: settings.width,
            height: settings.height,
            transform: `translate(${settings.translateX}px,${settings.translateY}px) rotate(${settings.angle}deg)`,
          }}
          className="myDiv"
        >
          Hi :)
        </div>

        <table>
          <tbody>
            <tr>
              <th>Width</th>
              <td>: {settings.width}</td>
            </tr>
            <tr>
              <th>Height</th>
              <td>: {settings.height}</td>
            </tr>
            <tr>
              <th>Rotation</th>
              <td>: {settings.angle} deg</td>
            </tr>
            <tr>
              <th>T_X</th>
              <td>: {settings.translateX}</td>
            </tr>
            <tr>
              <th>T_Y</th>
              <td>: {settings.translateY}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
