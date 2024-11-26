import React from 'react'
import ReactDOM from 'react-dom'
import { MyDocument } from './MyDocument'
import { PDFViewer } from '@react-pdf/renderer'

export const Create = () => {
  return (
    <PDFViewer>
        <MyDocument />
    </PDFViewer>
  )
}

ReactDOM.render(<Create />, document.getElementById('root'))