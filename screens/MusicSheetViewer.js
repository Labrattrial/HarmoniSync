import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MusicScore = ({ musicXML }) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/vexflow/4.0.0/vexflow.min.js"></script>
    </head>
    <body>
      <div id="music-container"></div>
      <script>
        const VF = Vex.Flow;
        const div = document.getElementById("music-container");
        const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        renderer.resize(500, 200);
        const context = renderer.getContext();
        const stave = new VF.Stave(10, 40, 400);
        stave.addClef("treble").addTimeSignature("4/4");
        stave.setContext(context).draw();
      </script>
    </body>
    </html>
  `;

  return <WebView source={{ html: htmlContent }} />;
};

export default MusicScore;
