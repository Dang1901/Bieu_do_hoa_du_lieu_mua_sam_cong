import React from "react";
import { Line } from '@ant-design/charts';

const LineChart = () => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',  // hoặc 'circle', chọn một
    },
    tooltip: {
      formatter: (data: any) => {  // Sử dụng đúng tham số
        return {
          name: 'Giá trị',  // Đặt tên đúng
          value: data.value,  // Đặt giá trị đúng
        };
      },
      customContent: (name:any, items: any) =>
        `<div>${items?.map((item: any) => {
          return `<div class="tooltip-chart" >
              <span class="tooltip-item-name">${item?.name}</span>
              <span class="tooltip-item-value">${item?.value}</span>
            </div>`;
        }).join('')}</div>`,  // Kết hợp các phần tử thành chuỗi
      showMarkers: true,  // Sử dụng giá trị boolean
      showContent: true,  // Sử dụng giá trị boolean
      position: 'right',  // Hoặc 'left', chọn một
      showCrosshairs: true,  // Sử dụng giá trị boolean
    },
  };

  return <Line {...config} />;
}

export default LineChart;
