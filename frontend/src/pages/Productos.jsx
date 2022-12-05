import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
  ContextMenu,
} from "@syncfusion/ej2-react-grids";
import { ordersGrid } from "../data/dummy";
import { Header } from "../components";
import { useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { useEffect } from "react";

function Pedidos() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    AxiosInstance.get("products/requestProducts").then(({data}) => {
      setProductos(data.data);
      console.log(data);
    });
  }, []);

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Sección" title="Productos" />
      <GridComponent
        id="gridcomp"
        dataSource={productos}
        allowPaging
        allowSorting
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
}

export default Pedidos;
